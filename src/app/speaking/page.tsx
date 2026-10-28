import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/icons";
import { mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Speaking",
  description: "Book LaShonda W. Polite to speak at your next corporate event, conference, or community workshop.",
  alternates: { canonical: "/speaking" },
};

// Copy carried over from the live site's Speaking page.
const topics = [
  "The wealth gap no one taught you about",
  "Generational money trauma & healing",
  "Building your first emergency fund",
  "Breaking the paycheck-to-paycheck cycle",
  "Creating legacy on any income",
] as const;

const audiences = ["Corporate", "Conference", "ERG Events", "Virtual"] as const;

const bookLink = mailto("Speaking inquiry");

export default function SpeakingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Keynotes & workshops"
        title={
          <>
            Bring the fire <em>to your stage</em>
          </>
        }
        lead={
          <p>
            Looking for a speaker who transforms rooms, not just fills them? Book Enriched Solutions for your next
            corporate event, conference, or community workshop.
          </p>
        }
        actions={
          <Button href={bookLink} size="lg" arrow>
            Inquire about booking
          </Button>
        }
      />

      <section aria-labelledby="featured-title" className="relative bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid gap-6 lg:grid-cols-2">
          <h2 id="featured-title" className="sr-only">
            Featured talks
          </h2>

          {/* Featured program: EKG keeps its own page and is linked from here. */}
          <Link
            href="/ekg"
            data-reveal
            className="group flex flex-col rounded-3xl border border-gold-500/30 bg-gradient-to-br from-navy-800 to-navy-950 p-8 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold-400/70 md:p-12"
          >
            <span className="eyebrow !text-[0.68rem]">Featured program</span>
            <span className="mt-6 block font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-tight text-ivory">
              EKG: The Heart of Our Money
            </span>
            <span className="mt-4 block text-[1rem] leading-[1.75] text-ivory/75">
              A speaking engagement for conferences, events or as a solo offering.
            </span>
            <span className="mt-auto inline-flex items-center gap-3 pt-8 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-300">
              Explore EKG
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>

          <article
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
            className="flex flex-col rounded-3xl border border-gold-500/20 bg-ivory/[0.025] p-8 md:p-12"
          >
            <p className="eyebrow !text-[0.68rem]">Signature keynote</p>
            <h3 className="mt-6 text-[clamp(2rem,3.6vw,2.8rem)] leading-tight text-ivory">
              She Already Is It: <em className="gold-text font-normal italic">The Money Is Catching Up</em>
            </h3>
            <p className="mt-4 text-[1rem] leading-[1.75] text-ivory/75">
              A 60-minute keynote that rewrites the internal story women have been told about money. Part workshop, part
              testimony, part wake-up call. Audiences don&rsquo;t just applaud, they leave with a plan.
            </p>
            <ul aria-label="Suits" className="mt-6 flex flex-wrap gap-2.5">
              {audiences.map((audience) => (
                <li
                  key={audience}
                  className="rounded-full border border-gold-500/30 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ivory/85"
                >
                  {audience}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Button href={bookLink} variant="outline">
                Inquire about booking
              </Button>
            </div>
          </article>
        </Container>
      </section>

      <section aria-labelledby="topics-title" className="relative bg-navy-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <SectionHeading
            eyebrow="Topics"
            title={
              <span id="topics-title">
                Talks that <em>transform rooms</em>
              </span>
            }
          />
          <ul data-reveal>
            {topics.map((topic) => (
              <li
                key={topic}
                className="border-b border-gold-500/15 py-6 font-display text-[clamp(1.4rem,2.4vw,2rem)] leading-snug text-ivory first:border-t"
              >
                {topic}
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
