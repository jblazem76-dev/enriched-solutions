"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/ui/icons";
import { daysUntilEkg } from "./Countdown";

type Props = { href: string; size?: "md" | "lg" };

/** The same Google Form, in the layout Google provides for embedding it in a page. */
function embedUrl(href: string): string {
  const url = new URL(href);
  url.searchParams.set("embedded", "true");
  return url.toString();
}

/**
 * "Save my spot": opens the host's registration form in a popup on the page, with a Close button that is always
 * visible (the form scrolls inside it) for when they are done. From the day after 11.17.26 it is no longer
 * clickable at all, just a disabled "Registration closed" button, so nobody is sent to a form for a finished event.
 *
 * The popup is a native <dialog>, so the page behind it is inert, Escape closes it, focus stays inside it and goes
 * back to the button afterwards. The Google page is only fetched once the popup is opened.
 *
 * The page is prerendered, so the clock can only be read in the browser (same approach as Countdown). Visitors
 * without JavaScript get nothing to click, so the Google Form should also be closed after the event.
 */
export function RegistrationLink({ href, size = "md" }: Props) {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const [closed, setClosed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Reading the clock is a post-hydration side effect by design.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setClosed(daysUntilEkg() < 0);
  }, []);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Keep the page behind the popup from scrolling.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

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
    <>
      <Button
        variant="outline"
        size={size}
        aria-haspopup="dialog"
        data-registration="open"
        onClick={() => setOpen(true)}
      >
        Save my spot
      </Button>

      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        // The Escape key and form.close() both end here, so the state always matches what is on screen.
        onClose={() => setOpen(false)}
        // Only the backdrop is the dialog element itself: the panel inside fills it edge to edge.
        onClick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
        className="m-auto h-[min(92svh,56rem)] w-[min(96vw,46rem)] max-w-none overflow-hidden rounded-3xl border border-gold-500/30 bg-ink p-0 text-ivory shadow-[0_30px_120px_-20px_rgb(0_0_0/0.8)] backdrop:bg-black/75 backdrop:backdrop-blur-sm max-md:h-svh max-md:max-h-none max-md:w-screen max-md:rounded-none max-md:border-0"
      >
        {open && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-gold-500/20 px-5 py-3 sm:px-6">
              <h2 id={titleId} className="font-display text-2xl text-ivory">
                Save my spot
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-gold-500/50 px-4 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-gold-300 transition-colors hover:border-gold-300 hover:bg-gold-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300/70"
              >
                Close
                <CloseIcon className="h-4 w-4" />
              </button>
            </div>
            <iframe
              src={embedUrl(href)}
              title="11.17.26 registration form"
              className="min-h-0 w-full flex-1 border-0 bg-white"
            />
            <p className="border-t border-gold-500/20 px-5 py-3 text-[0.8rem] text-ivory/70 sm:px-6">
              Form not showing?{" "}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-300 underline underline-offset-4 hover:text-gold-100"
              >
                Open it in a new tab<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . When you are done, press Close.
            </p>
          </div>
        )}
      </dialog>
    </>
  );
}
