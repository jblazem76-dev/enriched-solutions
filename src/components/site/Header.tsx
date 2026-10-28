"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { nav, site } from "@/lib/site";

const cta = { href: "/ekg/book", label: "Book EKG" };

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Scroll lock, Escape to close, and focus handoff while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-gold-500/15 bg-ink/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[88rem] items-center justify-between px-6 sm:px-10 lg:px-16">
        <Link href="/" className="rounded-sm">
          <Logo />
          <span className="sr-only"> (home)</span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center gap-2 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors",
                      active ? "text-gold-300" : "text-ivory/75 hover:text-gold-300",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-px h-px origin-left bg-gold-400 transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Wrapper, not a className on Button: Button's own display class would otherwise beat `hidden`. */}
          <div className="hidden xl:block">
            <Button href={cta.href} size="md">
              {cta.label}
            </Button>
          </div>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 text-gold-300 transition-colors hover:border-gold-300 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-20 overflow-y-auto bg-ink/[0.97] px-6 pb-12 pt-8 sm:px-10 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {nav.map((item, index) => (
              <li key={item.href} className="border-b border-gold-500/15">
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "flex items-baseline justify-between py-5 font-display text-[clamp(1.9rem,8vw,2.8rem)] leading-none transition-colors",
                    isActive(item.href) ? "text-gold-300" : "text-ivory hover:text-gold-300",
                  )}
                >
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-col gap-4">
            <Button href={cta.href} size="lg">
              {cta.label}
            </Button>
            <a
              href={`mailto:${site.email}`}
              className="py-2 text-center text-sm tracking-wide text-ivory/70 underline-offset-4 hover:text-gold-300 hover:underline"
            >
              {site.email}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
