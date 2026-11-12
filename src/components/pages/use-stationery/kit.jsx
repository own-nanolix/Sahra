// Shared drawing helpers for the stationery page: colours, text, board and paper sheets, a set-down piece with
// its hard shadow. Everything returns SVG groups; the plates wrap them in <Art>.
import { r2 } from '@/lib/charts';
import { SCENE, SHADOW_INK, SHADOW, CastG, PlaceG, MaterialDefs } from '@/components/art/Mockup';
import Art from '@/components/art/Art';

export const ID = 'use-stationery';
export const URL_LINE = '→ sahra.sa';
export const C = {
  ...SCENE, ink: '#1E140F', text: '#3A2C24', muted: '#5C4A3E', sandInk: '#7A5A3F', beigeMuted: '#CDBBA6',
  deboss: '#A87F5E', debossDark: '#B08A67', studio: '#F7F3EA',
};

// Stacked text lines. rotate turns the block about (x, y) (-90 reads bottom to top). boldFirst sets the label row.
export function T({ x = 0, y = 0, size = 10, fill = C.ink, text, lh = 1.3, serif = false, anchor, rotate = 0, ls, weight = 400, boldFirst = false, ...rest }) {
  const rows = Array.isArray(text) ? text : [text];
  const at = rotate ? 0 : x;
  const el = (
    <text x={at} y={rotate ? 0 : y} className={serif ? 'serif' : 'sans'} fontSize={size} fill={fill} textAnchor={anchor} letterSpacing={ls} fontWeight={weight} {...rest}>
      {rows.map((t, i) => (
        <tspan key={i} x={at} dy={i ? r2(size * lh) : 0} fontWeight={boldFirst && i === 0 ? 500 : undefined}>{t}</tspan>
      ))}
    </text>
  );
  return rotate ? <g transform={`translate(${x} ${y}) rotate(${rotate})`}>{el}</g> : el;
}

// A flat sheet (board or paper) with a lit top-left edge and a shaded bottom-right edge. kind: board | dark | sand | paper | card
const FILL = { board: 'board', dark: 'board-dark', sand: 'board-sand', paper: 'paper', card: 'card' };
export function Sheet({ m, w, h, kind = 'board', x = 0, y = 0, edge = 1.6 }) {
  const grain = kind === 'paper' || kind === 'card' ? 'paper-grain' : 'fibre';
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={`url(#${m}-${FILL[kind]})`} filter={`url(#${m}-${grain})`} />
      <path d={`M${x} ${y + h}V${y}H${x + w}`} fill="none" stroke="#FFFFFF" strokeOpacity={kind === 'dark' ? 0.16 : 0.5} strokeWidth={edge} />
      <path d={`M${x + w} ${y}V${y + h}H${x}`} fill="none" stroke={SHADOW_INK} strokeOpacity="0.3" strokeWidth={edge} />
    </g>
  );
}

// Corner points of a w x h rectangle placed with translate(x y) rotate(rot) scale(k): for hard shadows in screen space.
export function boxPts(x, y, w, h, rot = 0, k = 1) {
  const a = (rot * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
  return [[0, 0], [w, 0], [w, h], [0, h]].map(([px, py]) => [r2(x + k * (px * c - py * s)), r2(y + k * (px * s + py * c))]);
}

// Convex hull (monotone chain) of a point list, as a path.
function hullPath(pts) {
  const p = [...pts].sort((u, v) => u[0] - v[0] || u[1] - v[1]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const half = (list) => list.reduce((h, q) => {
    const out = [...h];
    while (out.length > 1 && cross(out[out.length - 2], out[out.length - 1], q) <= 0) out.pop();
    return [...out, q];
  }, []);
  const lo = half(p), up = half([...p].reverse());
  return [...lo.slice(0, -1), ...up.slice(0, -1)].map(([x, y], i) => `${i ? 'L' : 'M'}${x} ${y}`).join('') + 'Z';
}

// A hard cast shadow that lengthens (sun-shadow). pts: a convex footprint swept exactly to the lower right;
// d: any outline, swept in small steps.
export function Cast({ pts, d, len = 30, opacity = 0.28 }) {
  if (pts) {
    const dx = len * SHADOW.x, dy = len * SHADOW.y;
    return <g className="sun-shadow"><path d={hullPath([...pts, ...pts.map(([x, y]) => [x + dx, y + dy])])} fill={SHADOW_INK} opacity={opacity} /></g>;
  }
  return <g className="sun-shadow"><CastG d={d} len={len} steps={28} opacity={opacity} /></g>;
}

// An object set down: its hard shadow first, then the object (placed in order i).
export function Piece({ i = 0, x, y, w, h, rot = 0, k = 1, len = 24, opacity, children }) {
  return (
    <g>
      <Cast pts={boxPts(x, y, w, h, rot, k)} len={len} opacity={opacity} />
      <PlaceG i={i} x={x} y={y} rotate={rot}>
        <g transform={k === 1 ? undefined : `scale(${k})`}>{children}</g>
      </PlaceG>
    </g>
  );
}

// One exportable mockup or flat artwork: Art + the materials every object here needs.
export function Plate({ name, title, w, h, m, children, className }) {
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={`${ID}-${name}`} className={className}>
      <MaterialDefs idp={m} />
      {children}
    </Art>
  );
}

// Stack edges: thin layer lines across a face polygon (points p0 to p1 extruded down by th, n layers).
export function EdgeFace({ p0, p1, th, n, fill, line = '#2A1B14', op = 0.55 }) {
  const [x0, y0] = p0, [x1, y1] = p1;
  return (
    <g>
      <path d={`M${x0} ${y0}L${x1} ${y1}V${r2(y1 + th)}L${x0} ${r2(y0 + th)}Z`} fill={fill} />
      {Array.from({ length: n - 1 }, (_, i) => {
        const o = r2((th * (i + 1)) / n);
        return <path key={i} d={`M${x0} ${r2(y0 + o)}L${x1} ${r2(y1 + o)}`} stroke={line} strokeOpacity={op} strokeWidth="1" />;
      })}
      {Array.from({ length: n - 1 }, (_, i) => {
        const o = r2((th * (i + 1)) / n + th / n / 2);
        return <path key={`l${i}`} d={`M${x0} ${r2(y0 + o)}L${x1} ${r2(y1 + o)}`} stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="0.8" />;
      })}
    </g>
  );
}

// Paragraphs laid one under another: each gets its rows and its top y; end is the y after the last.
export function flow(texts, wrapFn, start, lh, gap) {
  const out = texts.reduce((acc, t) => {
    const rows = wrapFn(t);
    return { list: [...acc.list, { rows, at: acc.y }], y: acc.y + rows.length * lh + gap };
  }, { list: [], y: start });
  return { list: out.list, end: out.y };
}
