// The Sahra icon set, drawn in the word-mark's manner on one 24 px grid:
//   - one equal stroke (2 px, as the word-mark's single stroke x), drawn as filled outlines so the ends can be cut;
//   - quarter-circle corners and true circles (the bowls), never soft blobs;
//   - free ends cut on the word-mark's diagonal ("/", x + y = const) where an end is marked cut;
//   - 2 px of clear space on every side (live area 2..22).
// Each icon is one path string with nonzero fill (open strokes clockwise, holes counter-clockwise).
// CORE holds the brand's 32 icons (shown on the icons page); UTIL holds interface extras.

export const ICON_GRID = { size: 24, stroke: 2, live: [2, 22], radius: 3, cut: 45 };

const H = 1; // half the stroke
const rr = (n) => Math.round(n * 1000) / 1000;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const len = (a) => Math.hypot(a[0], a[1]);
const unit = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l]; };
const nrm = (d) => [-d[1], d[0]];

// Points along an arc (screen degrees: 0 = right, 90 = down), every 5 degrees.
function arcPts(cx, cy, r, a0, a1) {
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / 5));
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });
}

// A polyline whose interior corners are rounded with centre-line radius rad (quarter circles at right angles).
function rounded(pts, rad) {
  const out = [pts[0]];
  for (let i = 1; i < pts.length - 1; i++) {
    const p0 = pts[i - 1], p = pts[i], p1 = pts[i + 1];
    const d1 = unit(sub(p, p0)), d2 = unit(sub(p1, p));
    const dot = Math.max(-1, Math.min(1, d1[0] * d2[0] + d1[1] * d2[1]));
    const th = Math.acos(dot);
    if (!rad || th < 1e-3) { out.push(p); continue; }
    const t = rad * Math.tan(th / 2);
    const a = [p[0] - d1[0] * t, p[1] - d1[1] * t];
    const b = [p[0] + d2[0] * t, p[1] + d2[1] * t];
    let n = nrm(d1);
    if (n[0] * (b[0] - a[0]) + n[1] * (b[1] - a[1]) < 0) n = [-n[0], -n[1]];
    const c = [a[0] + n[0] * rad, a[1] + n[1] * rad];
    const a0 = (Math.atan2(a[1] - c[1], a[0] - c[0]) * 180) / Math.PI;
    let a1 = (Math.atan2(b[1] - c[1], b[0] - c[0]) * 180) / Math.PI;
    while (a1 - a0 > 180) a1 -= 360;
    while (a1 - a0 < -180) a1 += 360;
    out.push(...arcPts(c[0], c[1], rad, a0, a1));
  }
  out.push(pts[pts.length - 1]);
  return out;
}

const area = (poly) => poly.reduce((s, p, i) => { const q = poly[(i + 1) % poly.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
const toD = (poly) => poly.map((p, i) => `${i ? 'L' : 'M'}${rr(p[0])} ${rr(p[1])}`).join('') + 'Z';

// Offsets of every vertex (mitred), for an open or closed polyline.
function offsets(pts, closed) {
  const n = pts.length;
  return pts.map((p, i) => {
    const prev = closed ? pts[(i - 1 + n) % n] : pts[i - 1];
    const next = closed ? pts[(i + 1) % n] : pts[i + 1];
    const nA = prev ? nrm(unit(sub(p, prev))) : null;
    const nB = next ? nrm(unit(sub(next, p))) : null;
    if (!nA) return [nB[0] * H, nB[1] * H];
    if (!nB) return [nA[0] * H, nA[1] * H];
    const k = H / Math.max(0.25, 1 + nA[0] * nB[0] + nA[1] * nB[1]);
    return [(nA[0] + nB[0]) * k, (nA[1] + nB[1]) * k];
  });
}

// Move an end point along its segment so it lands on the cut line through `p` ('/' : x + y, '\\' : x - y).
function onCut(q, d, p, kind) {
  const s = kind === '\\' ? [1, -1] : [1, 1];
  const den = d[0] * s[0] + d[1] * s[1];
  if (Math.abs(den) < 1e-6) return q;
  const t = (p[0] * s[0] + p[1] * s[1] - (q[0] * s[0] + q[1] * s[1])) / den;
  return [q[0] + d[0] * t, q[1] + d[1] * t];
}

// An open stroke along the points. cut: { start: '/', end: '/' } cuts that end on the diagonal.
function line(pts, cut = {}) {
  const off = offsets(pts, false);
  const L = pts.map((p, i) => [p[0] + off[i][0], p[1] + off[i][1]]);
  const R = pts.map((p, i) => [p[0] - off[i][0], p[1] - off[i][1]]);
  const last = pts.length - 1;
  if (cut.start) {
    const d = unit(sub(pts[1], pts[0]));
    L[0] = onCut(L[0], d, pts[0], cut.start); R[0] = onCut(R[0], d, pts[0], cut.start);
  }
  if (cut.end) {
    const d = unit(sub(pts[last], pts[last - 1]));
    L[last] = onCut(L[last], d, pts[last], cut.end); R[last] = onCut(R[last], d, pts[last], cut.end);
  }
  let poly = [...L, ...R.reverse()];
  if (area(poly) < 0) poly = poly.reverse();
  return toD(poly);
}

// A closed stroke (outer clockwise, inner counter-clockwise).
function loop(pts) {
  const off = offsets(pts, true);
  let A = pts.map((p, i) => [p[0] + off[i][0], p[1] + off[i][1]]);
  let B = pts.map((p, i) => [p[0] - off[i][0], p[1] - off[i][1]]);
  if (Math.abs(area(A)) < Math.abs(area(B))) [A, B] = [B, A];
  if (area(A) < 0) A = A.reverse();
  if (area(B) > 0) B = B.reverse();
  return toD(A) + toD(B);
}

const ring = (cx, cy, r) => loop(arcPts(cx, cy, r, 0, 355));
const dot = (cx, cy, r = 1.25) => { let p = arcPts(cx, cy, r, 0, 355); if (area(p) < 0) p = p.reverse(); return toD(p); };
const rect = (x, y, w, h, rad = 0) => loop(rad ? rounded([[x + w / 2, y], [x + w, y], [x + w, y + h], [x, y + h], [x, y], [x + w / 2 + 0.001, y]], rad).slice(0, -1) : [[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);
const arc = (cx, cy, r, a0, a1, cut) => line(arcPts(cx, cy, r, a0, a1), cut);
const bez = (a, b, c, n = 24) => Array.from({ length: n + 1 }, (_, i) => { const t = i / n, u = 1 - t; return [u * u * a[0] + 2 * u * t * b[0] + t * t * c[0], u * u * a[1] + 2 * u * t * b[1] + t * t * c[1]]; });
const ellipse = (cx, cy, rx, ry) => loop(Array.from({ length: 72 }, (_, i) => { const a = (i * 5 * Math.PI) / 180; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; }));
const C = { end: '/' }, CS = { start: '/' }, CB = { start: '/', end: '/' };

function heart() {
  const r = 4.5, lc = [8, 9.5], rc = [16, 9.5];
  const k = Math.acos(4 / r) * (180 / Math.PI); // where the lobes meet on x = 12
  const left = arcPts(lc[0], lc[1], r, 135, 360 - k);
  const right = arcPts(rc[0], rc[1], r, 180 + k, 405);
  const tip = [12, lc[1] + r * Math.SQRT1_2 + (12 - (lc[0] - r * Math.SQRT1_2))];
  return loop([tip, ...left, ...right.slice(1)]);
}

export const CORE = {
  plan: line([[11, 3], [3, 3], [3, 21], [21, 21], [21, 3], [16, 3]], C) + line([[3, 12], [8, 12]], C) + line([[12, 21], [12, 12], [16.5, 12]], C),
  key: ring(8, 12, 4) + line([[12, 12], [21, 12]], C) + line([[15, 12], [15, 16.5]], C) + line([[19, 12], [19, 15]], C),
  door: line([[5, 21], [5, 3], [19, 3], [19, 21]]) + line([[3, 21], [21, 21]], CB) + dot(15.5, 12.5),
  arch: line([[5, 21], ...arcPts(12, 10, 7, 180, 360), [19, 21]]) + line([[3, 21], [21, 21]], CB),
  sun: ring(12, 12, 4) + [0, 45, 90, 135, 180, 225, 270, 315].map((a) => { const t = (a * Math.PI) / 180; return line([[12 + 7 * Math.cos(t), 12 + 7 * Math.sin(t)], [12 + 9.6 * Math.cos(t), 12 + 9.6 * Math.sin(t)]]); }).join(''),
  dune: line(bez([3.2, 18], [10, 3.5], [21, 16.5]), C) + line([[3, 21], [21, 21]], CB),
  wall: rect(3, 5, 18, 14) + line([[3, 12], [21, 12]]) + line([[12, 5], [12, 12]]) + line([[8, 12], [8, 19]]) + line([[16, 12], [16, 19]]),
  compass: ring(12, 12, 9) + line([[8, 16], [16, 8]]) + dot(12, 12, 1.6),
  ruler: rect(3, 7, 18, 10) + [7, 12, 17].map((x, i) => line([[x, 7], [x, i % 2 ? 13 : 11]], C)).join(''),
  calendar: rect(3, 5, 18, 16, 3) + line([[3, 10], [21, 10]]) + line([[8, 3], [8, 7]], CS) + line([[16, 3], [16, 7]], CS) + dot(8, 15),
  document: loop([[5, 3], [14, 3], [19, 8], [19, 21], [5, 21]]) + line([[14, 3], [14, 8], [19, 8]]) + line([[8, 13], [16, 13]], C) + line([[8, 17], [13, 17]], C),
  mail: rect(3, 5, 18, 14, 2) + line([[3.6, 6.4], [12, 13], [20.4, 6.4]]),
  phone: rect(6, 3, 12, 18, 3) + line([[10, 6.5], [14, 6.5]], CB) + dot(12, 17.6),
  pin: loop([[12, 20.3], ...arcPts(12, 9.5, 6.5, 150, 390)]) + dot(12, 9.5, 2),
  'arrow-right': line([[3, 12], [19, 12]], CS) + line([[13, 5], [20, 12], [13, 19]]),
  plus: line([[12, 4], [12, 20]]) + line([[4, 12], [20, 12]]),
  menu: line([[3, 7], [21, 7]], C) + line([[3, 12], [21, 12]], C) + line([[3, 17], [21, 17]], C),
  search: ring(10.5, 10.5, 6.5) + line([[15.3, 15.3], [21, 21]]),
  user: ring(12, 8, 4) + arc(12, 21, 8, 180, 360),
  heart: heart(),
  share: line(rounded([[11, 4], [4, 4], [4, 20], [20, 20], [20, 13]], 3)) + line([[11, 13], [20, 4]]) + line([[14, 4], [20, 4], [20, 10]]),
  download: line([[12, 3], [12, 15]], CS) + line([[6.5, 9.5], [12, 15], [17.5, 9.5]]) + line([[4, 21], [20, 21]], CB),
  house: line([[3, 11.5], [12, 3.5], [21, 11.5]]) + line([[5, 9.7], [5, 21], [19, 21], [19, 9.7]]) + line([[10, 21], [10, 15], [14, 15], [14, 21]]),
  window: loop([[5, 21], [5, 11], ...arcPts(12, 11, 7, 180, 360).slice(1), [19, 21]]) + line([[12, 4], [12, 21]]) + line([[5, 13], [19, 13]]),
  stairs: line([[3, 21], [3, 17], [8, 17], [8, 12], [13, 12], [13, 7], [18, 7], [18, 3], [21, 3]], C),
  car: line([[4.5, 16], [3, 16], [3, 11.5], [6.5, 10.5], [8.5, 6], [15.5, 6], [17.5, 10.5], [21, 11.5], [21, 16], [19.5, 16]]) + line([[10.5, 16], [13.5, 16]]) + ring(7.5, 17, 2) + ring(16.5, 17, 2),
  area: line([[3, 8], [3, 3], [8, 3]]) + line([[16, 3], [21, 3], [21, 8]]) + line([[21, 16], [21, 21], [16, 21]]) + line([[8, 21], [3, 21], [3, 16]]) + line([[8.5, 15.5], [15.5, 8.5]]),
  floors: loop([[12, 3.2], [19.9, 8], [12, 12.8], [4.1, 8]]) + line([[4.1, 12], [12, 16.8], [19.9, 12]]) + line([[4.1, 16], [12, 20.8], [19.9, 16]]),
  globe: ring(12, 12, 9) + ellipse(12, 12, 4, 9) + line([[3, 12], [21, 12]]),
  grid: rect(4, 4, 6, 6) + rect(14, 4, 6, 6) + rect(4, 14, 6, 6) + rect(14, 14, 6, 6),
  close: line([[5, 5], [19, 19]]) + line([[19, 5], [5, 19]]),
  check: line([[4, 12.5], [9.5, 18], [20, 6.5]]),
};

export const UTIL = {
  'chevron-left': line([[15, 5], [8, 12], [15, 19]]),
  'chevron-right': line([[9, 5], [16, 12], [9, 19]]),
  'chevron-down': line([[5, 9], [12, 16], [19, 9]]),
  'chevron-up': line([[5, 15], [12, 8], [19, 15]]),
  'arrow-left': line([[5, 12], [21, 12]], C) + line([[11, 5], [4, 12], [11, 19]]),
  'arrow-down': line([[12, 3], [12, 19]], CS) + line([[5, 13], [12, 20], [19, 13]]),
  'arrow-up-right': line([[5, 19], [18, 6]]) + line([[9, 6], [18, 6], [18, 15]]),
  minus: line([[4, 12], [20, 12]]),
  copy: rect(8, 8, 13, 13, 2) + line(rounded([[5, 16], [3, 16], [3, 3], [16, 3], [16, 5]], 2)),
  play: loop([[7, 4], [19, 12], [7, 20]]),
  pause: line([[8, 5], [8, 19]]) + line([[16, 5], [16, 19]]),
  sort: line([[8, 4], [8, 20]], C) + line([[4, 8], [8, 4], [12, 8]]) + line([[16, 20], [16, 4]], C) + line([[12, 16], [16, 20], [20, 16]]),
  filter: line([[3, 6], [21, 6]], C) + line([[6, 12], [18, 12]], C) + line([[10, 18], [14, 18]], C),
  alert: loop([[12, 3], [21.5, 20], [2.5, 20]]) + line([[12, 9], [12, 14]]) + dot(12, 17),
  info: ring(12, 12, 9) + line([[12, 11], [12, 17]], CS) + dot(12, 7.5),
  more: dot(5.5, 12, 1.6) + dot(12, 12, 1.6) + dot(18.5, 12, 1.6),
};

export const ICONS = { ...CORE, ...UTIL };
export const CORE_NAMES = Object.keys(CORE);
// Plain-English names for screen readers and captions.
export const ICON_LABELS = Object.fromEntries(Object.keys(ICONS).map((k) => [k, k.replace(/-/g, ' ')]));
