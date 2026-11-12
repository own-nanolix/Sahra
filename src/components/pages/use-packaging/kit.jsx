// Shared parts of the use-packaging mockups: the scene wrapper, a three-face box with matching artwork
// transforms, the tape roll, ribbon handles, repeated artwork and small helpers. Light: upper left.
// Every face of a box is a flat rectangle in its own units, placed with a matrix, so artwork is skewed
// onto the surface instead of lying on it as a sticker.

import { r2, seeded } from '@/lib/charts';
import Art from '@/components/art/Art';
import { BackdropG, MaterialDefs, CastG, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkG, MarkG } from '@/components/art/Mark';

export const NAME = 'use-packaging';
export const C = { black: '#000000', choc: '#35241C', tribal: '#875D41', sand: '#B58F6B', beige: '#F5F0E3', white: '#FFFFFF', sand40: '#E1D2C4', sand20: '#F0E9E1', tribal40: '#CFBEB3', tribal20: '#E7DFD9' };

export const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const sc = (a, k) => [a[0] * k, a[1] * k];
export const mat = (o, u, v) => `matrix(${r2(u[0])} ${r2(u[1])} ${r2(v[0])} ${r2(v[1])} ${r2(o[0])} ${r2(o[1])})`;
export const poly = (...p) => `M${p.map((q) => `${r2(q[0])} ${r2(q[1])}`).join('L')}Z`;

// One mockup = one exportable SVG: materials, the backdrop with its hard horizon, then the scene.
export function Scene({ name, title, w, h, horizon, wall, floor, children }) {
  const idp = `${NAME}-${name}`;
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={title} exportName={idp}>
      <MaterialDefs idp={idp} />
      <BackdropG idp={idp} w={w} h={h} horizon={horizon} wall={wall} floor={floor} />
      {children(idp)}
    </Art>
  );
}

const FILLS = { chocolate: 'board-dark', tribal: 'board', sand: 'board-sand', beige: 'card', white: 'paper' };

// A box (or bag) from three faces. B is the nearest bottom corner; L and R are the screen vectors of the bottom
// edges going back to the left and to the right; H is the height; Wl and Wr are the real widths of the left and
// right faces. Artwork is passed in each face's own units: left and right faces run from their left to their
// right edge and down; the top face runs from the far-left corner (x to the right, y down towards the viewer).
export function Box3({ idp, k, B, L, R, H, Wl, Wr, tone = 'tribal', left, right, top, len = 34, castOpacity = 0.2, grain = true }) {
  const T0 = [B[0], B[1] - H];
  const TL = add(T0, L), TR = add(T0, R), F = add(TL, R);
  const BL = add(B, L), BR = add(B, R);
  const fill = `url(#${idp}-${FILLS[tone]})`;
  const face = (id, m, w, h, art, shade) => (
    <g transform={m} clipPath={`url(#${idp}-${k}-${id})`}>
      <clipPath id={`${idp}-${k}-${id}`}><rect width={w} height={h} /></clipPath>
      <rect width={w} height={h} fill={fill} filter={grain ? `url(#${idp}-fibre)` : undefined} />
      {shade}
      {art}
    </g>
  );
  return (
    <g>
      <g className="sun-shadow"><CastG d={poly(BL, TL, F, TR, BR, B)} len={len} steps={18} opacity={castOpacity} /></g>
      <path d={poly(B, BL, add(BL, R), BR)} fill="#1E140F" opacity="0.5" filter={`url(#${idp}-soft)`} transform="translate(5 4)" />
      {face('l', mat(TL, sc(L, -1 / Wl), [0, 1]), Wl, H, left, <rect width={Wl} height={H} fill={`url(#${idp}-shade)`} opacity="0.7" />)}
      {face('r', mat(T0, sc(R, 1 / Wr), [0, 1]), Wr, H, right, <rect width={Wr} height={H} fill="#000" opacity="0.34" />)}
      {face('t', mat(TL, sc(R, 1 / Wr), sc(L, -1 / Wl)), Wr, Wl, top, <rect width={Wr} height={Wl} fill="#fff" opacity="0.17" />)}
      <path d={`M${TL[0]} ${TL[1]}L${T0[0]} ${T0[1]}L${TR[0]} ${TR[1]}`} fill="none" stroke="#fff" strokeOpacity="0.38" strokeWidth="1.6" />
      <path d={`M${T0[0]} ${T0[1]}L${B[0]} ${B[1]}`} stroke="#000" strokeOpacity="0.3" strokeWidth="1.2" />
    </g>
  );
}

// The brand line on two rows, set as the case study prints it.
export function LineText({ x, y, size = 24, fill, rows = ['We Build Spaces', 'of Imagination'], ...rest }) {
  return (
    <text className="serif" fontSize={size} fill={fill} letterSpacing="-0.4" {...rest}>
      {rows.map((t, i) => <tspan key={t} x={x} y={y + i * size * 1.15}>{t}</tspan>)}
    </text>
  );
}

export function UrlText({ x, y, size = 16, fill, anchor = 'start', ...rest }) {
  return <text className="sans" x={x} y={y} fontSize={size} fill={fill} textAnchor={anchor} {...rest}>→ sahra.sa</text>;
}

// Stacked contact lines (printed details only).
export function ContactText({ x, y, lines, size = 12, fill, gap = 1.3, ...rest }) {
  return (
    <text className="sans" fill={fill} fontSize={size} {...rest}>
      {lines.map((t, i) => <tspan key={t} x={x} y={y + i * size * gap}>{t}</tspan>)}
    </text>
  );
}

// The word-mark repeated in a grid: tape and paper prints.
export function WordmarkRun({ x = 0, y = 0, width = 100, gap = 24, rows = 1, cols = 1, rowGap = 40, fill, stagger = 0, opacity }) {
  const hgt = (width * 251) / 1420;
  const items = [];
  for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) items.push([c, r]);
  return (
    <g opacity={opacity}>
      {items.map(([c, r]) => (
        <WordmarkG key={`${c}-${r}`} x={x + c * (width + gap) + (r % 2) * stagger} y={y + r * (hgt + rowGap)} width={width} fill={fill} />
      ))}
    </g>
  );
}

export function MarkGrid({ x = 0, y = 0, size = 20, cols = 6, rows = 6, gx = 60, gy = 60, fill, opacity = 1, stagger = 0 }) {
  const cells = [];
  for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) cells.push([c, r]);
  return (
    <g opacity={opacity}>
      {cells.map(([c, r]) => <MarkG key={`${c}-${r}`} x={x + c * gx + (r % 2) * stagger} y={y + r * gy} size={size} fill={fill} />)}
    </g>
  );
}

// Plain bars that encode nothing (a generic barcode stand-in).
export function PlainBars({ x, y, w, h, fill, seed = 3, opacity = 0.5 }) {
  const rnd = seeded(seed);
  const bars = [];
  let cx = 0;
  while (cx < w - 4) {
    const bw = 1.5 + Math.floor(rnd() * 4);
    bars.push([cx, bw]);
    cx += bw + 1.5 + Math.floor(rnd() * 3);
  }
  return <g opacity={opacity} fill={fill}>{bars.map(([bx, bw]) => <rect key={bx} x={r2(x + bx)} y={y} width={bw} height={h} />)}</g>;
}

// A ribbon or rope handle: a loop from (x1, y) to (x2, y) rising by `rise`, with a lit upper-left edge.
export function Handle({ x1, x2, y, y2 = y, rise, width = 14, color = '#0B0705', light = 'rgba(255,255,255,0.3)', lean = 0 }) {
  const d = `M${x1} ${y}C${x1 + lean} ${y - rise} ${x2 + lean} ${y2 - rise} ${x2} ${y2}`;
  return (
    <g fill="none" strokeLinecap="butt">
      <path d={d} stroke={color} strokeWidth={width} />
      <path d={d} stroke={light} strokeWidth={r2(width * 0.16)} transform={`translate(${-width * 0.22} ${-width * 0.12})`} />
      <circle cx={x1} cy={y} r={r2(width * 0.55)} fill={color} stroke="none" />
      <circle cx={x2} cy={y2} r={r2(width * 0.55)} fill={color} stroke="none" />
    </g>
  );
}

// ---------- The tape roll ----------
// A roll lying with its axis pointing away to the upper right: the wound edge (front ellipse) with its card core
// and hole, the printed cylinder band behind it, and a back ellipse. cx, cy = front centre; r = radius;
// d = the axis vector (the tape width). print draws in band units: x along the tape (0 to 2r), y across (0 to |d|).
export function Roll({ idp, k, cx, cy, r, d, tape, edge, coreInk, print, len = 30 }) {
  const dl = Math.hypot(d[0], d[1]);
  const th = (Math.atan2(d[1], d[0]) * 180) / Math.PI;
  const p = [-d[1] / dl, d[0] / dl];
  const f = [cx, cy], bk = [cx + d[0], cy + d[1]];
  const minor = r2(r * 0.5);
  const band = poly(add(f, sc(p, -r)), add(f, sc(p, r)), add(bk, sc(p, r)), add(bk, sc(p, -r)));
  const outline = band;
  const arc = (c) => `M${r2(c[0] - p[0] * r)} ${r2(c[1] - p[1] * r)}A${minor} ${r} ${r2(th)} 1 1 ${r2(c[0] + p[0] * r)} ${r2(c[1] + p[1] * r)}A${minor} ${r} ${r2(th)} 1 1 ${r2(c[0] - p[0] * r)} ${r2(c[1] - p[1] * r)}Z`;
  const ell = (c, rx, ry, extra) => <ellipse cx={c[0]} cy={c[1]} rx={rx} ry={ry} transform={`rotate(${r2(th)} ${c[0]} ${c[1]})`} {...extra} />;
  const m = mat(add(f, sc(p, r)), sc(p, -1), sc(d, 1 / dl));
  const rings = [0.7, 0.78, 0.86, 0.94];
  return (
    <g>
      <g className="sun-shadow"><g opacity="0.2">
        {[outline, arc(f), arc(bk)].map((q, i) => <CastG key={i} d={q} len={len} steps={16} opacity={1} />)}</g>
      </g>
      {ell(bk, minor, r, { fill: tape })}
      <path d={band} fill={tape} />
      <clipPath id={`${idp}-${k}-band`}><path d={band} /></clipPath>
      <g clipPath={`url(#${idp}-${k}-band)`}>
        <g transform={m}>
          {print}
          <rect width={2 * r} height={dl} fill={`url(#${idp}-shade)`} opacity="0.85" />
          <rect width={2 * r} height={dl} fill={`url(#${idp}-roll-curve-${k})`} />
        </g>
      </g>
      <defs>
        <linearGradient id={`${idp}-roll-curve-${k}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.25" />
          <stop offset="0.28" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.38" />
        </linearGradient>
      </defs>
      {ell(f, minor, r, { fill: edge })}
      {rings.map((q) => <g key={q}>{ell(f, r2(minor * q), r2(r * q), { fill: 'none', stroke: '#000', strokeOpacity: 0.12, strokeWidth: 1.2 })}</g>)}
      {ell(f, r2(minor * 0.6), r2(r * 0.6), { fill: coreInk })}
      {ell(add(f, sc(d, 0.05)), r2(minor * 0.54), r2(r * 0.54), { fill: '#1E140F' })}
      {ell(add(f, [dl * 0.015, 0]), r2(minor * 0.54), r2(r * 0.54), { fill: 'none', stroke: '#000', strokeOpacity: 0.5, strokeWidth: 3 })}
      {ell(f, minor, r, { fill: 'none', stroke: '#fff', strokeOpacity: 0.28, strokeWidth: 1.4 })}
    </g>
  );
}

export { WordmarkG, MarkG, SHADOW_INK };
