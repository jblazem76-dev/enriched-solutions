import Image from "next/image";

/** The official "ENRICHED SOLUTIONS" seal in brand gold. Decorative; the brand name is always present in nearby text. */
export function Seal({ className }: { className?: string }) {
  return <Image src="/brand/enriched-seal-gold.svg" alt="" width={220} height={220} className={className} />;
}
