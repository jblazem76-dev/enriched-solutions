import { describe, expect, it } from "vitest";
import { handleLead, type Env } from "../src/lead";

type Call = { url: string; auth: string | null; body: Record<string, unknown> };

/** A stand-in for Resend that records what it is sent. `fail` lists the paths that should answer 500. */
function setup(env: Env, fail: string[] = []) {
  const calls: Call[] = [];
  const logs: string[] = [];
  const fakeFetch = (async (url: string, init: RequestInit) => {
    const path = new URL(url).pathname;
    calls.push({
      url: path,
      auth: new Headers(init.headers).get("authorization"),
      body: JSON.parse(String(init.body)) as Record<string, unknown>,
    });
    return fail.includes(path)
      ? new Response(JSON.stringify({ name: "mock_failure" }), { status: 500 })
      : new Response(JSON.stringify({ id: "mock" }), { status: 200 });
  }) as unknown as typeof fetch;
  const run = (payload: unknown) =>
    handleLead(typeof payload === "string" ? payload : JSON.stringify(payload), {
      env,
      fetch: fakeFetch,
      now: () => new Date("2026-10-27T12:00:00.000Z"),
      log: (message) => logs.push(message),
    });
  return { run, calls, logs };
}

const configured: Env = { RESEND_API_KEY: "re_test", LEAD_NOTIFY_EMAIL: "team@example.com", RESEND_SEGMENT_ID: "seg_1" };

// Exactly what the website's /api/lead forwards for an EKG booking (see src/app/api/lead/route.ts, viaWebhook).
const siteBooking = {
  source: "ekg-booking",
  name: "Ada Lovelace",
  email: "ada@example.com",
  organization: "Acme Conf",
  format: "conference",
  eventDate: "Spring 2027",
  message: "Line one\nLine two",
  submittedAt: "2026-10-27T22:46:30.299Z",
  site: "enrichedsolutions.net",
};
const siteSignup = { source: "es-plus", name: "Ada Lovelace", email: "ada@example.com", organization: "", format: "", eventDate: "", message: "", submittedAt: "2026-10-27T22:46:30.299Z", site: "enrichedsolutions.net" };

describe("configuration", () => {
  it("answers 503, never a fake success, with no Resend key", async () => {
    const { run, calls } = setup({});
    expect((await run(siteBooking)).status).toBe(503);
    expect(calls).toHaveLength(0);
  });
  it("answers 503 with a key but nowhere to send", async () => {
    const { run } = setup({ RESEND_API_KEY: "re_test" });
    expect((await run(siteBooking)).status).toBe(503);
    expect((await run(siteSignup)).status).toBe(503);
  });
});

describe("inquiries (sources ending in -booking)", () => {
  it("emails the team once and never touches the marketing segment", async () => {
    const { run, calls } = setup(configured);
    const result = await run(siteBooking);
    expect(result).toEqual({ status: 200, body: { ok: true } });
    expect(calls.map((c) => c.url)).toEqual(["/emails"]);
    const mail = calls[0].body as { from: string; to: string[]; reply_to: string; subject: string; text: string; html?: string };
    expect(calls[0].auth).toBe("Bearer re_test");
    expect(mail.to).toEqual(["team@example.com"]);
    expect(mail.from).toContain("onboarding@resend.dev");
    expect(mail.reply_to).toBe("ada@example.com");
    expect(mail.subject).toBe("EKG booking request: Ada Lovelace (Acme Conf)");
    for (const line of ["Ada Lovelace", "Acme Conf", "A conference", "Spring 2027", "Line one\nLine two", "enrichedsolutions.net", "2026-10-27T12:00:00.000Z"]) {
      expect(mail.text).toContain(line);
    }
    expect(mail.html).toBeUndefined();
  });
  it("uses LEAD_FROM_EMAIL when set", async () => {
    const { run, calls } = setup({ ...configured, LEAD_FROM_EMAIL: "Enriched Solutions <hello@enrichedsolutions.net>" });
    await run(siteBooking);
    expect((calls[0].body as { from: string }).from).toBe("Enriched Solutions <hello@enrichedsolutions.net>");
  });
  it("requires a name", async () => {
    const { run, calls } = setup(configured);
    expect(await run({ ...siteBooking, name: "  " })).toEqual({ status: 422, body: { error: "invalid_field" } });
    expect(calls).toHaveLength(0);
  });
  it("works for another project's booking form with no code change", async () => {
    const { run, calls } = setup(configured);
    const result = await run({ source: "golf-heels-booking", name: "Sam", email: "sam@example.com", site: "golfandheels.example", format: "something-new" });
    expect(result.status).toBe(200);
    const mail = calls[0].body as { subject: string; text: string };
    expect(mail.subject).toBe("golf-heels-booking: Sam");
    expect(mail.text).toContain("golfandheels.example");
    expect(mail.text).toContain("Planning: something-new");
  });
});

describe("sign-ups (every other source)", () => {
  it("emails the team and saves the contact to the segment", async () => {
    const { run, calls } = setup(configured);
    expect((await run(siteSignup)).status).toBe(200);
    expect(calls.map((c) => c.url).sort()).toEqual(["/contacts", "/emails"]);
    expect(calls.find((c) => c.url === "/contacts")?.body).toEqual({ email: "ada@example.com", first_name: "Ada", segments: [{ id: "seg_1" }] });
    expect((calls.find((c) => c.url === "/emails")?.body as { subject: string }).subject).toBe("New sign-up (ES+ waitlist): ada@example.com");
  });
  it("leaves first_name out when there is no name", async () => {
    const { run, calls } = setup(configured);
    await run({ source: "newsletter", email: "nobody@example.com" });
    expect(calls.find((c) => c.url === "/contacts")?.body).not.toHaveProperty("first_name");
  });
  it("ignores inquiry-only fields on a sign-up", async () => {
    const { run, calls } = setup(configured);
    await run({ ...siteSignup, message: "should not appear", organization: "nor this" });
    const text = (calls.find((c) => c.url === "/emails")?.body as { text: string }).text;
    expect(text).not.toContain("should not appear");
    expect(text).not.toContain("nor this");
  });
  it("lowercases the address", async () => {
    const { run, calls } = setup(configured);
    await run({ ...siteSignup, email: "  Ada@Example.COM " });
    expect(calls.find((c) => c.url === "/contacts")?.body).toMatchObject({ email: "ada@example.com" });
  });
});

describe("validation", () => {
  const cases: [string, unknown, number, string][] = [
    ["malformed JSON", "{not json", 400, "invalid_json"],
    ["a JSON array", "[1,2,3]", 400, "invalid_json"],
    ["a JSON string", '"hello"', 400, "invalid_json"],
    ["no email", { source: "es-plus" }, 422, "invalid_email"],
    ["bad email", { source: "es-plus", email: "nope" }, 422, "invalid_email"],
    ["email without a TLD", { source: "es-plus", email: "a@b" }, 422, "invalid_email"],
    ["no source", { email: "a@example.com" }, 422, "invalid_source"],
    ["upper-case source", { source: "ES-Plus", email: "a@example.com" }, 422, "invalid_source"],
    ["source with spaces", { source: "es plus", email: "a@example.com" }, 422, "invalid_source"],
    ["over-long source", { source: "a".repeat(41), email: "a@example.com" }, 422, "invalid_source"],
  ];
  for (const [name, payload, status, error] of cases) {
    it(`rejects ${name}`, async () => {
      const { run, calls } = setup(configured);
      expect(await run(payload)).toEqual({ status, body: { error } });
      expect(calls).toHaveLength(0);
    });
  }
  it("rejects a body over 8 KB with 413", async () => {
    const { run, calls } = setup(configured);
    expect((await run({ ...siteBooking, message: "x".repeat(9_000) })).status).toBe(413);
    expect(calls).toHaveLength(0);
  });
});

describe("what ends up in the email", () => {
  it("keeps the subject on one line and strips control characters", async () => {
    const { run, calls } = setup(configured);
    await run({ ...siteBooking, name: "Eve\r\nBcc: attacker@example.com", organization: "Org\nSubject: hacked" });
    expect((calls[0].body as { subject: string }).subject).not.toMatch(/[\r\n]/);
  });
  it("truncates the message to 1500 characters and keeps its line breaks", async () => {
    const { run, calls } = setup(configured);
    await run({ ...siteBooking, message: `first\nsecond ${"m".repeat(1_700)}` });
    const text = (calls[0].body as { text: string }).text;
    expect(text).toContain("first\nsecond ");
    expect(text).toContain("m".repeat(1_480));
    expect(text).not.toContain("m".repeat(1_500));
  });
  it("labels an unknown site rather than failing", async () => {
    const { run, calls } = setup(configured);
    await run({ source: "es-plus", email: "a@example.com" });
    expect((calls[0].body as { text: string }).text).toContain("via unknown site");
  });
});

describe("when Resend fails", () => {
  it("still succeeds if only the contact save fails (the email has the lead)", async () => {
    const { run } = setup(configured, ["/contacts"]);
    expect((await run(siteSignup)).status).toBe(200);
  });
  it("still succeeds if only the email fails (the contact has the lead)", async () => {
    const { run } = setup(configured, ["/emails"]);
    expect((await run(siteSignup)).status).toBe(200);
  });
  it("answers 502 for a booking whose email fails: it has no other record", async () => {
    const { run } = setup(configured, ["/emails"]);
    expect(await run(siteBooking)).toEqual({ status: 502, body: { error: "upstream_failed" } });
  });
  it("answers 502 when everything fails", async () => {
    const { run } = setup(configured, ["/emails", "/contacts"]);
    expect((await run(siteSignup)).status).toBe(502);
  });
  it("answers 502 when Resend cannot be reached", async () => {
    const logs: string[] = [];
    const result = await handleLead(JSON.stringify(siteBooking), {
      env: configured,
      fetch: (async () => {
        throw new Error("network down");
      }) as unknown as typeof fetch,
      log: (message) => logs.push(message),
    });
    expect(result.status).toBe(502);
    expect(logs).toEqual(["[lead] Resend /emails could not be reached"]);
  });
  it("logs the status and error name but never lead data", async () => {
    const { run, logs } = setup(configured, ["/emails"]);
    await run({ ...siteBooking, name: "Zed Unique", email: "zed.unique@example.com" });
    expect(logs).toEqual(["[lead] Resend /emails failed: 500 mock_failure"]);
    expect(logs.join("")).not.toMatch(/zed|unique|example\.com/i);
  });
});
