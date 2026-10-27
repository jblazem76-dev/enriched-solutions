import type { Metadata } from "next";
import { MiniPulse } from "@/components/art/MiniPulse";
import { EkgHero } from "@/components/chapters/EkgHero";
import { BookingForm } from "@/components/forms/BookingForm";
import { NextUp } from "@/components/home/NextUp";
import { Countdown } from "@/components/site/Countdown";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tbc } from "@/components/ui/Tbc";
import { ekg } from "@/lib/site";

const description =
  "EKG: The Heart of Our Money. A speaking engagement from Enriched Solutions, available for conferences, events or as a solo offering. Earn it. Keep it. Grow it. Book EKG.";

export const metadata: Metadata = {
  title: "EKG: The Heart of Our Money",
  description,
  alternates: { canonical: "/ekg" },
  openGraph: { title: "EKG: The Heart of Our Money | Enriched Solutions", description, url: "/ekg" },
};

// DRAFT COPY. The hero sheet gives the three words; these one-line readings of
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

// DRAFT COPY. The three formats are the owner's own words (conferences, events, or a solo offering);
// nothing about length, audience size or rates is stated until it is confirmed.
const formats = [
  { title: "Conferences", body: "Add EKG to your conference program." },
  { title: "Events", body: "Bring EKG to your organization, community or private event." },
  { title: "Solo", body: "EKG as a stand-alone offering." },
] as const;

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as React.CSSProperties;

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
                style={delay(index * 100)}
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

      <section id="formats" aria-labelledby="formats-title" className="relative bg-navy-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Formats"
            title={
              <span id="formats-title">
                Three ways to <em>book EKG</em>
              </span>
            }
            lead="EKG is a speaking engagement from Enriched Solutions. Book it for a conference, for an event, or as a solo offering."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {formats.map((format, index) => (
              <li
                key={format.title}
                data-reveal
                style={delay(index * 100)}
                className="rounded-3xl border border-gold-500/20 bg-navy-950/60 p-8 md:p-10"
              >
                <h3 className="text-[clamp(2rem,3.2vw,2.6rem)] text-ivory">{format.title}</h3>
                <p className="mt-4 text-[1rem] leading-[1.8] text-ivory/75">{format.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-3 text-[0.95rem] text-ivory/70" data-reveal>
            Length, format and rates <Tbc />
          </p>
          <div className="mt-10" data-reveal>
            <Button href="#book" size="lg" arrow>
              Book EKG
            </Button>
          </div>
        </Container>
      </section>

      <section id="next" aria-labelledby="next-title" className="relative bg-navy-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="On the calendar"
              title={
                <span id="next-title">
                  Mark <em>the date</em>
                </span>
              }
              lead={`EKG is booked for ${ekg.label}. Registration runs through a link from the host.`}
            />
            <Countdown className="eyebrow mt-8 !text-[0.72rem]" />
          </div>
          <dl
            className="divide-y divide-gold-500/15 rounded-3xl border border-gold-500/20 bg-navy-900/60 px-8 py-2 md:px-10"
            data-reveal
          >
            <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between">
              <dt className="eyebrow !text-[0.7rem]">Date</dt>
              <dd className="font-display text-2xl text-ivory sm:text-right">
                <time dateTime={`${ekg.year}-${ekg.monthIndex + 1}-${ekg.day}`}>
                  {ekg.weekday}, November 17, 2026 <span className="text-gold-400">({ekg.label})</span>
                </time>
              </dd>
            </div>
            {(["Time", "Where"] as const).map((label) => (
              <div key={label} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
                <dt className="eyebrow !text-[0.7rem]">{label}</dt>
                <dd>
                  <Tbc />
                </dd>
              </div>
            ))}
            <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
              <dt className="eyebrow !text-[0.7rem]">Registration</dt>
              <dd>
                {ekg.registrationUrl ? (
                  <Button href={ekg.registrationUrl} variant="outline" target="_blank" rel="noopener noreferrer">
                    Save my spot<span className="sr-only"> (opens in a new tab)</span>
                  </Button>
                ) : (
                  <Tbc>Link coming soon</Tbc>
                )}
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section id="book" aria-labelledby="book-title" className="relative bg-navy-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
          <SectionHeading
            eyebrow="Book EKG"
            title={
              <span id="book-title">
                Tell us about <em>your event</em>
              </span>
            }
            lead="Tell us what you are planning and we will take it from there."
          />
          <div
            className="rounded-3xl border border-gold-500/25 bg-gradient-to-b from-navy-800/60 to-navy-950/60 p-8 md:p-10"
            data-reveal
            style={delay(120)}
          >
            <BookingForm />
          </div>
        </Container>
      </section>

      <NextUp exclude="ekg" />
    </>
  );
}
