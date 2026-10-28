import Image from "next/image";
import { Seal } from "@/components/brand/Seal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { HeroProps } from "./types";

/** Golf & Heels, "Where the fairway meets the red carpet." Fairway green, gold, Spring 2027. */
export function GolfHero({ variant, id, className }: HeroProps) {
  const Title = variant === "page" ? "h1" : "h2";
  return (
    <section
      id={id}
      aria-labelledby="golf-title"
      className={cn(
        "relative isolate flex min-h-[var(--hero-min-h,100svh)] flex-col items-center overflow-hidden bg-fairway-950 px-6 pb-[23.5rem] pt-28 text-center md:pb-[calc(clamp(14rem,29vw,24rem)+clamp(9rem,13vw,12.5rem)-3rem)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 bg-[radial-gradient(60%_42%_at_50%_36%,rgb(145_136_105/0.2),transparent_72%),linear-gradient(180deg,#030a07_0%,#07120c_58%,#030a07_100%)]"
      />

      {/*
        The still sits in its own block above the date plate, so the shoes and ball are never covered by text.
        It fades out at both ends into the fairway colour, and is cropped to the shoes + tee on narrow screens.
      */}
      <div className="absolute inset-x-0 bottom-[9.5rem] -z-20 h-[clamp(14rem,29vw,24rem)] md:bottom-[clamp(9rem,13vw,12.5rem)]">
        <Image
          src="/images/golf-heels-still.jpg"
          alt="A pair of gold heels beside a golf ball on a tee, with a driver, on indoor turf in front of a golf simulator screen."
          fill
          sizes="100vw"
          priority={variant === "page"}
          className="object-cover object-[28%_80%] [mask-image:linear-gradient(to_bottom,transparent_0%,#000_42%,#000_90%,transparent_100%)]"
        />
      </div>

      {/* Thin gold frame, as on the sheet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-4 bottom-4 top-24 -z-10 border border-gold-500/30 sm:inset-x-6 lg:inset-x-[5%] lg:bottom-[4%]"
      />
      <div aria-hidden="true" className="grain absolute inset-0 -z-10" />

      <div className="flex w-full max-w-6xl items-center justify-center gap-5 md:gap-8" data-reveal>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-gold-500/60 md:block" />
        <p className="flex items-center gap-3 font-display text-[clamp(0.85rem,3.1vw,2.9rem)] font-bold uppercase tracking-[0.14em] text-gold-300 md:gap-7 md:tracking-[0.2em]">
          <span>Enriched</span>
          <Seal className="h-[clamp(3.8rem,9vw,8.5rem)] w-auto shrink-0" />
          <span>Solutions</span>
        </p>
        <span aria-hidden="true" className="hidden h-px flex-1 bg-gold-500/60 md:block" />
      </div>

      <p
        className="mt-5 font-display text-[clamp(0.8rem,1.6vw,1.4rem)] uppercase italic tracking-[0.6em] text-ivory/90"
        data-reveal
        style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
      >
        Presents
      </p>

      <Title
        id="golf-title"
        className="mt-6 flex flex-col items-center md:flex-row md:items-baseline md:justify-center md:gap-[2.2vw]"
      >
        <span className="font-impact text-[clamp(5rem,24vw,9rem)] font-normal uppercase leading-[0.95] tracking-[0.01em] text-white md:text-[clamp(5rem,12.2vw,13rem)]">
          Golf
        </span>
        <span className="gold-text font-display text-[clamp(3rem,13vw,6rem)] font-normal italic leading-none md:text-[clamp(3.5rem,9vw,9.5rem)]">
          <span aria-hidden="true">&amp;</span>
          <span className="sr-only"> and </span>
        </span>
        <span className="gold-text font-display text-[clamp(4.5rem,21vw,8.5rem)] font-bold uppercase leading-[0.95] tracking-[0.01em] md:text-[clamp(4.5rem,12.4vw,13.5rem)]">
          Heels
        </span>
      </Title>

      <div className="mt-8" data-reveal style={{ "--reveal-delay": "220ms" } as React.CSSProperties}>
        {variant === "page" ? (
          <Button href="/golf-and-heels/interest" size="lg" arrow>
            Join the interest list
          </Button>
        ) : (
          <Button href="/golf-and-heels" size="lg" arrow>
            Explore Golf &amp; Heels
          </Button>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-[clamp(1.25rem,3.5%,2.5rem)] z-10 flex flex-col items-center gap-4 px-6">
        <p className="inline-flex items-center border-x-[6px] border-gold-500 bg-black/90 px-8 py-2 font-impact text-[clamp(1.4rem,3vw,2.7rem)] uppercase tracking-[0.28em] text-white md:px-12">
          Spring 2027
        </p>
        <p className="font-display text-[clamp(1rem,1.8vw,1.6rem)] italic text-gold-200">
          Where the fairway meets the red carpet
        </p>
      </div>
    </section>
  );
}
