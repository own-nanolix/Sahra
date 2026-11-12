// Three sheets: the print artwork, the t-shirt colourways, and the print-spec sheet (a technical drawing).
import Art from '@/components/art/Art';
import { BackdropG, DeskEdgeG, SCENE } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { GDefs, Seams, WAYS, WAY_LIST, inset } from './parts';
import Tee, { teeD } from './Tee';

// ---------- Print artwork: the one mark and word-mark, in five of the published colour versions ----------
const FIELDS = [
  { bg: SCENE.chocolate, ink: SCENE.sand, art: 'wordmark' },
  { bg: SCENE.beige, ink: SCENE.tribal, art: 'mark' },
  { bg: SCENE.tribal, ink: SCENE.sand, art: 'wordmark' },
  { bg: SCENE.black, ink: SCENE.beige, art: 'mark' },
  { bg: SCENE.sand, ink: SCENE.beige, art: 'mark' },
];

export function ArtworkSheet() {
  const P = 'use-apparel-artwork';
  const w = 1400 / FIELDS.length;
  return (
    <Art viewBox="0 0 1400 280" title="The print artwork: the mark and the word-mark in five colour versions" exportName="use-apparel-print-artwork">
      {FIELDS.map((f, i) => (
        <g key={i}>
          <rect x={w * i} width={w} height="280" fill={f.bg} />
          {f.art === 'mark' ? (
            <MarkG idp={P} x={w * i + w / 2 - 41} y={70} size={82} fill={f.ink} />
          ) : (
            <WordmarkG idp={P} x={w * i + 30} y={118} width={w - 60} fill={f.ink} />
          )}
        </g>
      ))}
    </Art>
  );
}

// ---------- Colourways: one t-shirt function, five colours, generated with .map() ----------
const INK = { beige: '#875D41', chocolate: '#B58F6B', sand: '#35241C', tribal: '#F5F0E3', black: '#B58F6B' };

export function Colourways() {
  const P = 'use-apparel-colourways';
  return (
    <Art viewBox="0 0 1400 380" title="The t-shirt in five colourways, flat on a table" exportName="use-apparel-colourways">
      <GDefs idp={P} />
      <BackdropG idp={P} w={1400} h={380} horizon={0.93} wall={SCENE.sand40} floor={SCENE.tribal} />
      <DeskEdgeG y={344} w={1400} thickness={10} edge={SCENE.sand} />
      {WAY_LIST.map((key, i) => (
        <Tee key={key} idp={P} id={`${P}-${key}`} x={34 + i * 272} y={44} k={0.8} c={WAYS[key]} i={i} shadow={11}>
          <MarkG idp={P} x={128} y={84} size={48} fill={INK[key]} />
        </Tee>
      ))}
    </Art>
  );
}

// ---------- Print-spec sheet ----------
// Dimensions are print-production values of our own, in mm, taken from the drawing: the drawn shirt is 520 mm
// across the chest (200 units), so 1 unit = 2.6 mm.
const MM = 2.6;
const mm = (u) => Math.round(u * MM);
const INKC = SCENE.chocolate;
const LINE = SCENE.tribal;
const T = { seam: SCENE.tribal, seamO: 0.7 };

// A dimension line with end ticks and its value. horizontal when y1 === y2.
function Dim({ x1, y1, x2, y2, value, off = -5 }) {
  const horiz = y1 === y2;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const tick = horiz ? `M${x1} ${y1 - 4}v8M${x2} ${y2 - 4}v8` : `M${x1 - 4} ${y1}h8M${x2 - 4} ${y2}h8`;
  return (
    <g stroke={INKC} strokeWidth="0.8" fill="none">
      <path d={`M${x1} ${y1}L${x2} ${y2}${tick}`} />
      <text x={horiz ? mx : mx + off} y={horiz ? my + off : my} textAnchor="middle" className="sans" fontSize="9.5" fill={INKC} stroke="none" transform={horiz ? undefined : `rotate(-90 ${mx + off} ${my})`}>
        {value}
      </text>
    </g>
  );
}

function Drawing({ view, area, dims, children }) {
  const d = teeD(view);
  return (
    <g>
      <path d={d} fill="#FFFFFF" fillOpacity="0.6" stroke={LINE} strokeWidth="1.5" strokeLinejoin="round" />
      <Seams list={[inset([50, 300], [250, 300], 10, [150, 150]), inset([0, 98], [34, 142], 8, [150, 150]), inset([300, 98], [266, 142], 8, [150, 150]), 'M54 36Q74 76 50 118', 'M246 36Q226 76 250 118']} c={T} w={1} />
      <path d={`M110 12Q150 ${view === 'front' ? 66 : 34} 190 12`} fill="none" stroke={LINE} strokeWidth="5" strokeOpacity="0.4" />
      <path d="M150 0V318" stroke={INKC} strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="10 3 2 3" />
      {area}
      {dims}
      {children}
    </g>
  );
}

const Area = ({ x, y, w, h }) => (
  <rect x={x} y={y} width={w} height={h} fill={LINE} fillOpacity="0.1" stroke={LINE} strokeWidth="1.2" strokeDasharray="5 3" />
);

const ROWS = [
  ['01', 'Front, mark', `${mm(48)} x ${mm((48 * 201) / 184)} mm`, `centred, ${mm(84 - 12)} mm below the neck seam`],
  ['02', 'Front, word-mark', `${mm(128)} x ${mm((128 * 251) / 1420)} mm`, `centred, ${mm(92 - 12)} mm below the neck seam`],
  ['03', 'Back, mark', `${mm(156)} x ${mm((156 * 201) / 184)} mm`, `centred, ${mm(64 - 12)} mm below the neck seam`],
  ['04', 'Garment', `${mm(200)} mm across the chest`, `${mm(288)} mm from neck seam to hem`],
];

export function SpecSheet() {
  const P = 'use-apparel-spec';
  const k = 1.32;
  const markH = (48 * 201) / 184;
  const backH = (156 * 201) / 184;
  return (
    <Art viewBox="0 0 1400 520" title="Print specification: front and back of the t-shirt with print areas and dimensions in millimetres" exportName="use-apparel-print-spec">
      <GDefs idp={P} />
      <BackdropG idp={P} w={1400} h={520} horizon={1} wall={SCENE.beige} line={false} />
      <g stroke={LINE} strokeOpacity="0.1" strokeWidth="1">
        {Array.from({ length: 36 }, (_, i) => <path key={`v${i}`} d={`M${i * 40} 0V520`} />)}
        {Array.from({ length: 14 }, (_, i) => <path key={`h${i}`} d={`M0 ${i * 40}H1400`} />)}
      </g>
      {/* front */}
      <g transform={`translate(110 74) scale(${k})`}>
        <Drawing
          view="front"
          area={<Area x={125} y={82} w={52} h={markH + 4} />}
          dims={
            <>
              <Dim x1={126} y1={72} x2={174} y2={72} value={`${mm(48)} mm`} />
              <Dim x1={196} y1={84} x2={196} y2={84 + markH} value={`${mm(markH)} mm`} off={-5} />
              <Dim x1={214} y1={12} x2={214} y2={84} value={`${mm(72)} mm`} off={-5} />
              <Dim x1={50} y1={322} x2={250} y2={322} value={`${mm(200)} mm`} off={14} />
              <Dim x1={-16} y1={12} x2={-16} y2={300} value={`${mm(288)} mm`} off={-5} />
            </>
          }
        >
          <MarkG idp={P} x={128} y={84} size={48} fill={LINE} opacity="0.7" />
        </Drawing>
        <text x={150} y={352} textAnchor="middle" className="serif" fontSize="14" fill={INKC}>Front</text>
      </g>
      {/* back */}
      <g transform={`translate(560 74) scale(${k})`}>
        <Drawing
          view="back"
          area={<Area x={68} y={60} w={164} h={backH + 8} />}
          dims={
            <>
              <Dim x1={72} y1={backH + 82} x2={228} y2={backH + 82} value={`${mm(156)} mm`} off={14} />
              <Dim x1={240} y1={64} x2={240} y2={64 + backH} value={`${mm(backH)} mm`} off={14} />
              <Dim x1={34} y1={12} x2={34} y2={64} value={`${mm(52)} mm`} off={-5} />
            </>
          }
        >
          <MarkG idp={P} x={72} y={64} size={156} fill={LINE} opacity="0.3" />
        </Drawing>
        <text x={150} y={352} textAnchor="middle" className="serif" fontSize="14" fill={INKC}>Back</text>
      </g>
      {/* the placements list, ruled like the case study's rows */}
      <g transform="translate(1010 92)">
        <text className="serif" fontSize="22" fill={INKC}>Placements</text>
        {ROWS.map(([no, label, size, where], i) => (
          <g key={no} transform={`translate(0 ${34 + i * 92})`}>
            <path d="M0 0H350" stroke={INKC} strokeOpacity="0.4" strokeWidth="1" />
            <text y="26" className="sans" fontSize="13" fill={LINE}>{no}</text>
            <text x="34" y="26" className="serif" fontSize="17" fill={INKC}>{label}</text>
            <text x="34" y="48" className="sans" fontSize="13" fill={INKC}>{size}</text>
            <text x="34" y="66" className="sans" fontSize="13" fill={INKC} fillOpacity="0.8">{where}</text>
          </g>
        ))}
        <path d="M0 402H350" stroke={INKC} strokeOpacity="0.4" strokeWidth="1" />
      </g>
    </Art>
  );
}
