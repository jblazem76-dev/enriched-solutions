import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { FacebookIcon, InstagramIcon, MailIcon } from "@/components/ui/icons";
import { nav, site } from "@/lib/site";

const linkClass = "inline-block py-1.5 text-[0.95rem] text-ivory/75 transition-colors hover:text-gold-300";

export function Footer() {
  return (
    <footer className="relative border-t border-gold-500/15 bg-ink">
      <div className="hairline absolute inset-x-0 top-0" aria-hidden="true" />
      <Container className="grid gap-14 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Link href="/" className="inline-block rounded-sm">
            <Logo />
            <span className="sr-only"> (home)</span>
          </Link>
          <p className="mt-6 max-w-sm font-display text-[1.35rem] italic leading-snug text-ivory/85">
            {site.footerLine}
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-4 !font-sans">Explore</h2>
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-4 !font-sans">Connect</h2>
          <ul>
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-3`}>
                <MailIcon className="h-5 w-5 text-gold-400" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-3`}
              >
                <InstagramIcon className="h-5 w-5 text-gold-400" />
                Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} inline-flex items-center gap-3`}
              >
                <FacebookIcon className="h-5 w-5 text-gold-400" />
                Facebook<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ivory/10">
        <Container className="flex flex-col items-start justify-between gap-3 py-6 text-[0.8rem] text-ivory/60 sm:flex-row sm:items-center">
          <p>© 2026 {site.name}. All rights reserved.</p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="transition-colors hover:text-gold-300">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition-colors hover:text-gold-300">
                Terms
              </Link>
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
