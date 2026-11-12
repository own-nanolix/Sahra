import { r2, seeded } from '@/lib/charts';
import { CastG, CastRectG, ContactShadowG } from '@/components/art/Mockup';
import { LETTER } from '@/lib/brand';
import { Scene, MarkGrid, PlainBars, WordmarkG, MarkG, ContactText, poly, C } from './kit';

// Top view in an open box: Beige tissue printed with a quiet repeat of the mark; a round Dark Chocolate seal with
// the sand mark; a shipping label with the word-mark, the From and To blocks as printed, and pale bars where codes
// would go (plain bars that encode nothing).

const BOX = { x: 70, y: 60, w: 660, h: 470 };
const CAV = { x: 102, y: 92, w: 596, h: 406 };

// view: the camera on each plate (the tissue square-on; the seal close and turned; the label further off, turned
// the other way), so the three open boxes never share one arrangement.
function OpenBox({ idp, tone, view, children }) {
  const fill = `url(#${idp}-${tone === 'sand' ? 'board-sand' : tone === 'choc' ? 'board-dark' : 'board'})`;
  const { x, y, w, h } = BOX;
  return (
    <g transform={view}>
      <g className="sun-shadow"><CastRectG x={x} y={y} w={w} h={h} len={30} opacity={0.22} /></g>
      <rect x={x} y={y} width={w} height={h} fill={fill} filter={`url(#${idp}-fibre)`} />
      <rect x={x} y={y} width={w} height="12" fill="#fff" opacity="0.2" />
      <rect x={x} y={y} width="12" height={h} fill="#fff" opacity="0.14" />
      <rect x={CAV.x + CAV.w} y={y} width="32" height={h} fill="#000" opacity="0.16" />
      <rect x={x} y={y + h - 32} width={w} height="32" fill="#000" opacity="0.16" />
      <rect x={CAV.x} y={CAV.y} width={CAV.w} height={CAV.h} fill="#1E140F" />
      <path d={poly([CAV.x, CAV.y], [CAV.x + CAV.w, CAV.y], [CAV.x + CAV.w - 26, CAV.y + 26], [CAV.x + 26, CAV.y + 26], [CAV.x + 26, CAV.y + CAV.h - 26], [CAV.x, CAV.y + CAV.h])} fill="#000" opacity="0.4" />
      {children}
    </g>
  );
}

// The tissue sheet: an uneven edge, the printed mark grid, fold light and shade, one lifted corner.
function Tissue({ idp, k, tilt = 0 }) {
  const rnd = seeded(7);
  const { x, y, w, h } = CAV;
  const edge = [];
  for (let i = 0; i <= 8; i += 1) edge.push([x + 8 + (w - 16) * (i / 8), y + 8 + rnd() * 9]);
  for (let i = 1; i <= 6; i += 1) edge.push([x + w - 8 - rnd() * 9, y + 8 + (h - 16) * (i / 6)]);
  for (let i = 1; i <= 8; i += 1) edge.push([x + w - 8 - (w - 16) * (i / 8), y + h - 8 - rnd() * 9]);
  for (let i = 1; i < 6; i += 1) edge.push([x + 8 + rnd() * 9, y + h - 8 - (h - 16) * (i / 6)]);
  const d = poly(...edge.map(([a, b]) => [r2(a), r2(b)]));
  const folds = [[-60, 40, 0.3], [120, 38, 0.1], [300, 60, 0.28], [470, 44, 0.1]];
  const id = `${idp}-${k}-tissue`;
  return (
    <g transform={tilt ? `rotate(${tilt} 400 295)` : undefined}>
      <g opacity="0.25"><CastG d={d} len={8} opacity={1} /></g>
      <clipPath id={id}><path d={d} /></clipPath>
      <path d={d} fill="#F5F0E3" />
      <g clipPath={`url(#${id})`}>
        <MarkGrid x={x + 20} y={y + 22} size={22} cols={11} rows={7} gx={54} gy={58} stagger={27} fill={C.tribal} opacity={0.3} />
        {folds.map(([o, wd, a], i) => (
          <path key={i} d={poly([x + o, y], [x + o + wd, y], [x + o + wd + 330, y + h], [x + o + 330, y + h])} fill={i % 2 ? '#000' : '#fff'} opacity={a} />
        ))}
        <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-shade)`} opacity="0.5" />
      </g>
      <path d={poly([x + w - 120, y + 8], [x + w - 8, y + 8], [x + w - 8, y + 118])} fill="#000" opacity="0.18" transform="translate(5 5)" />
      <path d={poly([x + w - 120, y + 8], [x + w - 8, y + 8], [x + w - 8, y + 118])} fill="#FBF8F0" />
      <path d={`M${x + w - 120} ${y + 8}L${x + w - 8} ${y + 118}`} stroke="#000" strokeOpacity="0.14" strokeWidth="1.4" />
    </g>
  );
}

export function TissuePaper() {
  return (
    <Scene name="tissue" title="Beige tissue paper printed with a quiet repeat of the mark, in an open Tribal Brown box, top view" w={800} h={600} horizon={0.9} wall={C.sand40} floor={C.beige}>
      {(idp) => (
        <OpenBox idp={idp} tone="tribal">
          <g className="mock-place" style={{ '--i': 1 }}><Tissue idp={idp} k="a" /></g>
        </OpenBox>
      )}
    </Scene>
  );
}

export function SealSticker() {
  const c = [400, 295];
  const disc = `M${c[0] - 78} ${c[1]}a78 78 0 1 0 156 0a78 78 0 1 0 -156 0Z`;
  return (
    <Scene name="seal" title="Round Dark Chocolate seal sticker with the sand mark, closing tissue in an open Sand box, top view" w={800} h={600} horizon={0.9} wall={C.tribal20} floor={C.sand40}>
      {(idp) => (
        <OpenBox idp={idp} tone="sand" view="translate(400 300) scale(1.45) rotate(-8) translate(-400 -295)">
          <Tissue idp={idp} k="a" />
          <path d={poly([CAV.x + 8, CAV.y + 150], [CAV.x + CAV.w - 8, CAV.y + 70], [CAV.x + CAV.w - 8, CAV.y + 82], [CAV.x + 8, CAV.y + 164])} fill="#000" opacity="0.14" />
          <g className="mock-place" style={{ '--i': 2 }}>
            <g className="sun-shadow"><CastG d={disc} len={14} opacity={0.3} /></g>
            <ContactShadowG idp={`${idp}-s1`} cx={c[0]} cy={c[1] + 74} rx={70} ry={6} opacity={0.2} />
            <circle cx={c[0]} cy={c[1]} r="78" fill={`url(#${idp}-board-dark)`} filter={`url(#${idp}-paper-grain)`} />
            <circle cx={c[0]} cy={c[1]} r="66" fill="none" stroke={C.sand} strokeOpacity="0.8" strokeWidth="2" />
            <MarkG x={c[0] - 30} y={c[1] - 33} size={60} fill={C.sand} />
            <circle cx={c[0]} cy={c[1]} r="78" fill={`url(#${idp}-glass)`} className="mock-sheen" />
            <path d={`M${c[0] - 78} ${c[1]}a78 78 0 0 1 78 -78`} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2" />
          </g>
        </OpenBox>
      )}
    </Scene>
  );
}

// Pale bars where codes would be: a small square block of them and a row, none of which encodes anything.
function CodeBlock({ x, y, size }) {
  const rnd = seeded(11);
  const n = 7, cell = size / n;
  const cells = [];
  for (let r = 0; r < n; r += 1) for (let q = 0; q < n; q += 1) if (rnd() > 0.45) cells.push([q, r]);
  return <g fill={C.tribal} opacity="0.22">{cells.map(([q, r]) => <rect key={`${q}-${r}`} x={r2(x + q * cell)} y={r2(y + r * cell)} width={r2(cell - 1.5)} height={r2(cell - 1.5)} />)}</g>;
}

function ShippingLabel({ idp }) {
  const ink = '#35241C';
  const from = LETTER.from, to = LETTER.to;
  return (
    <g transform="translate(166 124) rotate(-2.5)">
      <g opacity="0.3"><CastG d={poly([0, 0], [468, 0], [468, 330], [0, 330])} len={12} opacity={1} /></g>
      <rect width="468" height="330" fill={`url(#${idp}-paper)`} filter={`url(#${idp}-paper-grain)`} />
      <WordmarkG x={28} y={26} width={170} fill={C.tribal} />
      <rect x="28" y="84" width="412" height="2" fill={C.tribal} opacity="0.35" />
      <ContactText x={28} y={112} lines={from} size={14} fill={ink} />
      <ContactText x={248} y={112} lines={to} size={14} fill={ink} />
      <rect x="28" y="200" width="412" height="2" fill={C.tribal} opacity="0.2" />
      <CodeBlock x={28} y={218} size={84} />
      <PlainBars x={132} y={222} w={308} h={32} fill={ink} seed={9} opacity={0.22} />
      <PlainBars x={132} y={266} w={308} h={18} fill={ink} seed={4} opacity={0.14} />
      <path d={poly([420, 330], [468, 330], [468, 282])} fill="#000" opacity="0.1" />
      <path d={poly([428, 330], [468, 290], [468, 330])} fill="#F5F0E3" />
    </g>
  );
}

export function ShippingLabelPlate() {
  return (
    <Scene name="label" title="Shipping label with the word-mark, the From and To blocks and pale bars, in an open Dark Chocolate box" w={800} h={600} horizon={0.9} wall={C.sand} floor={C.tribal40}>
      {(idp) => (
        <OpenBox idp={idp} tone="choc" view="translate(420 290) rotate(6) scale(0.84) translate(-400 -295)">
          <Tissue idp={idp} k="a" />
          <g className="mock-place" style={{ '--i': 2 }}><ShippingLabel idp={idp} /></g>
        </OpenBox>
      )}
    </Scene>
  );
}


