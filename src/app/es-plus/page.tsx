import type { Metadata } from "next";
import { PhoneMockup } from "@/components/art/PhoneMockup";
import { EsPlusHero } from "@/components/chapters/EsPlusHero";
import { NextUp } from "@/components/home/NextUp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BookIcon, ChatIcon, FlagIcon, FlameIcon, TargetIcon, TicketIcon } from "@/components/ui/icons";

const description =
  "ES+ is a financial wellness platform for women who are ready to stop managing money and start commanding it, through community, education, and accountability that actually works. Coming 2027.";

export const metadata: Metadata = {
  title: "ES+ | Your wealth journey, in your pocket",
  description,
  alternates: { canonical: "/es-plus" },
  openGraph: { title: "ES+ | Enriched Solutions", description, url: "/es-plus" },
};

// Feature copy carried over verbatim from the live ES+ page.
const features = [
  {
    icon: TargetIcon,
    title: "Goal tracking",
    body: "Set your main savings goal and watch it grow. Quick-add deposits, milestone celebrations, and a What If? simulator that shows exactly how your choices compound over time.",
  },
  {
    icon: BookIcon,
    title: "On-demand courses",
    body: "Six core modules that take you from money shame to money clarity. Watch when you want. Review anytime. Short, punchy, and built for the way we actually learn.",
  },
  {
    icon: ChatIcon,
    title: "Community feed",
    body: "Wins, struggles, questions, and real talk. Your cohort-only space to share progress and ask the questions you never could ask out loud before.",
  },
  {
    icon: FlagIcon,
    title: "Challenges",
    body: "Weekly money challenges that actually move the needle. Real rewards. Real accountability. Real results you can measure and celebrate.",
  },
  {
    icon: FlameIcon,
    title: "Habit builder",
    body: "Small daily actions that compound into massive shifts. Streak tracking, gentle reminders, and the satisfaction of watching your consistency grow.",
  },
  {
    icon: TicketIcon,
    title: "Live event pass",
    body: "Virtual access to every enRICHed live session, workshop, and Q&A. Never miss a moment of the energy that started your journey.",
  },
] as const;

const cohorts = [
  {
    label: "Cohort Ignite",
    title: "The Starter Circle",
    body: "For women just beginning their financial wellness journey. Weekly calls, shared goals, and the encouragement to start where you are.",
  },
  {
    label: "Cohort Build",
    title: "The Builders",
    body: "Past the basics and ready to grow. This cohort tackles investing, side income, and long-term planning, together.",
  },
  {
    label: "Cohort Legacy",
    title: "The Legacy Makers",
    body: "For women building wealth that outlasts them. Estate planning, generational conversations, and the hard topics, handled with care.",
  },
] as const;

export default function EsPlusPage() {
  return (
    <>
      <EsPlusHero variant="page" />

      <section id="app" aria-labelledby="app-title" className="relative bg-night-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="ES+: the app"
            title={
              <span id="app-title">
                Your wealth journey, <em>in your pocket</em>
              </span>
            }
            lead="The ES+ app is where the speaking event energy lives between events. Track goals, complete courses, connect with your cohort, and build the habits that actually stick."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <li
                key={feature.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 3) * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-gold-500/15 bg-gradient-to-b from-night-700/70 to-night-800/40 p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-500/40 text-gold-400">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-7 text-[1.7rem] text-ivory">{feature.title}</h3>
                <p className="mt-3 text-[0.98rem] leading-[1.8] text-ivory/70">{feature.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="preview-title" className="relative overflow-hidden bg-night-900 py-24 md:py-32">
        <div aria-hidden="true" className="hex-bg absolute inset-0 -z-10 opacity-25" />
        <Container className="grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <SectionHeading
            eyebrow="A look inside"
            title={
              <span id="preview-title">
                Set your goal. <em>Watch it grow.</em>
              </span>
            }
            lead="Quick-add deposits, milestone celebrations, and a What If? simulator that shows exactly how your choices compound over time."
          />
          <figure className="mx-auto w-[clamp(12.5rem,22vw,17rem)]" data-reveal>
            <PhoneMockup>
              {/* Illustrative screen. The figures are sample data and the figcaption says so. */}
              <div className="flex flex-1 flex-col px-[9%] pb-[8%] pt-[16%] text-left">
                <p className="text-[0.52rem] uppercase tracking-[0.3em] text-ivory/50">Your current goal</p>
                <p className="mt-1 font-display text-[1.15rem] text-ivory">Emergency fund</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-ivory/10">
                  <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold-600 to-gold-300" />
                </div>
                <div className="mt-2 flex justify-between text-[0.58rem] text-ivory/60">
                  <span>$3,720 of $6,000</span>
                  <span className="text-gold-300">62%</span>
                </div>
                <p className="mt-4 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-[0.6rem] text-emerald-200">
                  12-day savings streak. Keep going.
                </p>
                {/* The "What if?" simulator from the feature copy. $2,280 left at $100 a week is about 23 weeks. */}
                <div className="mt-4 rounded-xl border border-gold-500/25 bg-gold-500/[0.06] p-3">
                  <p className="text-[0.48rem] uppercase tracking-[0.3em] text-gold-400">What if?</p>
                  <p className="mt-1 text-[0.66rem] text-ivory">Add $100 a week</p>
                  <div className="relative mt-2 h-1 rounded-full bg-ivory/10">
                    <div className="h-full w-[55%] rounded-full bg-gold-400" />
                    <span className="absolute left-[55%] top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-200" />
                  </div>
                  <svg viewBox="0 0 100 30" aria-hidden="true" className="mt-3 h-9 w-full">
                    <path d="M0,28 L100,28" stroke="currentColor" strokeOpacity="0.15" strokeDasharray="2 3" className="text-ivory" />
                    <path
                      d="M0,26 C20,24 35,20 50,15 S80,6 100,3"
                      fill="none"
                      stroke="#d4ae5c"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p className="mt-1 text-[0.6rem] text-ivory/70">
                    Goal reached in about <span className="text-gold-300">23 weeks</span>
                  </p>
                </div>
                <div className="mt-auto grid grid-cols-2 gap-2 pt-3 text-center text-[0.55rem] font-medium uppercase tracking-[0.12em]">
                  <span className="rounded-lg bg-gold-400 py-2 text-night-950">Add deposit</span>
                  <span className="rounded-lg border border-ivory/15 py-2 text-ivory/70">View goals</span>
                </div>
              </div>
            </PhoneMockup>
            <figcaption className="mt-8 text-center text-[0.72rem] uppercase tracking-[0.22em] text-ivory/55">
              Preview. Sample data.
            </figcaption>
          </figure>
        </Container>
      </section>

      <section id="cohorts" aria-labelledby="cohorts-title" className="relative bg-night-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Community"
            title={
              <span id="cohorts-title">
                Your people are <em>already here</em>
              </span>
            }
            lead="enRICHed isn't just content, it's connection. When you join, you're placed in a cohort of women at a similar stage. Same goals. Same real talk. Same fire."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {cohorts.map((cohort, index) => (
              <li
                key={cohort.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-gold-500/20 bg-night-800/70 p-8 md:p-10"
              >
                <p className="eyebrow !text-[0.68rem]">{cohort.label}</p>
                <h3 className="mt-6 text-[1.9rem] text-ivory">{cohort.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-[1.8] text-ivory/70">{cohort.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="waitlist" aria-labelledby="waitlist-title" className="relative bg-night-900 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Coming 2027"
            title={
              <span id="waitlist-title">
                Be first <em>in line</em>
              </span>
            }
            lead="ES+ launches in 2027. Join the waitlist and we'll save your spot, and send you early access before anyone else."
          />
          <div className="mt-10" data-reveal>
            <Button href="/es-plus/waitlist" size="lg" arrow>
              Join the waitlist
            </Button>
          </div>
        </Container>
      </section>

      <NextUp exclude="es-plus" />
    </>
  );
}
