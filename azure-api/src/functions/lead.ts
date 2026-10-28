import { app, type HttpRequest, type HttpResponseInit, type InvocationContext } from "@azure/functions";
import { handleLead } from "../lead";

/** POST /api/lead: delivers a form submission through Resend. Needs a function key (x-functions-key header). */
export async function lead(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const raw = await request.text();
  const result = await handleLead(raw, { env: process.env, fetch, log: (message) => context.log(message) });
  return { status: result.status, jsonBody: result.body, headers: { "Cache-Control": "no-store" } };
}

app.http("lead", { methods: ["POST"], authLevel: "function", route: "lead", handler: lead });

/** GET /api/health: anonymous liveness check for deploys. Reveals nothing about configuration. */
app.http("health", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "health",
  handler: async () => ({ status: 200, jsonBody: { ok: true }, headers: { "Cache-Control": "no-store" } }),
});
