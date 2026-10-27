import { useId } from "react";

const W = 1440;
const H = 300;
const BASE = 200;

type Beat = {
  /** x of the R peak. */
  x: number;
  /** Horizontal scale. Keep (x ± ~160·sx) clear of neighbouring beats so the path stays left-to-right. */
  sx: number;
  /** Vertical scale: 1 gives a ~96 unit R spike. */
  sy: number;
};

// Small beats either side, one big beat in the centre where the spark and "EKG" lettering sit.
const BEATS: Beat[] = [
  { x: 170, sx: 0.7, sy: 0.7 },
  { x: 430, sx: 0.75, sy: 0.95 },
  { x: 720, sx: 0.9, sy: 1.8 },
  { x: 1010, sx: 0.75, sy: 0.95 },
  { x: 1270, sx: 0.7, sy: 0.7 },
];

/** Builds a P-QRS-T style trace as a single polyline/curve path. */
function buildPath(beats: Beat[]): string {
  const f = (n: number) => n.toFixed(1);
  let d = `M0,${BASE}`;
  for (const { x, sx, sy } of beats) {
    d += `L${f(x - 150 * sx)},${BASE}`;
    d += `Q${f(x - 122 * sx)},${f(BASE - 26 * sy)} ${f(x - 92 * sx)},${BASE}`; // P wave
    d += `L${f(x - 34 * sx)},${BASE}`;
    d += `L${f(x - 24 * sx)},${f(BASE + 12 * sy)}`; // Q
    d += `L${f(x)},${f(BASE - 96 * sy)}`; // R
    d += `L${f(x + 18 * sx)},${f(BASE + 34 * sy)}`; // S
    d += `L${f(x + 32 * sx)},${BASE}`;
    d += `L${f(x + 78 * sx)},${BASE}`;
    d += `Q${f(x + 120 * sx)},${f(BASE - 40 * sy)} ${f(x + 168 * sx)},${BASE}`; // T wave
  }
  return `${d}L${W},${BASE}`;
}

const PATH = buildPath(BEATS);

/** Height of the SVG at which BASE sits, as a fraction. Used by callers to align the baseline. */
export const PULSE_BASELINE = BASE / H;

/** Decorative gold heartbeat trace: draws itself in, then a bright pulse runs along it. */
export function PulseLine({ className }: { className?: string }) {
  const uid = useId();
  const gradient = `${uid}-fade`;
  const mask = `${uid}-mask`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <defs>
        <linearGradient id={gradient} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" />
          <stop offset="0.14" stopColor="#fff" />
          <stop offset="0.86" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={mask}>
          <rect width={W} height={H} fill={`url(#${gradient})`} />
        </mask>
      </defs>
      <g mask={`url(#${mask})`} className="pulse-glow" fill="none" strokeLinejoin="round" strokeLinecap="round">
        <path d={PATH} stroke="#d4ae5c" strokeOpacity="0.3" strokeWidth="1.5" />
        <path d={PATH} pathLength={1} className="pulse-trace" stroke="#d4ae5c" strokeWidth="2" />
        <path d={PATH} pathLength={1} className="pulse-runner" stroke="#f6ecc9" strokeWidth="2.8" />
      </g>
    </svg>
  );
}
