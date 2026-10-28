import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tbc } from "@/components/ui/Tbc";
import { site } from "@/lib/site";

const description =
  "The enRICHed Experience: a 3-day immersive retreat in Atlanta for women ready to transform their relationship with money, and leave with a plan that actually fits their life.";

export const metadata: Metadata = {
  title: "The enRICHed Experience: annual retreat",
  description,
  alternates: { canonical: "/retreat" },
  openGraph: { title: "The enRICHed Experience | Enriched Solutions", description, url: "/retreat" },
};

// Carried over from the live site's Retreat page. The live page listed "Sept 2025" as the next dates; that has
// passed, so the dates are marked to be confirmed instead of repeating a stale date.
const experiences = [
  {
    n: "01",
    name: "Deep-dive workshops",
    desc: "Three full days of hands-on financial education: budgeting, investing, and wealth-building strategy.",
  },
  {
    n: "02",
    name: "Healing circles",
    desc: "Facilitated sessions to name and release the money shame and trauma that holds us back from abundance.",
  },
  {
    n: "03",
    name: "Legacy planning",
    desc: "One-on-one time with certified financial planners to map your actual next 90 days, and beyond.",
  },
  {
    n: "04",
    name: "Sisterhood & celebration",
    desc: "Networking, connection, and a closing ceremony that honors every woman in the room.",
  },
] as const;

export default function RetreatPage() {
  return (
    <>
      <section aria-labelledby="retreat-title" className="relative isolate overflow-hidden bg-navy-900 pb-24 pt-40">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(212_174_92/0.12),transparent_70%),linear-gradient(180deg,#0b1626,#070f1b)]"
        />
        <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Annual retreat"
              title={
                <span id="retreat-title">
                  The enRICHed <em>Experience</em>
                </span>
              }
              lead="A 3-day immersive retreat for women ready to transform their relationship with money, and leave with a plan that actually fits their life."
            />
            <div className="mt-10 flex flex-col items-start gap-4" data-reveal>
              <Button href={`mailto:${site.email}?subject=Retreat%20updates`} size="lg" arrow>
                Get retreat updates
              </Button>
              <p className="text-[0.9rem] italic text-ivory/65">Limited to 40 women. Payment plans available.</p>
            </div>
          </div>

          <dl
            className="divide-y divide-gold-500/15 rounded-3xl border border-gold-500/20 bg-navy-950/60 px-8 py-2 md:px-10"
            data-reveal
          >
            {[
              { label: "Location", value: "Atlanta, GA" },
              { label: "Duration", value: "3 days" },
              { label: "Investment", value: "From $1,497" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="eyebrow !text-[0.7rem]">{item.label}</dt>
                <dd className="font-display text-2xl text-ivory sm:text-right">{item.value}</dd>
              </div>
            ))}
            <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
              <dt className="eyebrow !text-[0.7rem]">Next dates</dt>
              <dd>
                <Tbc />
              </dd>
            </div>
          </dl>
        </Container>
      </section>

      <section aria-labelledby="experience-title" className="relative bg-navy-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="What you will do"
            title={
              <span id="experience-title">
                Four parts of <em>the experience</em>
              </span>
            }
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {experiences.map((item, index) => (
              <li
                key={item.n}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-gold-500/20 bg-gradient-to-b from-navy-800/70 to-navy-900/40 p-8 md:p-10"
              >
                <span className="eyebrow !text-[0.7rem]">{item.n}</span>
                <h3 className="mt-6 text-[clamp(1.8rem,2.8vw,2.3rem)] text-ivory">{item.name}</h3>
                <p className="mt-4 text-[1rem] leading-[1.8] text-ivory/75">{item.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
