"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { daysUntilEkg } from "./Countdown";

type Props = { href: string; size?: "md" | "lg" };

/**
 * "Save my spot": opens the host's registration form in a new tab. From the day after 11.17.26 it is no longer a
 * link at all, just a disabled "Registration closed" button, so nobody is sent to a form for a finished event.
 *
 * The page is prerendered, so the clock can only be read in the browser (same approach as Countdown). Visitors
 * without JavaScript still get the link, which is why the form itself should also be closed after the event.
 */
export function RegistrationLink({ href, size = "md" }: Props) {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    // Reading the clock is a post-hydration side effect by design.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClosed(daysUntilEkg() < 0);
  }, []);

  if (closed) {
    return (
      <Button
        variant="outline"
        size={size}
        disabled
        data-registration="closed"
        className="cursor-not-allowed opacity-50 hover:border-gold-500/60 hover:bg-transparent"
      >
        Registration closed
      </Button>
    );
  }

  return (
    <Button
      href={href}
      variant="outline"
      size={size}
      target="_blank"
      rel="noopener noreferrer"
      data-registration="open"
    >
      Save my spot<span className="sr-only"> (opens in a new tab)</span>
    </Button>
  );
}
