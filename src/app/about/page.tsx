import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "About",
  description: "LaShonda W. Polite, Founder and CEO of Enriched Solutions: MBA, former Chief of Staff, VP of Finance, and Chief Operations Officer.",
  alternates: { canonical: "/about" },
};

// Placeholder until this page is designed in the next pass. Copy is carried over from the live site.
export default function Page() {
  return (
    <StubPage
      eyebrow="About the founder"
      title={
        <>
          LaShonda W. <em>Polite</em>
        </>
      }
      body={
        <>
          <p>With an MBA from Florida A&amp;M University and executive training at Dartmouth, LaShonda has spent her career in the C-suite, as a Chief of Staff, VP of Finance, and Chief Operations Officer, before founding Enriched Solutions to bring that expertise directly to the organizations and individuals who need it most.</p>
        </>
      }
      ctaLabel="Get in touch"
    />
  );
}
