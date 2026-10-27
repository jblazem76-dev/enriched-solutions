import type { Metadata } from "next";
import { MiniPulse } from "@/components/art/MiniPulse";
import { EkgHero } from "@/components/chapters/EkgHero";
import { SignupForm } from "@/components/forms/SignupForm";
import { NextUp } from "@/components/home/NextUp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tbc } from "@/components/ui/Tbc";
import { ekg } from "@/lib/site";

const description =
  "EKG: The Heart of Our Money. Earn it. Keep it. Grow it. 11.17.26. How healthy is your money? Save your spot.";

export const metadata: Metadata = {
  title: "EKG: The Heart of Our Money",
  description,
  alternates: { canonical: "/ekg" },
  openGraph: { title: "EKG: The Heart of Our Money | Enriched Solutions", description, url: "/ekg" },
};

// DRAFT COPY. The hero sheet gives the three words and the date; these one-line readings of
// each word are placeholders until the approved EKG messaging arrives.
const pillars = [
  {
    n: "01",
    title: "Earn it",
    variant: "earn",
    body: "Income is the first vital sign. Know what is coming in, and where it can grow.",
  },
  {
    n: "02",
    title: "Keep it",
    variant: "keep",
    body: "What you hold onto matters as much as what you make. Protect it.",
  },
  {
    n: "03",
    title: "Grow it",
    variant: "grow",
    body: "Make it work for you, so what you build can outlast a paycheck.",
  },
] as const;

export default function EkgPage() {
  return (
    <>
      <EkgHero variant="page" />

      <section id="pillars" aria-labelledby="pillars-title" className="relative bg-navy-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Three vital signs"
            title={
              <span id="pillars-title">
                Earn it. Keep it. <em>Grow it.</em>
              </span>
            }
            lead="A healthy relationship with money has a pulse. These are the three places we check it."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, index) => (
              <li
                key={pillar.n}
                data-reveal
                style={{ "--reveal-delay": `${index * 100}ms` } as React.CSSProperties}
                className="rounded-3xl border border-gold-500/20 bg-gradient-to-b from-navy-800/70 to-navy-900/40 p-8 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow !text-[0.7rem]">{pillar.n}</span>
                  <MiniPulse variant={pillar.variant} className="h-10 w-28 text-gold-400" />
                </div>
                <h3 className="mt-10 text-[clamp(2.2rem,3.6vw,3rem)] text-ivory">{pillar.title}</h3>
                <p className="mt-4 text-[1rem] leading-[1.8] text-ivory/75">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="details" aria-labelledby="details-title" className="relative bg-navy-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <SectionHeading
            eyebrow="The details"
            title={
              <span id="details-title">
                Mark <em>the date</em>
              </span>
            }
            lead="The date is set. Everything else we will confirm by email, to everyone who saves a spot."
          />
          <dl
            className="divide-y divide-gold-500/15 rounded-3xl border border-gold-500/20 bg-navy-950/60 px-8 py-2 md:px-10"
            data-reveal
          >
            <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="eyebrow !text-[0.7rem]">Date</dt>
              <dd className="font-display text-2xl text-ivory sm:text-right">
                {ekg.weekday}, November 17, 2026 <span className="text-gold-400">({ekg.label})</span>
              </dd>
            </div>
            {(["Time", "Where", "Format", "Tickets"] as const).map((label) => (
              <div key={label} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                <dt className="eyebrow !text-[0.7rem]">{label}</dt>
                <dd>
                  <Tbc />
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section id="register" aria-labelledby="register-title" className="relative bg-navy-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Save your spot"
            title={
              <span id="register-title">
                How healthy is your <em>money?</em>
              </span>
            }
            lead="11.17.26. Add your details and we will send the time, place and how to join as soon as they are confirmed."
          />
          <div
            className="rounded-3xl border border-gold-500/25 bg-gradient-to-b from-navy-800/60 to-navy-900/60 p-8 md:p-10"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <SignupForm
              source="ekg"
              buttonLabel="Save my spot"
              successTitle="Your spot is saved."
              successBody="We'll email you the details for EKG as soon as they're confirmed."
            />
          </div>
        </Container>
      </section>

      <NextUp exclude="ekg" />
    </>
  );
}
