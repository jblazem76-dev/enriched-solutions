import type { Metadata } from "next";
import { SignupForm } from "@/components/forms/SignupForm";
import { FormPage } from "@/components/ui/FormPage";

const description =
  "Join the ES+ waitlist. ES+ launches in 2027: save your spot and get early access before anyone else.";

export const metadata: Metadata = {
  title: "Join the ES+ waitlist",
  description,
  alternates: { canonical: "/es-plus/waitlist" },
  openGraph: { title: "Join the ES+ waitlist | Enriched Solutions", description, url: "/es-plus/waitlist" },
};

export default function EsPlusWaitlistPage() {
  return (
    <FormPage
      tone="night"
      eyebrow="Coming 2027"
      title={
        <>
          Be first <em>in line</em>
        </>
      }
      lead="ES+ launches in 2027. Join the waitlist and we'll save your spot, and send you early access before anyone else."
      back={{ href: "/es-plus", label: "Back to ES+" }}
    >
      <SignupForm
        source="es-plus"
        buttonLabel="Join the waitlist"
        successTitle="You're on the waitlist."
        successBody="We'll email you as soon as there's news about ES+."
      />
    </FormPage>
  );
}
