"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { site, type LeadSource } from "@/lib/site";
import { inputClass, labelClass } from "./fieldStyles";
import { submitLead, type FormStatus } from "./submitLead";

type Props = {
  source: LeadSource;
  buttonLabel: string;
  successTitle?: string;
  successBody?: string;
  /** Ask for a name as well as an email. */
  askName?: boolean;
  className?: string;
};

export function SignupForm({
  source,
  buttonLabel,
  successTitle = "You're on the list.",
  successBody = "We'll email you as soon as there's news.",
  askName = true,
  className,
}: Props) {
  const uid = useId();
  const [status, setStatus] = useState<FormStatus>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "submitting") return;
    const form = new FormData(event.currentTarget);
    setStatus({ kind: "submitting" });
    setStatus(
      await submitLead(
        {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          hp_check_x7: String(form.get("hp_check_x7") ?? ""),
          source,
        },
        "Sign-ups aren't switched on yet, so we couldn't save your details. Please email us and we'll add you.",
      ),
    );
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className={cn("rounded-3xl border border-gold-500/40 bg-gold-500/[0.07] px-8 py-8 text-center", className)}
      >
        <p className="font-display text-3xl text-gold-200">{successTitle}</p>
        <p className="mt-3 text-ivory/80">{successBody}</p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorId = `${uid}-error`;

  return (
    <form onSubmit={onSubmit} className={cn("relative w-full", className)} aria-describedby={errorId}>
      <div className={cn("grid gap-5", askName ? "md:grid-cols-2" : "")}>
        {askName && (
          <div>
            <label htmlFor={`${uid}-name`} className={labelClass}>
              Name
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={100}
              required
              className={inputClass}
              placeholder="Your name"
            />
          </div>
        )}
        <div>
          <label htmlFor={`${uid}-email`} className={labelClass}>
            Email
          </label>
          <input
            id={`${uid}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/*
        Honeypot: hidden from people and assistive tech; bots fill it. The name is deliberately meaningless
        ("website", "url" or "company" would be autofilled by real browsers and get genuine sign-ups discarded).
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="hp_check_x7" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7 flex flex-col items-start gap-4">
        <Button type="submit" size="lg" disabled={submitting} className="disabled:cursor-wait disabled:opacity-70">
          {submitting ? "Sending…" : buttonLabel}
        </Button>
        <p className="text-[0.8rem] text-ivory/60">No spam. Unsubscribe anytime.</p>
      </div>

      <div id={errorId} aria-live="polite" className="mt-4 min-h-6">
        {status.kind === "error" && (
          <p className="text-[0.95rem] text-[#ffb4a8]">
            {status.message}
            {status.mailto && (
              <>
                {" "}
                <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-gold-200">
                  {site.email}
                </a>
              </>
            )}
          </p>
        )}
      </div>
    </form>
  );
}
