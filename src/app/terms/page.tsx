import type { Metadata } from "next";
import { StubPage } from "@/components/ui/StubPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for using the Enriched Solutions website and services. These terms are being finalized and will be published here.",
  alternates: { canonical: "/terms" },
  // A placeholder should not be indexed as the real policy.
  robots: { index: false },
};

// TODO(legal): replace with the real terms of service before launch. The site collects emails, so this is required.
export default function Page() {
  return (
    <StubPage
      eyebrow="Legal"
      title={<>Terms of service</>}
      body={<p>We are finalizing our terms of service. Until they are published, email us with any question.</p>}
      ctaLabel="Email us"
    />
  );
}
