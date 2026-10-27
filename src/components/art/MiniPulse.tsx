const PATHS = {
  // One clear beat.
  earn: "M0,40 L40,40 Q48,30 56,40 L70,40 L76,46 L86,10 L94,54 L100,40 L120,40 Q134,28 148,40 L200,40",
  // Three small, steady beats.
  keep: "M0,40 L26,40 L30,43 L36,26 L42,48 L46,40 L84,40 L88,43 L94,26 L100,48 L104,40 L142,40 L146,43 L152,26 L158,48 L162,40 L200,40",
  // Beats that get taller.
  grow: "M0,40 L20,40 L24,42 L30,32 L36,46 L40,40 L66,40 L71,44 L80,20 L88,50 L93,40 L124,40 L130,46 L142,4 L152,58 L158,40 L200,40",
} as const;

/** A small static heartbeat used as an icon on the EKG page. */
export function MiniPulse({ variant, className }: { variant: keyof typeof PATHS; className?: string }) {
  return (
    <svg viewBox="0 0 200 64" aria-hidden="true" focusable="false" className={className}>
      <path
        d={PATHS[variant]}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ filter: "drop-shadow(0 0 4px rgb(212 174 92 / 0.5))" }}
      />
    </svg>
  );
}
