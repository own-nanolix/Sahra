// Artwork for the plan explorer: the plan drawn in code in five layers (an office-style plan with a car park, as
// on the presentation sheet of m13, with no dimension figures and no room labels: both are illegible in the
// source), the sheet on its two grounds, the layer diagram and the closed presentation box. Every exported graphic
// is an <Art>; the explorer reuses the same groups inside its own viewer.
import Art from '@/components/art/Art';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { MaterialDefs, CastRectG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
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

// The two black rings that hold the sheet in the tray (m13), in sheet coordinates.
export const RING_Y = [222, 462];
export function RingsG() {
  return (
    <g fill="none" stroke="#000000">
      {RING_Y.map((y) => (
        <g key={y}>
          <circle cx="52" cy={y} r="5.5" fill="#000000" stroke="none" />
          <ellipse cx="6" cy={y} rx="50" ry="13" strokeWidth="6.5" />
          <path d={`M-44 ${y}a50 13 0 0 0 100 0`} strokeWidth="6.5" stroke="#2B1D17" strokeOpacity="0.6" />
        </g>
      ))}
    </g>
  );
}

export function SheetArt({ tone, ...rest }) {
  const t = TONES[tone];
  return (
    <Art viewBox="0 0 520 730" title={`Plan sheet, flat artwork on ${t.name}`} exportName={`feature-sheet-${tone}`} style={{ width: '100%', height: 'auto' }} {...rest}>
      <rect width="520" height="730" fill={tone === 'dark' ? SCENE.black : SCENE.beige} />
      <CastRectG x={20} y={20} w={480} h={690} len={14} opacity={tone === 'dark' ? 0.5 : 0.2} />
      <g transform="translate(20 20)">
        <SheetG tone={tone} animate />
      </g>
      <rect x="20" y="20" width="480" height="690" fill="none" stroke={t.ink} strokeOpacity="0.2" />
    </Art>
  );
}

// ---------- The plan drawing on its own ----------

export function PlanArt() {
  return (
    <Art viewBox="0 0 480 560" title="Floor plan with a car park, drawn without dimensions or room labels" exportName="feature-plan" style={{ width: '100%', height: 'auto' }}>
      <rect width="480" height="560" fill={SCENE.beige} />
      <PlanG x={20} y={20} animate />
    </Art>
  );
}

// ---------- The layers, exploded ----------

const EXPLODE = ['furniture', 'doors', 'walls', 'grid', 'carpark'];
const S = 0.5;
const iso = (px, py, ox, oy) => [r2(ox + (px - py) * 0.866 * S), r2(oy + (px + py) * 0.5 * S)];

export function LayersArt() {
  const ox = 330;
  const base = 78;
  const step = 138;
  const corners = [[0, 0], [PLAN_BOX.w, 0], [PLAN_BOX.w, PLAN_BOX.h], [0, PLAN_BOX.h]];
  // bottom plane first, so that the upper planes sit over it
  const order = [...EXPLODE].map((k, i) => ({ k, i })).reverse();
  return (
    <Art viewBox="0 0 900 880" title="The five layers of the plan, exploded: walls, doors, grid lines, furniture, car park" exportName="feature-layers" style={{ width: '100%', height: 'auto' }}>
      <rect width="900" height="880" fill={SCENE.beige} />
      {EXPLODE.slice(0, -1).map((k, i) => (
        <g key={k} stroke={SHADOW_INK} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 5">
          {corners.map(([cx, cy]) => {
            const [x1, y1] = iso(cx, cy, ox, base + i * step);
            const [x2, y2] = iso(cx, cy, ox, base + (i + 1) * step);
            return <path key={`${cx}-${cy}`} d={`M${x1} ${y1}L${x2} ${y2}`} />;
          })}
        </g>
      ))}
      {order.map(({ k, i }) => {
        const oy = base + i * step;
        const pts = corners.map(([cx, cy]) => iso(cx, cy, ox, oy).join(' ')).join('L');
        const [lx, ly] = iso(PLAN_BOX.w, PLAN_BOX.h * 0.5, ox, oy);
        return (
          <g key={k} className="slide-up" style={{ '--i': 4 - i }}>
            <path d={`M${pts}Z`} fill="#FFFFFF" fillOpacity="0.82" stroke={SHADOW_INK} strokeOpacity="0.55" strokeWidth="1.2" />
            <g transform={`matrix(${r2(0.866 * S)} ${r2(0.5 * S)} ${r2(-0.866 * S)} ${r2(0.5 * S)} ${ox} ${oy})`}>
              <PlanG layers={{ ...Object.fromEntries(LAYER_KEYS.map((n) => [n, false])), [k]: true }} sw={2.1} />
            </g>
            <path d={`M${lx + 10} ${ly}H${lx + 70}`} stroke={SHADOW_INK} strokeOpacity="0.55" strokeWidth="1" />
            <text x={lx + 80} y={ly + 5} fontSize="16" className="sans" fill={SCENE.chocolate}>{LAYER_LABELS[k]}</text>
          </g>
        );
      })}
    </Art>
  );
}

// ---------- The presentation box (m13): lid with the vertical word-mark debossed, spine with the contacts ----------

export const BOX = { lid: { w: 600, h: 837 }, spine: 84 };

// the contacts on the spine read bottom to top, as on m13: service, online, office
const SPINE_BLOCKS = [CONTACT_BLOCKS.service, CONTACT_BLOCKS.online, CONTACT_BLOCKS.office];

export function LidG({ idp, x = 0, y = 0 }) {
  const { w, h } = BOX.lid;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} fill={`url(#${idp}-board)`} filter={`url(#${idp}-fibre)`} />
      <rect width={w} height={h} fill={`url(#${idp}-shade)`} />
      <rect x="40" y="40" width={w - 80} height={h - 80} fill="none" stroke="#5E3F2B" strokeOpacity="0.55" strokeWidth="2" />
      <rect x="42" y="42" width={w - 80} height={h - 80} fill="none" stroke="#C29C78" strokeOpacity="0.35" strokeWidth="2" />
      <WordmarkDebossG idp={`${idp}-wm`} x={64} y={78} width={700} vertical />
      <path d={`M0 1.5H${w}`} stroke="#C29C78" strokeOpacity="0.6" strokeWidth="2" />
      <rect y={h - 9} width={w} height="9" fill="#5E3F2B" opacity="0.7" />
      <rect x={w - 8} width="8" height={h} fill="#5E3F2B" opacity="0.55" />
    </g>
  );
}

export function SpineG({ idp, x = 0, y = 0 }) {
  const { h } = BOX.lid;
  const sw = BOX.spine;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={sw} height={h} fill={`url(#${idp}-board)`} filter={`url(#${idp}-fibre)`} />
      <rect width={sw} height={h} fill={`url(#${idp}-shade)`} opacity="0.7" />
      <rect x={sw - 4} width="4" height={h} fill="#2B1D17" opacity="0.35" />
      {SPINE_BLOCKS.map((block, bi) => (
        <g key={bi} transform={`translate(${24} ${[310, 530, 720][bi]}) rotate(-90)`}>
          <text fontSize="11" className="sans" fill="#F5F0E3" opacity="0.92">
            {block.map((l, li) => <tspan key={l} x="0" y={li * 15}>{l}</tspan>)}
          </text>
        </g>
      ))}
      <MarkG x={sw / 2 - 18} y={h - 64} size={36} fill="#F5F0E3" />
    </g>
  );
}

// The box open, top view, as m13: lid at the left, spine, and the tray (dark inside) with the sheet in two rings.
export function TrayG({ idp, x = 0, y = 0, tone = 'white', animate = false }) {
  const { w, h } = BOX.lid;
  const k = 0.954;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} fill={`url(#${idp}-board)`} filter={`url(#${idp}-fibre)`} />
      <rect x="26" y="20" width={w - 52} height={h - 40} fill="#1E140F" />
      <rect x={w - 60} y="60" width="34" height={h - 80} fill="#35241C" opacity="0.8" />
      <CastRectG x={68} y={95} w={r2(SHEET_SIZE.w * k)} h={r2(SHEET_SIZE.h * k)} len={10} opacity={0.6} />
      <g transform={`translate(68 95) scale(${k})`}>
        <SheetG tone={tone} animate={animate} />
        <RingsG />
      </g>
    </g>
  );
}

export function BoxOpenArt() {
  const idp = 'feature-boxo';
  const { lid, spine } = BOX;
  const x0 = 40;
  const y0 = 40;
  const W = lid.w * 2 + spine;
  return (
    <Art viewBox={`0 0 ${W + 80} ${lid.h + 100}`} title="The presentation box, open, seen from above: lid, spine and the plan sheet held by two rings in the tray" exportName="feature-box-open" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <rect width={W + 80} height={lid.h + 100} fill={SCENE.studio} />
      <CastRectG x={x0} y={y0} w={W} h={lid.h} len={34} opacity={0.26} />
      <g className="mock-place" style={{ '--i': 0 }}>
        <LidG idp={idp} x={x0} y={y0} />
        <SpineG idp={idp} x={x0 + lid.w} y={y0} />
        <TrayG idp={idp} x={x0 + lid.w + spine} y={y0} animate />
      </g>
    </Art>
  );
}

export function BoxArt() {
  const idp = 'feature-box';
  const { lid, spine } = BOX;
  const x0 = 48;
  const y0 = 44;
  return (
    <Art viewBox="0 0 820 940" title="The presentation box, closed, seen from above: the word-mark debossed on the lid, the contacts on the spine" exportName="feature-box-closed" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={idp} />
      <rect width="820" height="940" fill={SCENE.studio} />
      <g className="sun-shadow">
        <CastRectG x={x0} y={y0} w={spine + lid.w} h={lid.h} len={40} opacity={0.26} />
      </g>
      <g className="mock-lit">
        <SpineG idp={idp} x={x0} y={y0} />
        <LidG idp={idp} x={x0 + spine} y={y0} />
        <path d={`M${x0 + spine} ${y0}V${y0 + lid.h}`} stroke="#1E140F" strokeOpacity="0.5" strokeWidth="3" />
      </g>
    </Art>
  );
}
