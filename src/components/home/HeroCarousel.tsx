"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

type Slide = { id: string; label: string; content: ReactNode };

const arrowClass =
  "absolute top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 bg-ink/55 text-gold-300 backdrop-blur-sm transition-[opacity,border-color,background-color] duration-300 hover:border-gold-300 hover:bg-ink/80 disabled:pointer-events-none disabled:opacity-0 md:inline-flex";

/**
 * The home page's three hero slides, side by side. Moving between them scrolls sideways (native scroll snapping,
 * so a swipe or trackpad scroll works with no script), and arrows, the labelled tabs and the keyboard do the
 * same. Vertical scrolling is untouched: the page continues below the slides as normal.
 *
 * The slides are not all the same height (ES+ and Golf & Heels are taller than a screen), so the area takes the
 * height of the slide being shown rather than stretching the short ones to match the tall ones.
 */
export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const slideEls = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [height, setHeight] = useState<number | null>(null);
  const last = slides.length - 1;

  const goTo = useCallback(
    (index: number, instant = false) => {
      const el = scroller.current;
      if (!el) return;
      const target = Math.max(0, Math.min(last, index));
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ left: target * el.clientWidth, behavior: instant || reduceMotion ? "auto" : "smooth" });
    },
    [last],
  );

  // Keep the indicator in step however the slide changed: swipe, trackpad, keyboard, buttons or tabbing into a slide.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActive(Math.round(el.scrollLeft / el.clientWidth)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Follow the height of the slide on show. The observer reports its size as soon as it starts watching, so this
  // also sets the first height.
  useEffect(() => {
    const el = slideEls.current[active];
    if (!el || !("ResizeObserver" in window)) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  // A link such as /#es-plus opens that slide.
  useEffect(() => {
    const index = slides.findIndex((slide) => `#${slide.id}` === window.location.hash);
    if (index > 0) goTo(index, true);
  }, [slides, goTo]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return; // only when the slides region itself has focus
    const next = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: last }[event.key];
    if (next === undefined) return;
    event.preventDefault();
    goTo(next);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`Featured: ${slides.map((slide) => slide.label).join(", ")}`}
      className="relative"
    >
      <div className="relative">
        <div
          ref={scroller}
          role="group"
          aria-label="Slides. Use the left and right arrow keys to move between them."
          tabIndex={0}
          onKeyDown={onKeyDown}
          style={{ "--hero-min-h": "calc(100svh - 3.5rem)", height: height ?? undefined } as React.CSSProperties}
          className="flex snap-x snap-mandatory overflow-x-auto overflow-y-hidden items-start overscroll-x-contain transition-[height] duration-500 ease-out motion-reduce:transition-none [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-300/70 [&::-webkit-scrollbar]:hidden"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              ref={(el) => {
                slideEls.current[index] = el;
              }}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${slides.length}: ${slide.label}`}
              className="flex w-full shrink-0 snap-start snap-always"
            >
              {slide.content}
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          disabled={active === 0}
          onClick={() => goTo(active - 1)}
          className={cn(arrowClass, "left-4 lg:left-8")}
        >
          <ArrowIcon className="h-5 w-5 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          disabled={active === last}
          onClick={() => goTo(active + 1)}
          className={cn(arrowClass, "right-4 lg:right-8")}
        >
          <ArrowIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Pinned to the bottom of the screen while a tall slide is scrolled through, then sits under the slides. */}
      <div className="sticky bottom-0 z-30 flex h-14 items-center justify-center border-t border-gold-500/15 bg-ink px-3">
        <ul className="flex items-center gap-1 sm:gap-3">
          {slides.map((slide, index) => {
            const isActive = index === active;
            return (
              <li key={slide.id}>
                <button
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={cn(
                    "relative flex min-h-11 items-center px-2.5 text-[0.68rem] font-medium uppercase tracking-[0.22em] transition-colors sm:px-4",
                    isActive ? "text-gold-300" : "text-ivory/70 hover:text-gold-300",
                  )}
                >
                  {slide.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-2.5 bottom-1.5 h-px origin-center bg-gold-400 transition-transform duration-300 sm:inset-x-4",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="sr-only" aria-live="polite">
        {`Showing ${slides[active]?.label}, slide ${active + 1} of ${slides.length}`}
      </p>
    </section>
  );
}
