// Four embroidered patches and a brass keychain, each on a woven fabric field, top view.
import { CastG } from '@/components/art/Mockup';
import { MARK_D } from '@/components/art/Mark';
import { quarterArch } from '@/components/art/KeyArt';
import Stage, { C, Mk, Wm, rrect, SHADOW_INK } from './kit';

// Woven field: a flat colour, a weave grid and the fabric grain filter.
function Field({ idp, color, w = 800, h = 400 }) {
  return (
    <g>
      <pattern id={`${idp}-weave`} width="7" height="7" patternUnits="userSpaceOnUse">
        <path d="M0 3.5H7M3.5 0V7" stroke="#000000" strokeOpacity="0.1" strokeWidth="1.6" />
        <path d="M0 1H7M1 0V7" stroke="#FFFFFF" strokeOpacity="0.07" strokeWidth="1" />
      </pattern>
      <rect width={w} height={h} fill={color} filter={`url(#${idp}-fabric)`} />
      <rect width={w} height={h} fill={`url(#${idp}-weave)`} />
    </g>
  );
}

// Satin-stitch texture: fine diagonal threads in the given colour.
function Thread({ id, color, angle = 35 }) {
  return (
    <pattern id={id} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
      <rect width="5" height="5" fill={color} />
      <path d="M0 1H5" stroke="#000000" strokeOpacity="0.22" strokeWidth="1.5" />
      <path d="M0 3H5" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="0.9" />
    </pattern>
  );
}

// The fabric is laid on a desk: it fills most of the frame and its cut edge meets the desk at a hard line,
// with the cloth's own thickness and a shadow falling towards the viewer.
const FABRIC = 344;
function FabricEdge() {
  return (
    <g>
      <rect y={FABRIC} width="800" height="4" fill="#000000" opacity="0.22" />
      <rect y={FABRIC + 4} width="800" height="9" fill={SHADOW_INK} opacity="0.16" />
    </g>
  );
}

const SHAPES = {
  circle: 'M250 200A150 150 0 1 0 550 200A150 150 0 1 0 250 200Z',
  square: rrect(260, 60, 280, 280, 36),
  pill: rrect(140, 105, 520, 190, 34),
  arch: rrect(260, 60, 280, 280, 18),
};

const PATCHES = [
  { id: 'patch-chocolate', title: 'Embroidered patch, the mark on Dark Chocolate', cap: 'Patch, mark on Dark Chocolate', shape: 'circle', field: C.sand, base: C.chocolate, edge: C.sand, ink: C.sand, art: 'mark', desk: C.tribal, at: [330, 178, -7] },
  { id: 'patch-sand', title: 'Embroidered patch, the mark on Sand', cap: 'Patch, mark on Sand', shape: 'square', field: C.chocolate, base: C.sand, edge: C.beige, ink: C.beige, art: 'mark', desk: C.sand40, at: [470, 190, 5] },
  { id: 'patch-wordmark', title: 'Embroidered patch, the word-mark', cap: 'Patch, word-mark', shape: 'pill', field: C.tribal, base: C.beige, edge: C.chocolate, ink: C.tribal, art: 'wordmark', desk: C.chocolate, at: [400, 168, -3] },
  { id: 'patch-arch', title: 'Embroidered patch, the quarter arch', cap: 'Patch, quarter arch', shape: 'arch', field: C.black, base: C.tribal, edge: C.sand, ink: C.beige, art: 'arch', desk: C.sand, at: [440, 186, 9] },
];

function Patch({ cw, order }) {
  const d = SHAPES[cw.shape];
  return (
    <Stage id={cw.id} title={cw.title} w={800} h={400} horizon={FABRIC / 400} wall={cw.field} floor={cw.desk} order={order}>
      {(idp) => (
        <g>
          <defs>
            <Thread id={`${idp}-tb`} color={cw.base} />
            <Thread id={`${idp}-ti`} color={cw.ink} angle={-25} />
          </defs>
          <Field idp={idp} color={cw.field} h={FABRIC} />
          <FabricEdge />
          {/* a loose row: each patch lies at its own place and turn on its cloth */}
          <g transform={`translate(${cw.at[0]} ${cw.at[1]}) rotate(${cw.at[2]}) scale(0.76) translate(-400 -200)`}>
          <CastG d={d} len={16} opacity={0.3} />
          <path d={d} fill={`url(#${idp}-tb)`} />
          <path d={d} fill="none" stroke={SHADOW_INK} strokeOpacity="0.2" strokeWidth="18" />
          <path d={d} fill="none" stroke={cw.edge} strokeWidth="14" />
          <path d={d} fill="none" stroke="#000000" strokeOpacity="0.22" strokeWidth="14" strokeDasharray="1.6 2.4" />
          <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity="0.22" strokeWidth="2" transform="translate(-1.5 -1.5)" />
          <g>
            {cw.art === 'mark' && (
              <g>
                <Mk cx={402} cy={203} s={104} fill="#000000" opacity="0.32" />
                <Mk cx={400} cy={200} s={104} fill={`url(#${idp}-ti)`} />
              </g>
            )}
            {cw.art === 'wordmark' && (
              <g>
                <Wm cx={402} cy={202} w={380} fill="#000000" opacity="0.3" />
                <Wm cx={400} cy={200} w={380} fill={`url(#${idp}-ti)`} />
              </g>
            )}
            {cw.art === 'arch' && (
              <g>
                <path d={quarterArch(484, 284, 36, 168, 'tl')} fill="#000000" opacity="0.3" transform="translate(2 3)" />
                <path d={quarterArch(484, 284, 36, 168, 'tl')} fill={`url(#${idp}-ti)`} />
              </g>
            )}
          </g>
          <path d={d} fill={`url(#${idp}-sheet)`} />
          </g>
        </g>
      )}
    </Stage>
  );
}

export const PATCH_PLATES = PATCHES.map((cw, i) => ({ key: cw.id, cap: cw.cap, c: 2, r: 1, ar: 2, node: <Patch cw={cw} order={i + 1} /> }));

// The keychain: the mark cut from brass-toned metal, hanging on a black split ring.
function Keychain() {
  const k = 170 / 184;
  return (
    <Stage id="keychain" title="Keychain with the mark cut from brass on a black ring" w={800} h={400} horizon={FABRIC / 400} wall={C.chocolate} floor={C.sand40} order={1}>
      {(idp) => (
        <g>
          <defs>
            <linearGradient id={`${idp}-brass`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#EBD3A0" />
              <stop offset="0.45" stopColor="#BE9552" />
              <stop offset="0.75" stopColor="#D8B678" />
              <stop offset="1" stopColor="#8A6530" />
            </linearGradient>
            <clipPath id={`${idp}-mk`}>
              <path d={MARK_D} />
            </clipPath>
          </defs>
          <Field idp={idp} color={C.chocolate} h={FABRIC} />
          <FabricEdge />
          <g transform="translate(380 170) scale(0.84) translate(-340 -150)">
          <rect x="314" y="-4" width="30" height="62" fill={SHADOW_INK} opacity="0.35" transform="translate(10 8)" />
          <rect x="314" y="-4" width="30" height="62" fill="#0E0907" filter={`url(#${idp}-fabric)`} />
          <rect x="314" y="48" width="30" height="16" rx="3" fill={`url(#${idp}-metal-dark)`} />
          <circle cx="329" cy="100" r="51" fill="none" stroke={SHADOW_INK} strokeOpacity="0.35" strokeWidth="9" transform="translate(12 10)" />
          <g transform={`translate(315 142) scale(${k})`}>
            <CastG d={MARK_D} len={22 / k} opacity={0.34} steps={6} />
            <circle cx="14" cy="10" r="19" fill={SHADOW_INK} opacity="0.34" transform="translate(12 12)" />
            <path d={MARK_D} fill={`url(#${idp}-brass)`} stroke="#6E4F24" strokeWidth={3 / k} strokeLinejoin="round" />
            <circle cx="14" cy="10" r="19" fill={`url(#${idp}-brass)`} stroke="#6E4F24" strokeWidth={3 / k} />
            <circle cx="14" cy="10" r="7.5" fill="#1E140F" />
            <circle cx="14" cy="10" r="7.5" fill="none" stroke="#FFF2CC" strokeOpacity="0.5" strokeWidth="1.5" transform="translate(0.8 0.8)" />
            <g clipPath={`url(#${idp}-mk)`}>
              <path d={MARK_D} fill="none" stroke="#FFF4D2" strokeOpacity="0.75" strokeWidth={4 / k} transform="translate(-2 -2)" />
              <path d={MARK_D} fill="none" stroke="#3E2A10" strokeOpacity="0.45" strokeWidth={4 / k} transform="translate(2.5 2.5)" />
            </g>
          </g>
          <circle cx="329" cy="100" r="51" fill="none" stroke="#0B0705" strokeWidth="9" />
          <path d="M290 76A51 51 0 0 1 340 51" fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="329" cy="100" r="51" fill="none" stroke={`url(#${idp}-metal-dark)`} strokeWidth="9" opacity="0.4" />
          </g>
        </g>
      )}
    </Stage>
  );
}

export const KEYCHAIN_PLATE = { key: 'keychain', cap: 'Keychain', c: 2, r: 1, ar: 2, node: <Keychain /> };
