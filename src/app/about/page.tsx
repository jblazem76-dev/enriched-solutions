import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "LaShonda W. Polite, Founder and CEO of Enriched Solutions: MBA, former Chief of Staff, VP of Finance, and Chief Operations Officer.",
  alternates: { canonical: "/about" },
};

type Entry = { title: string; place?: string };

// Copy carried over from the live site's About page.
const groups: { heading: string; entries: Entry[] }[] = [
  {
    heading: "Education",
    entries: [
      { title: "BS & MBA", place: "Florida A&M University" },
      { title: "Executive Training", place: "Dartmouth College" },
    ],
  },
  {
    heading: "Executive roles",
    entries: [{ title: "Chief of Staff" }, { title: "Vice President, Finance" }, { title: "Chief Operations Officer" }],
  },
  {
    heading: "Community",
    entries: [
      { title: "Board of Directors (former)", place: "Genesis Health System" },
      { title: "Treasurer", place: "Xi Eta Omega, Alpha Kappa Alpha" },
      { title: "Trustee", place: "Life Church QC" },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About the founder"
        title={
          <>
            LaShonda W. <em>Polite</em>
          </>
        }
        lead={
          <>
            <p className="text-[0.78rem] font-medium uppercase tracking-[0.3em] text-gold-300">Founder &amp; CEO</p>
            <p>
              With an MBA from Florida A&amp;M University and executive training at Dartmouth, LaShonda has spent her
              career in the C-suite, as a Chief of Staff, VP of Finance, and Chief Operations Officer, before founding
              Enriched Solutions to bring that expertise directly to the organizations and individuals who need it most.
            </p>
          </>
        }
        actions={
          <Button href={mailto("Hello from the website")} size="lg" arrow>
            Get in touch
          </Button>
        }
      />

      <section aria-label="Her mission" className="relative bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <p
            data-reveal
            className="max-w-4xl font-display text-[clamp(1.7rem,3.4vw,2.9rem)] leading-[1.3] text-ivory [&_em]:gold-text [&_em]:font-normal [&_em]:italic"
          >
            Her work spans business consulting and personal financial wellness,{" "}
            <em>two sides of the same mission</em>: empowering people to build wealth, security, freedom, and legacy on
            their own terms.
          </p>
        </Container>
      </section>

      <section aria-label="Background" className="relative bg-navy-950 py-24 md:py-28">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {groups.map((group, index) => (
              <section
                key={group.heading}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                aria-labelledby={`about-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-3xl border border-gold-500/20 bg-ivory/[0.025] p-8 md:p-10"
              >
                <h2
                  id={`about-${group.heading.toLowerCase().replace(/\s+/g, "-")}`}
                  className="eyebrow !text-[0.68rem] !font-medium"
                >
                  {group.heading}
                </h2>
                <ul className="mt-6 space-y-6">
                  {group.entries.map((entry) => (
                    <li key={entry.title}>
                      <span className="block font-display text-[1.45rem] leading-snug text-ivory">{entry.title}</span>
                      {entry.place && <span className="mt-1 block text-[0.92rem] leading-[1.6] text-ivory/70">{entry.place}</span>}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
