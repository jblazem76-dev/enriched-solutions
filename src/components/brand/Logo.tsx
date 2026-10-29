import Image from "next/image";
import { cn } from "@/lib/cn";

/** The official horizontal lockup (gold monogram, white wordmark) for the dark site background. */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/enriched-lockup-horizontal-reverse.svg"
      alt="EnRiched Solutions"
      width={395}
      height={100}
      priority
      className={cn("h-10 w-auto sm:h-11", className)}
    />
  );
}
