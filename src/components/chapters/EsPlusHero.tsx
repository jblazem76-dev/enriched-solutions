import { PhoneMockup } from "@/components/art/PhoneMockup";
import { Monogram } from "@/components/brand/Monogram";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { HeroProps } from "./types";

/** ES+, "Your wealth journey, in your pocket." Black ground, hex relief, outlined monogram. */
export function EsPlusHero({ variant, id, className }: HeroProps) {
  const Title = variant === "page" ? "h1" : "h2";
  return (
    <section
      id={id}
      aria-labelledby="esplus-title"
      className={cn(
        "relative isolate flex min-h-svh flex-col items-center overflow-hidden bg-night-950 px-6 pb-16 pt-28 text-center sm:pt-32",
        className,
      )}
    >
      <div aria-hidden="true" className="hex-bg absolute inset-0 -z-30 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(65%_55%_at_50%_42%,rgb(3_3_3/0)_0%,rgb(3_3_3/0.72)_62%,#030303_100%)]"
      />
      {/* The giant hairline monogram behind the phone */}
      <Monogram
        variant="outline"
        strokeWidth={1.25}
        className="pointer-events-none absolute left-1/2 top-[53%] -z-10 h-[118%] -translate-x-1/2 -translate-y-1/2 text-gold-500/40"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <Title
        id="esplus-title"
        className="max-w-[88rem] font-sans text-[clamp(0.95rem,1.95vw,1.9rem)] font-medium uppercase leading-[1.7] tracking-[0.3em] text-ivory sm:tracking-[0.34em]"
      >
        Your wealth journey, in your pocket.
      </Title>

      <div className="mt-9 w-[clamp(11.5rem,15vw,19rem)]" data-reveal style={{ "--reveal-delay": "120ms" } as React.CSSProperties}>
        <PhoneMockup>
          <div className="flex flex-1 flex-col items-center justify-center gap-[7%]">
            <Monogram className="aspect-square w-[46%] text-gold-500" />
            <span className="text-[clamp(0.45rem,0.9vw,0.7rem)] font-medium uppercase tracking-[0.5em] text-gold-400">
              ES+
            </span>
          </div>
        </PhoneMockup>
      </div>

      {/* Headline and lead copy are the LCP candidates, so they are never faded in. */}
      <p className="mt-10 max-w-xl text-[0.95rem] leading-[1.85] text-ivory/80 md:text-base">
        The ES+ app is where the speaking event energy lives between events. Track goals, complete courses, connect with
        your cohort, and build the habits that actually stick.
      </p>

      <div className="mt-9 flex items-center gap-5" data-reveal style={{ "--reveal-delay": "260ms" } as React.CSSProperties}>
        <span aria-hidden="true" className="h-px w-12 bg-gold-500/55 sm:w-20" />
        <p className="font-sans text-[clamp(0.9rem,1.9vw,1.6rem)] font-semibold uppercase tracking-[0.4em] text-gold-400">
          Coming 2027
        </p>
        <span aria-hidden="true" className="h-px w-12 bg-gold-500/55 sm:w-20" />
      </div>

      <div className="mt-9" data-reveal style={{ "--reveal-delay": "320ms" } as React.CSSProperties}>
        {variant === "page" ? (
          <Button href="#waitlist" size="lg" arrow>
            Join the waitlist
          </Button>
        ) : (
          <Button href="/es-plus" size="lg" arrow>
            Explore ES+
          </Button>
        )}
      </div>
    </section>
  );
}
