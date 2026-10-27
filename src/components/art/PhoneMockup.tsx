import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Float gently. Respects reduced motion via CSS. */
  float?: boolean;
};

/** A dark, gold-rimmed phone drawn in CSS. Pass the screen contents as children. */
export function PhoneMockup({ children, className, float = true }: Props) {
  return (
    <div className={cn("relative aspect-[9/19] w-full", float && "float-slow", className)}>
      {/* Warm glow under the device */}
      <div
        aria-hidden="true"
        className="absolute -inset-x-[30%] -bottom-[8%] -z-10 h-[40%] bg-[radial-gradient(closest-side,rgb(200_157_71/0.22),transparent)]"
      />
      <div className="absolute inset-0 rounded-[2.4rem] border border-gold-500/25 bg-gradient-to-b from-night-700 to-night-950 p-[3.2%] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.9),inset_0_0_0_1px_rgb(255_255_255/0.04)]">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.9rem] bg-black">
          {/* Dynamic island */}
          <div aria-hidden="true" className="absolute left-1/2 top-[2.2%] z-10 h-[3%] w-[30%] -translate-x-1/2 rounded-full bg-night-900" />
          {/* Diagonal sheen */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(118deg,transparent_30%,rgb(255_255_255/0.05)_44%,transparent_58%)]"
          />
          {children}
        </div>
      </div>
      {/* Side buttons */}
      <span aria-hidden="true" className="absolute -left-px top-[20%] h-[6%] w-[1.2%] rounded-l bg-night-600" />
      <span aria-hidden="true" className="absolute -left-px top-[29%] h-[9%] w-[1.2%] rounded-l bg-night-600" />
      <span aria-hidden="true" className="absolute -right-px top-[26%] h-[12%] w-[1.2%] rounded-r bg-night-600" />
    </div>
  );
}
