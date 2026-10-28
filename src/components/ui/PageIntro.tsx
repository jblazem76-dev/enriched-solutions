import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Props = {
  eyebrow: string;
  /** Wrap a phrase in <em> for the gold italic accent. */
  title: ReactNode;
  lead?: ReactNode;
  /** Buttons shown under the lead. */
  actions?: ReactNode;
};

/** Navy opening block for the content pages (Consulting, Speaking, About). Its content is never faded in, so it can be the LCP. */
export function PageIntro({ eyebrow, title, lead, actions }: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 pb-20 pt-40 md:pb-24 md:pt-44">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(212_174_92/0.12),transparent_70%),linear-gradient(180deg,#0b1626,#070f1b)]"
      />
      <Container>
        <p className="eyebrow mb-6">{eyebrow}</p>
        <h1 className="max-w-4xl text-[clamp(2.6rem,7vw,6rem)] [&_em]:gold-text [&_em]:font-normal [&_em]:italic">
          {title}
        </h1>
        {lead && <div className="mt-8 max-w-2xl space-y-5 text-lg leading-[1.8] text-ivory/80">{lead}</div>}
        {actions && <div className="mt-10 flex flex-wrap gap-4">{actions}</div>}
      </Container>
    </section>
  );
}
