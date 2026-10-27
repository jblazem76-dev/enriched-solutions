import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { RevealObserver } from "@/components/site/RevealObserver";
import { SkipLink } from "@/components/site/SkipLink";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted (no request to Google at build or run time). Bodoni Moda is the Didone display face used on
// the hero sheets, Montserrat the tracked-caps sans, Anton the heavy "GOLF".
const bodoni = localFont({
  variable: "--font-bodoni",
  display: "swap",
  src: [
    { path: "./fonts/bodoni-moda-latin-wght-normal.woff2", style: "normal", weight: "400 900" },
    { path: "./fonts/bodoni-moda-latin-wght-italic.woff2", style: "italic", weight: "400 900" },
  ],
});

const montserrat = localFont({
  variable: "--font-montserrat",
  display: "swap",
  src: [{ path: "./fonts/montserrat-latin-wght-normal.woff2", style: "normal", weight: "100 900" }],
});

const anton = localFont({
  variable: "--font-anton",
  display: "swap",
  src: [{ path: "./fonts/anton-latin-400-normal.woff2", style: "normal", weight: "400" }],
});

const description =
  "A consulting firm and financial wellness platform led by LaShonda W. Polite, empowering businesses and individuals to build wealth, security, and lasting legacy.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description,
    url: "/",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.tagline}`, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#05070b",
  colorScheme: "dark",
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  founder: { "@type": "Person", name: "LaShonda W. Polite" },
  sameAs: [site.social.facebook, site.social.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the `js` class before React hydrates.
    <html
      lang="en"
      className={`${bodoni.variable} ${montserrat.variable} ${anton.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </head>
      <body className="flex min-h-svh flex-col bg-ink">
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
