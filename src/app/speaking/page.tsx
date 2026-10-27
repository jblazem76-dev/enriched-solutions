import type { Metadata } from "next";
import Link from "next/link";
import { StubPage } from "@/components/ui/StubPage";
import { ArrowIcon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Speaking",
  description: "Book LaShonda W. Polite to speak at your next corporate event, conference, or community workshop.",
  alternates: { canonical: "/speaking" },
};

// Placeholder until this page is designed in the next pass. Copy is carried over from the live site.
export default function Page() {
  return (
    <StubPage
      eyebrow="Keynotes & workshops"
      title={
        <>
          Bring the fire <em>to your stage</em>
        </>
      }
      body={
        <>
          <p>Looking for a speaker who transforms rooms, not just fills them? Book Enriched Solutions for your next corporate event, conference, or community workshop.</p>
          {/* Featured program: EKG keeps its own page and is linked from here. */}
          <Link
            href="/ekg"
            className="group block rounded-3xl border border-gold-500/30 bg-gradient-to-br from-navy-800 to-navy-950 p-8 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold-400/70 md:p-10"
          >
            <span className="eyebrow !text-[0.68rem]">Featured program</span>
            <span className="mt-5 block font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-none text-ivory">
              EKG: The Heart of Our Money
            </span>
            <span className="mt-4 block text-[1rem] leading-[1.75] text-ivory/75">
              A speaking engagement for conferences, events or as a solo offering.
            </span>
            <span className="mt-6 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-300">
              Explore EKG
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </>
      }
      ctaLabel="Inquire about booking"
    />
  );
}
