/**
 * Marks a fact we do not have yet. Use this instead of inventing a time, venue or price:
 * the page stays honest and every placeholder is easy to find (search for <Tbc />).
 */
export function Tbc({ children = "To be confirmed" }: { children?: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-dashed border-gold-500/60 px-3 py-0.5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-gold-300">
      {children}
    </span>
  );
}
