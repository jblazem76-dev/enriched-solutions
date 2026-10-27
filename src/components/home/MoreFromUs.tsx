import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/icons";

// Copy carried over from the live site's Consulting, Speaking and About pages.
const cards = [
  {
    href: "/consulting",
    eyebrow: "For businesses",
    title: "Executive consulting",
    body: "Fractional C-suite leadership, operational strategy, and organizational needs assessments that move the needle, without the full-time overhead.",
    cta: "Explore consulting",
  },
  {
    href: "/speaking",
    eyebrow: "Keynotes & workshops",
    title: "Bring LaShonda to your stage",
    body: "Rooms don't just get filled, they get transformed. Book for your next corporate event, conference, or community gathering.",
    cta: "Book speaking",
  },
  {
    href: "/about",
    eyebrow: "The founder",
    title: "LaShonda W. Polite",
    body: "MBA, COO, and the woman behind the mission. Years in the C-suite, now bringing that expertise to the people who need it most.",
    cta: "Meet LaShonda",
  },
] as const;

export function MoreFromUs() {
  return (
    <section aria-labelledby="more-title" className="relative bg-ink py-24 md:py-32">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Everything we offer"
          title={
            <span id="more-title">
              One mission. <em>Many pathways.</em>
            </span>
          }
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((card, index) => (
            <li
              key={card.href}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className="group"
            >
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-3xl border border-gold-500/20 bg-ivory/[0.025] p-8 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:bg-ivory/[0.05] md:p-10"
              >
                <span className="eyebrow !text-[0.68rem]">{card.eyebrow}</span>
                <span className="mt-5 font-display text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight text-ivory">
                  {card.title}
                </span>
                <span className="mt-4 text-[0.98rem] leading-[1.75] text-ivory/70">{card.body}</span>
                <span className="mt-8 inline-flex items-center gap-3 pt-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-300">
                  {card.cta}
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
