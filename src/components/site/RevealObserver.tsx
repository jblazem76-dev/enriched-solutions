"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Marks [data-reveal] elements as visible when they scroll into view.
 * Mounted once in the root layout. Re-scans on route change and when nodes are added.
 *
 * Safety: content is only hidden by CSS while `html.js` is set and `data-hydrated` is not.
 * This effect sets `data-hydrated`, and a CSS animation reveals everything after 4s if it never runs.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.dataset.hydrated = "1";

    const reveal = (el: Element) => el.setAttribute("data-in", "");

    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );

    const scan = () => document.querySelectorAll("[data-reveal]:not([data-in])").forEach((el) => io.observe(el));
    scan();

    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
