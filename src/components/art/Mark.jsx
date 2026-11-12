// The Sahra word-mark, traced as SVG paths, and everything built from it.
//
// How it was traced: measured on the full-size word-mark (reference m04, 2800 px wide) and rebuilt from the
// construction drawing (m03): one stroke width x for every stroke, quarter-circle corners on concentric radii,
// every cut end on the same diagonal, horizontal guides shared by all letters. The numbers below are in the
// word-mark's own units (1 unit = 1 px of the measured artwork); the whole line is 1420 x 251.
//
//   X   = 32     the stroke (x in the construction drawing)
//   XT  = 35     the tall stems with a cut top (h, alif) are a little heavier, as drawn
//   R/r = 72.5 / 40.5   outer / inner radius of the bowls, the S corners, the r and the sad loop
//   RS/rs = 54 / 22     outer / inner radius of the hah's corners and its bend into the base bar
//   CUT = 45°    every cut end runs on the diagonal x + y = const. The construction drawing labels these
//                cuts "42°"; on the artwork itself they measure 45°, and the trace follows the artwork.
//   Guides: top 0, x-height 56, centre 128.5, bar top 169, baseline 201, descender 250.5.
//
// Every component returns an SVG group (<g>); wrap it in <Art> for a standalone graphic. Each takes `idp` (an id
// prefix, needed by the ones that create defs) and paint props (`fill`, plus `stroke` for the outline view).

import { DebossDefs } from './Mockup';

const r2 = (n) => Math.round(n * 100) / 100;
const rad = (d) => (d * Math.PI) / 180;
const deg = (a) => (a * 180) / Math.PI;
const onCircle = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy + r * Math.sin(rad(a))];

// A tiny path pen. Angles in degrees on screen: 0 = right, 90 = down. `map` transforms every point (used to
// rotate the S's top half into its bottom half). Every vertex is recorded in `pts` for the construction view.
export function pen(map = (p) => p) {
  let d = '';
  const pts = [];
  const put = (x, y) => {
    const [a, b] = map([x, y]);
    pts.push([r2(a), r2(b)]);
    return `${r2(a)} ${r2(b)}`;
  };
  const api = {
    M(x, y) { d += `M${put(x, y)}`; return api; },
    L(x, y) { d += `L${put(x, y)}`; return api; },
    // Arc about (cx, cy) with radius r from angle a0 to a1. The current point must already sit at a0.
    A(cx, cy, r, a0, a1) {
      const span = a1 - a0;
      if (Math.abs(span) > 179.9 && Math.abs(span) < 180.1) { // split half circles so the flags are exact
        const mid = a0 + span / 2;
        api.A(cx, cy, r, a0, mid);
        return api.A(cx, cy, r, mid, a1);
      }
      const [ex, ey] = onCircle(cx, cy, r, a1);
      d += `A${r2(r)} ${r2(r)} 0 ${Math.abs(span) > 180 ? 1 : 0} ${span > 0 ? 1 : 0} ${put(ex, ey)}`;
      return api;
    },
    Z() { d += 'Z'; return api; },
    get d() { return d; },
    get pts() { return pts; },
  };
  return api;
}

// ---------- Construction constants ----------
export const WM = {
  W: 1420, H: 251,
  X: 32, XT: 35,
  R: 72.5, r: 40.5, RS: 54, rs: 22,
  TOP: 0, XH: 56, CY: 128.5, BAR: 169, BASE: 201, DESC: 250.5,
  CUT_DRAWN: 42, CUT_MEASURED: 45,
  K: 70,                         // the bowl cuts run on x + y = cx + CY + K
  GAP: 35,                       // the gap between the two halves of the S
  BAR_Y: 19, BAR_H: 14,          // the two bars above the Arabic letters
  RING: { cx: 828.5, cy: 24, R: 21.5, r: 8 },
};

const { X, XT, R, r, RS, rs, XH, CY, BAR, BASE, DESC, K } = WM;

// Where the outer circle of a bowl meets its 45° cut x + y = cx + CY + k. `side` picks the lower (bottom) or
// the right-hand intersection.
function cutOnCircle(cx, rad0, k, side) {
  const s = Math.asin(k / rad0 / Math.SQRT2);
  const a = side === 'bottom' ? 135 - deg(s) : deg(s) - 45;
  return a;
}

// ---------- Glyphs (each returns one closed contour, or several) ----------

// The S: a top half and its 180° rotation. Width 184, height 201.
export const S_W = 184;
function sHalf(map) {
  const top = (BASE - WM.GAP) / 2;        // 83: where the left stem and the cut end
  const cut = S_W - X + top;              // 235: the cut x + y = 235 ends at (S_W - X, top)
  return pen(map)
    .M(0, top).L(0, R).A(R, R, R, 180, 270).L(S_W, 0)
    .L(S_W, cut - S_W).L(S_W - X, top)
    .L(S_W - X, X).L(R, X).A(R, R, r, 270, 180).L(X, top).Z();
}
const rot180 = ([x, y]) => [S_W - x, BASE - y];
const S_TOP = sHalf();
const S_BOTTOM = sHalf(rot180);

// The bowl letter "a" centred on cx: open bowl with a 45° cut tail and a stem on the right.
function glyphA(cx) {
  const a1 = cutOnCircle(cx, R, K, 'bottom');
  const p = pen();
  return p.M(cx + R, BASE).L(cx + R, CY).A(cx, CY, R, 360, a1)
    .L(cx + K - r, BAR).L(cx, BAR).A(cx, CY, r, 90, 360).L(cx + r, BASE).Z();
}

// "h": a tall stem with a cut top (x + y = stemRight) and an arch whose outer edge is the right leg.
function glyphH(x0, legRight) {
  const x1 = x0 + XT;
  const cx = legRight - R;
  const outerY = CY - Math.sqrt(R * R - (x1 - cx) ** 2);
  const innerY = CY - Math.sqrt(r * r - (x1 - cx) ** 2);
  const aOut = 360 + deg(Math.atan2(outerY - CY, x1 - cx));
  const aIn = 360 + deg(Math.atan2(innerY - CY, x1 - cx));
  return pen()
    .M(x0, BASE).L(x0, XT).L(x1, 0).L(x1, outerY).A(cx, CY, R, aOut, 360)
    .L(legRight, BASE).L(cx + r, BASE).L(cx + r, CY).A(cx, CY, r, 360, aIn)
    .L(x1, BASE).Z();
}

// "r": a stem and a quarter of a ring that ends square at its top.
function glyphR(x0) {
  const cx = x0 + R;
  return pen()
    .M(x0, BASE).L(x0, CY).A(cx, CY, R, 180, 270).L(cx, CY - r).A(cx, CY, r, 270, 180)
    .L(x0 + X, BASE).Z();
}

// The hamza: a bowl whose right side ends in a 45° cut, sitting on a short base bar.
function glyphHamza(cx) {
  const aTop = cutOnCircle(cx, R, K, 'right');
  const c = cx + CY + K;
  return pen()
    .M(cx + R, BASE).L(cx + R, BAR).L(cx, BAR).A(cx, CY, r, 90, 360)
    .L(cx + r, c - (cx + r)).L(onCircle(cx, CY, R, aTop)[0], onCircle(cx, CY, R, aTop)[1])
    .A(cx, CY, R, aTop, -270).L(cx + R, BASE).Z();
}

// The ring above the join (outer contour clockwise, hole counter-clockwise).
function ring({ cx, cy, R: Ro, r: ri }) {
  return pen()
    .M(cx + Ro, cy).A(cx, cy, Ro, 0, 180).A(cx, cy, Ro, 180, 360).Z()
    .M(cx + ri, cy).A(cx, cy, ri, 360, 180).A(cx, cy, ri, 180, 0).Z();
}

// Alif: a tall stem with a cut top.
function glyphAlif(x0) {
  return pen().M(x0, BASE).L(x0, XT).L(x0 + XT, 0).L(x0 + XT, BASE).Z();
}

// Ra + the base bar + sad: one contour. The ra drops below the baseline and ends in a 45° cut; the bar runs
// right into the sad's loop (a rounded end of radius R); the sad's left stem ends in a 45° cut above the bar.
function glyphRaSad(raX, sadX, sadCx, sadCut) {
  const raR = raX + X;
  const sadR = sadX + X;
  return pen()
    .M(raX, DESC).L(raX, XH).L(raR, XH).L(raR, BAR).L(sadCx, BAR)
    .A(sadCx, CY, r, 90, -90).L(sadR, CY - r).L(sadR, sadCut - sadR).L(sadX, sadCut - sadX)
    .L(sadX, XH).L(sadCx, XH).A(sadCx, CY, R, -90, 90).L(raR, BASE)
    .L(raR, raX + DESC - raR).L(raX, DESC).Z();
}

// Hah: a left leg, an arch with small corners (RS / rs) and a right leg that bends down into the bar.
function glyphHah(x0, x1) {
  const lc = x0 + RS;               // left corner centre x
  const rc = x1 - RS;               // right corner centre x
  const cy = XH + RS;               // corner centre y
  const bx = x1 + rs;               // bend centre x
  const by = BAR - RS;              // bend centre y (the bend lands tangent on the bar)
  const legBottom = BAR - XT + 0.5; // the left leg stops one tall-stem gap above the bar
  return pen()
    .M(x0, legBottom).L(x0, cy).A(lc, cy, RS, 180, 270).L(rc, XH).A(rc, cy, RS, 270, 360)
    .L(x1, by).A(bx, by, rs, 180, 90).L(bx, BAR).A(bx, by, RS, 90, 180)
    .L(x1 - X, cy).A(rc, cy, rs, 360, 270).L(lc, XH + X).A(lc, cy, rs, 270, 180)
    .L(x0 + X, legBottom).Z();
}

const bar = (x0, x1) => pen().M(x0, WM.BAR_Y).L(x1, WM.BAR_Y).L(x1, WM.BAR_Y + WM.BAR_H).L(x0, WM.BAR_Y + WM.BAR_H).Z();

// Positions measured on m04 (left edges, or centres for bowls).
export const GLYPHS = {
  latin: [
    { id: 's-top', name: 'S, top half', p: S_TOP },
    { id: 's-bottom', name: 'S, bottom half', p: S_BOTTOM },
    { id: 'a', name: 'a', p: glyphA(274.5) },
    { id: 'h', name: 'h', p: glyphH(358, 500) },
    { id: 'r', name: 'r', p: glyphR(511) },
    { id: 'a2', name: 'a', p: glyphA(657.5) },
  ],
  arabic: [
    { id: 'hamza', name: 'hamza', p: glyphHamza(824.5) },
    { id: 'ring', name: 'ring', p: ring(WM.RING) },
    { id: 'alif', name: 'alif', p: glyphAlif(920) },
    { id: 'ra-sad', name: 'ra, base bar and sad', p: glyphRaSad(979, 1239, 1347, 1398) },
    { id: 'hah', name: 'hah', p: glyphHah(1035, 1190) },
    { id: 'bar-hah', name: 'bar over the hah', p: bar(1035, 1193) },
    { id: 'bar-sad', name: 'bar over the sad', p: bar(1239, 1387) },
  ],
};

export const LATIN_D = GLYPHS.latin.map((g) => g.p.d);
export const ARABIC_D = GLYPHS.arabic.map((g) => g.p.d);
export const WORDMARK_D = [...LATIN_D, ...ARABIC_D].join('');
export const MARK_D = S_TOP.d + S_BOTTOM.d;
// Every anchor point of the trace (for the construction diagram), as [x, y].
export const ANCHORS = [...GLYPHS.latin, ...GLYPHS.arabic].flatMap((g) => g.p.pts);
// Left / right edges of the Latin and Arabic halves.
export const LATIN_BOX = { x: 0, w: 730 };
export const ARABIC_BOX = { x: 752, w: 668 };

// ---------- Components ----------

// The full word-mark. Box W x H (1420 x 251) at width 1420; pass `width` to scale.
//   <WordmarkG x={40} y={40} width={600} fill="#B58F6B" />
// latin / arabic: draw either half alone. pieceClass: a class on every letter (with --i set) for draw-ons.
export function WordmarkG({ idp, x = 0, y = 0, width = WM.W, fill = 'currentColor', latin = true, arabic = true, pieceClass, stroke, strokeWidth, ...rest }) {
  const k = width / WM.W;
  const list = [...(latin ? GLYPHS.latin : []), ...(arabic ? GLYPHS.arabic : [])];
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000})`} fill={fill} stroke={stroke} strokeWidth={strokeWidth ? strokeWidth / k : undefined} data-idp={idp} {...rest}>
      {list.map((g, i) => (
        <path key={g.id} d={g.p.d} className={pieceClass} style={pieceClass ? { '--i': i } : undefined} />
      ))}
    </g>
  );
}

// The Arabic half alone (hamza with its ring, alif, ra, hah, sad and the two bars). Box 668 x 251 at scale 1.
export function ArabicG({ idp, x = 0, y = 0, width = ARABIC_BOX.w, fill = 'currentColor', ...rest }) {
  const k = width / ARABIC_BOX.w;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000}) translate(${-ARABIC_BOX.x} 0)`} fill={fill} data-idp={idp} {...rest}>
      {GLYPHS.arabic.map((g) => <path key={g.id} d={g.p.d} />)}
    </g>
  );
}

// The Latin half alone ("Sahra"). Box 730 x 201 at scale 1.
export function LatinG({ idp, x = 0, y = 0, width = LATIN_BOX.w, fill = 'currentColor', ...rest }) {
  const k = width / LATIN_BOX.w;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000})`} fill={fill} data-idp={idp} {...rest}>
      {GLYPHS.latin.map((g) => <path key={g.id} d={g.p.d} />)}
    </g>
  );
}

// The mark: the S alone (two interlocking halves). Box 184 x 201 at size 184; `size` is the width.
//   <MarkG x={0} y={0} size={48} fill="#B58F6B" />   topClass / bottomClass animate the two halves.
export const MARK_W = S_W;
export const MARK_H = BASE;
export function MarkG({ idp, x = 0, y = 0, size = S_W, fill = 'currentColor', topClass, bottomClass, ...rest }) {
  const k = size / S_W;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000})`} fill={fill} data-idp={idp} {...rest}>
      <path d={S_TOP.d} className={topClass} />
      <path d={S_BOTTOM.d} className={bottomClass} />
    </g>
  );
}

// The mark in its rounded tile (the profile image, m12; the app icon). Square of `size`.
export function MarkTileG({ idp, x = 0, y = 0, size = 100, radius, tile = '#F5F0E3', fill = '#875D41', ...rest }) {
  const rr = radius === undefined ? size * 0.22 : radius;
  const mw = size * 0.46;
  const mh = (mw * MARK_H) / MARK_W;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} data-idp={idp} {...rest}>
      <rect width={size} height={size} rx={r2(rr)} fill={tile} />
      <MarkG x={(size - mw) / 2} y={(size - mh) / 2} size={mw} fill={fill} />
    </g>
  );
}

// The app icon: the mark tile at any size (radius follows the size).
export function AppIconG(props) {
  return <MarkTileG {...props} />;
}

// Lockup: word-mark with the brand line "We Build Spaces of Imagination".
//   layout "row"   (as the poster m14): word-mark left, the line in two lines at the right. Box 2440 x 251.
//   layout "stack" (as the hoarding m16): word-mark above, the line below at the left. Box 1420 x 560.
export const LOCKUP_LINE = { row: { w: 2440, h: 251 }, stack: { w: 1420, h: 560 } };
export function LockupLineG({ idp, x = 0, y = 0, scale = 1, layout = 'row', fill = 'currentColor', lineFill, ...rest }) {
  const lf = lineFill || fill;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${scale})`} data-idp={idp} {...rest}>
      <WordmarkG fill={fill} />
      {layout === 'row' ? (
        <text className="serif" fontSize="108" fill={lf} letterSpacing="-1.5">
          <tspan x="1580" y="88">We Build Spaces</tspan>
          <tspan x="1580" y="201">of Imagination</tspan>
        </text>
      ) : (
        <text className="serif" fontSize="118" fill={lf} letterSpacing="-1.5">
          <tspan x="0" y="420">We Build Spaces</tspan>
          <tspan x="0" y="545">of Imagination</tspan>
        </text>
      )}
    </g>
  );
}

// Lockup: the word-mark set vertically, reading bottom to top, as debossed on the box lid (m13) and the
// string-tie envelope (m10). x, y is the top-left of its box; box 251 x 1420 at scale 1.
export const LOCKUP_VERTICAL = { w: WM.H, h: WM.W };
export function WordmarkVerticalG({ idp, x = 0, y = 0, scale = 1, fill = 'currentColor', ...rest }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y + WM.W * scale)}) scale(${scale}) rotate(-90)`} data-idp={idp} {...rest}>
      <WordmarkG fill={fill} />
    </g>
  );
}

// Lockup: word-mark with the web address line "→ sahra.sa" (the hoarding button, the cards). Box 1420 x 400.
export const LOCKUP_URL = { w: 1420, h: 400 };
export function LockupUrlG({ idp, x = 0, y = 0, scale = 1, fill = 'currentColor', urlFill, ...rest }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${scale})`} data-idp={idp} {...rest}>
      <WordmarkG fill={fill} />
      <text x="0" y="380" className="sans" fontSize="92" fontWeight="400" fill={urlFill || fill} letterSpacing="-1">→ sahra.sa</text>
    </g>
  );
}

// The word-mark blind-debossed into board: the same paths, filled a shade off the board and given an inner
// shadow (upper left) and an inner highlight (lower right). Light comes from the upper left.
//   <WordmarkDebossG idp="use-packaging-lid" x y width board="#875D41" />
// tone: the pressed surface (defaults to a lighter, smoother shade of the board, as on the lids). depth in units
// of the word-mark (default 5).
export function WordmarkDebossG({ idp, x = 0, y = 0, width = WM.W, tone = '#9A6E50', depth = 5, vertical = false, ...rest }) {
  const k = width / WM.W;
  const fid = `${idp}-deboss`;
  return (
    <g data-idp={idp} {...rest}>
      <DebossDefs idp={idp} depth={depth} />
      {vertical ? (
        <g transform={`translate(${r2(x)} ${r2(y + width)}) scale(${r2(k * 10000) / 10000}) rotate(-90)`} filter={`url(#${fid})`}>
          {GLYPHS.latin.concat(GLYPHS.arabic).map((g) => <path key={g.id} d={g.p.d} fill={tone} />)}
        </g>
      ) : (
        <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000})`} filter={`url(#${fid})`}>
          {GLYPHS.latin.concat(GLYPHS.arabic).map((g) => <path key={g.id} d={g.p.d} fill={tone} />)}
        </g>
      )}
    </g>
  );
}

// The mark debossed (spine of the box, the folder). size is the width.
export function MarkDebossG({ idp, x = 0, y = 0, size = 120, tone = '#9A6E50', depth = 3, ...rest }) {
  const k = size / S_W;
  return (
    <g data-idp={idp} {...rest}>
      <DebossDefs idp={idp} depth={depth} />
      <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000})`} filter={`url(#${idp}-deboss)`} fill={tone}>
        <path d={MARK_D} />
      </g>
    </g>
  );
}

// The word-mark enlarged and cropped by a panel, as on the sand folder (m01), where it runs off the left edge.
// Needs idp (clip path). zoom = word-mark width / panel width; dx / dy shift it in panel units.
export function WordmarkCropG({ idp, x = 0, y = 0, w = 600, h = 400, zoom = 1.6, dx = -0.25, dy = 0.45, fill = 'currentColor', children, ...rest }) {
  const id = `${idp}-crop`;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})`} {...rest}>
      <clipPath id={id}>
        <rect width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        {children || <WordmarkG x={w * dx} y={h * dy} width={w * zoom} fill={fill} />}
      </g>
    </g>
  );
}

// The word-mark as outlines only (the construction view, m03): thin strokes, no fill.
export function WordmarkOutlineG({ idp, x = 0, y = 0, width = WM.W, stroke = '#875D41', strokeWidth = 1, pieceClass, ...rest }) {
  return <WordmarkG idp={idp} x={x} y={y} width={width} fill="none" stroke={stroke} strokeWidth={strokeWidth} pieceClass={pieceClass} {...rest} />;
}
