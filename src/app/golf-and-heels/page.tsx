import type { Metadata } from "next";
import { GolfHero } from "@/components/chapters/GolfHero";
import { SignupForm } from "@/components/forms/SignupForm";
import { NextUp } from "@/components/home/NextUp";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tbc } from "@/components/ui/Tbc";

const description =
  "Golf & Heels, presented by Enriched Solutions. Where the fairway meets the red carpet. A half-day indoor golf experience for legacy-minded women, Spring 2027.";

export const metadata: Metadata = {
  title: "Golf & Heels | Spring 2027",
  description,
  alternates: { canonical: "/golf-and-heels" },
  openGraph: { title: "Golf & Heels | Enriched Solutions", description, url: "/golf-and-heels" },
};

// Copy adapted from the live site's "Women's Growth Day: Indoor Golf Retreat" section.
// ASSUMPTION to confirm: Golf & Heels is the new name for that event.
const agenda = [
  {
    n: "01",
    title: "Welcome & intentions",
    body: "Set the tone for the day. We open with a guided reflection on your biggest growth goal (personal, financial, or professional) and what it would mean to finally clear the path.",
  },
  {
    n: "02",
    title: "Golf clinic & play",
    body: "No experience needed. A pro instructor walks you through the basics, then you play. The real lesson isn't the swing. It's what focus, patience, and precision on the course mirrors back about your business.",
  },
  {
    n: "03",
    title: "Strategy lounge",
    body: "Between rounds, facilitated small-group conversations on topics women rarely get a real room to discuss: pricing your worth, building the right network, navigating the next leap.",
  },
  {
    n: "04",
    title: "Vision & close",
    body: "The day ends with a concrete commitment: one action, one decision, one conversation you'll have within 30 days. You leave with more than a great afternoon. You leave with momentum.",
  },
] as const;

const audience = [
  "Entrepreneurs ready to think bigger",
  "Career professionals navigating a pivot or promotion",
  "Women building their first or next business",
  "Anyone who learns best through experience, not another Zoom",
] as const;

const details: Array<[string, string | null]> = [
  ["Format", "Half-day experience"],
  ["Setting", "Indoor golf venue"],
  ["Group size", "Limited seating"],
  ["Experience needed", "None. Beginners welcome."],
  ["When", "Spring 2027"],
  ["Exact date and venue", null],
];

export default function GolfAndHeelsPage() {
  return (
    <>
      <GolfHero variant="page" />

      <section id="about" aria-labelledby="about-title" className="relative bg-fairway-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="A half-day experience"
              title={
                <span id="about-title">
                  Trade the boardroom for <em>the putting green</em>
                </span>
              }
              lead="Where legacy-minded women step out of the office and leave with a plan that changes everything."
            />
            <div className="mt-8 max-w-2xl space-y-5 text-[1.02rem] leading-[1.85] text-ivory/75" data-reveal>
              <p>
                Golf &amp; Heels is a half-day immersive experience combining indoor golf, peer strategy sessions, and
                intentional community, designed for entrepreneurs and career professionals who are serious about their
                next level.
              </p>
              <p>
                No golf experience required. No corporate agendas. Just a curated group of women, a shared goal, and the
                kind of honest conversation that only happens when the setting breaks the rules.
              </p>
            </div>
          </div>

          <figure
            className="self-center rounded-3xl border border-gold-500/25 bg-gradient-to-b from-fairway-700/60 to-fairway-800/40 p-9 md:p-12"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <blockquote className="font-display text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.35] text-ivory">
              &ldquo;The game of golf has always been a place where deals are made, relationships are built, and the next
              level is decided. We&rsquo;re building a room where women belong at that table.&rdquo;
            </blockquote>
            <figcaption className="eyebrow mt-8 !text-[0.7rem]">LaShonda W. Polite</figcaption>
          </figure>
        </Container>
      </section>

      <section id="agenda" aria-labelledby="agenda-title" className="relative bg-fairway-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="The day"
            title={
              <span id="agenda-title">
                The day&rsquo;s <em>agenda</em>
              </span>
            }
          />
          <ol className="mt-14 border-t border-gold-500/20">
            {agenda.map((step, index) => (
              <li
                key={step.n}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="grid gap-4 border-b border-gold-500/20 py-9 md:grid-cols-[6rem_1fr_1.4fr] md:items-baseline md:gap-10 md:py-11"
              >
                <span className="font-display text-[2.4rem] leading-none text-gold-400">{step.n}</span>
                <h3 className="text-[clamp(1.7rem,2.6vw,2.4rem)] text-ivory">{step.title}</h3>
                <p className="text-[1rem] leading-[1.85] text-ivory/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="who-title" className="relative bg-fairway-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Who it's for"
              title={
                <span id="who-title">
                  Made for women <em>ready for more</em>
                </span>
              }
            />
            <ul className="mt-10 space-y-5">
              {audience.map((line, index) => (
                <li
                  key={line}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                  className="flex gap-4 text-[1.05rem] leading-relaxed text-ivory/85"
                >
                  <span aria-hidden="true" className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rotate-45 bg-gold-400" />
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
            <h2 className="eyebrow mb-6 !font-sans">Event details</h2>
            <dl className="divide-y divide-gold-500/15 rounded-3xl border border-gold-500/20 bg-fairway-900/60 px-8 py-2 md:px-10">
              {details.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="eyebrow !text-[0.68rem]">{label}</dt>
                  <dd className="text-[1.02rem] text-ivory sm:text-right">{value ?? <Tbc />}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <section id="interest" aria-labelledby="interest-title" className="relative bg-fairway-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
          <SectionHeading
            eyebrow="Be first to know"
            title={
              <span id="interest-title">
                Reserve your spot <em>before doors open</em>
              </span>
            }
            lead="Seats will be limited and filling from the interest list first. Get your name in now and be notified the moment registration opens."
          />
          <div
            className="rounded-3xl border border-gold-500/25 bg-gradient-to-b from-fairway-700/50 to-fairway-800/50 p-8 md:p-10"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <SignupForm
              source="golf-and-heels"
              buttonLabel="Join the interest list"
              successTitle="You're on the interest list."
              successBody="We'll email you the moment registration opens for Golf & Heels."
            />
          </div>
        </Container>
      </section>

      <NextUp exclude="golf-and-heels" />
    </>
  );
}
