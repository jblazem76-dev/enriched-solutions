import { ekgFormats, leadSources, type EkgFormat, type LeadSource } from "@/lib/site";

/**
 * Receives the site's forms (EKG booking requests, and the ES+ / Golf & Heels / newsletter sign-ups).
 *
 * Delivery, in order of preference:
 *   1. Resend API (RESEND_API_KEY): emails the team a notification (LEAD_NOTIFY_EMAIL), and for sign-ups also
 *      saves the contact to a Resend segment (RESEND_SEGMENT_ID). Booking requests are only emailed: an
 *      organizer asking about EKG has not agreed to be on a marketing list.
 *   2. LEAD_WEBHOOK_URL: the lead is POSTed as JSON (Zapier, Make, your own endpoint). This is how the site talks to
 *      the shared Azure API in azure-api/, which then delivers through Resend for all ES projects
 *      (LEAD_WEBHOOK_KEY is that API's function key).
 *
 * It never pretends to have saved a lead: with neither configured it answers 503, and the form tells the
 * visitor to email instead of showing a false "you're in".
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 8_192;
// RESEND_API_URL exists so tests can point at a local stand-in. Server-side config only, never user input.
const RESEND_API = process.env.RESEND_API_URL?.trim() || "https://api.resend.com";

type Body = Record<string, unknown>;

type Lead = {
  source: LeadSource;
  name: string;
  email: string;
  organization: string;
  format: EkgFormat | "";
  eventDate: string;
  message: string;
  submittedAt: string;
};

const formatNames: Record<EkgFormat, string> = {
  conference: "A conference",
  event: "An event",
  solo: "A solo engagement",
  "not-sure": "Not sure yet",
};

const sourceNames: Record<LeadSource, string> = {
  "ekg-booking": "EKG booking request",
  "es-plus": "ES+ waitlist",
  "golf-and-heels": "Golf & Heels interest list",
  newsletter: "Newsletter",
};

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/** One line of text: control characters become spaces, so nothing can break out of a header or subject. */
function oneLine(value: unknown, max: number): string {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max) : "";
}

/** Free text: keeps line breaks, drops other control characters. */
function multiLine(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim()
    .slice(0, max);
}

function describe(lead: Lead): { subject: string; text: string } {
  if (lead.source === "ekg-booking") {
    const who = lead.organization ? `${lead.name} (${lead.organization})` : lead.name;
    return {
      subject: `EKG booking request: ${who}`,
      text: [
        "New EKG booking request",
        "",
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Organization: ${lead.organization || "-"}`,
        `Planning: ${lead.format ? formatNames[lead.format] : "-"}`,
        `Date or timeframe: ${lead.eventDate || "-"}`,
        "",
        "Message:",
        lead.message || "-",
        "",
        `Submitted ${lead.submittedAt} via enrichedsolutions.net. Reply to this email to answer ${lead.name}.`,
      ].join("\n"),
    };
  }
  return {
    subject: `New sign-up (${sourceNames[lead.source]}): ${lead.email}`,
    text: [
      `New sign-up: ${sourceNames[lead.source]}`,
      "",
      `Name: ${lead.name || "-"}`,
      `Email: ${lead.email}`,
      "",
      `Submitted ${lead.submittedAt} via enrichedsolutions.net.`,
    ].join("\n"),
  };
}

/** One Resend API call. Returns whether it worked; logs only the status and Resend's error name, never lead data. */
async function resend(path: string, apiKey: string, payload: Record<string, unknown>): Promise<boolean> {
  try {
    const response = await fetch(`${RESEND_API}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
    if (response.ok) return true;
    const detail = (await response.json().catch(() => ({}))) as { name?: string };
    console.error(`[lead] Resend ${path} failed: ${response.status} ${detail.name ?? ""}`.trim());
  } catch {
    console.error(`[lead] Resend ${path} could not be reached`);
  }
  return false;
}

type Outcome = "ok" | "not_configured" | "failed";

async function viaResend(lead: Lead, apiKey: string): Promise<Outcome> {
  const notify = process.env.LEAD_NOTIFY_EMAIL?.trim();
  const segmentId = process.env.RESEND_SEGMENT_ID?.trim();
  // Until a domain is verified in Resend, only its test sender works, and only to the account owner's address.
  const from = process.env.LEAD_FROM_EMAIL?.trim() || "Enriched Solutions <onboarding@resend.dev>";

  const jobs: Promise<boolean>[] = [];
  if (notify) {
    const { subject, text } = describe(lead);
    jobs.push(resend("/emails", apiKey, { from, to: [notify], reply_to: lead.email, subject, text }));
  }
  if (segmentId && lead.source !== "ekg-booking") {
    const firstName = lead.name.split(" ")[0];
    jobs.push(
      resend("/contacts", apiKey, {
        email: lead.email,
        ...(firstName ? { first_name: firstName } : {}),
        segments: [{ id: segmentId }],
      }),
    );
  }
  if (jobs.length === 0) return "not_configured";

  // The lead is safe if either the notification or the contact went through.
  const results = await Promise.all(jobs);
  return results.some(Boolean) ? "ok" : "failed";
}

async function viaWebhook(lead: Lead, webhook: string): Promise<Outcome> {
  // For the shared Azure API (azure-api/): an Azure Function with function-level auth wants its key in this header.
  const key = process.env.LEAD_WEBHOOK_KEY?.trim();
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(key ? { "x-functions-key": key } : {}) },
      body: JSON.stringify({ ...lead, site: "enrichedsolutions.net" }),
      signal: AbortSignal.timeout(8_000),
    });
    return response.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}

export async function POST(request: Request) {
  // Same-origin only: a browser form on another site must not be able to post leads for us.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return json(403, { error: "forbidden" });
    } catch {
      return json(403, { error: "forbidden" });
    }
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { error: "too_large" });

  let body: Body;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return json(400, { error: "invalid_json" });
    }
    body = parsed as Body;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Honeypot: real visitors never see or fill this field. Answer "ok" so bots learn nothing.
  if (typeof body.hp_check_x7 === "string" && body.hp_check_x7.trim() !== "") return json(200, { ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = body.source;

  if (!EMAIL.test(email) || email.length > 254) return json(422, { error: "invalid_email" });
  if (typeof source !== "string" || !(leadSources as readonly string[]).includes(source)) {
    return json(422, { error: "invalid_source" });
  }

  const isBooking = source === "ekg-booking";
  const format = isBooking && (ekgFormats as readonly unknown[]).includes(body.format) ? (body.format as EkgFormat) : "";
  const lead: Lead = {
    source: source as LeadSource,
    name: oneLine(body.name, 100),
    email,
    organization: isBooking ? oneLine(body.organization, 150) : "",
    format,
    eventDate: isBooking ? oneLine(body.eventDate, 100) : "",
    message: isBooking ? multiLine(body.message, 1_500) : "",
    submittedAt: new Date().toISOString(),
  };

  if (isBooking && (!lead.name || !lead.format)) return json(422, { error: "invalid_field" });

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const webhook = process.env.LEAD_WEBHOOK_URL?.trim();
  const outcome: Outcome = apiKey
    ? await viaResend(lead, apiKey)
    : webhook
      ? await viaWebhook(lead, webhook)
      : "not_configured";

  if (outcome === "not_configured") return json(503, { error: "not_configured" });
  if (outcome === "failed") return json(502, { error: "upstream_failed" });
  return json(200, { ok: true });
}
