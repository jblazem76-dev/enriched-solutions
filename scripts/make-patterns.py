"""
Generates the two static textures in public/patterns/:
  hex.svg    pointy-top hexagon relief used behind ES+ (776x504 seamless tile, seeded variation)
  grain.svg  film grain overlay

Usage: python scripts/make-patterns.py
"""
import math
import random
from pathlib import Path

out = Path(__file__).resolve().parent.parent / "public" / "patterns"
out.mkdir(parents=True, exist_ok=True)

R = 56.0
W_HEX, ROW_H = math.sqrt(3) * R, 1.5 * R
COLS, ROWS = 8, 6  # rows must be even so the half-width row offset wraps cleanly
W, H = W_HEX * COLS, ROW_H * ROWS

def hex_points(cx, cy):
    return " ".join(
        f"{cx + R * math.cos(math.radians(60 * i - 30)):.1f},{cy + R * math.sin(math.radians(60 * i - 30)):.1f}" for i in range(6)
    )

polys = []
for row in range(-1, ROWS + 1):
    for col in range(-1, COLS + 1):
        cx = col * W_HEX + (W_HEX / 2 if row % 2 else 0)
        cy = row * ROW_H
        seed = (row % ROWS) * COLS + (col % COLS)  # hexes that wrap around the tile edge share a seed
        shade = random.Random(seed * 7919).random()
        polys.append(f'<polygon points="{hex_points(cx, cy)}" fill="url(#g)" opacity="{0.25 + 0.75 * shade:.2f}"/>')

(out / "hex.svg").write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{W:.0f}" height="{H:.0f}" viewBox="0 0 {W:.1f} {H:.1f}">'
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".085"/>'
    '<stop offset=".55" stop-color="#fff" stop-opacity=".02"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient></defs>'
    '<g stroke="#000" stroke-opacity=".7" stroke-width="3" stroke-linejoin="round">' + "".join(polys) + "</g></svg>"
)

(out / "grain.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220"><filter id="n" x="0" y="0" width="100%" height="100%">'
    '<feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" stitchTiles="stitch"/>'
    '<feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/></filter>'
    '<rect width="100%" height="100%" filter="url(#n)"/></svg>'
)
print("wrote", out / "hex.svg", "and", out / "grain.svg")
