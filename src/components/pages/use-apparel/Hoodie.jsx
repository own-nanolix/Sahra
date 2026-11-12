// Hoodies and the jacket: a hanging hoodie (front), a dark collared jacket (back, as the case study's m07),
// and a folded stack. Local boxes: hoodie 320 x 380, jacket 340 x 420, stack 200 x 130.
import { r2 } from '@/lib/charts';
import { CastG, SHADOW_INK } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { Cloth, EyeletG, Rib, Seams, Sym, rp } from './parts';

export const HOOD_W = 320;
export const HOOD_H = 380;
const BODY = [[106, 60], [66, 72], [26, 122], [8, 334], [58, 344], [64, 300], [64, 352], [256, 352], [256, 300], [262, 344], [312, 334], [294, 122], [254, 72], [214, 60]];
const HOOD_FRONT = 'M96 70C92 12 228 12 224 70Q160 116 96 70Z';
const HOOD_BACK = 'M92 74C70 -2 250 -2 228 74Z';

export const hoodieD = () => `${rp(BODY, 8)}${HOOD_BACK}`;

// A hanging hoodie, front view. `art` is the printed artwork (children); `part` picks shadow or body.
export function Hoodie({ idp, id, x = 0, y = 0, k = 1, c, part = 'both', shadow = 16, lit = false, i = 0, children }) {
  const body = rp(BODY, 8);
  const folds = [
    'M40 130Q70 230 60 330L90 330Q94 220 66 120Z',
    'M196 160Q232 250 224 330L256 330L262 140Z',
    'M148 120Q160 240 150 300L172 300Q180 230 170 120Z',
  ];
  const lights = ['M66 76L30 124L14 330L40 334L64 300L72 130Z', 'M70 74H106L104 130H70Z'];
  const stitches = [
    'M68 78Q58 160 64 300',
    'M72 352V338',
    'M92 246L228 246L246 328L74 328Z',
    'M64 336H256',
  ];
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      {part !== 'body' && <CastG d={`${body}${HOOD_BACK}`} len={shadow} opacity={0.2} className="sun-shadow" />}
      {part !== 'shadow' && (
        <g className={lit ? 'mock-lit' : 'mock-place'} style={{ '--i': i }}>
          <Cloth idp={idp} id={`${id}-hb`} d={HOOD_BACK} fill={c.fill} folds={['M92 74C90 20 150 8 160 8L160 74Z']} shade={0.9} />
          <Cloth idp={idp} id={id} d={body} fill={c.fill} folds={folds} lights={lights}>
            {children}
            <Seams list={stitches} c={c} />
            <Sym w={HOOD_W}>
              <Seams list={['M92 246L74 328', 'M106 62Q92 104 66 120']} c={c} />
              <Rib x={8} y={322} w={50} h={20} n={7} c={c} rotate={11} />
            </Sym>
            <Rib x={64} y={334} w={192} h={18} n={40} c={c} />
            <path d="M92 246L228 246L246 328L74 328Z" fill={SHADOW_INK} opacity="0.1" />
            <path d="M94 248H226" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" />
          </Cloth>
          <Cloth idp={idp} id={`${id}-hf`} d={HOOD_FRONT} fill={c.fill} folds={['M96 70Q160 116 224 70Q160 94 96 70Z']} lights={['M100 60C100 24 140 16 160 16C130 24 112 40 108 66Z']}>
            <path d="M110 66C110 32 210 32 210 66Q160 96 110 66Z" fill="#000000" opacity="0.58" />
            <Seams list={['M104 60C104 24 216 24 216 60']} c={c} />
          </Cloth>
          <path d="M110 66C110 32 210 32 210 66" fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="1.6" />
          <g strokeLinecap="round" fill="none">
            {[[140, 90, 134, 200], [180, 90, 188, 208]].map(([x1, y1, x2, y2]) => (
              <g key={x1}>
                <path d={`M${x1} ${y1}Q${x1 + (x2 - x1) * 0.2} ${y1 + 60} ${x2} ${y2}`} stroke={c.cord} strokeWidth="3.6" />
                <path d={`M${x1 - 0.8} ${y1}Q${x1 + (x2 - x1) * 0.2 - 0.8} ${y1 + 60} ${x2 - 0.8} ${y2}`} stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="1" />
                <path d={`M${x2} ${y2}v9`} stroke={SHADOW_INK} strokeWidth="5" />
              </g>
            ))}
          </g>
          {[140, 180].map((ex) => <EyeletG key={ex} idp={idp} x={ex} y={90} />)}
        </g>
      )}
    </g>
  );
}

// The jacket of the case study (m07), back view on a hanger: a dark collared jacket with the mark about a
// third of the back's width, tone on tone, centred between the shoulder blades.
const JACKET = [[136, 38], [84, 56], [40, 98], [20, 346], [80, 358], [96, 170], [98, 414], [262, 414], [264, 170], [280, 358], [340, 346], [320, 98], [276, 56], [224, 38]];
export const JACKET_W = 360;
export const JACKET_H = 420;
export const jacketD = () => rp(JACKET, 9);

export function Jacket({ idp, id, x = 0, y = 0, k = 1, c, markFill = '#B58F6B', markOpacity = 0.24, part = 'both', shadow = 20, lit = false, i = 0 }) {
  const d = jacketD();
  const ms = 58; // a third of the back (the torso is about 184 wide)
  const folds = [
    'M30 120Q62 230 48 346L80 354Q96 236 70 110Z',
    'M262 130Q300 240 290 352L330 344L322 110Z',
    'M110 300Q180 330 262 296V360Q180 392 110 360Z',
  ];
  const lights = ['M84 58L44 100L30 330L52 336Q70 230 84 140Z'];
  const collar = 'M128 40Q180 12 232 40L226 70Q180 90 134 70Z';
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      {part !== 'body' && <CastG d={d} len={shadow} opacity={0.2} className="sun-shadow" />}
      {part !== 'shadow' && (
        <g className={lit ? 'mock-lit' : 'mock-place'} style={{ '--i': i }}>
          <Cloth idp={idp} id={id} d={d} fill={c.fill} folds={folds} lights={lights} shade={0.7}>
            <path d={d} fill={`url(#${idp}-warm)`} />
            <Sym w={JACKET_W}>
              <path d="M94 62Q86 130 96 300" fill="none" stroke="#000000" strokeOpacity="0.6" strokeWidth="4" />
              <path d="M99 70Q92 130 100 290" fill="none" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1.4" />
            </Sym>
            <g transform={`translate(${180 - ms / 2} 128)`}>
              <MarkG idp={idp} size={ms} fill={markFill} opacity={markOpacity} />
            </g>
            <Seams list={['M180 86V408', 'M94 100Q180 118 266 100', 'M92 404H268']} c={c} o={0.26} />
            <Sym w={JACKET_W}>
              <Seams list={['M92 66Q84 130 90 270', 'M24 330L82 344']} c={c} o={0.3} />
            </Sym>
          </Cloth>
          <Cloth idp={idp} id={`${id}-collar`} d={collar} fill={c.fill} folds={['M180 20V84H232V40Z']} lights={[]} shade={0.8}>
            <path d={collar} fill={`url(#${idp}-warm)`} />
            <Seams list={['M134 62Q180 82 226 62']} c={c} o={0.34} />
          </Cloth>
          <path d="M132 44Q180 18 228 44" fill="none" stroke="#FFFFFF" strokeOpacity="0.18" strokeWidth="1.6" />
        </g>
      )}
    </g>
  );
}

// A folded stack of hoodies: one fabric rectangle per colourway, listed bottom to top. Local box 200 wide.
export function FoldedStack({ idp, id, x = 0, y = 0, k = 1, ways, mark, part = 'both', i = 0 }) {
  const h = 38;
  const total = ways.length * h;
  const outline = rp([[0, 0], [200, 0], [200, total], [0, total]], 10);
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      {part !== 'body' && (
        <g transform={`translate(0 ${-total})`}>
          <CastG d={outline} len={18} opacity={0.2} className="sun-shadow" />
        </g>
      )}
      {part !== 'shadow' && (
        <g className="mock-place" style={{ '--i': i }}>
          {ways.map((c, n) => {
            const top = n === ways.length - 1;
            const yy = -(n + 1) * h;
            const d = rp([[0, yy], [200, yy], [200, yy + h], [0, yy + h]], 11);
            const nid = `${id}-s${n}`;
            return (
              <g key={n}>
                <Cloth idp={idp} id={nid} d={d} fill={c.fill} folds={[`M120 ${yy}H200V${yy + h}H140Z`]} lights={[`M0 ${yy}H200V${yy + 7}H0Z`]}>
                  <Rib x={0} y={yy} w={26} h={h} n={6} c={c} />
                  <Seams list={[`M26 ${yy}V${yy + h}`, `M6 ${yy + h - 7}H194`]} c={c} />
                  {top && mark && (
                    <g transform={`translate(88 ${yy + 8})`}>
                      <MarkG idp={idp} size={20} fill={mark} />
                    </g>
                  )}
                </Cloth>
                <path d={`M10 ${yy + h}H190`} stroke={SHADOW_INK} strokeOpacity="0.38" strokeWidth="2" />
              </g>
            );
          })}
        </g>
      )}
    </g>
  );
}
