import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-900 pb-24 pt-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(212_174_92/0.12),transparent_70%),linear-gradient(180deg,#0b1626,#070f1b)]"
      />
      <Container>
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="max-w-3xl text-[clamp(2.6rem,7vw,6rem)]">
          This page <em className="gold-text font-normal italic">flatlined</em>.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-[1.8] text-ivory/80">
          We couldn&rsquo;t find what you were looking for. The home page has everything we&rsquo;re working on.
        </p>
        <div className="mt-10">
          <Button href="/" size="lg" arrow>
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
