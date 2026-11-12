// Artwork for the Plans landing page: the plan drawn in code (an office-style plan with a car park, as on the
// presentation sheet of m13, without dimension figures or room labels), the sheet, the five layers of the
// presentation box and the tilted tablet. Every graphic is an exportable <Art>; layers share one viewBox so
// the page can stack them and let framer-motion move the wrappers around them (never the artwork inside).
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import { WordmarkDebossG } from '@/components/art/Mark';
import { MaterialDefs, CastRectG, CastG, BackdropG, SCENE } from '@/components/art/Mockup';
import { TabletG, wrap } from '@/components/art/Devices';
import { QuarterArchG } from '@/components/art/KeyArt';
import { PLAN, SENDER, CONTACT, CONTACT_BLOCKS } from '@/lib/brand';
import { r2, seeded } from '@/lib/charts';

// ---------- The plan ----------

export const PLAN_BOX = { w: 400, h: 440 };
const ROWS = [130, 200, 270, 340];
const OUTER = 'M30 70H118V34H222V404H30Z';

function Desk({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="15" height="8" />
      <circle cx={r2(x + 7.5)} cy={y + 13} r="3" />
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

// An office plan in a 400 x 440 box: walls, partitions with door swings, desks, a stair, a car park with bays
// and islands, and axis bubbles without figures. `animate` draws the walls on.
export function PlanG({ x = 0, y = 0, scale = 1, ink = '#35241C', animate = false }) {
  const rnd = seeded(11);
  const doors = ROWS.map(() => 40 + Math.floor(rnd() * 130));
  const cells = ROWS.slice(0, 3).flatMap((ry, i) =>
    [[30, 116], [116, 222]].map(([a, b], j) => ({ x: a, y: ry, w: b - a, h: ROWS[i + 1] - ry, k: i * 2 + j })),
  );
  const axisX = [30, 116, 222, 300, 392];
  const wallProps = animate ? { className: 'draw', pathLength: 1000, style: { '--len': 1000, '--i': 0 } } : {};
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${scale})`} fill="none" stroke={ink} strokeLinecap="square">
      <g strokeWidth="0.5" strokeOpacity="0.55" strokeDasharray="8 4 2 4" className={animate ? 'fade-in' : undefined}>
        {ROWS.concat([70, 404]).map((ay) => (
          <g key={ay}>
            <path d={`M20 ${ay}H396`} />
            <circle cx="12" cy={ay} r="4.5" strokeDasharray="none" />
          </g>
        ))}
        {axisX.map((ax) => (
          <g key={ax}>
            <path d={`M${ax} 18V420`} />
            <circle cx={ax} cy="12" r="4.5" strokeDasharray="none" />
          </g>
        ))}
      </g>

      <path d={OUTER} strokeWidth="3" strokeLinejoin="miter" {...wallProps} />

      <g strokeWidth="1.4" className={animate ? 'fade-in' : undefined} style={animate ? { '--i': 6 } : undefined}>
        {ROWS.map((ry, i) => (
          <g key={ry}>
            <path d={`M30 ${ry}H${doors[i]}M${doors[i] + 18} ${ry}H222`} />
            <path d={`M${doors[i]} ${ry}a18 18 0 0 1 18 -18`} strokeWidth="0.7" />
          </g>
        ))}
        {[130, 200, 270].map((ry, i) => (
          <path key={ry} d={`M116 ${ry}V${ry + 22}M116 ${ry + 40}V${ROWS[i + 1]}`} />
        ))}
        <path d="M72 340V404M116 340V404" />
        <path d="M118 130V34" />
      </g>

      <g strokeWidth="0.8" className={animate ? 'fade-in' : undefined} style={animate ? { '--i': 9 } : undefined}>
        {cells.map((c) => {
          const cols = Math.max(1, Math.floor((c.w - 12) / 34));
          const rows = Math.max(1, Math.floor((c.h - 10) / 26));
          return Array.from({ length: cols * rows }, (_, n) => (
            <Desk key={`${c.k}-${n}`} x={c.x + 12 + (n % cols) * 34} y={c.y + 10 + Math.floor(n / cols) * 26} />
          ));
        })}
        {Array.from({ length: 6 }, (_, i) => (
          <g key={i}>
            <rect x={32 + i * 7.2} y="344" width="6.4" height="20" />
            <circle cx={35.2 + i * 7.2} cy="372" r="2.2" />
          </g>
        ))}
        <rect x="186" y="44" width="32" height="80" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M186 ${50 + i * 6.5}H218`} />
        ))}
        <rect x="128" y="46" width="26" height="26" />
        <path d="M128 46L154 72M154 46L128 72" />
        <rect x="132" y="92" width="44" height="24" rx="3" />
        <path d="M126 350H206V392" />
        <rect x="150" y="372" width="40" height="22" />
      </g>

      <g strokeWidth="1" className={animate ? 'fade-in' : undefined} style={animate ? { '--i': 12 } : undefined}>
        <path d="M240 34V404" strokeDasharray="10 6" />
        <rect x="250" y="34" width="44" height="58" rx="16" strokeWidth="1.6" />
        <rect x="340" y="34" width="44" height="58" rx="16" strokeWidth="1.6" />
        {Array.from({ length: 13 }, (_, i) => (
          <g key={i}>
            <path d={`M250 ${112 + i * 22}H296`} />
            <path d={`M312 ${112 + i * 22}H392`} />
          </g>
        ))}
        <path d="M392 112V398M312 112V398" />
        <Car x={272} y={146} rot={90} />
        <Car x={350} y={256} rot={0} />
        <Car x={272} y={344} rot={90} />
        <Car x={350} y={190} rot={-18} />
        <path d="M246 408l-6 -10 12 0z" strokeWidth="1" />
      </g>
    </g>
  );
}

// ---------- The sheet (m13): paper, header, contacts, plan, mark, text ----------

export const SHEET_SIZE = { w: 463, h: 652 };
export const TONES = {
  white: { paper: '#FFFFFF', ink: '#35241C', accent: '#875D41', mark: '#B58F6B' },
  beige: { paper: '#F5F0E3', ink: '#35241C', accent: '#875D41', mark: '#B58F6B' },
  dark: { paper: '#35241C', ink: '#F5F0E3', accent: '#B58F6B', mark: '#B58F6B' },
};

// Re-measured from m13 at 2800 px: sender at (27, 34); the two-line block at x 172 and the three-line block at
// x 352, 10 apart; the plan from (52, 92); the mark at (27, 595), 30 wide; the text at x 174 from 597, five lines.
export function SheetG({ tone = 'white', animate = false }) {
  const t = TONES[tone];
  const lines = wrap(PLAN.text, 98);
  return (
    <g>
      <rect width={SHEET_SIZE.w} height={SHEET_SIZE.h} fill={t.paper} />
      <text x="27" y="34" fontSize="8.6" fill={t.accent} className="sans">{SENDER.developement}</text>
      <text fontSize="7.6" fill={t.ink} className="sans">
        <tspan x="172" y="34">{CONTACT.support}</tspan>
        <tspan x="172" y="44">{CONTACT.partnerships}</tspan>
        <tspan x="352" y="34">{CONTACT.city}</tspan>
        <tspan x="352" y="44">{CONTACT.phone}</tspan>
        <tspan x="352" y="54">{CONTACT.info}</tspan>
      </text>
      <PlanG x={41} y={81} scale={0.93} ink={t.ink} animate={animate} />
      <MarkG x={27} y={595} size={30} fill={t.mark} />
      <text fontSize="5.4" fill={t.ink} className="sans">
        {lines.map((l, i) => <tspan key={i} x="174" y={r2(599 + i * 8.2)}>{l}</tspan>)}
      </text>
    </g>
  );
}

// The sheet as a standalone graphic for the ground switch. The ground is Beige or Dark Chocolate.
export function SheetArt({ tone, animate }) {
  const t = TONES[tone];
  return (
    <Art viewBox="0 0 503 692" title={`Plan sheet on a ${tone === 'dark' ? 'Dark Chocolate' : 'Beige'} ground`} exportName="lp-plans-sheet" style={{ width: '100%', height: 'auto' }}>
      <CastRectG x={20} y={20} w={463} h={652} len={16} opacity={0.22} />
      <g transform="translate(20 20)">
        <SheetG tone={tone} animate={animate} />
      </g>
      <rect x="20" y="20" width="463" height="652" fill="none" stroke={t.ink} strokeOpacity="0.18" />
    </Art>
  );
}

// ---------- The presentation box, in five stacked layers (one viewBox) ----------

export const BOX = {
  w: 1340,
  h: 900,
  lid: { x: 20, y: 20, width: 610, height: 837 },
  spine: { x: 630, y: 20, width: 85, height: 837 },
  tray: { x: 715, y: 20, width: 600, height: 837 },
  sheet: { x: 777, y: 115, w: 463, h: 652 },
  rings: [325, 557],
};
const VB = `0 0 ${BOX.w} ${BOX.h}`;
const FILL = { width: '100%', height: '100%' };

export function BoxLidArt() {
  const { lid } = BOX;
  const id = 'lp-plans-lid';
  return (
    <Art viewBox={VB} title="Presentation box lid, the word-mark debossed vertically" exportName="lp-plans-box-lid" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={lid.x} y={lid.y} w={lid.width} h={lid.height} len={34} />
      <rect {...lid} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
      <rect {...lid} fill={`url(#${id}-shade)`} />
      {/* the debossed frame, re-measured from m13: 13 in from the sides, 22 from the top, 12 from the foot */}
      <rect x={lid.x + 13} y={lid.y + 22} width={lid.width - 25} height={lid.height - 34} fill="none" stroke="#5E3F2B" strokeOpacity="0.55" strokeWidth="2" />
      <rect x={lid.x + 15} y={lid.y + 24} width={lid.width - 25} height={lid.height - 34} fill="none" stroke="#C29C78" strokeOpacity="0.35" strokeWidth="2" />
      <WordmarkDebossG idp={`${id}-wm`} x={lid.x + 55} y={lid.y + 53} width={726} vertical />
      <path d={`M${lid.x} ${lid.y + 1}H${lid.x + lid.width}`} stroke="#C29C78" strokeOpacity="0.6" strokeWidth="2" />
    </Art>
  );
}

// The spine (m13), re-measured: three blocks reading bottom to top, their first lines at x +28 / +41.5 / +55 from
// the spine's edge, starting at y 198, 423 and 643 (the printed social line is left out of the middle block);
// the beige mark at its foot, 37 wide at y 778. Drawn in the box's own coordinates.
const SPINE_Y = [198, 423, 643];
function SpineG({ id }) {
  const { spine } = BOX;
  const blocks = [CONTACT_BLOCKS.service, CONTACT_BLOCKS.online, CONTACT_BLOCKS.office];
  return (
    <g>
      <rect {...spine} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
      <rect {...spine} fill={`url(#${id}-shade-v)`} />
      <path d={`M${spine.x + 1} ${spine.y}V${spine.y + spine.height}M${spine.x + spine.width - 1} ${spine.y}V${spine.y + spine.height}`} stroke="#3D2818" strokeOpacity="0.5" strokeWidth="2" />
      {blocks.map((b, bi) =>
        b.map((line, li) => (
          <text key={line} className="sans" fontSize="11" fill="#F5F0E3" transform={`translate(${spine.x + 28 + li * 13.5} ${SPINE_Y[bi]}) rotate(-90)`}>
            {line}
          </text>
        )),
      )}
      <MarkG x={spine.x + 23} y={778} size={37} fill="#F5F0E3" />
    </g>
  );
}

export function BoxSpineArt() {
  const { spine } = BOX;
  const id = 'lp-plans-spine';
  return (
    <Art viewBox={VB} title="Box spine with the three contact blocks and the mark" exportName="lp-plans-box-spine" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={spine.x} y={spine.y} w={spine.width} h={spine.height} len={30} />
      <SpineG id={id} />
    </Art>
  );
}

// The spine laid flat across the page, twice its size (1674 x 170): turned a quarter clockwise, so its lines
// read left to right, the mark at the left end and the first block at the right. The band slides in from the
// right and the hard shadow under it lengthens (CSS keyframes on inner groups only).
export function SpineBandArt() {
  const { spine } = BOX;
  const id = 'lp-plans-band';
  return (
    <Art viewBox="0 0 1714 214" title="The box spine laid flat: the three contact blocks and the mark" exportName="lp-plans-spine-band" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={id} />
      <g className="sun-shadow">
        <rect x="34" y="40" width="1674" height="170" fill="#1E140F" opacity="0.22" />
      </g>
      <g className="slide-up">
        <g transform={`translate(${1674 + 20} 20) rotate(90) scale(2) translate(${-spine.x} ${-spine.y})`}>
          <SpineG id={id} />
        </g>
      </g>
    </Art>
  );
}

export function BoxTrayArt() {
  const { tray } = BOX;
  const id = 'lp-plans-tray';
  return (
    <Art viewBox={VB} title="Box tray, dark inside" exportName="lp-plans-box-tray" style={FILL}>
      <MaterialDefs idp={id} />
      <CastRectG x={tray.x} y={tray.y} w={tray.width} h={tray.height} len={34} />
      <rect {...tray} fill={`url(#${id}-board)`} filter={`url(#${id}-fibre)`} />
      <rect x={tray.x + 24} y={tray.y + 24} width={tray.width - 48} height={tray.height - 48} fill="#120B08" />
      <rect x={tray.x + 24} y={tray.y + 24} width={tray.width - 48} height="26" fill="#000000" opacity="0.5" />
      <rect x={tray.x + 33} y={tray.y + 61} width="500" height="717" fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
      <rect x={tray.x + 40} y="238" width="25" height="385" rx="8" fill="#0B0705" />
      <path d={`M${tray.x} ${tray.y + 1}H${tray.x + tray.width}`} stroke="#C29C78" strokeOpacity="0.5" strokeWidth="2" />
    </Art>
  );
}

export function BoxSheetArt() {
  const { sheet, rings } = BOX;
  return (
    <Art viewBox={VB} title="The plan sheet" exportName="lp-plans-box-sheet" style={FILL}>
      <CastRectG x={sheet.x} y={sheet.y} w={sheet.w} h={sheet.h} len={18} opacity={0.34} />
      <g transform={`translate(${sheet.x} ${sheet.y})`}>
        <SheetG tone="white" />
      </g>
      {rings.map((ry) => (
        <circle key={ry} cx={sheet.x + 50} cy={ry} r="7" fill="#1E140F" />
      ))}
    </Art>
  );
}

export function BoxRingsArt() {
  const { sheet, rings } = BOX;
  return (
    <Art viewBox={VB} title="The two black rings" exportName="lp-plans-box-rings" style={FILL}>
      {rings.map((ry) => (
        <g key={ry} transform={`translate(${sheet.x + 50} ${ry})`}>
          <ellipse cx="-52" cy="6" rx="56" ry="17" transform="rotate(-8 -52 6)" fill="none" stroke="#0B0705" strokeWidth="9" />
          <ellipse cx="-52" cy="3" rx="54" ry="14" transform="rotate(-8 -52 3)" fill="none" stroke="#5A4A41" strokeWidth="1.6" strokeOpacity="0.6" />
          <circle r="10" fill="#0B0705" />
          <circle cx="-2" cy="-2" r="3" fill="#5A4A41" />
        </g>
      ))}
    </Art>
  );
}

// ---------- The tilted tablet on Tribal Brown (hero) ----------

// The plan screen of a tablet, 1180 x 820: the sheet at a large size on Beige.
export function PlanScreenG() {
  const lines = wrap(PLAN.text, 58);
  return (
    <g>
      <rect width="1180" height="820" fill="#F5F0E3" />
      <rect x="40" y="34" width="1100" height="752" fill="#FFFFFF" />
      <text x="84" y="90" fontSize="17" className="sans" fill="#875D41">{SENDER.developement}</text>
      <text fontSize="15" className="sans" fill="#35241C">
        <tspan x="520" y="90">{CONTACT.support}</tspan>
        <tspan x="520" y="112">{CONTACT.partnerships}</tspan>
        <tspan x="900" y="90">{CONTACT.city}</tspan>
        <tspan x="900" y="112">{CONTACT.phone}</tspan>
        <tspan x="900" y="134">{CONTACT.info}</tspan>
      </text>
      <PlanG x={330} y={140} scale={1.34} animate />
      <MarkG x={84} y={700} size={52} fill="#B58F6B" />
      <text fontSize="14" className="sans" fill="#35241C">
        {lines.map((l, i) => <tspan key={i} x="170" y={700 + i * 21}>{l}</tspan>)}
      </text>
    </g>
  );
}

function rotated(cx, cy, deg, x, y, w, h) {
  const a = (deg * Math.PI) / 180;
  const pts = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]].map(([px, py]) => {
    const dx = px - cx, dy = py - cy;
    return [r2(cx + dx * Math.cos(a) - dy * Math.sin(a)), r2(cy + dx * Math.sin(a) + dy * Math.cos(a))];
  });
  return `M${pts.map((p) => p.join(' ')).join('L')}Z`;
}

export function HeroTabletArt() {
  const id = 'lp-plans-hero';
  const tab = { x: 170, y: 120, w: 1060 };
  const th = (tab.w * 900) / 1260;
  const cx = 700, cy = 480, deg = -8;
  return (
    <Art viewBox="0 0 1400 1000" title="A tablet showing the plan sheet, tilted, on Tribal Brown" exportName="lp-plans-hero-tablet" style={{ width: '100%', height: 'auto' }}>
      <BackdropG idp={`${id}-bd`} w={1400} h={1000} horizon={0.8} wall={SCENE.tribal} floor={SCENE.tribal} line={false} />
      <g className="sun-shadow">
        <CastG d={rotated(cx, cy, deg, tab.x, tab.y, tab.w, th)} len={46} opacity={0.3} />
      </g>
      <g transform={`rotate(${deg} ${cx} ${cy})`}>
        <g className="mock-lit">
          <TabletG idp={`${id}-tab`} x={tab.x} y={tab.y} w={tab.w}>
            <PlanScreenG />
          </TabletG>
        </g>
      </g>
    </Art>
  );
}

// ---------- The closing field: the quarter arch and the mark ----------

export function ClosingArchArt() {
  return (
    <Art viewBox="0 0 600 600" title="A quarter arch with the mark" exportName="lp-plans-closing-arch" style={{ width: '100%', height: 'auto' }}>
      <rect width="600" height="600" fill="#35241C" />
      <g className="fade-in">
        <QuarterArchG cx={600} cy={600} r={300} R={600} quadrant="tl" fill="#875D41" />
      </g>
      <g className="fade-in" style={{ '--i': 3 }}>
        <QuarterArchG cx={600} cy={600} r={120} R={210} quadrant="tl" fill="#B58F6B" />
      </g>
      <g className="mark-top">
        <MarkG x={70} y={70} size={92} fill="#F5F0E3" />
      </g>
    </Art>
  );
}
