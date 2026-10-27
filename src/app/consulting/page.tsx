import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "Consulting",
  description: "Executive consulting from Enriched Solutions: fractional C-suite leadership, operational strategy, and organizational needs assessments.",
  alternates: { canonical: "/consulting" },
};

// Placeholder until this page is designed in the next pass. Copy is carried over from the live site.
export default function Page() {
  return (
    <StubPage
      eyebrow="Business consulting"
      title={
        <>
          Executive expertise, <em>on your terms</em>
        </>
      }
      body={
        <>
          <p>Enriched Solutions serves as a trusted partner for businesses and organizations that need senior-level leadership without the full-time commitment. We embed, assess, and deliver.</p>
        </>
      }
      ctaLabel="Book a consultation"
    />
  );
}
