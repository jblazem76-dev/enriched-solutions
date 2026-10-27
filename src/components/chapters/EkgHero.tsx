import { PulseLine } from "@/components/art/PulseLine";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { HeroProps } from "./types";

/** EKG, "The Heart of Our Money". Navy ground, gold trace. A bookable speaking engagement, so no single date here. */
export function EkgHero({ variant, id, className }: HeroProps) {
  const Title = variant === "page" ? "h1" : "h2";
  return (
    <section
      id={id}
      aria-labelledby="ekg-title"
      className={cn(
        "relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-navy-900 px-6 pb-20 pt-32 text-center",
        className,
      )}
    >
      {/* Atmosphere: warm light from the top, cool depth from the lower left */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(55%_45%_at_50%_0%,rgb(212_174_92/0.17),transparent_72%),radial-gradient(85%_70%_at_12%_100%,rgb(31_58_93/0.55),transparent_70%),linear-gradient(180deg,#0b1626_0%,#102036_55%,#0b1626_100%)]"
      />
      {/* The giant E from the sheet */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-[7vw] top-[4%] -z-20 select-none font-display text-[min(88vh,66vw)] font-bold leading-none text-navy-600/40"
      >
        E
      </span>
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      {/* Full-bleed (100vw) so the pulse line runs edge to edge; the section clips any overflow. */}
      <div className="relative w-screen max-w-none shrink-0">
        {/* Spark: a thin vertical line and a glowing orb above the K */}
        <div aria-hidden="true" className="absolute left-1/2 top-0 z-10 h-[calc(100%+1.5rem)] -translate-x-1/2">
          <span className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-gold-100 via-gold-400/70 to-transparent" />
          <span className="pulse-orb absolute left-1/2 top-0 h-20 w-20 rounded-full bg-[radial-gradient(circle,rgb(255_240_190/0.95)_0%,rgb(212_174_92/0.4)_34%,transparent_70%)] sm:h-28 sm:w-28" />
        </div>
        <div
          aria-hidden="true"
          className="hairline absolute left-1/2 top-0 w-[min(62vw,40rem)] -translate-x-1/2"
        />

        <Title id="ekg-title" className="relative">
          <span className="block font-display text-[clamp(5.5rem,17vw,15.5rem)] font-medium leading-[0.8] tracking-[-0.01em] text-ivory">
            EKG
          </span>
          <span className="sr-only">: The Heart of Our Money</span>
        </Title>

        <PulseLine className="ekg-pulse pointer-events-none absolute inset-x-0 z-10 w-full" />
      </div>

      {/* The h1 above already announces "EKG: The Heart of Our Money", so this visual copy is hidden from AT. */}
      <p
        aria-hidden="true"
        className="mt-[clamp(1.5rem,3vw,2.5rem)] font-display text-[clamp(1.6rem,3.5vw,3.3rem)] leading-tight text-ivory"
        data-reveal
      >
        The Heart of Our Money
      </p>

      {/* Bracket rule with a diamond */}
      <div aria-hidden="true" className="relative mt-9 h-3 w-[min(26rem,72vw)] rounded-b-md border-x border-b border-gold-500/70">
        <span className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gold-400" />
      </div>

      <p className="eyebrow mt-10 !text-[clamp(0.7rem,1.35vw,1rem)] !tracking-[0.5em]" data-reveal>
        Earn it. Keep it. Grow it.
      </p>

      <p
        className="mt-9 font-display text-[clamp(1.6rem,3.2vw,2.9rem)] tracking-[0.02em] text-ivory/90"
        data-reveal
        style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
      >
        How healthy is your money?
      </p>

      <div
        className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        data-reveal
        style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
      >
        {variant === "page" ? (
          <>
            <Button href="#book" size="lg" arrow>
              Book EKG
            </Button>
            <Button href="#next" size="lg" variant="outline">
              Save my spot
            </Button>
          </>
        ) : (
          <Button href="/ekg" size="lg" arrow>
            Explore EKG
          </Button>
        )}
      </div>
    </section>
  );
}
