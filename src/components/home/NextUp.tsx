import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowIcon } from "@/components/ui/icons";

type Key = "ekg" | "es-plus" | "golf-and-heels";

const all: Record<Key, { href: string; title: string; line: string; when: string; tone: string }> = {
  ekg: {
    href: "/ekg",
    title: "EKG",
    line: "The Heart of Our Money",
    when: "Speaking",
    tone: "from-navy-800 to-navy-950",
  },
  "es-plus": {
    href: "/es-plus",
    title: "ES+",
    line: "Your wealth journey, in your pocket.",
    when: "Coming 2027",
    tone: "from-night-700 to-night-950",
  },
  "golf-and-heels": {
    href: "/golf-and-heels",
    title: "Golf & Heels",
    line: "Where the fairway meets the red carpet",
    when: "Spring 2027",
    tone: "from-fairway-700 to-fairway-950",
  },
};

/** Cross-links to the other two featured experiences. Pass the key of the current page to leave it out. */
export function NextUp({ exclude }: { exclude: Key }) {
  const items = (Object.keys(all) as Key[]).filter((key) => key !== exclude).map((key) => all[key]);
  return (
    <section aria-labelledby="nextup-title" className="relative bg-ink py-24 md:py-28">
      <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
      <Container>
        <SectionHeading
          eyebrow="Keep exploring"
          title={
            <span id="nextup-title">
              More from <em>Enriched Solutions</em>
            </span>
          }
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={item.href}
              data-reveal
              style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              className="group"
            >
              <Link
                href={item.href}
                className={`flex h-full flex-col justify-between rounded-3xl border border-gold-500/25 bg-gradient-to-br ${item.tone} p-9 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-gold-400/70 md:p-12`}
              >
                <span className="eyebrow !text-[0.68rem]">{item.when}</span>
                <span className="mt-10 block font-display text-[clamp(2.4rem,4.4vw,3.8rem)] leading-none text-ivory">
                  {item.title}
                </span>
                <span className="mt-4 block text-[1.02rem] text-ivory/75">{item.line}</span>
                <span className="mt-8 inline-flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-gold-300">
                  Explore
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
