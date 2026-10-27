import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

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
        </>
      }
      ctaLabel="Inquire about booking"
    />
  );
}
