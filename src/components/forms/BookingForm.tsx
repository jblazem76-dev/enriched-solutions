"use client";

import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { ekgFormats, site, type EkgFormat } from "@/lib/site";
import { inputClass, labelClass } from "./fieldStyles";
import { submitLead, type FormStatus } from "./submitLead";

const formatLabels: Record<EkgFormat, string> = {
  conference: "A conference",
  event: "An event",
  solo: "A solo engagement",
  "not-sure": "Not sure yet",
};

/** The EKG booking inquiry. Goes to /api/lead as source "ekg-booking" and lands in the team's inbox. */
export function BookingForm({ className }: { className?: string }) {
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
          organization: String(form.get("organization") ?? ""),
          format: String(form.get("format") ?? ""),
          eventDate: String(form.get("eventDate") ?? ""),
          message: String(form.get("message") ?? ""),
          hp_check_x7: String(form.get("hp_check_x7") ?? ""),
          source: "ekg-booking",
        },
        "Booking requests aren't switched on yet, so we couldn't send yours. Please email us and we'll take it from there.",
      ),
    );
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className={cn("rounded-3xl border border-gold-500/40 bg-gold-500/[0.07] px-8 py-8 text-center", className)}
      >
        <p className="font-display text-3xl text-gold-200">Request received.</p>
        <p className="mt-3 text-ivory/80">Thank you. We have your EKG booking request and will be in touch by email.</p>
      </div>
    );
  }

  const submitting = status.kind === "submitting";
  const errorId = `${uid}-error`;

  return (
    <form onSubmit={onSubmit} className={cn("relative w-full", className)} aria-describedby={errorId}>
      <div className="grid gap-5 md:grid-cols-2">
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
        <div>
          <label htmlFor={`${uid}-organization`} className={labelClass}>
            Organization <span className="normal-case tracking-normal text-ivory/55">(optional)</span>
          </label>
          <input
            id={`${uid}-organization`}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={150}
            className={inputClass}
            placeholder="Company or event name"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-date`} className={labelClass}>
            Date or timeframe <span className="normal-case tracking-normal text-ivory/55">(optional)</span>
          </label>
          <input
            id={`${uid}-date`}
            name="eventDate"
            type="text"
            autoComplete="off"
            maxLength={100}
            className={inputClass}
            placeholder="e.g. Spring 2027"
          />
        </div>
      </div>

      <fieldset className="mt-7">
        <legend className={labelClass}>What are you planning?</legend>
        <div className="flex flex-wrap gap-3">
          {ekgFormats.map((value, index) => (
            <label key={value} className="cursor-pointer">
              <input
                type="radio"
                name="format"
                value={value}
                required={index === 0}
                className="peer sr-only"
              />
              <span className="inline-flex min-h-12 items-center rounded-full border border-gold-500/35 bg-ivory/[0.04] px-6 text-[0.95rem] text-ivory/85 transition-colors hover:border-gold-300 peer-checked:border-gold-300 peer-checked:bg-gold-500/20 peer-checked:text-ivory peer-focus-visible:ring-2 peer-focus-visible:ring-gold-300/70">
                {formatLabels[value]}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-7">
        <label htmlFor={`${uid}-message`} className={labelClass}>
          Anything we should know <span className="normal-case tracking-normal text-ivory/55">(optional)</span>
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={5}
          maxLength={1500}
          className={`${inputClass.replace("rounded-full", "rounded-3xl")} py-4`}
          placeholder="Audience, location, anything that helps."
        />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it. Meaningless name on purpose (see SignupForm). */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Leave this field empty
          <input name="hp_check_x7" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-7 flex flex-col items-start gap-4">
        <Button type="submit" size="lg" disabled={submitting} className="disabled:cursor-wait disabled:opacity-70">
          {submitting ? "Sending…" : "Send booking request"}
        </Button>
        <p className="text-[0.8rem] text-ivory/60">Your details are used only to reply to this request.</p>
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
