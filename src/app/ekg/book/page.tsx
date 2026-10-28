import type { Metadata } from "next";
import { BookingForm } from "@/components/forms/BookingForm";
import { FormPage } from "@/components/ui/FormPage";

const description =
  "Book EKG: The Heart of Our Money for your conference, event or as a solo engagement. Tell us what you are planning and we will take it from there.";

export const metadata: Metadata = {
  title: "Book EKG",
  description,
  alternates: { canonical: "/ekg/book" },
  openGraph: { title: "Book EKG | Enriched Solutions", description, url: "/ekg/book" },
};

export default function BookEkgPage() {
  return (
    <FormPage
      tone="navy"
      eyebrow="Book EKG"
      title={
        <>
          Tell us about <em>your event</em>
        </>
      }
      lead="Tell us what you are planning and we will take it from there."
      back={{ href: "/ekg", label: "Back to EKG" }}
    >
      <BookingForm />
    </FormPage>
  );
}
