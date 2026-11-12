// The mockup kit. This project's direction (the same on every mockup page; only the arrangement changes):
//   Staging:  in context: each object stands in a simple drawn scene: a desk, a wall, a street, a counter.
//   Backdrop: a flat field of one brand colour with a hard horizon line (no sweep, no vignette).
//   Light:    one direction, from the upper left, as in the designer's flat lays (m01, m10, m08): hard cast
//             shadows fall to the lower right; standing objects also sit on a soft contact shadow.
// Each mockup is ONE <Art> SVG: backdrop, scene, shadows, object, materials, shading and the brand artwork.
// Components that create defs take `idp` (id prefix): use a different one each time on a page.

import { r2 } from '@/lib/charts';

export const LIGHT = { x: -0.74, y: -0.67 };       // where the light comes from (upper left)
export const SHADOW = { x: 0.74, y: 0.67 };        // where hard shadows fall (lower right)
export const SHADOW_INK = '#35241C';               // shadows are Dark Chocolate Brown, never grey or black

// Scene palette: every surface is a brand colour or one of its published tints.
export const SCENE = {
  beige: '#F5F0E3', white: '#FFFFFF', sand: '#B58F6B', tribal: '#875D41', chocolate: '#35241C', black: '#000000',
  sand40: '#E1D2C4', sand20: '#F0E9E1', tribal40: '#CFBEB3', tribal20: '#E7DFD9', beige60: '#F9F6EE',
  studio: '#F7F3EA',                               // sampled: the warm off-white ground of the flat lays
};

// The backdrop: two flat fields of brand colour meeting at a hard horizon line.
//   <BackdropG idp="use-world-a" w={1600} h={1000} horizon={0.68} wall={SCENE.beige} floor={SCENE.sand40} />
// horizon is a fraction of h (0 = top). line draws the horizon as a thin darker rule. grain adds paper grain.
export function BackdropG({ idp, w, h, horizon = 0.64, wall = SCENE.beige, floor = SCENE.sand40, line = true, grain = true, ...rest }) {
  const y = r2(h * horizon);
  return (
    <g {...rest}>
      {grain && <GrainFilter idp={idp} />}
      <g filter={grain ? `url(#${idp}-grain)` : undefined}>
        <rect width={w} height={y} fill={wall} />
        <rect y={y} width={w} height={r2(h - y)} fill={floor} />
      </g>
      {line && <path d={`M0 ${y}H${w}`} stroke={SHADOW_INK} strokeOpacity="0.18" strokeWidth="1.5" />}
    </g>
  );
}

// Fine paper grain as a filter (apply with filter="url(#<idp>-grain)").
export function GrainFilter({ idp, amount = 0.07, seed = 4 }) {
  return (
    <filter id={`${idp}-grain`} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} result="n" />
      <feColorMatrix in="n" type="matrix" values={`0 0 0 0 0.21  0 0 0 0 0.14  0 0 0 0 0.11  0 0 0 ${amount * 2} 0`} result="g" />
      <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="gi" />
      </feMerge>
    </filter>
  );
}

// ---------- Scene parts (all lit from the upper left) ----------

// A desk seen from the front: the desk top is the floor field; this draws its front edge band at y.
export function DeskEdgeG({ x = 0, y, w, thickness = 26, top = SCENE.sand40, edge = SCENE.tribal, ...rest }) {
  return (
    <g {...rest}>
      <rect x={x} y={y} width={w} height={thickness} fill={edge} />
      <rect x={x} y={y} width={w} height="3" fill="#FFFFFF" opacity="0.35" />
      <rect x={x} y={y + thickness} width={w} height="10" fill={SHADOW_INK} opacity="0.16" />
      <path d={`M${x} ${y}H${x + w}`} stroke={top} strokeWidth="1" />
    </g>
  );
}

// A wall of vertical ribs or fins (the ribbed concrete of m11, the fins of m14). Each rib has a lit left face
// and a shaded right face. pitch = distance between ribs, rib = rib width.
export function WallRibsG({ x = 0, y = 0, w, h, pitch = 22, rib = 9, fill = SCENE.sand40, shade = SHADOW_INK, ...rest }) {
  const n = Math.ceil(w / pitch);
  return (
    <g {...rest}>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      {Array.from({ length: n }, (_, i) => {
        const rx = x + i * pitch;
        return (
          <g key={i}>
            <rect x={rx} y={y} width={Math.min(rib, x + w - rx)} height={h} fill="#FFFFFF" opacity="0.18" />
            <rect x={rx + rib} y={y} width={Math.max(0, Math.min(3, x + w - rx - rib))} height={h} fill={shade} opacity="0.2" />
          </g>
        );
      })}
    </g>
  );
}

// A street: pavement slabs, a kerb and the road, from y down to h (the hoarding, m16).
export function StreetG({ x = 0, y, w, h, kerb = 16, pavement = SCENE.sand20, road = SCENE.tribal40, slab = 220, ...rest }) {
  const pavH = r2((h - y) * 0.38);
  const n = Math.ceil(w / slab);
  return (
    <g {...rest}>
      <rect x={x} y={y} width={w} height={pavH} fill={pavement} />
      {Array.from({ length: n }, (_, i) => (
        <path key={i} d={`M${x + i * slab} ${y}v${pavH}`} stroke={SHADOW_INK} strokeOpacity="0.12" strokeWidth="1.5" />
      ))}
      <rect x={x} y={y + pavH} width={w} height={kerb} fill="#FFFFFF" opacity="0.7" />
      <rect x={x} y={y + pavH + kerb} width={w} height="5" fill={SHADOW_INK} opacity="0.22" />
      <rect x={x} y={y + pavH + kerb + 5} width={w} height={r2(h - y - pavH - kerb - 5)} fill={road} />
    </g>
  );
}

// A counter (reception desk, shop counter): a top slab over a front body with a recessed plinth.
export function CounterG({ x = 0, y = 0, w, h, slab = 18, top = SCENE.beige, front = SCENE.tribal, plinth = 14, ...rest }) {
  return (
    <g {...rest}>
      <rect x={x} y={y + slab} width={w} height={h - slab - plinth} fill={front} />
      <rect x={x} y={y + slab} width={w * 0.5} height={h - slab - plinth} fill="#FFFFFF" opacity="0.06" />
      <rect x={x + 10} y={y + h - plinth} width={w - 20} height={plinth} fill={SHADOW_INK} opacity="0.55" />
      <rect x={x - 6} y={y} width={w + 12} height={slab} fill={top} />
      <rect x={x - 6} y={y + slab - 4} width={w + 12} height="4" fill={SHADOW_INK} opacity="0.18" />
      <rect x={x} y={y + slab} width={w} height="12" fill={SHADOW_INK} opacity="0.2" />
    </g>
  );
}

// A wall shelf: top face, front edge and the shadow it throws on the wall below.
export function ShelfG({ x = 0, y = 0, w, depth = 16, edge = 10, fill = SCENE.white, ...rest }) {
  return (
    <g {...rest}>
      <path d={`M${x} ${y + edge}h${w}l${depth * SHADOW.x} ${depth * SHADOW.y + 14}h${-w}z`} fill={SHADOW_INK} opacity="0.12" />
      <rect x={x} y={y - depth * 0.35} width={w} height={depth * 0.35} fill={fill} />
      <rect x={x} y={y} width={w} height={edge} fill={fill} />
      <rect x={x} y={y + edge - 2} width={w} height="2" fill={SHADOW_INK} opacity="0.2" />
    </g>
  );
}

// A block (plinth, stand, box seen front-on with its top face): front face w x h, top face of depth d.
export function BlockG({ x = 0, y = 0, w, h, d = 30, front = SCENE.beige, top = SCENE.white, side = SCENE.sand40, ...rest }) {
  const dx = r2(d * 0.6);
  return (
    <g {...rest}>
      <path d={`M${x} ${y}l${dx} ${-d}h${w}l${-dx} ${d}z`} fill={top} />
      <path d={`M${x + w} ${y}l${dx} ${-d}v${h}l${-dx} ${d}z`} fill={side} />
      <rect x={x} y={y} width={w} height={h} fill={front} />
    </g>
  );
}

// ---------- Shadows ----------

// Hard cast shadow of a flat or thick object: the outline `d` swept towards the lower right by `len`
// (repeated copies give a crisp sweep). Draw it before the object.
export function CastG({ d, len = 24, steps = 8, opacity = 0.2, fill = SHADOW_INK, ...rest }) {
  return (
    <g opacity={opacity} fill={fill} {...rest}>
      {Array.from({ length: steps }, (_, i) => {
        const t = (len * (i + 1)) / steps;
        return <path key={i} d={d} transform={`translate(${r2(t * SHADOW.x)} ${r2(t * SHADOW.y)})`} />;
      })}
    </g>
  );
}

// The exact hard shadow of a box standing on the floor (footprint x, y, w, h), as one polygon.
export function castRect(x, y, w, h, len) {
  const dx = r2(len * SHADOW.x), dy = r2(len * SHADOW.y);
  return `M${x} ${y}H${x + w}L${x + w + dx} ${y + dy}V${y + h + dy}H${x + dx}L${x} ${y + h}Z`;
}
export function CastRectG({ x, y, w, h, len = 30, opacity = 0.2, fill = SHADOW_INK, ...rest }) {
  return <path d={castRect(x, y, w, h, len)} fill={fill} opacity={opacity} {...rest} />;
}

// Soft contact shadow under a standing or round object. idp must be unique per shadow.
export function ContactShadowG({ idp, cx, cy, rx, ry, opacity = 0.32, blur = 7, fill = SHADOW_INK, ...rest }) {
  const id = `${idp}-contact`;
  const ryy = ry === undefined ? rx * 0.12 : ry;
  return (
    <g {...rest}>
      <filter id={id} x="-30%" y="-200%" width="160%" height="500%">
        <feGaussianBlur stdDeviation={blur} />
      </filter>
      <ellipse cx={r2(cx + rx * 0.12)} cy={cy} rx={rx} ry={r2(ryy)} fill={fill} opacity={opacity} filter={`url(#${id})`} />
    </g>
  );
}

// ---------- Materials ----------

// Material definitions as <defs>. Put <MaterialDefs idp="..." /> once in a mockup SVG, then use:
//   fill="url(#<idp>-board)"     tribal-brown board (lids, slipcases, envelopes)
//   fill="url(#<idp>-board-dark)" dark chocolate board (folders, boxes, bags)
//   fill="url(#<idp>-board-sand)" sand board (the folder of m01)
//   fill="url(#<idp>-paper)"     white paper          fill="url(#<idp>-card)"     beige coated card
//   fill="url(#<idp>-metal)"     brushed metal        fill="url(#<idp>-metal-dark)" dark anodised metal
//   fill="url(#<idp>-glass)"     glass sheen overlay  fill="url(#<idp>-ceramic)"  glazed ceramic
//   fill="url(#<idp>-rubber)"    matte rubber         fill="url(#<idp>-shade)" / "-shade-v" shading overlays
//   filter="url(#<idp>-fibre)"   board fibre (use on boards)   filter="url(#<idp>-paper-grain)" paper tooth
//   filter="url(#<idp>-fabric)"  woven fabric          filter="url(#<idp>-soft)" a small blur
export function MaterialDefs({ idp }) {
  const noise = (id, freq, octaves, seed, alpha, ink = '0.21 0.14 0.11') => {
    const [rr, gg, bb] = ink.split(' ');
    return (
      <filter id={`${idp}-${id}`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={octaves} seed={seed} result="n" />
        <feColorMatrix in="n" type="matrix" values={`0 0 0 0 ${rr}  0 0 0 0 ${gg}  0 0 0 0 ${bb}  0 0 0 ${alpha} 0`} result="g" />
        <feComposite in="g" in2="SourceAlpha" operator="in" result="gi" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="gi" />
        </feMerge>
      </filter>
    );
  };
  const lin = (id, stops, x2 = 1, y2 = 1) => (
    <linearGradient id={`${idp}-${id}`} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c, a = 1]) => <stop key={o} offset={o} stopColor={c} stopOpacity={a} />)}
    </linearGradient>
  );
  return (
    <defs>
      {lin('board', [[0, '#946A4C'], [0.55, '#875D41'], [1, '#77513A']])}
      {lin('board-dark', [[0, '#412D23'], [0.6, '#35241C'], [1, '#2B1D17']])}
      {lin('board-sand', [[0, '#C29C78'], [0.6, '#B58F6B'], [1, '#A68261']])}
      {lin('paper', [[0, '#FFFFFF'], [1, '#F2EEE6']])}
      {lin('card', [[0, '#F9F6EE'], [1, '#EDE6D4']])}
      {lin('metal', [[0, '#F1EEEA'], [0.32, '#C4BDB4'], [0.52, '#EAE6E0'], [0.78, '#A59D93'], [1, '#D3CDC5']])}
      {lin('metal-dark', [[0, '#5A504A'], [0.42, '#231A15'], [0.62, '#3E342E'], [1, '#140E0B']])}
      {lin('glass', [[0, '#FFFFFF', 0.5], [0.36, '#FFFFFF', 0.06], [0.64, '#FFFFFF', 0], [1, '#FFFFFF', 0.18]])}
      <radialGradient id={`${idp}-ceramic`} cx="0.3" cy="0.25" r="0.95">
        <stop offset="0" stopColor="#FFFFFF" />
        <stop offset="0.55" stopColor="#F5F0E3" />
        <stop offset="1" stopColor="#D9CDB8" />
      </radialGradient>
      {lin('rubber', [[0, '#3A2A22'], [1, '#1E1410']])}
      {lin('shade', [[0, '#FFFFFF', 0.28], [0.32, '#FFFFFF', 0], [0.6, '#000000', 0], [1, '#000000', 0.28]], 1, 0)}
      {lin('shade-v', [[0, '#FFFFFF', 0.2], [0.4, '#000000', 0], [1, '#000000', 0.22]], 0, 1)}
      {noise('fibre', '0.75', 3, 9, 0.22)}
      {noise('paper-grain', '1.2', 1, 11, 0.09)}
      {noise('fabric', '0.9 0.35', 2, 5, 0.26)}
      <filter id={`${idp}-soft`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
  );
}

// Blind deboss: an inner shadow on the upper-left inner edges and an inner highlight on the lower-right ones,
// so the shape reads as pressed into the board under light from the upper left.
// <DebossDefs idp="x" depth={4} /> then filter="url(#x-deboss)" on the pressed shape (its fill is the floor).
export function DebossDefs({ idp, depth = 4, shadow = 0.55, light = 0.4 }) {
  const d = depth;
  const b = r2(Math.max(0.4, d * 0.35));
  return (
    <defs>
      <filter id={`${idp}-deboss`} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feOffset in="SourceAlpha" dx={d} dy={d} result="sh-o" />
        <feComposite in="SourceAlpha" in2="sh-o" operator="out" result="sh-e" />
        <feGaussianBlur in="sh-e" stdDeviation={b} result="sh-b" />
        <feFlood floodColor="#1E140F" floodOpacity={shadow} result="sh-c" />
        <feComposite in="sh-c" in2="sh-b" operator="in" result="sh-in" />
        <feComposite in="sh-in" in2="SourceAlpha" operator="in" result="shadow" />
        <feOffset in="SourceAlpha" dx={-d * 0.7} dy={-d * 0.7} result="li-o" />
        <feComposite in="SourceAlpha" in2="li-o" operator="out" result="li-e" />
        <feGaussianBlur in="li-e" stdDeviation={b} result="li-b" />
        <feFlood floodColor="#FFF6E8" floodOpacity={light} result="li-c" />
        <feComposite in="li-c" in2="li-b" operator="in" result="li-in" />
        <feComposite in="li-in" in2="SourceAlpha" operator="in" result="light" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode in="shadow" />
          <feMergeNode in="light" />
        </feMerge>
      </filter>
    </defs>
  );
}

// ---------- Motion wrappers (CSS keyframes; the finished artwork is the base state) ----------

// An object being set down in its scene: it settles from a little above and its shadow follows.
// i sets the order. <PlaceG i={1} x={420} y={300}>…</PlaceG>
export function PlaceG({ i = 0, x = 0, y = 0, rotate = 0, children, ...rest }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)})${rotate ? ` rotate(${rotate})` : ''}`} {...rest}>
      <g className="mock-place" style={{ '--i': i }}>
        {children}
      </g>
    </g>
  );
}

// A gloss sheen that slowly turns to the light. Put it over a shape of the same geometry (needs MaterialDefs).
export function SheenG({ idp, d, opacity = 0.4, ...rest }) {
  return <path d={d} fill={`url(#${idp}-glass)`} opacity={opacity} className="mock-sheen" {...rest} />;
}
