import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const tones = {
  navy: { section: "bg-navy-900", card: "from-navy-800/60 to-navy-950/60" },
  night: { section: "bg-night-900", card: "from-night-700/60 to-night-800/60" },
  fairway: { section: "bg-fairway-900", card: "from-fairway-700/50 to-fairway-800/50" },
} as const;

type Props = {
  tone: keyof typeof tones;
  eyebrow: string;
  /** Wrap a phrase in <em> for the gold italic accent. */
  title: ReactNode;
  lead: string;
  back: { href: string; label: string };
  children: ReactNode;
};

/** A page of its own for one form: the heading and a short lead on the left, the form on the right. */
export function FormPage({ tone, eyebrow, title, lead, back, children }: Props) {
  const t = tones[tone];
  return (
    <section aria-labelledby="form-page-title" className={`relative isolate min-h-svh pb-24 pt-36 ${t.section}`}>
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <SectionHeading as="h1" eyebrow={eyebrow} title={<span id="form-page-title">{title}</span>} lead={lead} />
          <Link
            href={back.href}
            className="mt-10 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-300 transition-colors hover:text-gold-100"
          >
            <span aria-hidden="true">←</span>
            {back.label}
          </Link>
        </div>
        <div
          className={`rounded-3xl border border-gold-500/25 bg-gradient-to-b p-8 md:p-10 ${t.card}`}
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
