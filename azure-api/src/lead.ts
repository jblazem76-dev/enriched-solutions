/**
 * Lead delivery for every Enriched Solutions project: validates a form submission and delivers it through Resend.
 * Kept free of any Azure types so it can be tested without a Functions host (see src/functions/lead.ts for the wrapper).
 *
 * Conventions callers rely on:
 *   - `source` names the form, lower-case with dashes, e.g. "ekg-booking", "es-plus".
 *   - A source ending in "-booking" is an *inquiry* (someone asking to hire or book): it is emailed to the team and
 *     NEVER added to a marketing list. Every other source is a *sign-up*: emailed AND saved to RESEND_SEGMENT_ID.
 *   - `site` says which project it came from, e.g. "enrichedsolutions.net". It is shown in the email.
 */

export type Env = Record<string, string | undefined>;

export type Deps = {
  env: Env;
  fetch: typeof fetch;
  now?: () => Date;
  /** Receives only a status and Resend's error name. Never lead data. */
  log?: (message: string) => void;
};

export type Result = { status: number; body: Record<string, unknown> };

export const MAX_BODY_CHARS = 8_192;
const RESEND_API = "https://api.resend.com";
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCE = /^[a-z0-9][a-z0-9-]{0,39}$/;

type Lead = {
  source: string;
  site: string;
  name: string;
  email: string;
  organization: string;
  format: string;
  eventDate: string;
  message: string;
  submittedAt: string;
};

// Friendly names for known forms. Anything else falls back to its source name, so a new project works without a code change.
const sourceNames: Record<string, string> = {
  "ekg-booking": "EKG booking request",
  "es-plus": "ES+ waitlist",
  "golf-and-heels": "Golf & Heels interest list",
  newsletter: "Newsletter",
};

const formatNames: Record<string, string> = {
  conference: "A conference",
  event: "An event",
  solo: "A solo engagement",
  "not-sure": "Not sure yet",
};

const isInquiry = (source: string) => source.endsWith("-booking");

function reply(status: number, body: Record<string, unknown>): Result {
  return { status, body };
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
  const label = sourceNames[lead.source] ?? lead.source;
  if (isInquiry(lead.source)) {
    const who = lead.organization ? `${lead.name} (${lead.organization})` : lead.name;
    return {
      subject: `${label}: ${who}`,
      text: [
        `New ${label.toLowerCase()}`,
        "",
        `Name: ${lead.name}`,
        `Email: ${lead.email}`,
        `Organization: ${lead.organization || "-"}`,
        `Planning: ${lead.format ? (formatNames[lead.format] ?? lead.format) : "-"}`,
        `Date or timeframe: ${lead.eventDate || "-"}`,
        "",
        "Message:",
        lead.message || "-",
        "",
        `Submitted ${lead.submittedAt} via ${lead.site}. Reply to this email to answer ${lead.name}.`,
      ].join("\n"),
    };
  }
  return {
    subject: `New sign-up (${label}): ${lead.email}`,
    text: [
      `New sign-up: ${label}`,
      "",
      `Name: ${lead.name || "-"}`,
      `Email: ${lead.email}`,
      "",
      `Submitted ${lead.submittedAt} via ${lead.site}.`,
    ].join("\n"),
  };
}

/** One Resend call. Returns whether it worked; logs only the status and Resend's error name. */
async function resend(path: string, apiKey: string, payload: Record<string, unknown>, deps: Deps): Promise<boolean> {
  try {
    const response = await deps.fetch(`${RESEND_API}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
    if (response.ok) return true;
    const detail = (await response.json().catch(() => ({}))) as { name?: string };
    deps.log?.(`[lead] Resend ${path} failed: ${response.status} ${detail.name ?? ""}`.trim());
  } catch {
    deps.log?.(`[lead] Resend ${path} could not be reached`);
  }
  return false;
}

export async function handleLead(raw: string, deps: Deps): Promise<Result> {
  if (raw.length > MAX_BODY_CHARS) return reply(413, { error: "too_large" });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      return reply(400, { error: "invalid_json" });
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return reply(400, { error: "invalid_json" });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) return reply(422, { error: "invalid_email" });

  const source = typeof body.source === "string" ? body.source : "";
  if (!SOURCE.test(source)) return reply(422, { error: "invalid_source" });

  const inquiry = isInquiry(source);
  const lead: Lead = {
    source,
    site: oneLine(body.site, 60) || "unknown site",
    name: oneLine(body.name, 100),
    email,
    organization: inquiry ? oneLine(body.organization, 150) : "",
    format: inquiry ? oneLine(body.format, 40) : "",
    eventDate: inquiry ? oneLine(body.eventDate, 100) : "",
    message: inquiry ? multiLine(body.message, 1_500) : "",
    submittedAt: (deps.now?.() ?? new Date()).toISOString(),
  };
  if (inquiry && !lead.name) return reply(422, { error: "invalid_field" });

  const apiKey = deps.env.RESEND_API_KEY?.trim();
  const notify = deps.env.LEAD_NOTIFY_EMAIL?.trim();
  const segmentId = deps.env.RESEND_SEGMENT_ID?.trim();
  if (!apiKey) return reply(503, { error: "not_configured" });
  // Until a domain is verified in Resend, only its test sender works, and only to the account owner's address.
  const from = deps.env.LEAD_FROM_EMAIL?.trim() || "Enriched Solutions <onboarding@resend.dev>";

  const jobs: Promise<boolean>[] = [];
  if (notify) {
    const { subject, text } = describe(lead);
    jobs.push(resend("/emails", apiKey, { from, to: [notify], reply_to: lead.email, subject, text }, deps));
  }
  if (segmentId && !inquiry) {
    const firstName = lead.name.split(" ")[0];
    jobs.push(
      resend(
        "/contacts",
        apiKey,
        { email: lead.email, ...(firstName ? { first_name: firstName } : {}), segments: [{ id: segmentId }] },
        deps,
      ),
    );
  }
  if (jobs.length === 0) return reply(503, { error: "not_configured" });

  // The lead is safe if either the notification or the contact went through.
  const results = await Promise.all(jobs);
  return results.some(Boolean) ? reply(200, { ok: true }) : reply(502, { error: "upstream_failed" });
}
