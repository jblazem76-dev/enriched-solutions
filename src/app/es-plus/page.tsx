import type { Metadata } from "next";
import { EsPlusHero } from "@/components/chapters/EsPlusHero";
import { NextUp } from "@/components/home/NextUp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const description = "ES+ from Enriched Solutions: your wealth journey, in your pocket. Coming 2027. Join the waitlist to be first to know.";

export const metadata: Metadata = {
  title: "ES+ | Your wealth journey, in your pocket",
  description,
  alternates: { canonical: "/es-plus" },
  openGraph: { title: "ES+ | Enriched Solutions", description, url: "/es-plus" },
};

// Deliberately short: the features, app preview and cohorts are held back until closer to launch. The full content is
// kept in src/components/es-plus/Offerings.tsx (not imported, so not shipped) and can be brought back from there.
export default function EsPlusPage() {
  return (
    <>
      <EsPlusHero variant="page" />

      <section id="waitlist" aria-labelledby="waitlist-title" className="relative bg-night-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Coming 2027"
            title={
              <span id="waitlist-title">
                Be first <em>in line</em>
              </span>
            }
            lead="ES+ launches in 2027. Join the waitlist and we'll save your spot, and send you early access before anyone else."
          />
          <div className="mt-10" data-reveal>
            <Button href="/es-plus/waitlist" size="lg" arrow>
              Join the waitlist
            </Button>
          </div>
        </Container>
      </section>

      <NextUp exclude="es-plus" />
    </>
  );
}
