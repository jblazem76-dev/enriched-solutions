# Enriched Solutions

Website for [Enriched Solutions](https://www.enrichedsolutions.net): the home page with its three hero experiences, plus a page for each.

| Route | What it is | Status |
| --- | --- | --- |
| `/` | Home: **EKG**, **ES+** and **Golf & Heels** as three full-height chapters, then a path to the rest of the site | Designed |
| `/ekg` | EKG: The Heart of Our Money, **11.17.26** | Designed. Event details are placeholders (see below) |
| `/es-plus` | ES+ app: Coming 2027 | Designed |
| `/golf-and-heels` | Golf & Heels: Spring 2027 | Designed |
| `/consulting` `/speaking` `/about` | Short holding pages with the live site's copy | **Next pass** |
| `/privacy` `/terms` | Placeholders (`noindex`) | **Real text needed before launch** |
| `POST /api/lead` | Receives sign-ups and forwards them to your webhook | Needs `LEAD_WEBHOOK_URL` |

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4. Fonts are self-hosted from `src/app/fonts`
(Bodoni Moda, Montserrat, Anton; all SIL OFL), so nothing is fetched from Google at build or run time. No UI library, no
animation library: motion is CSS plus one small `IntersectionObserver`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
npx tsc --noEmit
```

## Configuration

Copy `.env.example` to `.env.local`.

- `LEAD_WEBHOOK_URL`: where sign-ups go (Zapier, Make, a Resend or Mailchimp automation, your own endpoint). It receives
  `{ name, email, source, submittedAt, site }` as JSON. **Without it, `/api/lead` answers 503 and the forms tell visitors
  to email instead.** It never pretends to have saved someone.
- Site facts (name, email, social links, nav, the EKG date) live in `src/lib/site.ts`.

## Design system

Colours were sampled from the three hero sheets and live in `src/app/globals.css` as Tailwind theme tokens:
`navy-*` (EKG), `night-*` (ES+), `fairway-*` (Golf & Heels), one `gold-*` scale, `ivory` for text.
Display type is Bodoni Moda (`font-display`), tracked caps and body are Montserrat (`font-sans`), and `font-impact` (Anton)
is used only for "GOLF" and "SPRING 2027".

- `src/components/chapters/*Hero.tsx`: each hero sheet rebuilt as live, responsive markup. `variant="chapter"` is the home
  page version (links onward); `variant="page"` is the top of that hero's own page.
- `src/components/art/`: `PulseLine` (the EKG trace), `PhoneMockup`, `MiniPulse`.
- `src/components/brand/`: `Monogram`, `Seal` (the circular badge as live SVG text), `Logo`.
- `src/components/forms/SignupForm.tsx`: visible labels, a honeypot, and honest success / failure states.

### Accessibility and resilience (verified, not assumed)

axe-core reports 0 violations on every route at 1440px and 390px. Text contrast was measured against the real pixels behind
every string, including text over the golf photo and the hex relief. Also covered: skip link, visible focus on every tab stop,
a menu that closes on Escape and returns focus, `prefers-reduced-motion` (the pulse, orb and reveals all stop), no horizontal
scroll at 320px or at 200% text size, and no content hidden when JavaScript is off or the bundle fails to load (a CSS failsafe
reveals everything after 4 seconds).

## What is still placeholder, and what is needed

Nothing below was invented. Each item is marked in the page as "To be confirmed" or flagged in a code comment.

1. **EKG details**: time, venue, format and tickets show "To be confirmed" (`/ekg#details`, search for `<Tbc />`). The three
   one-line readings of Earn it / Keep it / Grow it in `src/app/ekg/page.tsx` are **draft copy**.
2. **Golf & Heels** is built from the live site's "Women's Growth Day: Indoor Golf Retreat" copy. **Please confirm they are the
   same event.** Exact date and venue are marked "To be confirmed".
3. **Photos and logo files.** The golf still (`public/images/golf-heels-still.jpg`) is cropped from the hero sheet and is only
   1260px wide, so it will look soft on large screens: swap in the original photo. The monogram SVG
   (`src/components/brand/monogram-paths.ts`, `public/brand/`) is **traced from the 200px logo**, which is smooth but not
   perfect when huge: swap in the designer's vector. `scripts/trace-monogram.py` shows how it was made.
4. **Consulting, Speaking, About** are holding pages so navigation never 404s. They carry the live site's copy and should be
   replaced in the next pass.
5. **Privacy and Terms** are placeholders and `noindex`. The site collects email addresses, so real text is required.
6. **Contact email** is still `lwpolite@gmail.com` from the live site. A domain address would look more established.
7. **Social preview image** (Open Graph) is not set yet, so shared links show no picture.
8. The footer says `© 2026`; update the year or generate it.
9. `/api/lead` has no rate limiting (it is stateless). If spam appears, put it behind your host's rate limiter or add a
   captcha. The honeypot and same-origin check stop the basic cases.
