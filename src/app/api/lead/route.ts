import { leadSources, type LeadSource } from "@/lib/site";

/**
 * Receives sign-ups from the EKG, ES+ and Golf & Heels forms and forwards them to LEAD_WEBHOOK_URL
 * (Zapier, Make, a Resend/Mailchimp automation, anything that accepts a JSON POST).
 *
 * It never pretends to have saved a lead: with no webhook configured it answers 503, and the form
 * tells the visitor to email instead of showing a false "you're in".
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_BODY_BYTES = 4_096;

type Body = { name?: unknown; email?: unknown; source?: unknown; hp_check_x7?: unknown };

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
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
    body = JSON.parse(raw) as Body;
  } catch {
    return json(400, { error: "invalid_json" });
  }

  // Honeypot: real visitors never see or fill this field. Answer "ok" so bots learn nothing.
  if (typeof body.hp_check_x7 === "string" && body.hp_check_x7.trim() !== "") return json(200, { ok: true });

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const source = body.source;

  if (!EMAIL.test(email) || email.length > 254) return json(422, { error: "invalid_email" });
  if (typeof source !== "string" || !(leadSources as readonly string[]).includes(source)) {
    return json(422, { error: "invalid_source" });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) return json(503, { error: "not_configured" });

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        source: source as LeadSource,
        submittedAt: new Date().toISOString(),
        site: "enrichedsolutions.net",
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return json(502, { error: "upstream_failed" });
  } catch {
    return json(502, { error: "upstream_failed" });
  }

  return json(200, { ok: true });
}
