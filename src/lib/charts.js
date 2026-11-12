// Sahra's chart helpers: scales, paths, ticks. Pure functions that return numbers and SVG path strings.
// Charts are drawn as inline SVG by the pages; geometry goes in attributes, never in CSS.
// The chart language comes from the word-mark and the print pieces: one stroke weight, quarter-circle corners,
// 45° cut ends, thin rules with small numbers (the ruled rows of the About page), the quarter arch, and the
// stepped shadow of the photographs.

export const scale = (d0, d1, r0, r1) => (v) => r0 + ((v - d0) / (d1 - d0 || 1)) * (r1 - r0);
export const r2 = (n) => Math.round(n * 100) / 100;

// linePath([[x,y],...]) -> "M..L.." (straight segments)
export function linePath(points) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'}${r2(x)} ${r2(y)}`).join('');
}

// Stepped line: horizontal then vertical (the stepped shadow on the stairs of the photographs).
export function stepPath(points) {
  let d = '';
  points.forEach(([x, y], i) => {
    if (!i) d += `M${r2(x)} ${r2(y)}`;
    else d += `H${r2(x)}V${r2(y)}`;
  });
  return d;
}

// A smooth line through the points (Catmull-Rom as cubic Béziers): dunes, curved walls. tension 0..1.
export function smoothPath(points, tension = 0.5) {
  if (points.length < 3) return linePath(points);
  let d = `M${r2(points[0][0])} ${r2(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i], p1 = points[i], p2 = points[i + 1], p3 = points[i + 2] || p2;
    const t = tension / 3;
    const c1 = [p1[0] + (p2[0] - p0[0]) * t, p1[1] + (p2[1] - p0[1]) * t];
    const c2 = [p2[0] - (p3[0] - p1[0]) * t, p2[1] - (p3[1] - p1[1]) * t];
    d += `C${r2(c1[0])} ${r2(c1[1])} ${r2(c2[0])} ${r2(c2[1])} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return d;
}

// Closes a line down to a baseline. kind: 'line' | 'step' | 'smooth'
export function areaPath(points, baseY, kind = 'line') {
  const top = kind === 'step' ? stepPath(points) : kind === 'smooth' ? smoothPath(points) : linePath(points);
  return `${top}L${r2(points[points.length - 1][0])} ${r2(baseY)}L${r2(points[0][0])} ${r2(baseY)}Z`;
}

// Polar point. deg: 0 = 12 o'clock, clockwise.
export const polar = (cx, cy, r, deg) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(cx + r * Math.cos(a)), r2(cy + r * Math.sin(a))];
};

// Arc (centre line) from angle a0 to a1 in degrees, 0 = 12 o'clock, clockwise.
export function arcPath(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 1 : 0;
  return `M${x0} ${y0}A${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

// A thick band between two radii with straight radial ends: the quarter arch is bandPath(cx, cy, r, R, 270, 360).
export function bandPath(cx, cy, r0, r1, a0, a1) {
  const [ax, ay] = polar(cx, cy, r1, a0), [bx, by] = polar(cx, cy, r1, a1);
  const [cx2, cy2] = polar(cx, cy, r0, a1), [dx, dy] = polar(cx, cy, r0, a0);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${ax} ${ay}A${r1} ${r1} 0 ${large} 1 ${bx} ${by}L${cx2} ${cy2}A${r0} ${r0} 0 ${large} 0 ${dx} ${dy}Z`;
}

export const arcLength = (r, a0, a1) => r2((Math.abs(a1 - a0) * Math.PI * r) / 180);

// A bar in the word-mark's manner: square at the base, with an optional quarter-circle corner at the top
// ('tl' or 'tr', radius = min(w, radius)) and an optional 45° cut across the top ('cut': rising to the right,
// as the stems of h and alif). bar(x, yTop, w, h, { round: 'tr', cut: false, radius })
export function barPath(x, y, w, h, { round, cut = false, radius } = {}) {
  const b = y + h;
  if (h <= 0) return '';
  if (cut) {
    const c = Math.min(w, h);
    return `M${r2(x)} ${r2(b)}V${r2(y + c)}L${r2(x + w)} ${r2(y)}V${r2(b)}Z`;
  }
  const rr = Math.min(radius === undefined ? w : radius, w, h);
  if (round === 'tl') return `M${r2(x)} ${r2(b)}V${r2(y + rr)}A${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + rr)} ${r2(y)}H${r2(x + w)}V${r2(b)}Z`;
  if (round === 'tr') return `M${r2(x)} ${r2(b)}V${r2(y)}H${r2(x + w - rr)}A${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + w)} ${r2(y + rr)}V${r2(b)}Z`;
  return `M${r2(x)} ${r2(b)}V${r2(y)}H${r2(x + w)}V${r2(b)}Z`;
}

// Horizontal bar growing from the left with a rounded right end (the sad's loop): hbar(x, y, w, h)
export function hbarPath(x, y, w, h) {
  const rr = Math.min(h / 2, w);
  return `M${r2(x)} ${r2(y)}H${r2(x + w - rr)}A${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + w)} ${r2(y + rr)}V${r2(y + h - rr)}A${r2(rr)} ${r2(rr)} 0 0 1 ${r2(x + w - rr)} ${r2(y + h)}H${r2(x)}Z`;
}

// Nice ticks for ordinary axes.
export function ticks(d0, d1, n = 5) {
  const span = d1 - d0, step0 = span / n, mag = Math.pow(10, Math.floor(Math.log10(step0)));
  const step = [1, 2, 5, 10].map((m) => m * mag).find((s) => span / s <= n) || mag * 10;
  const out = [];
  for (let v = Math.ceil(d0 / step) * step; v <= d1 + 1e-9; v += step) out.push(r2(v));
  return out;
}

// Share segments as bands of a ring: returns [{ d, mid: [x, y], value }]
export function shares(values, cx, cy, r0, r1, gapDeg = 2) {
  const total = values.reduce((a, b) => a + b, 0);
  let a = 0;
  return values.map((value) => {
    const span = (value / total) * 360;
    const seg = { d: bandPath(cx, cy, r0, r1, a + gapDeg / 2, a + span - gapDeg / 2), mid: polar(cx, cy, (r0 + r1) / 2, a + span / 2), value };
    a += span;
    return seg;
  });
}

// Quarter-arch shares: values laid out as nested quarter rings (the arch window), outermost first.
// Returns [{ d, value, r0, r1 }] for a quarter from angle a0 (default 270, 9 o'clock) to a0 + 90 * share.
export function archShares(values, cx, cy, rOuter, ringW, gap = 4, a0 = 270) {
  const max = Math.max(...values, 1);
  return values.map((value, i) => {
    const r1 = rOuter - i * (ringW + gap), r0 = r1 - ringW;
    return { d: bandPath(cx, cy, r0, r1, a0, a0 + Math.max(0.5, (value / max) * 90)), value, r0, r1 };
  });
}

// Segmented progress: n segments across w with a gap; returns [{ x, w, on }]
export function segments(n, w, filled, gap = 6) {
  const sw = (w - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: r2(i * (sw + gap)), w: r2(sw), on: i < filled }));
}

// Deterministic pseudo-random numbers, so the server and the browser draw the same artwork.
export function seeded(seed = 1) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}
