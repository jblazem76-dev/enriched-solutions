import type { Metadata } from "next";
import { SignupForm } from "@/components/forms/SignupForm";
import { FormPage } from "@/components/ui/FormPage";

const description =
  "Join the Golf & Heels interest list, Spring 2027. Seats are limited and fill from the interest list first, so get your name in now.";

export const metadata: Metadata = {
  title: "Join the Golf & Heels interest list",
  description,
  alternates: { canonical: "/golf-and-heels/interest" },
  openGraph: {
    title: "Join the Golf & Heels interest list | Enriched Solutions",
    description,
    url: "/golf-and-heels/interest",
  },
};

export default function GolfInterestPage() {
  return (
    <FormPage
      tone="fairway"
      eyebrow="Be first to know"
      title={
        <>
          Reserve your spot <em>before doors open</em>
        </>
      }
      lead="Seats will be limited and filling from the interest list first. Get your name in now and be notified the moment registration opens."
      back={{ href: "/golf-and-heels", label: "Back to Golf & Heels" }}
    >
      <SignupForm
        source="golf-and-heels"
        buttonLabel="Join the interest list"
        successTitle="You're on the interest list."
        successBody="We'll email you the moment registration opens for Golf & Heels."
      />
    </FormPage>
  );
}
