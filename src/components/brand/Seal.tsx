import { useId } from "react";
import { MONOGRAM_PATH } from "./monogram-paths";

/**
 * The circular "ENRICHED SOLUTIONS" seal from the Golf & Heels sheet, drawn as live SVG
 * so it stays sharp at any size. Decorative; the brand name is always present in nearby text.
 */
export function Seal({ className }: { className?: string }) {
  const uid = useId();
  const top = `${uid}-top`;
  const bottom = `${uid}-bottom`;
  return (
    <svg viewBox="0 0 240 240" aria-hidden="true" focusable="false" className={className}>
      <defs>
        {/* Top text reads clockwise (glyph tops point outward); bottom reads counter-clockwise. */}
        <path id={top} d="M 34,120 A 86,86 0 0 1 206,120" />
        <path id={bottom} d="M 22,120 A 98,98 0 0 0 218,120" />
      </defs>
      <circle cx="120" cy="120" r="117" fill="#f3eee2" stroke="#c89d47" strokeWidth="2" />
      <circle cx="120" cy="120" r="109" fill="none" stroke="#c89d47" strokeWidth="0.8" />
      <circle cx="120" cy="120" r="68" fill="none" stroke="#c89d47" strokeWidth="0.8" />
      <g fill="#8a6a28" fontFamily="var(--font-montserrat), sans-serif" fontWeight="600" fontSize="15.5" letterSpacing="5.2">
        <text>
          <textPath href={`#${top}`} startOffset="50%" textAnchor="middle">
            ENRICHED SOLUTIONS
          </textPath>
        </text>
        <text>
          <textPath href={`#${bottom}`} startOffset="50%" textAnchor="middle">
            ENRICHED SOLUTIONS
          </textPath>
        </text>
      </g>
      <g fill="#c89d47">
        <path d="M 22,120 l 4,-4 l 4,4 l -4,4 z" />
        <path d="M 210,120 l 4,-4 l 4,4 l -4,4 z" />
      </g>
      {/* The 200-unit monogram scaled to 72 units and centred inside the inner ring. */}
      <g transform="translate(84 84) scale(0.36)">
        <path d={MONOGRAM_PATH} fill="#c89d47" fillRule="evenodd" />
      </g>
    </svg>
  );
}
