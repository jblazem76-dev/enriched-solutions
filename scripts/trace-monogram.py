"""
Traces the 200px ES monogram (logo-badge.png from the old site) into the SVG paths used in
src/components/brand/monogram-paths.ts and public/brand/*.svg.

This is a stop-gap. A trace of a 200px bitmap is smooth but not perfect at very large sizes.
Replace it with the designer's original vector file when you have it, then update monogram-paths.ts.

Usage:   pip install potracer pillow numpy
         python scripts/trace-monogram.py path/to/logo-badge.png
Output:  prints the SVG path data (with and without the small L and C corner letters).
"""
import re
import sys

import numpy as np
import potrace
from PIL import Image

SCALE = 8  # upscale the alpha channel first so potrace has enough pixels to fit smooth curves

src = sys.argv[1]
image = Image.open(src).convert("RGBA")
alpha = image.getchannel("A").resize((image.width * SCALE, image.height * SCALE), Image.LANCZOS)
# potracer treats True as background here, so invert the mask.
curves = potrace.Bitmap(np.array(alpha) <= 127).trace(
    turdsize=6, turnpolicy=potrace.POTRACE_TURNPOLICY_MINORITY, alphamax=1.0, opticurve=True, opttolerance=0.4
)

def fmt(p):
    return f"{p.x / SCALE:.2f} {p.y / SCALE:.2f}"

subpaths = []
for curve in curves:
    d = [f"M{fmt(curve.start_point)}"]
    for seg in curve.segments:
        d.append(f"L{fmt(seg.c)}L{fmt(seg.end_point)}" if seg.is_corner else f"C{fmt(seg.c1)} {fmt(seg.c2)} {fmt(seg.end_point)}")
    subpaths.append("".join(d) + "Z")

def bbox(path):
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", path)]
    xs, ys = nums[0::2], nums[1::2]
    return min(xs), max(xs), min(ys), max(ys)

# The small "L" and "C" are the tiny subpaths in the bottom corners.
without_llc = [p for p in subpaths if not (bbox(p)[2] > 150 and (bbox(p)[1] - bbox(p)[0]) < 40)]
print("WITH LLC:\n" + "".join(subpaths) + "\n")
print("WITHOUT LLC:\n" + "".join(without_llc))
