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

/**
 * EKG is a speaking engagement that can be booked. 11.17.26 is the one appearance on the calendar now
 * (from the hero sheet). Month is 0-indexed in JS Date. After the date passes, update or remove the
 * "On the calendar" section in src/app/ekg/page.tsx.
 */
export const ekg = {
  label: "11.17.26",
  year: 2026,
  monthIndex: 10,
  day: 17,
  weekday: "Tuesday",
  /**
   * Registration link supplied by the host of the 11.17.26 appearance. Null until it arrives; the page says
   * so honestly instead of showing a dead button. Set it here and "Save my spot" starts working.
   */
  registrationUrl: null as string | null,
} as const;

/** Ways to book EKG, as the booking form and /api/lead both know them. Keep in sync with the form's labels. */
export const ekgFormats = ["conference", "event", "solo", "not-sure"] as const;
export type EkgFormat = (typeof ekgFormats)[number];

export type NavItem = { href: string; label: string };

export const nav: NavItem[] = [
  { href: "/ekg", label: "EKG" },
  { href: "/es-plus", label: "ES+" },
  { href: "/golf-and-heels", label: "Golf & Heels" },
  { href: "/consulting", label: "Consulting" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "About" },
];

/** Lead sources the signup API accepts. Keep in sync with /api/lead. */
export const leadSources = ["ekg-booking", "es-plus", "golf-and-heels", "newsletter"] as const;
export type LeadSource = (typeof leadSources)[number];
