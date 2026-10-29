# Enriched Solutions

Website for [Enriched Solutions](https://www.enrichedsolutions.net): the home page with its three hero experiences, plus a page for each.

| Route | What it is | Status |
| --- | --- | --- |
| `/` | Home: **EKG**, **ES+** and **Golf & Heels** as three hero slides that move side to side (arrows, labelled tabs, swipe, arrow keys), then a path to the rest of the site | Designed |
| `/ekg` | EKG: The Heart of Our Money. A speaking engagement that can be booked for conferences, events or as a solo offering, with a booking form and the **11.17.26** appearance on the calendar | Designed. Time, venue, rates and the registration link are placeholders (see below) |
| `/es-plus` | ES+ app: Coming 2027. Deliberately short (hero and waitlist): the features, app preview and cohorts are held back until closer to launch, and kept in `src/components/es-plus/Offerings.tsx` (not imported, so not shipped) | Designed |
| `/golf-and-heels` | Golf & Heels: Spring 2027 | Designed |
| `/ekg/book` | The EKG booking form, on its own page | Designed |
| `/es-plus/waitlist` | The ES+ waitlist form, on its own page | Designed |
| `/golf-and-heels/interest` | The Golf & Heels interest-list form, on its own page | Designed |
| `/consulting` `/speaking` `/about` | Designed pages carrying all of the live site's copy: the four consulting services and the 15-domain needs assessment; the signature keynote and five talk topics; the founder's bio, education, roles and community. `/speaking` features EKG and links to `/ekg`. Booking and contact buttons open an email to the contact address | Designed. No prices or packages were on the old pages |
| `/retreat` | The enRICHed Experience, the 3-day annual retreat, carried over from the previous site | Live copy. **Next dates to be confirmed** (the old page said "Sept 2025", which has passed) |
| `/privacy` `/terms` | Placeholders (`noindex`) | **Real text needed before launch** |

Addresses the previous site had that no longer exist redirect (temporarily, HTTP 307, set in `next.config.ts`): `/community` →
`/es-plus` and `/deck` → `/`.
| `POST /api/lead` | Receives the forms and delivers them through the Resend API (or forwards them to a webhook, such as the Azure API) | Needs `RESEND_API_KEY` and `LEAD_NOTIFY_EMAIL`, or `LEAD_WEBHOOK_URL` |
| `azure-api/` | **Separate package**: a shared Azure Functions API that delivers leads through Resend for every ES project | Built and tested; **not yet deployed** (see `azure-api/README.md`) |

## Stack

Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS v4. Fonts are self-hosted from `src/app/fonts`
(Bodoni Moda, Montserrat, Anton; all SIL OFL), so nothing is fetched from Google at build or run time. No UI library, no
animation library: motion is CSS plus one small `IntersectionObserver`.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
npm run lint
npx next typegen && npx tsc --noEmit   # typegen creates Next's route types, which a fresh clone does not have yet
```

## Configuration

Copy `.env.example` to `.env.local`.

The forms (the EKG booking request, and the ES+ and Golf & Heels sign-ups) post to `/api/lead`, which delivers them through
the **Resend API**. Set these in your host's environment variables:

- `RESEND_API_KEY`: a Resend key with sending access (resend.com/api-keys).
- `LEAD_NOTIFY_EMAIL`: where the notification emails arrive. Each booking request is emailed here, and replying to that
  email answers the person who filled in the form.
- `LEAD_FROM_EMAIL` (optional): the sender. Until `enrichedsolutions.net` is verified in Resend, leave it empty: Resend's test
  sender (`onboarding@resend.dev`) only delivers to the Resend account owner's own address, so set `LEAD_NOTIFY_EMAIL` to that
  address. After verifying the domain, use e.g. `Enriched Solutions <hello@enrichedsolutions.net>`.
- `RESEND_SEGMENT_ID` (optional): sign-ups (not booking requests) are also saved as contacts in this Resend segment.
  Booking requests are only emailed: an organizer asking about EKG has not agreed to a marketing list.
- `LEAD_WEBHOOK_URL` (alternative): any endpoint that accepts a JSON POST (Zapier, Make, your own API). Used only when
  `RESEND_API_KEY` is empty. **To use the shared Azure API** (`azure-api/`, which delivers through Resend for all ES
  projects), set this to its `/api/lead` URL, set `LEAD_WEBHOOK_KEY` to its function key, and leave `RESEND_API_KEY` empty.
  See `azure-api/README.md`.

**With none of these set, `/api/lead` answers 503 and the forms tell visitors to email instead.** It never pretends to have
saved a request. If delivery fails, the form shows an error with the email address; the server log records the status and
Resend's error name, never the visitor's details.

Site facts (name, email, social links, nav, the EKG date and registration link) live in `src/lib/site.ts`.

## Design system

Colours were sampled from the three hero sheets and live in `src/app/globals.css` as Tailwind theme tokens:
`navy-*` (EKG), `night-*` (ES+), `fairway-*` (Golf & Heels), one `gold-*` scale, `ivory` for text.
Display type is Bodoni Moda (`font-display`), tracked caps and body are Montserrat (`font-sans`), and `font-impact` (Anton)
is used only for "GOLF" and "SPRING 2027".

- `src/components/chapters/*Hero.tsx`: each hero sheet rebuilt as live, responsive markup. `variant="chapter"` is the home
  page version (links onward); `variant="page"` is the top of that hero's own page.
- `src/components/art/`: `PulseLine` (the EKG trace), `PhoneMockup`, `MiniPulse`.
- `src/components/brand/`: `Monogram` (inline official mark), `Seal` and `Logo` (official brand-kit files).
- `src/components/forms/SignupForm.tsx`: visible labels, a honeypot, and honest success / failure states.

### Accessibility and resilience (verified, not assumed)

axe-core reports 0 violations on every route at 1440px and 390px. Text contrast was measured against the real pixels behind
every string, including text over the golf photo and the hex relief. Also covered: skip link, visible focus on every tab stop,
a menu that closes on Escape and returns focus, `prefers-reduced-motion` (the pulse, orb and reveals all stop), no horizontal
scroll at 320px or at 200% text size, and no content hidden when JavaScript is off or the bundle fails to load (a CSS failsafe
reveals everything after 4 seconds).

## What is still placeholder, and what is needed

Nothing below was invented. Each item is marked in the page as "To be confirmed" or flagged in a code comment.

1. **EKG details**: length, format and rates of the three ways to book, and the time and venue of 11.17.26, show "To be
   confirmed" (search for `<Tbc />` in `src/app/ekg/page.tsx`). The three one-line readings of Earn it / Keep it / Grow it
   and the copy for the three formats are **draft copy**.
   - **Registration for 11.17.26** is the buyer's Google Form (`ekg.registrationUrl` in `src/lib/site.ts`). **Save my spot**
     (in the hero and in `/ekg#next`) opens it in a popup on the page, with a Close button, and from the day after 11.17.26 it becomes a disabled
     "Registration closed" button. The date is read in the visitor's browser, so a visitor with JavaScript off would still
     see the link: **also close the Google Form itself after the event**.
   - **After 11.17.26**, update or remove the "On the calendar" section in `src/app/ekg/page.tsx`. The countdown hides
     itself and the button goes dead, but the section would still announce a past date.
   - **Forms**: verify `enrichedsolutions.net` in Resend, then set `LEAD_FROM_EMAIL` (see Configuration). The contact-saving
     call to Resend could not be checked against Resend's docs from the build environment, so send one test sign-up after
     setting `RESEND_SEGMENT_ID` and confirm the contact appears. Notification emails are tested end to end against a mock.
2. **Golf & Heels** is built from the live site's "Women's Growth Day: Indoor Golf Retreat" copy. **Please confirm they are the
   same event.** Exact date and venue are marked "To be confirmed".
3. **Photos.** The golf still (`public/images/golf-heels-still.jpg`) is cropped from the hero sheet and is only
   1260px wide, so it will look soft on large screens: swap in the original photo.
   **Logos** are the official brand-kit files in `public/brand/` (horizontal and stacked lockups, monogram, seal, each in
   several colours). The header and footer use the horizontal reverse lockup, the Golf & Heels hero uses the gold seal, and
   the ES+ hero uses the monogram path in `src/components/brand/monogram-paths.ts` (copied from the brand-kit monogram).
   The favicon (`src/app/icon.svg`) and the app icon (`src/app/apple-icon.png`) are the gold monogram on navy.
4. **Consulting, Speaking, About** are holding pages so navigation never 404s. They carry the live site's copy and should be
   replaced in the next pass.
5. **Privacy and Terms** are placeholders and `noindex`. The site collects email addresses, so real text is required.
6. **Contact email** is still `lwpolite@gmail.com` from the live site. A domain address would look more established.
7. **Social preview image** (Open Graph) is not set yet, so shared links show no picture.
8. The footer says `© 2026`; update the year or generate it.
9. `/api/lead` has no rate limiting (it is stateless). If spam appears, put it behind your host's rate limiter or add a
   captcha. The honeypot and same-origin check stop the basic cases.
