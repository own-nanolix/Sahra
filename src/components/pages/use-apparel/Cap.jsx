// A baseball cap in three-quarter view, facing right: six seamed panels, a button, a curved peak with
// stitching rows, a sweatband and a slightly raised embroidered mark on the front panel. Local box 290 x 170.
import { r2 } from '@/lib/charts';
import { CastG, ContactShadowG, SHADOW_INK } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { Cloth, Seams } from './parts';

export const CAP_W = 340;
export const CAP_H = 176;
const CROWN = 'M14 118C6 50 56 6 124 6C196 6 238 44 242 100L244 118Q130 148 14 118Z';
const PEAK = 'M166 126C210 110 292 106 334 128C342 142 320 162 270 169C222 175 184 158 166 142Z';
const SEAMS = [
  'M124 6C104 30 88 70 80 126',
  'M124 8C150 30 168 80 166 136',
  'M124 6C70 10 28 50 20 108',
  'M124 8C186 12 228 44 238 112',
];

// Embroidery: raised thread. A shadow below right, a highlight above left, a stitched face.
function Embroidery({ idp, size, ink }) {
  const lift = ink === '#35241C' ? '#875D41' : '#FFFFFF';
  return (
    <g transform="matrix(0.84 0.13 0 1 184 44)">
      <MarkG idp={idp} x={1.8} y={2.4} size={size} fill={SHADOW_INK} opacity="0.55" />
      <MarkG idp={idp} x={-0.8} y={-0.9} size={size} fill={lift} opacity="0.3" />
      <MarkG idp={idp} size={size} fill={ink} />
      <MarkG idp={idp} size={size} fill={`url(#${idp}-stitch)`} />
    </g>
  );
}

// hang: the cap hangs on a wall hook, so it throws a longer shadow on the wall and has no contact shadow.
export default function Cap({ idp, id, x = 0, y = 0, k = 1, c, ink, part = 'both', lit = false, i = 0, hang = false }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${k})`}>
      {part !== 'body' && (
        <>
          {!hang && <ContactShadowG idp={`${id}-cs`} cx={170} cy={156} rx={170} ry={12} opacity={0.34} blur={6} />}
          <CastG d={`${CROWN}${PEAK}`} len={hang ? 40 : 30} opacity={hang ? 0.24 : 0.2} className="sun-shadow" />
        </>
      )}
      {part !== 'shadow' && (
        <g className={lit ? 'mock-lit' : 'mock-place'} style={{ '--i': i }}>
          <path d="M166 136C210 120 292 116 336 138C344 152 322 172 270 177C222 183 184 166 166 150Z" fill={SHADOW_INK} opacity="0.5" />
          <Cloth idp={idp} id={`${id}-peak`} d={PEAK} fill={c.fill} shade={0.9} lights={['M166 126C210 110 292 106 334 128L330 134C290 114 212 118 166 134Z']} folds={['M200 160C240 168 290 162 330 140L338 150C310 170 250 176 200 166Z']}>
            <Seams list={['M186 138C228 124 292 122 326 136', 'M190 148C232 138 290 138 318 148']} c={c} w={1.1} dash="3 2.6" />
          </Cloth>
          <Cloth idp={idp} id={`${id}-crown`} d={CROWN} fill={c.fill} folds={['M170 10C214 18 240 56 242 100L244 118L190 130Z']} lights={['M30 90C26 50 60 14 110 8C70 30 50 60 44 100Z']} shade={0.55}>
            <path d={CROWN} fill={`url(#${idp}-dome)`} />
            <Seams list={SEAMS} c={c} w={1.4} dash="4 3" />
            <Seams list={SEAMS.map((s) => s.replace('M124 6', 'M126 9'))} c={c} w={1.4} dash="4 3" o={0.18} />
            <Embroidery idp={idp} size={44} ink={ink} />
            <path d="M14 118Q130 148 244 118V130Q130 162 14 130Z" fill="#000000" opacity="0.16" />
          </Cloth>
          <path d="M16 122Q130 150 242 122" fill="none" stroke={c.seam} strokeOpacity="0.5" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="124" cy="6" r="6.5" fill={c.fill} />
          <circle cx="122" cy="4.2" r="3" fill="#FFFFFF" opacity="0.28" />
          <circle cx="124" cy="6" r="6.5" fill="none" stroke={SHADOW_INK} strokeOpacity="0.3" />
        </g>
      )}
    </g>
  );
}
