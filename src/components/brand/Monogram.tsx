import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "./monogram-paths";

type Props = {
  /** "solid" fills with currentColor; "outline" is the hairline version used as a large watermark. */
  variant?: "solid" | "outline";
  className?: string;
  /** Outline stroke width in CSS pixels (stays constant when the mark is scaled). */
  strokeWidth?: number;
};

/** The official ES monogram, inline so it inherits colour from text-* utilities. Decorative by default. */
export function Monogram({ variant = "solid", className, strokeWidth = 1 }: Props) {
  return (
    <svg viewBox={MONOGRAM_VIEWBOX} aria-hidden="true" focusable="false" className={className}>
      {variant === "solid" ? (
        <path d={MONOGRAM_PATH} fill="currentColor" />
      ) : (
        <path
          d={MONOGRAM_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}
