/**
 * Single source of truth for site-wide facts. Everything here was carried over
 * from the live site or the three hero sheets; change it here, not in pages.
 */
export const site = {
  name: "Enriched Solutions",
  url: "https://www.enrichedsolutions.net",
  tagline: "Financial healing. Legacy building.",
  footerLine: "Financial healing. Legacy building. Community that actually works.",
  // Carried over from the live site. Consider a domain address (e.g. hello@enrichedsolutions.net).
  email: "lwpolite@gmail.com",
  social: {
    facebook: "https://www.facebook.com/EnrichedSolutions",
    instagram: "https://www.instagram.com/enrichedsolutions_whatif",
  },
} as const;

/** EKG: from the hero sheet, "11.17.26". Month is 0-indexed in JS Date. */
export const ekg = {
  label: "11.17.26",
  year: 2026,
  monthIndex: 10,
  day: 17,
  weekday: "Tuesday",
} as const;

export type NavItem = { href: string; label: string; short?: string };

export const nav: NavItem[] = [
  { href: "/ekg", label: "EKG", short: "11.17" },
  { href: "/es-plus", label: "ES+" },
  { href: "/golf-and-heels", label: "Golf & Heels" },
  { href: "/consulting", label: "Consulting" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
];

/** Lead sources the signup API accepts. Keep in sync with /api/lead. */
export const leadSources = ["ekg", "es-plus", "golf-and-heels", "newsletter"] as const;
export type LeadSource = (typeof leadSources)[number];
