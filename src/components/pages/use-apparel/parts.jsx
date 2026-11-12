// Shared pieces for the apparel mockups: colourways, rounded outlines, the cloth material, ribbing, seams,
// hangers, hooks and the rail. Every id comes from an `idp` / `id` that starts with `use-apparel-`.
import { r2 } from '@/lib/charts';
import { MaterialDefs, SHADOW_INK } from '@/components/art/Mockup';

// Colourways: only palette colours. `seam` is the stitch colour, `seamO` its strength, `cord` the drawcord.
export const WAYS = {
  beige: { name: 'Beige', fill: '#F5F0E3', seam: '#35241C', seamO: 0.42, cord: '#875D41' },
  chocolate: { name: 'Dark Chocolate', fill: '#35241C', seam: '#B58F6B', seamO: 0.5, cord: '#B58F6B' },
  sand: { name: 'Sand', fill: '#B58F6B', seam: '#35241C', seamO: 0.4, cord: '#F5F0E3' },
  tribal: { name: 'Tribal Brown', fill: '#875D41', seam: '#F5F0E3', seamO: 0.42, cord: '#F5F0E3' },
  black: { name: 'Black', fill: '#000000', seam: '#B58F6B', seamO: 0.4, cord: '#B58F6B' },
};
export const WAY_LIST = ['beige', 'chocolate', 'sand', 'tribal', 'black'];

// A polygon with rounded corners (radius r). close=false keeps the two end points sharp.
export function rp(pts, r = 6, close = true) {
  const n = pts.length;
  const toward = (p, q) => {
    const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1, k = Math.min(r, l / 2) / l;
    return [p[0] + dx * k, p[1] + dy * k];
  };
  let d = '';
  pts.forEach((p, i) => {
    if (!close && (i === 0 || i === n - 1)) {
      d += `${i === 0 ? 'M' : 'L'}${r2(p[0])} ${r2(p[1])}`;
      return;
    }
    const s = toward(p, pts[(i - 1 + n) % n]);
    const e = toward(p, pts[(i + 1) % n]);
    d += `${i === 0 ? 'M' : 'L'}${r2(s[0])} ${r2(s[1])}Q${r2(p[0])} ${r2(p[1])} ${r2(e[0])} ${r2(e[1])}`;
  });
  return close ? `${d}Z` : d;
}

// A line parallel to the edge p-q, moved t units toward `ref` (a hem or edge stitch).
export function inset(p, q, t, ref) {
  const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy) || 1;
  let nx = -dy / l, ny = dx / l;
  if ((ref[0] - (p[0] + q[0]) / 2) * nx + (ref[1] - (p[1] + q[1]) / 2) * ny < 0) { nx = -nx; ny = -ny; }
  return `M${r2(p[0] + nx * t)} ${r2(p[1] + ny * t)}L${r2(q[0] + nx * t)} ${r2(q[1] + ny * t)}`;
}

// Draws its children once and once mirrored about x = w / 2 (a symmetric garment).
export function Sym({ w, children }) {
  return (
    <>
      {children}
      <g transform={`translate(${w} 0) scale(-1 1)`}>{children}</g>
    </>
  );
}

// Material definitions shared by every garment SVG: the kit's materials plus a dome, a warm lift and the
// embroidery stitch pattern.
export function GDefs({ idp }) {
  return (
    <>
      <MaterialDefs idp={idp} />
      <defs>
        <radialGradient id={`${idp}-dome`} cx="0.3" cy="0.22" r="0.9">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.34" />
          <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.36" />
        </radialGradient>
        <linearGradient id={`${idp}-warm`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B58F6B" stopOpacity="0.34" />
          <stop offset="0.6" stopColor="#875D41" stopOpacity="0.06" />
          <stop offset="1" stopColor="#35241C" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${idp}-stitch`} width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
          <rect width="2.6" height="1.2" fill="#000000" fillOpacity="0.26" />
        </pattern>
      </defs>
    </>
  );
}

// The cloth: a woven base, the printed artwork (children) clipped to the garment, folds as soft shade
// overlays, then the one light from the upper left. `d` is the outline, `id` the clip's prefix.
export function Cloth({ idp, id, d, fill, folds = [], lights = [], shade = 1, grainless = false, children }) {
  return (
    <g>
      <clipPath id={`${id}-clip`}>
        <path d={d} />
      </clipPath>
      <path d={d} fill={fill} filter={grainless ? undefined : `url(#${idp}-fabric)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <g filter={`url(#${idp}-fabric)`}>{children}</g>
        <g filter={`url(#${idp}-soft)`}>
          {folds.map((f, i) => <path key={`d${i}`} d={f} fill={SHADOW_INK} opacity="0.1" />)}
          {lights.map((f, i) => <path key={`l${i}`} d={f} fill="#FFFFFF" opacity="0.12" />)}
        </g>
        <path d={d} fill={`url(#${idp}-shade)`} opacity={shade} />
      </g>
    </g>
  );
}

// Seams and hems: dashed strokes in the stitch colour of the colourway.
export function Seams({ list, c, w = 1.3, dash = '4 3.2', o }) {
  return list.map((d, i) => (
    <path key={i} d={d} fill="none" stroke={c.seam} strokeOpacity={o ?? c.seamO} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />
  ));
}

// Ribbing: a darker band with fine vertical ribs (collars, cuffs, hems).
export function Rib({ x, y, w, h, n, c, rotate = 0 }) {
  const cx = x + w / 2, cy = y + h / 2;
  return (
    <g transform={rotate ? `rotate(${rotate} ${r2(cx)} ${r2(cy)})` : undefined}>
      <rect x={x} y={y} width={w} height={h} fill="#000000" opacity="0.12" />
      {Array.from({ length: n }, (_, i) => {
        const lx = r2(x + (w / n) * (i + 0.5));
        return <path key={i} d={`M${lx} ${y}v${h}`} stroke={c.seam} strokeOpacity="0.24" strokeWidth="1.2" />;
      })}
      <rect x={x} y={y} width={w} height="1.6" fill="#FFFFFF" opacity="0.2" />
      <rect x={x} y={y + h - 1.6} width={w} height="1.6" fill="#000000" opacity="0.18" />
    </g>
  );
}

// A wire hanger seen from the front: hook, neck and the two arms. (cx, y) is the top of the hook.
export function HangerG({ cx, y, w = 120, drop = 30, ink = '#35241C' }) {
  const a = `M${r2(cx - w / 2)} ${r2(y + 14 + drop)}L${cx} ${y + 14}L${r2(cx + w / 2)} ${r2(y + 14 + drop)}`;
  return (
    <g fill="none" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${cx} ${y + 14}v-3q0 -8 7 -8q8 0 8 8q0 6 -6 8`} />
      <path d={a} />
      <path d={`M${r2(cx - w / 2)} ${r2(y + 14 + drop)}H${r2(cx + w / 2)}`} strokeWidth="2.4" />
    </g>
  );
}

// A wall hook: a round plate and a J that carries the garment. (x, y) is the plate centre.
export function HookG({ idp, x, y, ink = '#35241C' }) {
  return (
    <g>
      <ellipse cx={x + 3} cy={y + 4} rx="13" ry="12" fill={SHADOW_INK} opacity="0.22" />
      <circle cx={x} cy={y} r="12" fill={`url(#${idp}-metal-dark)`} />
      <circle cx={x - 3} cy={y - 3} r="3.2" fill="#FFFFFF" opacity="0.35" />
      <path d={`M${x} ${y}v22q0 14 14 14q14 0 14 -14v-6`} fill="none" stroke={ink} strokeWidth="6" strokeLinecap="round" />
      <path d={`M${x - 1.6} ${y}v22q0 12 10 13`} fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

// A wall rail with its brackets, hard shadow and highlight.
export function RailG({ idp, x, y, w, brackets = [] }) {
  return (
    <g>
      <rect x={x + 6} y={y + 8} width={w} height="10" rx="5" fill={SHADOW_INK} opacity="0.2" />
      {brackets.map((bx) => (
        <g key={bx}>
          <rect x={bx + 4} y={y - 4} width="16" height="40" fill={SHADOW_INK} opacity="0.16" />
          <rect x={bx - 6} y={y - 6} width="14" height="40" rx="3" fill={`url(#${idp}-metal-dark)`} />
        </g>
      ))}
      <rect x={x} y={y} width={w} height="10" rx="5" fill={`url(#${idp}-metal-dark)`} />
      <rect x={x + 4} y={y + 1.4} width={w - 8} height="2" rx="1" fill="#FFFFFF" opacity="0.38" />
    </g>
  );
}

// Metal eyelet: a ring with a dark opening.
export function EyeletG({ idp, x, y, r = 3.6 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={`url(#${idp}-metal)`} />
      <circle cx={x + 0.4} cy={y + 0.4} r={r * 0.5} fill="#140E0B" />
    </g>
  );
}
