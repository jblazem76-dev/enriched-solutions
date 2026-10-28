import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";

type Props = {
  eyebrow: string;
  /** Wrap a phrase in <em> for the gold italic accent. */
  title: ReactNode;
  body: ReactNode;
  ctaLabel?: string;
  ctaHref?: string;
};

/**
 * Temporary page for routes that are not part of the first redesign pass (Consulting, Speaking, About,
 * Privacy, Terms). It exists so navigation never 404s. Replace each with its designed page.
 */
export function StubPage({ eyebrow, title, body, ctaLabel = "Get in touch", ctaHref = `mailto:${site.email}` }: Props) {
  return (
    <section className="relative isolate flex min-h-[78svh] items-center overflow-hidden bg-navy-900 pb-24 pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(212_174_92/0.12),transparent_70%),linear-gradient(180deg,#0b1626,#070f1b)]"
      />
      <Container>
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,6rem)] [&_em]:gold-text [&_em]:font-normal [&_em]:italic">
          {title}
        </h1>
        <div className="mt-8 max-w-2xl space-y-5 text-lg leading-[1.8] text-ivory/80">{body}</div>
        <div className="mt-10">
          <Button href={ctaHref} size="lg" arrow>
            {ctaLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
