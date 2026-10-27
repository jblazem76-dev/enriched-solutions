"use client";

import { useEffect, useState } from "react";
import { ekg } from "@/lib/site";

/** Whole calendar days from today to the EKG date, in the visitor's local time. Negative once it has passed. */
export function daysUntilEkg(now = new Date()): number {
  const target = new Date(ekg.year, ekg.monthIndex, ekg.day);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

/**
 * "N days to go" for the EKG date. Renders nothing on the server and first paint (no stale
 * build-time number), and nothing at all once the date has passed.
 */
export function Countdown({ className }: { className?: string }) {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    // Reading the clock is a post-hydration side effect by design: the page is statically prerendered.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(daysUntilEkg());
  }, []);

  if (days === null || days < 0) return null;

  const text = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `${days} days to go`;
  return (
    <p className={className} aria-live="polite">
      {text}
    </p>
  );
}
