import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { r2, seeded } from '@/lib/charts';
import { HEX, CONTACT, CONTACT_BLOCKS, SENDER } from '@/lib/brand';
import s from './lp-process.module.css';

// A plausible office-style floor plan drawn in code, with a car park beside it, as on the plan sheet (m13).
// No dimension figures and no room labels (they are illegible in the case study). Every part of the plan lives
// in a named layer so the story can light one layer at a time:
//   shell, openings, grid, people, circulation, light, scale, flow, materials, park.
// Plan units: 520 x 620.
export const LAYERS = ['shell', 'openings', 'grid', 'people', 'circulation', 'light', 'scale', 'flow', 'materials', 'park'];

const INK = HEX.chocolate;
const GX = [40, 130, 160, 250];
const GY = [90, 215, 345, 410];
const DOOR = 14;

// A straight wall with gaps: vWall(x, y0, y1, [gapStart, ...]) -> path data.
function vWall(x, y0, y1, gaps = []) {
  let d = '';
  let y = y0;
  [...gaps].sort((a, b) => a - b).forEach((g) => {
    d += `M${x} ${y}V${g}`;
    y = g + DOOR;
  });
  return `${d}M${x} ${y}V${y1}`;
}
function hWall(y, x0, x1) {
  return `M${x0} ${y}H${x1}`;
}

const LEFT_DOORS = [120, 190, 250, 320, 375];
const RIGHT_DOORS = [70, 105, 175, 250, 330];
const LEFT_H = [150, 215, 285, 345];
const RIGHT_H = [130, 200, 290, 350];
const LEFT_ROOMS = [[40, 90, 130, 150], [40, 150, 130, 215], [40, 215, 130, 285], [40, 285, 130, 345]];
const RIGHT_ROOMS = [[160, 50, 250, 130], [160, 130, 250, 200], [160, 200, 250, 290], [160, 290, 250, 350]];
const CLUSTERS = [[85, 120], [85, 182], [85, 250], [85, 315], [205, 90], [205, 165], [205, 245], [205, 320]];
const WINDOWS_Y = [105, 170, 240, 305, 375];

function Layer({ id, hl, children }) {
  return (
    <g data-layer={id} data-on={hl ? (hl.includes(id) ? 'true' : 'false') : undefined}>
      {children}
    </g>
  );
}

function Door({ x, y, dir }) {
  const hx = x + dir * DOOR;
  return <path d={`M${x} ${y + DOOR}H${hx}A${DOOR} ${DOOR} 0 0 ${dir > 0 ? 0 : 1} ${x} ${y}`} />;
}

function Desk({ cx, cy }) {
  return (
    <g>
      {[-1, 1].map((sx) => [-1, 1].map((sy) => (
        <g key={`${sx}${sy}`}>
          <rect x={r2(cx + sx * 14 - 9)} y={r2(cy + sy * 11 - 5)} width="18" height="10" />
          <circle cx={r2(cx + sx * 14)} cy={r2(cy + sy * 11 + sy * 9)} r="3.2" />
        </g>
      )))}
    </g>
  );
}

// The car park: rows of bays with painted lines, cars in some of them, kerbed islands with quarter-circle corners.
function Park({ idp }) {
  const rnd = seeded(13);
  const rows = [[80, 40], [160, 40], [200, 40], [280, 40], [320, 40], [400, 40], [440, 40], [520, 40]];
  const bays = 11;
  return (
    <g>
      {rows.map(([y, h]) => (
        <g key={y}>
          <path d={`M280 ${y}H500`} strokeWidth="1" />
          {Array.from({ length: bays + 1 }, (_, i) => <path key={i} d={`M${280 + i * 20} ${y}V${y + h}`} strokeWidth="0.9" />)}
        </g>
      ))}
      {rows.flatMap(([y, h]) => Array.from({ length: bays }, (_, i) => ({ y, h, i }))).filter(() => rnd() > 0.74).map(({ y, h, i }) => (
        <rect key={`${idp}-${y}-${i}`} x={r2(283 + i * 20)} y={r2(y + h / 2 - 15)} width="14" height="30" rx="5" fill={INK} fillOpacity="0.16" strokeWidth="1.1" />
      ))}
      {[[270, 60, 12, 76], [270, 380, 12, 76], [492, 124, 14, 30]].map(([x, y, w, h]) => (
        <rect key={`${x}${y}`} x={x} y={y} width={w} height={h} rx={w / 2} strokeWidth="1.6" fill="none" />
      ))}
    </g>
  );
}

// The whole plan as an SVG group. hl = array of layer ids to light (the rest dim when the svg has data-dim),
// or null for the plain drawing. idp keeps pattern ids unique. draw: walls draw on along their length.
export function PlanG({ idp, hl = null, draw = false }) {
  const dc = draw ? 'draw' : undefined;
  const ds = (i) => (draw ? { '--len': 1800, '--i': i } : undefined);
  return (
    <g fill="none" stroke={INK} strokeLinecap="butt" strokeLinejoin="miter">
      <defs>
        <pattern id={`${idp}-hatch`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0V7" stroke={HEX.tribal} strokeWidth="1" />
        </pattern>
        <pattern id={`${idp}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="0.9" fill={HEX.sand} stroke="none" />
        </pattern>
      </defs>

      <Layer id="materials" hl={hl}>
        {LEFT_ROOMS.map(([x0, y0, x1, y1], i) => (
          <rect key={`l${i}`} x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={i % 2 ? `url(#${idp}-hatch)` : `url(#${idp}-dots)`} stroke="none" className="accf" />
        ))}
        {RIGHT_ROOMS.map(([x0, y0, x1, y1], i) => (
          <rect key={`r${i}`} x={x0} y={y0} width={x1 - x0} height={y1 - y0} fill={i % 2 ? `url(#${idp}-dots)` : `url(#${idp}-hatch)`} stroke="none" className="accf" />
        ))}
        <rect x="130" y="90" width="30" height="320" fill={HEX.sand} fillOpacity="0.22" stroke="none" />
        <path d="M40 90H110V50H250V410H40Z" stroke={INK} strokeWidth="11" strokeOpacity="0.12" />
      </Layer>

      <Layer id="grid" hl={hl}>
        <g stroke={HEX.tribal} strokeWidth="0.8" strokeDasharray="14 4 2 4" className="acc">
          {GX.map((x) => <path key={`gx${x}`} d={`M${x} 20V440`} />)}
          {GY.map((y) => <path key={`gy${y}`} d={`M12 ${y}H510`} />)}
        </g>
        <g strokeWidth="1" stroke={HEX.tribal} className="acc">
          {GX.map((x) => <circle key={`bx${x}`} cx={x} cy="14" r="6" />)}
          {GY.map((y) => <circle key={`by${y}`} cx="6" cy={y} r="6" />)}
        </g>
        <g fill={INK} stroke="none">
          {GX.flatMap((x) => GY.filter((y) => y < 410).map((y) => (
            <rect key={`c${x}-${y}`} x={x - 3.5} y={y - 3.5} width="7" height="7" className="accf" />
          )))}
        </g>
      </Layer>

      <Layer id="shell" hl={hl}>
        <path d="M130 410H40V90H110V50H250V410H160" strokeWidth="5" className={`acc ${dc || ''}`} style={ds(0)} />
        <path d={[vWall(130, 90, 410, LEFT_DOORS), vWall(160, 50, 410, RIGHT_DOORS), ...LEFT_H.map((y) => hWall(y, 40, 130)), ...RIGHT_H.map((y) => hWall(y, 160, 250))].join('')} strokeWidth="2.4" className={`acc ${dc || ''}`} style={ds(2)} />
        <g strokeWidth="1.4">
          <rect x="165" y="355" width="40" height="48" />
          {Array.from({ length: 8 }, (_, i) => <path key={i} d={`M165 ${r2(361 + i * 6)}H205`} />)}
          <path d="M214 358h24v14h-24z M214 380h24v14h-24z" />
          {[0, 1].map((i) => <rect key={`wc${i}`} x={48 + i * 40} y="356" width="30" height="46" />)}
          {[0, 1, 2, 3].map((i) => <circle key={`wcc${i}`} cx={63 + (i % 2) * 40} cy={369 + Math.floor(i / 2) * 20} r="5" />)}
        </g>
      </Layer>

      <Layer id="openings" hl={hl}>
        <g strokeWidth="1.3" className="acc">
          {LEFT_DOORS.map((y) => <Door key={`dl${y}`} x={130} y={y} dir={-1} />)}
          {RIGHT_DOORS.map((y) => <Door key={`dr${y}`} x={160} y={y} dir={1} />)}
          <path d="M125 410h40v12h-40z" />
          <path d="M130 410V424M160 410V424" strokeWidth="2.4" />
        </g>
      </Layer>

      <Layer id="light" hl={hl}>
        <g strokeWidth="1.2">
          {WINDOWS_Y.flatMap((y) => [40, 250].map((x) => <rect key={`w${x}${y}`} x={x - 3} y={y} width="6" height="26" fill="#FFFFFF" className="acc" />))}
        </g>
        <g stroke={HEX.sand} strokeWidth="0.9" strokeOpacity="0.8">
          {WINDOWS_Y.map((y) => (
            <g key={`ray${y}`}>
              <path d={`M43 ${y + 13}L118 ${y - 2}M43 ${y + 13}L118 ${y + 13}M43 ${y + 13}L118 ${y + 28}`} />
              <path d={`M247 ${y + 13}L172 ${y - 2}M247 ${y + 13}L172 ${y + 13}M247 ${y + 13}L172 ${y + 28}`} />
            </g>
          ))}
        </g>
      </Layer>

      <Layer id="people" hl={hl}>
        <g strokeWidth="1" className="acc">
          {CLUSTERS.map(([cx, cy]) => <Desk key={`${cx}${cy}`} cx={cx} cy={cy} />)}
        </g>
      </Layer>

      <Layer id="scale" hl={hl}>
        <g strokeWidth="1" className="acc">
          <path d="M40 444H250M40 438V450M250 438V450M18 90V410M12 90H24M12 410H24" />
          {Array.from({ length: 7 }, (_, i) => <rect key={i} x={40 + i * 30} y="452" width="30" height="7" fill={i % 2 ? '#FFFFFF' : HEX.tribal} />)}
          {Array.from({ length: 9 }, (_, i) => <path key={`t${i}`} d={`M12 ${90 + i * 40}H24`} />)}
        </g>
      </Layer>

      <Layer id="park" hl={hl}>
        <g className="acc">
          <Park idp={idp} />
        </g>
      </Layer>

      <Layer id="circulation" hl={hl}>
        <g strokeWidth="1.8" strokeDasharray="7 5" stroke={HEX.tribal} className="acc">
          <path d="M145 440V64" />
          {[110, 180, 250, 320].map((y) => <path key={y} d={`M145 ${y + 7}H122M145 ${y + 7}H168`} />)}
        </g>
        <g fill={HEX.tribal} stroke="none" className="accf">
          {[330, 220, 120].map((y) => <path key={y} d={`M141 ${y + 7}L145 ${y - 3}L149 ${y + 7}Z`} />)}
        </g>
      </Layer>

      <Layer id="flow" hl={hl}>
        <g strokeWidth="1.8" stroke={HEX.tribal} className="acc">
          <path d="M268 580V64" strokeDasharray="2 6" />
          <path d="M268 140H496M268 270H496M268 380H496M268 500H496" strokeDasharray="9 5" />
          <path d="M268 424C230 424 190 432 145 440" strokeDasharray="9 5" />
        </g>
        <g fill={HEX.tribal} stroke="none" className="accf">
          {[[420, 140], [420, 270], [420, 380], [420, 500]].map(([x, y]) => <path key={`${x}${y}`} d={`M${x + 8} ${y - 4}L${x - 2} ${y}L${x + 8} ${y + 4}Z`} />)}
          <path d="M263 120L268 108L273 120Z" />
        </g>
      </Layer>
    </g>
  );
}

// A standalone plan (exportable). hl lights some layers: the others dim.
export function PlanArt({ idp, exportName, hl = null, className, title = 'Floor plan with a car park' }) {
  return (
    <Art viewBox="0 0 520 590" title={title} exportName={exportName} className={`${s.planSvg} ${className || ''}`} data-dim={hl ? 'true' : 'false'}>
      <rect width="520" height="590" fill={HEX.white} />
      <PlanG idp={idp} hl={hl} draw />
    </Art>
  );
}

// The sheet of m13: a white sheet in the ring-bound box with the sender, the contacts, the plan, the Sand mark
// and the plan text as quiet bars (the paragraph itself is set in the story below).
export function SheetArt({ className }) {
  return (
    <Art viewBox="0 0 640 840" title="Sahra plan sheet with a floor plan" exportName="lp-process-sheet" className={className}>
      <rect x="58" y="46" width="560" height="780" fill="#000000" opacity="0.28" className="fade-in" />
      <rect x="40" y="30" width="560" height="780" fill={HEX.white} className="settle" />
      <g className="sans fade-in" style={{ '--i': 4 }} fontSize="12" fill={INK}>
        <text x="84" y="92" fill={HEX.tribal}>{SENDER.developement}</text>
        <text x="270" y="92">{CONTACT.support}</text>
        <text x="270" y="108">{CONTACT.partnerships}</text>
        <text x="470" y="92">{CONTACT_BLOCKS.office[0]}</text>
        <text x="470" y="108">{CONTACT.phone}</text>
        <text x="470" y="124">{CONTACT.info}</text>
      </g>
      <g transform="translate(96 150) scale(0.86)">
        <PlanG idp="lp-process-sheet" draw />
      </g>
      <MarkG x={84} y={708} size={34} fill={HEX.sand} topClass="mark-top" bottomClass="mark-bottom" />
      <g fill={HEX.tribal} opacity="0.22">
        {[0, 1, 2, 3].map((i) => <rect key={i} className="grow-x" style={{ '--i': i + 6 }} x="150" y={712 + i * 12} width={i === 3 ? 260 : 400} height="4" />)}
      </g>
      <g fill="none" stroke="#111111" strokeWidth="7">
        {[250, 600].map((y) => <ellipse key={y} cx="44" cy={y} rx="30" ry="9" />)}
      </g>
    </Art>
  );
}
