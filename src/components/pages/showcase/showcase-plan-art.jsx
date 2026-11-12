// The plan and the plan sheet for the showcase scenes (copied from the plan explorer's artwork so this page owns what it
// draws): the plan drawn in code in five layers, and the sheet (m13) on its two grounds. Ids are prefixed with the page id.
import { MarkG } from '@/components/art/Mark';
import { wrap } from '@/components/art/Devices';
import { PLAN, SENDER, CONTACT, CONTACT_BLOCKS } from '@/lib/brand';
import { r2 } from '@/lib/charts';

// ---------- The plan: a 440 x 520 box, five layers ----------

export const PLAN_BOX = { w: 440, h: 520 };
export const LAYER_KEYS = ['walls', 'doors', 'grid', 'furniture', 'carpark'];
export const LAYER_LABELS = { walls: 'Walls', doors: 'Doors', grid: 'Grid lines', furniture: 'Furniture', carpark: 'Car park' };
export const ALL_ON = { walls: true, doors: true, grid: true, furniture: true, carpark: true };

const DOOR = 22;
const OUTER = 'M236 262V40H112V96H24V470H236V284';
// horizontal partitions (y, from, to) and the doors cut in them (at = start of the gap, s = swing up or down)
const HW = [
  { y: 150, x1: 24, x2: 236, doors: [{ at: 52, s: -1 }, { at: 176, s: 1 }] },
  { y: 226, x1: 24, x2: 236, doors: [{ at: 140, s: -1 }] },
  { y: 302, x1: 24, x2: 236, doors: [{ at: 44, s: 1 }, { at: 168, s: -1 }] },
  { y: 378, x1: 24, x2: 236, doors: [{ at: 96, s: 1 }] },
];
const VW = [
  { x: 112, y1: 150, y2: 302, doors: [{ at: 176, s: 1 }] },
  { x: 172, y1: 40, y2: 150, doors: [{ at: 96, s: -1 }] },
  { x: 172, y1: 226, y2: 302, doors: [{ at: 252, s: -1 }] },
  { x: 72, y1: 378, y2: 470, doors: [{ at: 430, s: -1 }] },
  { x: 120, y1: 378, y2: 470, doors: [{ at: 424, s: 1 }] },
];
const DOORS = [
  ...HW.flatMap((w) => w.doors.map((d) => ({ o: 'h', x: d.at, y: w.y, s: d.s }))),
  ...VW.flatMap((w) => w.doors.map((d) => ({ o: 'v', x: w.x, y: d.at, s: d.s }))),
  { o: 'v', x: 236, y: 262, s: 1 },
];
const ROOMS = [
  { x: 28, y: 154, w: 80, h: 68 },
  { x: 116, y: 154, w: 116, h: 68 },
  { x: 28, y: 230, w: 80, h: 68 },
  { x: 116, y: 230, w: 52, h: 68 },
  { x: 28, y: 306, w: 204, h: 68 },
];
export const GRID_X = [24, 112, 172, 236, 336, 428];
export const GRID_Y = [40, 150, 226, 302, 378, 470];

// the solid stretches of a wall from a to b once the door gaps are cut
function spans(a, b, gaps) {
  const out = [];
  let c = a;
  [...gaps].sort((p, q) => p - q).forEach((g) => {
    if (g > c) out.push([c, g]);
    c = g + DOOR;
  });
  if (c < b) out.push([c, b]);
  return out;
}

function Desk({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="16" height="8" />
      <circle cx={r2(x + 8)} cy={y + 13} r="3" />
    </g>
  );
}

function Car({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <rect x="-20" y="-9" width="40" height="18" rx="6" />
      <path d="M-8 -7V7M8 -7V7" />
      <path d="M-20 -3H-14M-20 3H-14M20 -3H14M20 3H14" />
    </g>
  );
}

function deskPositions(rm) {
  const cols = Math.max(1, Math.floor((rm.w - 8) / 28));
  const rows = Math.max(1, Math.floor((rm.h - 6) / 26));
  return Array.from({ length: cols * rows }, (_, n) => ({
    x: rm.x + 6 + (n % cols) * 28,
    y: rm.y + 6 + Math.floor(n / cols) * 26,
  }));
}

// style of one layer: faded out when off (the explorer animates this); a static drawing leaves the layer out
function layerProps(key, layers, transition) {
  const on = layers[key];
  return {
    'data-layer': key,
    style: transition ? { opacity: on ? 1 : 0, transition: 'opacity var(--dur-3) var(--ease-out)' } : undefined,
  };
}

// The plan. layers: which layers are drawn. sw multiplies every line weight (for small, exploded copies).
// transition: keep every layer in the document and fade it (the explorer). animate: draw the walls on.
export function PlanG({ x = 0, y = 0, scale = 1, ink = '#35241C', layers = ALL_ON, sw = 1, transition = false, animate = false }) {
  const w = (n) => r2(n * sw);
  const wallDraw = (i) => (animate ? { className: 'draw', pathLength: 1000, style: { '--len': 1000, '--i': i } } : {});
  const fade = (i) => (animate ? { className: 'fade-in', style: { '--i': i } } : {});
  const show = (k) => transition || layers[k];
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${scale})`} fill="none" stroke={ink} strokeLinecap="square">
      {show('grid') && (
        <g {...layerProps('grid', layers, transition)}>
          <g strokeWidth={w(0.5)} strokeOpacity="0.6" strokeDasharray={`${w(8)} ${w(4)} ${w(2)} ${w(4)}`} {...fade(2)}>
            {GRID_X.map((gx) => (
              <g key={gx}>
                <path d={`M${gx} 18V508`} />
                <circle cx={gx} cy="11" r="5" strokeDasharray="none" />
              </g>
            ))}
            {GRID_Y.map((gy) => (
              <g key={gy}>
                <path d={`M18 ${gy}H436`} />
                <circle cx="11" cy={gy} r="5" strokeDasharray="none" />
              </g>
            ))}
          </g>
        </g>
      )}

      {show('walls') && (
        <g {...layerProps('walls', layers, transition)}>
          <path d={OUTER} strokeWidth={w(3.2)} strokeLinejoin="miter" {...wallDraw(0)} />
          <g strokeWidth={w(1.7)}>
            {HW.flatMap((hw, i) =>
              spans(hw.x1, hw.x2, hw.doors.map((d) => d.at)).map(([a, b], j) => (
                <path key={`h${i}-${j}`} d={`M${a} ${hw.y}H${b}`} {...wallDraw(1 + i)} />
              )),
            )}
            {VW.flatMap((vw, i) =>
              spans(vw.y1, vw.y2, vw.doors.map((d) => d.at)).map(([a, b], j) => (
                <path key={`v${i}-${j}`} d={`M${vw.x} ${a}V${b}`} {...wallDraw(2 + i)} />
              )),
            )}
          </g>
        </g>
      )}

      {show('doors') && (
        <g {...layerProps('doors', layers, transition)}>
          <g strokeWidth={w(0.9)} {...fade(5)}>
            {DOORS.map((d, i) =>
              d.o === 'h' ? (
                <g key={i}>
                  <path d={`M${d.x} ${d.y}V${d.y + d.s * DOOR}`} strokeWidth={w(1.4)} />
                  <path d={`M${d.x + DOOR} ${d.y}A${DOOR} ${DOOR} 0 0 ${d.s < 0 ? 0 : 1} ${d.x} ${d.y + d.s * DOOR}`} strokeWidth={w(0.7)} />
                </g>
              ) : (
                <g key={i}>
                  <path d={`M${d.x} ${d.y}H${d.x + d.s * DOOR}`} strokeWidth={w(1.4)} />
                  <path d={`M${d.x} ${d.y + DOOR}A${DOOR} ${DOOR} 0 0 ${d.s > 0 ? 0 : 1} ${d.x + d.s * DOOR} ${d.y}`} strokeWidth={w(0.7)} />
                </g>
              ),
            )}
          </g>
        </g>
      )}

      {show('furniture') && (
        <g {...layerProps('furniture', layers, transition)}>
          <g strokeWidth={w(0.8)} {...fade(7)}>
            {ROOMS.flatMap((rm, k) => deskPositions(rm).map((p, n) => <Desk key={`${k}-${n}`} x={p.x} y={p.y} />))}
            <rect x="184" y="48" width="46" height="88" />
            {Array.from({ length: 13 }, (_, i) => (
              <path key={i} d={`M184 ${54 + i * 6.4}H230`} />
            ))}
            <path d="M207 128V58M202 64l5 -7 5 7" />
            {Array.from({ length: 3 }, (_, i) => (
              <g key={i}>
                <rect x={30 + i * 14} y="384" width="10" height="14" rx="2" />
                <circle cx={35 + i * 14} cy="410" r="3.2" />
              </g>
            ))}
            <path d="M76 384H116V424" />
            <rect x="82" y="440" width="30" height="20" />
            <ellipse cx="178" cy="424" rx="38" ry="17" />
            {Array.from({ length: 6 }, (_, i) => (
              <circle key={i} cx={r2(178 + Math.cos((i * Math.PI) / 3 + 0.5) * 48)} cy={r2(424 + Math.sin((i * Math.PI) / 3 + 0.5) * 26)} r="4" />
            ))}
            <rect x="120" y="44" width="46" height="26" rx="3" />
            <rect x="124" y="104" width="38" height="14" rx="3" />
            <rect x="30" y="102" width="70" height="16" rx="3" />
          </g>
        </g>
      )}

      {show('carpark') && (
        <g {...layerProps('carpark', layers, transition)}>
          <g strokeWidth={w(1)} {...fade(9)}>
            <rect x="258" y="34" width="170" height="466" rx="18" strokeWidth={w(1.6)} />
            <rect x="268" y="46" width="44" height="64" rx="18" strokeWidth={w(1.5)} />
            <rect x="374" y="46" width="44" height="64" rx="18" strokeWidth={w(1.5)} />
            <path d="M336 120V492" strokeDasharray={`${w(10)} ${w(6)}`} />
            <path d="M374 120V480M302 120V480" />
            {Array.from({ length: 16 }, (_, i) => (
              <g key={i}>
                <path d={`M374 ${120 + i * 22.5}H428`} />
                <path d={`M262 ${120 + i * 22.5}H302`} />
              </g>
            ))}
            <Car x={400} y={142} rot={90} />
            <Car x={400} y={300} rot={90} />
            <Car x={282} y={232} rot={90} />
            <Car x={282} y={412} rot={90} />
            <Car x={350} y={380} rot={-14} />
            <path d="M336 108l-5 9h10zM336 476l-5 -9h10z" />
          </g>
        </g>
      )}
    </g>
  );
}

// ---------- The sheet (m13): header, two contact blocks, the plan, the mark, the plan paragraph ----------

export const SHEET_SIZE = { w: 480, h: 690 };
export const SHEET_PLAN = { x: 36, y: 90, k: 0.92 };
// m13 prints the sheet on white paper; the Dark version is the extension.
export const TONES = {
  white: { paper: '#FFFFFF', ink: '#35241C', accent: '#875D41', mark: '#B58F6B', name: 'White, as printed' },
  dark: { paper: '#35241C', ink: '#F5F0E3', accent: '#B58F6B', mark: '#B58F6B', name: 'Dark Chocolate' },
};

// Header, mark and paragraph placed as on m13 (re-measured on the full-size image, sheet 460 x 650 there):
// sender at the left, the service lines from 38 % and the office block from 77 % of the width; the mark at the
// lower left and the paragraph in five small lines from 38 %.
export function SheetG({ tone = 'white', layers = ALL_ON, transition = false, animate = false }) {
  const t = TONES[tone];
  const lines = wrap(PLAN.text, 100);
  return (
    <g>
      <rect width={SHEET_SIZE.w} height={SHEET_SIZE.h} fill={t.paper} />
      <text x="28" y="36.5" fontSize="8" fill={t.accent} className="sans">{SENDER.developement}</text>
      <text fontSize="7.6" fill={t.ink} className="sans">
        <tspan x="180" y="36.5">{CONTACT.support}</tspan>
        <tspan x="180" y="47">{CONTACT.partnerships}</tspan>
        <tspan x="368" y="36.5">{CONTACT.city}</tspan>
        <tspan x="368" y="47">{CONTACT.phone}</tspan>
        <tspan x="368" y="57.5">{CONTACT.info}</tspan>
      </text>
      <PlanG x={SHEET_PLAN.x} y={SHEET_PLAN.y} scale={SHEET_PLAN.k} ink={t.ink} layers={layers} transition={transition} animate={animate} />
      <MarkG x={28} y={622} size={32} fill={t.mark} />
      <text fontSize="5.3" fill={t.ink} className="sans">
        {lines.map((l, i) => <tspan key={i} x="182" y={r2(629 + i * 8.4)}>{l}</tspan>)}
      </text>
    </g>
  );
}

