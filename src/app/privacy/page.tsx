import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Enriched Solutions handles your information. This policy is being finalized and will be published here.",
  alternates: { canonical: "/privacy" },
  // A placeholder should not be indexed as the real policy.
  robots: { index: false },
};

// TODO(legal): replace with the real privacy policy before launch. The site collects emails, so this is required.
export default function Page() {
  return (
    <StubPage
      eyebrow="Legal"
      title={<>Privacy policy</>}
      body={<p>We are finalizing our privacy policy. Until it is published, email us with any question about how your information is handled.</p>}
      ctaLabel="Email us"
    />
  );
}
