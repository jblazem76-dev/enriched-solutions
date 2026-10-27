import { MONOGRAM_LLC_PATH, MONOGRAM_PATH } from "./monogram-paths";

type Props = {
  /** "solid" fills with currentColor; "outline" is the hairline version used as a large watermark. */
  variant?: "solid" | "outline";
  /** Include the small L and C corner letters. The hero sheets use the mark without them. */
  llc?: boolean;
  className?: string;
  /** Outline stroke width in CSS pixels (stays constant when the mark is scaled). */
  strokeWidth?: number;
};

/** The ES monogram, inline so it inherits colour from text-* utilities. Decorative by default. */
export function Monogram({ variant = "solid", llc = false, className, strokeWidth = 1 }: Props) {
  const d = llc ? MONOGRAM_LLC_PATH : MONOGRAM_PATH;
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" focusable="false" className={className}>
      {variant === "solid" ? (
        <path d={d} fill="currentColor" fillRule="evenodd" />
      ) : (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fillRule="evenodd"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
