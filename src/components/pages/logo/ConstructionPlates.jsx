// The construction of the word-mark (m03): the whole line on its guides, then a close-up of the S and the "a"
// with the unit bars x and y, the cut lines labelled "34°" on the Latin cuts as the designers printed them, and double-headed arrows.
import Art from '@/components/art/Art';
import { ConstructionG, GuideGridG, DRAWING, CONSTRUCTION_MARKS } from '@/components/art/KeyArt';
import { WordmarkOutlineG, ANCHORS, WM, S_W } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import { CONSTRUCTION } from '@/lib/brand';

const GUIDE_NAMES = [
  [WM.TOP, 'Top'], [WM.XH, 'x-height'], [WM.CY, 'Centre'], [WM.BAR, 'Bar'], [WM.BASE, 'Baseline'], [WM.DESC, 'Descender'],
];

// ---------- Overview: all layers on the beige drawing sheet ----------
export function ConstructionPlate() {
  const x0 = 90, y0 = 130, width = 1400, k = width / WM.W;
  return (
    <Art viewBox="0 0 1700 520" title="Construction of the word-mark: guides, outline, anchor points, unit bars and cut lines" exportName="logo-construction">
      <rect width="1700" height="520" fill={DRAWING.paper} />
      <GuideGridG w={1700} h={520} step={40} />
      <ConstructionG x={x0} y={y0} width={width} draw />
      <g className="sans" fontSize="15" fill={DRAWING.ink}>
        {GUIDE_NAMES.map(([gy, name]) => (
          <text key={name} x={r2(x0 + (WM.W + 66) * k)} y={r2(y0 + gy * k + 5)}>{name}</text>
        ))}
      </g>
    </Art>
  );
}

// A double-headed arrow between two points in drawing units, with a label.
function Dim({ x1, y1, x2, y2, label, lx, ly, anchor = 'middle', head = 4.5, w = 0.55, color = DRAWING.ink }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len, uy = (y2 - y1) / len;
  const tri = (px, py, dir) => {
    const bx = px - dir * ux * head, by = py - dir * uy * head;
    return `M${r2(px)} ${r2(py)}L${r2(bx - uy * head * 0.45)} ${r2(by + ux * head * 0.45)}L${r2(bx + uy * head * 0.45)} ${r2(by - ux * head * 0.45)}Z`;
  };
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={color} strokeWidth={w} fill="none" />
      <path d={tri(x1, y1, -1)} fill={color} />
      <path d={tri(x2, y2, 1)} fill={color} />
      {label && <text x={lx} y={ly} fontSize="14" textAnchor={anchor} fill={DRAWING.ink} className="sans">{label}</text>}
    </g>
  );
}

// ---------- Close-up of the S and the "a" ----------
const K = 3.2;
const SHOW = { x: -50, y: -50, w: 500, h: 305 };
const CUTS = [
  // [vertex, tip along the cut, label position]: the S cut x + y = 235 and the a cut x + y = 473.
  { v: [152, 83], t: [184, 51], ext: [[204, 31], [128, 107]], at: [178, 74] },
  { v: [304, 169], t: [338, 135], ext: [[360, 113], [284, 189]], at: [332, 160] },
];

export function ConstructionDetailPlate() {
  const xBars = [[0, S_W - 152], [152, 184], [202, 234], ...CONSTRUCTION_MARKS.xBars.filter(([a]) => a === 314)];
  const vGuides = [0, 32, 152, 184, 202, 234, 314, 346];
  const yBar = WM.BASE + 14;
  return (
    <Art viewBox={`0 0 ${SHOW.w * K} ${SHOW.h * K}`} title="Close-up of the S and the a: unit bars x and y, cut lines at 34 degrees" exportName="logo-construction-detail">
      <clipPath id="logo-detail-clip"><rect width={SHOW.w * K} height={SHOW.h * K} /></clipPath>
      <rect width={SHOW.w * K} height={SHOW.h * K} fill={DRAWING.paper} />
      <g clipPath="url(#logo-detail-clip)">
        <g transform={`translate(${-SHOW.x * K} ${-SHOW.y * K}) scale(${K})`}>
          <g stroke={DRAWING.guide} strokeWidth={0.8 / K}>
            {CONSTRUCTION_MARKS.guides.map((gy) => <path key={gy} d={`M${SHOW.x} ${gy}H${SHOW.x + SHOW.w}`} />)}
            {vGuides.map((gx) => <path key={gx} d={`M${gx} ${SHOW.y}V${SHOW.y + SHOW.h}`} />)}
          </g>
          <WordmarkOutlineG stroke={DRAWING.line} strokeWidth={1.6 / K} />
          {/* the unit x: stroke width under the stems and beside the bowl */}
          {xBars.map(([a, b]) => (
            <g key={a}>
              <rect x={a} y={yBar - 5} width={b - a} height="10" fill={DRAWING.unit} />
              <Dim x1={a} y1={yBar + 14} x2={b} y2={yBar + 14} label={CONSTRUCTION.labels.x} lx={(a + b) / 2} ly={yBar + 34} head={3.2} />
            </g>
          ))}
          {/* the unit y: the step between the two halves of the S */}
          <rect x={-26} y={83} width="10" height={WM.GAP} fill={DRAWING.unit} />
          <Dim x1={-34} y1={83} x2={-34} y2={83 + WM.GAP} label={CONSTRUCTION.labels.y} lx={-42} ly={105} anchor="end" head={3.2} />
          {/* the cut lines, drawn red and labelled as printed */}
          {CUTS.map(({ v, ext, at }, i) => (
            <g key={i}>
              <path d={`M${ext[0][0]} ${ext[0][1]}L${ext[1][0]} ${ext[1][1]}`} stroke={DRAWING.angle} strokeWidth={1.4 / K} />
              <path d={`M${v[0]} ${v[1]}H${v[0] + 34}`} stroke={DRAWING.angle} strokeWidth={0.9 / K} strokeDasharray={`${3 / K} ${3 / K}`} />
              <path d={`M${v[0] + 22} ${v[1]}A22 22 0 0 0 ${r2(v[0] + 15.56)} ${r2(v[1] - 15.56)}`} stroke={DRAWING.angle} strokeWidth={1 / K} fill="none" />
              <text x={at[0]} y={at[1]} fontSize="14" fill={DRAWING.angle} className="sans">{CONSTRUCTION.labels.angleLatin}</text>
            </g>
          ))}
          <g fill={DRAWING.anchor}>
            {ANCHORS.filter(([ax]) => ax < SHOW.x + SHOW.w).map(([ax, ay], i) => (
              <rect key={i} x={ax - 1.7} y={ay - 1.7} width="3.4" height="3.4" />
            ))}
          </g>
        </g>
      </g>
    </Art>
  );
}
