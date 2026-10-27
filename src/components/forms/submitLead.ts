import type { LeadSource } from "@/lib/site";

export type FormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; mailto?: boolean };

/**
 * Posts a form to /api/lead and turns every outcome into something honest to show.
 * `notConfigured` is what to say while the server has no email/webhook set up: it must never read as success.
 */
export async function submitLead(
  payload: Record<string, string> & { source: LeadSource },
  notConfigured: string,
): Promise<Exclude<FormStatus, { kind: "idle" | "submitting" }>> {
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) return { kind: "success" };

    if (response.status === 422) {
      const { error } = (await response.json().catch(() => ({}))) as { error?: string };
      return {
        kind: "error",
        message:
          error === "invalid_email"
            ? "Please enter a valid email address."
            : "Please check the form. A required field is missing or too long.",
      };
    }
    if (response.status === 503) return { kind: "error", message: notConfigured, mailto: true };
    return {
      kind: "error",
      message: "Something went wrong on our side. Please try again, or email us.",
      mailto: true,
    };
  } catch {
    return {
      kind: "error",
      message: "We couldn't reach the server. Check your connection and try again, or email us.",
      mailto: true,
    };
  }
}
