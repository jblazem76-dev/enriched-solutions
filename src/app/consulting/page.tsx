import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageIntro } from "@/components/ui/PageIntro";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { mailto } from "@/lib/site";

export const metadata: Metadata = {
  title: "Consulting",
  description: "Executive consulting from Enriched Solutions: fractional C-suite leadership, operational strategy, and organizational needs assessments.",
  alternates: { canonical: "/consulting" },
};

// Copy carried over from the live site's Consulting page.
const services = [
  {
    title: "Chief of Staff",
    body: "Executive-level support bridging leadership and operations: managing priorities, driving alignment, and ensuring nothing falls through the cracks.",
  },
  {
    title: "Operations Manager / Officer",
    body: "End-to-end operational oversight: process design, vendor management, quality control, and the systems that keep your organization running at its best.",
  },
  {
    title: "Financial Manager",
    body: "Financial statement analysis, cash forecasting, income and expenditure strategy. Clarity on where your money is going and how to make it work harder.",
  },
  {
    title: "Project Management",
    body: "Special projects scoped, staffed, and delivered on time. From strategic initiatives to operational overhauls, we manage the work so you can lead.",
  },
] as const;

const domains = [
  "Strategy",
  "Operations",
  "Finance",
  "Information Technology",
  "Supply Chain",
  "Human Resources",
  "Legal",
  "Risk",
  "Change Management",
  "Culture",
  "Communications",
  "Sustainability",
  "Facilities",
  "Governance",
  "Compliance",
] as const;

const bookLink = mailto("Consultation request");

export default function ConsultingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Business consulting"
        title={
          <>
            Executive expertise, <em>on your terms</em>
          </>
        }
        lead={
          <p>
            Enriched Solutions serves as a trusted partner for businesses and organizations that need senior-level
            leadership without the full-time commitment. We embed, assess, and deliver.
          </p>
        }
        actions={
          <Button href={bookLink} size="lg" arrow>
            Book a consultation
          </Button>
        }
      />

      <section aria-labelledby="services-title" className="relative bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title={
              <span id="services-title">
                Embed. <em>Assess. Deliver.</em>
              </span>
            }
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <li
                key={service.title}
                data-reveal
                style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
                className="rounded-3xl border border-gold-500/20 bg-ivory/[0.025] p-8 md:p-10"
              >
                <p className="eyebrow !text-[0.68rem]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-6 text-[clamp(1.7rem,2.6vw,2.2rem)] leading-tight text-ivory">{service.title}</h3>
                <p className="mt-4 text-[0.98rem] leading-[1.8] text-ivory/70">{service.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="assessment-title" className="relative bg-navy-950 py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container className="grid items-start gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <SectionHeading
            eyebrow="Where we start"
            title={
              <span id="assessment-title">
                Complete <em>Needs Assessment</em>
              </span>
            }
            lead="Every engagement begins with a comprehensive look across 15 organizational domains, so we know exactly where to focus and what will move the needle most."
          />
          <ul aria-label="The 15 organizational domains" className="flex flex-wrap gap-3" data-reveal>
            {domains.map((domain) => (
              <li
                key={domain}
                className="rounded-full border border-gold-500/30 bg-gold-500/[0.05] px-5 py-2.5 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-ivory/85"
              >
                {domain}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="consult-cta-title" className="relative bg-ink py-24 md:py-32">
        <div aria-hidden="true" className="hairline absolute inset-x-0 top-0" />
        <Container>
          <SectionHeading
            eyebrow="Next step"
            title={
              <span id="consult-cta-title">
                Let&rsquo;s start with <em>a conversation</em>
              </span>
            }
            lead="Ready to explore how Enriched Solutions can support your organization?"
          />
          <div className="mt-10" data-reveal>
            <Button href={bookLink} size="lg" arrow>
              Book a consultation
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
