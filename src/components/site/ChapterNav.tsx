"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const chapters = [
  { id: "ekg", label: "EKG" },
  { id: "es-plus", label: "ES+" },
  { id: "golf-and-heels", label: "Golf & Heels" },
] as const;

/** Fixed dot navigation for the three home-page chapters. Hidden on small screens. */
export function ChapterNav() {
  const [active, setActive] = useState<string>(chapters[0].id);

  useEffect(() => {
    const targets = chapters.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0 || !("IntersectionObserver" in window)) return;

    // A chapter counts as active when it crosses the middle band of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Featured" className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:block lg:right-8">
      <ol className="flex flex-col items-end gap-5">
        {chapters.map((chapter, index) => {
          const isActive = active === chapter.id;
          return (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span
                  className={cn(
                    "text-[0.65rem] font-medium uppercase tracking-[0.28em] transition-all duration-300",
                    isActive
                      ? "translate-x-0 text-gold-300 opacity-100"
                      : "translate-x-1 text-ivory/70 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                  )}
                >
                  <span className="sr-only">Go to </span>
                  {chapter.label}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-3 w-3 items-center justify-center rounded-full border transition-all duration-300",
                    isActive ? "scale-125 border-gold-300 bg-gold-400" : "border-gold-500/70 group-hover:border-gold-300",
                  )}
                >
                  <span className="sr-only">{index + 1}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
