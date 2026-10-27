/** First focusable element on every page. Visible only when focused. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-gold-400 px-5 py-3 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-night-950 transition-transform focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}
