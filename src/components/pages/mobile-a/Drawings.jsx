import { seeded, r2 } from '@/lib/charts';
import { quarterArch } from '@/components/art/KeyArt';

// Line drawings shared by the live screens (HTML, inline SVG) and the exportable artwork. Geometry is in
// attributes only; paint comes from props. Plans are drawn without labels or dimensions (SOURCE.md, illegible).

export const PLAN_BOX = { w: 340, h: 360 };
export const LAYERS = ['Walls', 'Rooms', 'Doors', 'Car park'];
export const ALL_LAYERS = { Walls: true, Rooms: true, Doors: true, 'Car park': true };

// Where each of the three process steps lands on the plan.
export const ZONES = [
  { x: 0, y: 0, w: 200, h: 144 },
  { x: 0, y: 144, w: 200, h: 216 },
  { x: 0, y: 0, w: 340, h: 360 },
];

const COLS = 3;
const ROWS = 5;
const BW = 200;
const rnd = seeded(11);
const ROOMS = [];
for (let r = 0; r < ROWS; r += 1) {
  let c = 0;
  while (c < COLS) {
    const span = c < COLS - 1 && rnd() > 0.6 ? 2 : 1;
    ROOMS.push({ x: r2((c * BW) / COLS), y: (r * PLAN_BOX.h) / ROWS, w: r2((span * BW) / COLS), h: PLAN_BOX.h / ROWS, door: rnd() });
    c += span;
  }
}

// The plan: outer walls, rooms, door swings and a car park, each on its own layer. `zone` tints one area.
export function PlanDrawing({ layers = ALL_LAYERS, zone, ink = '#35241C', tint = '#B58F6B', zoneClass }) {
  return (
    <g fill="none" stroke={ink}>
      {zone && <rect className={zoneClass} x={zone.x} y={zone.y} width={zone.w} height={zone.h} fill={tint} fillOpacity="0.34" stroke="none" style={zoneClass ? { x: zone.x, y: zone.y, width: zone.w, height: zone.h } : undefined} />}
      {layers.Rooms && (
        <g strokeWidth="1.2">
          {ROOMS.map((m, i) => <rect key={i} x={m.x} y={m.y} width={m.w} height={m.h} />)}
        </g>
      )}
      {layers.Doors && (
        <g strokeWidth="0.9">
          {ROOMS.map((m, i) => (
            <g key={i}>
              <path d={`M${r2(m.x + m.w * 0.2)} ${r2(m.y + m.h)}a${r2(m.h * 0.22)} ${r2(m.h * 0.22)} 0 0 1 ${r2(m.h * 0.22)} ${r2(-m.h * 0.22)}`} />
              {m.door > 0.5 && <rect x={r2(m.x + m.w * 0.55)} y={r2(m.y + m.h * 0.25)} width={r2(m.w * 0.3)} height={r2(m.h * 0.4)} strokeDasharray="3 3" />}
            </g>
          ))}
        </g>
      )}
      {layers.Walls && <rect width={BW} height={PLAN_BOX.h} strokeWidth="4" />}
      {layers['Car park'] && (
        <g strokeWidth="1">
          <path d={`M${BW + 24} 0V${PLAN_BOX.h}`} strokeDasharray="10 6" />
          {Array.from({ length: 10 }, (_, i) => <path key={i} d={`M${BW + 52} ${(PLAN_BOX.h * (i + 0.5)) / 10}H${PLAN_BOX.w}`} />)}
        </g>
      )}
    </g>
  );
}

// The quarter arch as a ring that can fill: a ghost arch under a stroked arc whose length follows `progress`
// (0 to 1). (cx, cy) is the centre, the band sits up and to the left, as on the card (m10, m12).
export function ArchRing({ cx, cy, rm, sw, progress = 1, ghost = '#E7DFD9', fill = '#875D41', cls }) {
  const len = r2((Math.PI / 2) * rm);
  return (
    <g>
      <path d={quarterArch(cx, cy, rm - sw / 2, rm + sw / 2, 'tl')} fill={ghost} />
      <path
        className={cls}
        d={`M${cx - rm} ${cy}A${rm} ${rm} 0 0 1 ${cx} ${cy - rm}`}
        fill="none"
        stroke={fill}
        strokeWidth={sw}
        strokeDasharray={len}
        strokeDashoffset={r2(len * (1 - progress))}
        style={{ '--len': len }}
      />
    </g>
  );
}
