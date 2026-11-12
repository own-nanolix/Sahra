import Art from '@/components/art/Art';
import { DRAWING } from '@/components/art/KeyArt';
import { ICONS, ICON_GRID } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import GlyphG from './GlyphG';
import InView from './InView';
import s from './icons.module.css';

// Construction of two icons on the 24 px pixel grid. One unit on the drawing = 10 px; the drawing sits 20 px
// in from the edge. Colours are the construction drawing's own (m03): fine brown guides, blue anchors, red
// diagonals, pink unit bars. The cut label prints "42°" as the designers did (on the artwork the cut measures 45°).
const K = 10;
const O = 20;
const P = (v) => r2(v * K + O);

export const SPECS = {
  calendar: {
    title: 'Calendar',
    keyX: [3, 12, 21],
    keyY: [5, 10, 21],
    // centre-line quarter circles of the four corners: cx, cy, r, from, to (screen degrees)
    arcs: [[6, 8, 3, 180, 270], [18, 8, 3, 270, 360], [18, 18, 3, 0, 90], [6, 18, 3, 90, 180]],
    cuts: [[8, 2.5], [16, 2.5]],
    units: [[14, 9], [2, 13]],
  },
  arch: {
    title: 'Arch',
    keyX: [5, 12, 19],
    keyY: [3, 10, 21],
    arcs: [[12, 10, 7, 180, 270], [12, 10, 7, 270, 360]],
    cuts: [[2.5, 21], [21.5, 21]],
    units: [[11, 2], [4, 14]],
  },
};

const arcD = ([cx, cy, r, a0, a1]) => {
  const pt = (a) => `${P(cx + r * Math.cos((a * Math.PI) / 180))} ${P(cy + r * Math.sin((a * Math.PI) / 180))}`;
  return `M${pt(a0)}A${r * K} ${r * K} 0 0 1 ${pt(a1)}`;
};

export function PixelGrid({ n = ICON_GRID.size, k = K, o = O, major = 6, stroke = DRAWING.guide }) {
  const idx = Array.from({ length: n + 1 }, (_, i) => i);
  return (
    <g fill="none" stroke={stroke}>
      {idx.map((i) => (
        <path key={i} d={`M${o + i * k} ${o}V${o + n * k}M${o} ${o + i * k}H${o + n * k}`} strokeWidth={i % major === 0 ? 1 : 0.5} />
      ))}
    </g>
  );
}

// The big drawing of one icon: grid, live area, key lines, equal stroke unit, quarter-circle corners, diagonal cuts.
export function ConstructionArt({ name }) {
  const sp = SPECS[name];
  return (
    <Art viewBox="0 0 280 280" title={`Construction of the ${sp.title.toLowerCase()} icon on the 24 px grid`} exportName={`icons-construct-${name}`}>
      <rect width="280" height="280" fill={DRAWING.paper} />
      <PixelGrid />
      <rect x={P(2)} y={P(2)} width={20 * K} height={20 * K} fill="none" stroke={DRAWING.line} strokeWidth="1" strokeDasharray="5 4" />
      <path d={ICONS[name]} transform={`translate(${O} ${O}) scale(${K})`} fill={HEX.tribal} fillOpacity="0.3" stroke={DRAWING.ink} strokeWidth="0.07" />
      <g fill="none" stroke={DRAWING.anchor} strokeWidth="0.9" opacity="0.8">
        {sp.keyX.map((x, i) => <path key={`x${x}`} className="draw" style={{ '--len': 240, '--i': i }} d={`M${P(x)} ${P(1)}V${P(23)}`} />)}
        {sp.keyY.map((y, i) => <path key={`y${y}`} className="draw" style={{ '--len': 240, '--i': i + 3 }} d={`M${P(1)} ${P(y)}H${P(23)}`} />)}
      </g>
      <g>
        {sp.units.map(([x, y], i) => (
          <g key={`u${x}-${y}`} className="fade-in" style={{ '--i': i + 6 }}>
            <rect x={P(x)} y={P(y)} width={2 * K} height={2 * K} fill={DRAWING.unit} fillOpacity="0.9" />
            <text x={P(x) + K} y={P(y) + K + 4} textAnchor="middle" className="sans" fontSize="12" fontWeight="500" fill={HEX.chocolate}>x</text>
          </g>
        ))}
      </g>
      <g fill="none" stroke={HEX.chocolate} strokeWidth="1.6">
        {sp.arcs.map((a, i) => <path key={`a${i}`} className="draw" style={{ '--len': 120, '--i': i + 4 }} d={arcD(a)} />)}
      </g>
      <g stroke={DRAWING.angle} strokeWidth="1.4">
        {sp.cuts.map(([x, y], i) => (
          <g key={`c${x}-${y}`} className="fade-in" style={{ '--i': i + 8 }}>
            <path d={`M${P(x - 3.2)} ${P(y + 3.2)}L${P(x + 3.2)} ${P(y - 3.2)}`} fill="none" />
            {i === 0 && <text x={P(x + 3.4)} y={P(y - 3.2) + 2} className="sans" fontSize="11" fontWeight="500" stroke="none" fill={HEX.chocolate}>42°</text>}
          </g>
        ))}
      </g>
      <g fill={DRAWING.anchor}>
        {sp.arcs.flatMap(([cx, cy, r, a0, a1]) => [a0, a1].map((a) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)])).map(([x, y], i) => (
          <rect key={`n${i}`} x={P(x) - 2.5} y={P(y) - 2.5} width="5" height="5" />
        ))}
        {sp.cuts.map(([x, y]) => <rect key={`k${x}`} x={P(x) - 2.5} y={P(y) - 2.5} width="5" height="5" />)}
      </g>
      <g fill={HEX.chocolate}>
        {sp.arcs.slice(0, 1).map(([cx, cy]) => <circle key="ctr" cx={P(cx)} cy={P(cy)} r="2" />)}
      </g>
    </Art>
  );
}

// The same icon at four sizes with its pixel grid: what the 2 px stroke does at 16, 24, 32 and 48 px.
export function SizeStrip({ name, sizes = [16, 24, 32, 48] }) {
  return (
    <ul className={s.sizes}>
      {sizes.map((px) => (
        <li key={px} className={s.sizeItem}>
          <Art
            viewBox="0 0 24 24"
            title={`${SPECS[name].title} icon at ${px} px`}
            exportName={`icons-construct-${name}-${px}`}
            width={px}
            height={px}
            style={{ width: px, height: px }}
          >
            <rect width="24" height="24" fill={DRAWING.paper} />
            <PixelGrid n={24} k={1} o={0} major={4} stroke={DRAWING.guide} />
            <GlyphG name={name} fill={HEX.chocolate} />
          </Art>
          <span className="t-label">{px} px</span>
        </li>
      ))}
    </ul>
  );
}

const RULES = [
  ['Grid', `${ICON_GRID.size} px square, live area ${ICON_GRID.live[0]} to ${ICON_GRID.live[1]}: two units of clear space on every side.`],
  ['Equal stroke', `Every line is ${ICON_GRID.stroke} px, the unit x, as the word-mark's stroke is x.`],
  ['Quarter circles', `Corners are quarter circles of ${ICON_GRID.radius} px on the centre line: ${ICON_GRID.radius + ICON_GRID.stroke / 2} px outside, ${ICON_GRID.radius - ICON_GRID.stroke / 2} px inside.`],
  ['Diagonal cut', 'Free ends are cut on the word-mark’s diagonal, labelled 42° on the Arabic cuts of the construction drawing (34° on the Latin cuts).'],
];

export default function Construction({ name, rules = [0, 1, 2, 3] }) {
  const sp = SPECS[name];
  return (
    <InView className={s.construct}>
      <div className={s.constructHead}>
        <h3 className="t-h3">{sp.title}</h3>
        <p className="t-label">{ICON_GRID.size} px grid, {sp.arcs.length} quarter circles, {sp.cuts.length} cut ends</p>
      </div>
      <div className={s.constructArt}><ConstructionArt name={name} /></div>
      <dl className={s.rules}>
        {rules.map((i) => (
          <div key={RULES[i][0]}>
            <dt className="t-label">{RULES[i][0]}</dt>
            <dd className="t-small">{RULES[i][1]}</dd>
          </div>
        ))}
      </dl>
      <SizeStrip name={name} />
    </InView>
  );
}
