import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string;
  /** Wrap a phrase in <em> for the gold italic accent used across the brand. */
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/** Eyebrow + display heading + optional lead. One place for the type rhythm. */
export function SectionHeading({ eyebrow, title, lead, align = "left", as: Tag = "h2", className }: Props) {
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="eyebrow mb-5" data-reveal>
          {eyebrow}
        </p>
      )}
      <Tag
        className="text-[clamp(2.2rem,5.2vw,4.4rem)] [&_em]:gold-text [&_em]:font-normal [&_em]:italic"
        data-reveal
        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
      >
        {title}
      </Tag>
      {lead && (
        <p
          className="mt-6 max-w-2xl text-[1.02rem] leading-[1.8] text-ivory/75 md:text-lg"
          data-reveal
          style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
        >
          {lead}
        </p>
      )}
    </header>
  );
}
