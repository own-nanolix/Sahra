// Shared parts of the accessory mockups: the stage (one exportable SVG per object), shading overlays,
// a ledge (desk / shelf / counter edge), stitching and centred artwork helpers.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG, MARK_W, MARK_H } from '@/components/art/Mark';
import { BackdropG, MaterialDefs, DeskEdgeG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';

export const PAGE = 'use-accessories';
export const C = SCENE;
export { SHADOW_INK };

// The four colour pairs of m09 (ground, ink).
export const PAIRS = [
  { id: 'sand', bg: C.sand, fg: C.beige },
  { id: 'tribal', bg: C.tribal, fg: C.sand },
  { id: 'beige', bg: C.beige, fg: C.tribal },
  { id: 'black', bg: C.black, fg: C.beige },
];

// One exportable SVG: defs for materials and cylinder shading, the flat backdrop with a hard horizon, then the
// scene. `children` is a function of the id prefix. The object layer settles in (or turns to the light).
export default function Stage({ id, title, w, h, horizon = 0.64, wall, floor, lit = false, order = 1, line = true, children }) {
  const idp = `${PAGE}-${id}`;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp} preserveAspectRatio="xMidYMid slice" style={{ display: 'block', width: '100%', height: '100%' }}>
      <MaterialDefs idp={idp} />
      <defs>
        <linearGradient id={`${idp}-edge`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1E140F" stopOpacity="0.34" />
          <stop offset="0.17" stopColor="#1E140F" stopOpacity="0" />
          <stop offset="0.8" stopColor="#1E140F" stopOpacity="0" />
          <stop offset="1" stopColor="#1E140F" stopOpacity="0.38" />
        </linearGradient>
        <linearGradient id={`${idp}-hi`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.1" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.22" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="0.34" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${idp}-sheet`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.3" />
          <stop offset="0.5" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#1E140F" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <BackdropG idp={`${idp}-bd`} w={w} h={h} horizon={horizon} wall={wall} floor={floor} line={line} />
      <g className={lit ? 'mock-lit' : 'mock-place'} style={{ '--i': order }}>
        {children(idp)}
      </g>
    </Art>
  );
}

// Cylinder shading over the path `d`: light from the upper left, darker lower right, edges rolling away.
export function Cyl({ idp, d, edge = true, hi = true, shade = true }) {
  return (
    <g pointerEvents="none">
      {shade && <path d={d} fill={`url(#${idp}-shade)`} />}
      {edge && <path d={d} fill={`url(#${idp}-edge)`} />}
      {hi && <path d={d} fill={`url(#${idp}-hi)`} />}
    </g>
  );
}

// A flat sheet-like surface lit from the upper left (diagonal wash).
export function Sheet({ idp, d }) {
  return <path d={d} fill={`url(#${idp}-sheet)`} pointerEvents="none" />;
}

// The front of a desk, shelf or counter: apron below, edge band, a soft fall-off.
export function Ledge({ y, w, h, thick = 26, edge, apron }) {
  return (
    <g>
      <rect y={y} width={w} height={h - y} fill={apron || edge} />
      <rect y={y} width={w} height={h - y} fill="#1E140F" opacity="0.22" />
      <DeskEdgeG y={y} w={w} thickness={thick} edge={edge} top={edge} />
    </g>
  );
}

// Running stitches along a path.
export function Stitch({ d, color = '#1E140F', opacity = 0.55, width = 2, dash = '6 5', ...p }) {
  return <path d={d} fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={width} strokeDasharray={dash} strokeLinecap="round" {...p} />;
}

// Rounded rectangle path (so it can be reused for clips, shadows and stitching).
export function rrect(x, y, w, h, r) {
  return `M${r2(x + r)} ${r2(y)}H${r2(x + w - r)}A${r} ${r} 0 0 1 ${r2(x + w)} ${r2(y + r)}V${r2(y + h - r)}A${r} ${r} 0 0 1 ${r2(x + w - r)} ${r2(y + h)}H${r2(x + r)}A${r} ${r} 0 0 1 ${r2(x)} ${r2(y + h - r)}V${r2(y + r)}A${r} ${r} 0 0 1 ${r2(x + r)} ${r2(y)}Z`;
}

// The mark centred on (cx, cy), `s` wide. sx squeezes it across a cylinder.
export function Mk({ cx, cy, s, fill, sx = 1, ...p }) {
  const hgt = (s * MARK_H) / MARK_W;
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${sx} 1) translate(${r2(-s / 2)} ${r2(-hgt / 2)})`} {...p}>
      <MarkG size={s} fill={fill} />
    </g>
  );
}

// The word-mark centred on (cx, cy), `w` wide.
export function Wm({ cx, cy, w, fill, sx = 1, ...p }) {
  const hgt = (w * 251) / 1420;
  return (
    <g transform={`translate(${r2(cx)} ${r2(cy)}) scale(${sx} 1) translate(${r2(-w / 2)} ${r2(-hgt / 2)})`} {...p}>
      <WordmarkG width={w} fill={fill} />
    </g>
  );
}
