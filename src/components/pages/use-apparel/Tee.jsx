// A t-shirt, drawn empty: flat on a table (top view) or hanging from a hanger (front view).
// Local box 300 x 310. Children are the printed artwork, clipped to the garment and shaded by its folds.
import { r2 } from '@/lib/charts';
import { CastG, SHADOW_INK } from '@/components/art/Mockup';
import { Cloth, Rib, Seams, Sym, inset, rp } from './parts';

export const TEE_W = 300;
export const TEE_H = 310;
const FLAT = [[112, 12], [52, 32], [0, 98], [34, 142], [50, 118], [50, 300], [250, 300], [250, 118], [266, 142], [300, 98], [248, 32], [188, 12]];
const HANG = [[112, 12], [56, 30], [14, 128], [50, 160], [54, 124], [54, 304], [246, 304], [246, 124], [250, 160], [286, 128], [244, 30], [188, 12]];

const dipOf = (view) => (view === 'front' ? 58 : 26);

// The outline path (also used for hard shadows).
export function teeD(view = 'front', hang = false) {
  return `${rp(hang ? HANG : FLAT, 7, false)}Q150 ${dipOf(view)} 112 12Z`;
}

export default function Tee({ idp, id, x = 0, y = 0, k = 1, view = 'front', c, hang = false, part = 'both', shadow = 14, lit = false, i = 0, children }) {
  const pts = hang ? HANG : FLAT;
  const d = teeD(view, hang);
  const dip = dipOf(view);
  const [a, b, e, f, g] = [pts[1], pts[4], pts[2], pts[3], pts[5]];
  const sleeve = `M${pts[1].join(' ')}L${e.join(' ')}L${f.join(' ')}L${b.join(' ')}Z`;
  const stitches = [
    `M${a[0] + 2} ${a[1] + 3}Q${r2((a[0] + b[0]) / 2 + 15)} ${r2((a[1] + b[1]) / 2)} ${b[0]} ${b[1]}`,
    inset(e, f, 8, [150, 150]),
    inset(pts[0], pts[1], 5, [150, 150]),
    inset(g, pts[6], 11, [150, 150]),
  ];
  const folds = [
    `M${g[0] + 6} 124Q104 200 96 ${g[1] - 4}L132 ${g[1] - 2}Q142 212 82 120Z`,
    `M196 150Q224 214 216 ${g[1] - 2}L250 ${g[1] - 2}L250 140Z`,
  ];
  const lights = [sleeve, `M${g[0]} 124H${g[0] + 22}V${g[1]}H${g[0]}Z`];
  const lay = (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      {part !== 'body' && (
        <>
          <path d={d} fill={SHADOW_INK} opacity="0.26" filter={`url(#${idp}-soft)`} transform={hang ? 'translate(3 5)' : 'translate(2 3)'} />
          <CastG d={d} len={shadow} opacity={0.2} className="sun-shadow" />
        </>
      )}
      {part !== 'shadow' && (
        <g className={lit ? 'mock-lit' : 'mock-place'} style={{ '--i': i }}>
          {view === 'front' && <path d={`M114 12Q150 24 186 12L184 20Q150 34 116 20Z`} fill={SHADOW_INK} opacity="0.55" />}
          <Cloth idp={idp} id={id} d={d} fill={c.fill} folds={folds} lights={lights}>
            {children}
            <Seams list={stitches.slice(1)} c={c} />
            <Sym w={TEE_W}>
              <Seams list={[stitches[0]]} c={c} />
            </Sym>
            {view === 'back' && <Seams list={['M104 56Q150 66 196 56']} c={c} />}
          </Cloth>
          <Cloth idp={idp} id={`${id}-collar`} d={`M110 11Q150 ${dip - 2} 190 11L186 21Q150 ${dip + 7} 114 21Z`} fill={c.fill} shade={0.8} grainless>
            <Rib x={96} y={4} w={110} h={dip + 10} n={26} c={c} />
          </Cloth>
        </g>
      )}
    </g>
  );
  return lay;
}
