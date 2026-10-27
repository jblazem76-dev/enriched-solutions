import { cn } from "@/lib/cn";
import { Monogram } from "./Monogram";

/** Monogram + "EnRiched / SOLUTIONS" lockup from the EKG sheet header. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-4", className)}>
      <Monogram className="h-9 w-9 text-gold-500" />
      <span aria-hidden="true" className="h-8 w-px bg-ivory/20" />
      {/* One readable name for assistive tech (the two visual lines have no space between them in the DOM). */}
      <span className="sr-only">EnRiched Solutions</span>
      <span aria-hidden="true" className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-[0.01em] text-ivory">EnRiched</span>
        <span className="mt-1.5 text-[0.5rem] font-medium uppercase tracking-[0.55em] text-gold-400">Solutions</span>
      </span>
    </span>
  );
}
