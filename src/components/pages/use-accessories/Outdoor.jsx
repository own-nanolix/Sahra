// A closed umbrella leaning against a wall, and a pair of socks on the floor field beside it.
import { ContactShadowG, CastG } from '@/components/art/Mockup';
import { r2 } from '@/lib/charts';
import Stage, { C, Cyl, Mk, Stitch, Sheet, SHADOW_INK } from './kit';

// ---- Umbrella: local origin at the tip, the handle up; the whole thing is tilted against the wall. ----
const TOP = -760, LEN = 760, PEAK = 74;
const hw = (t) => PEAK * Math.sin(Math.PI * Math.pow(t, 0.8));
const edge = (u, from = 0, to = 1, n = 30) => Array.from({ length: n + 1 }, (_, i) => {
  const t = from + ((to - from) * i) / n;
  return [r2(u * hw(t)), r2(TOP + t * LEN)];
});
const poly = (a, b, from, to) => {
  const left = edge(a, from, to), right = edge(b, from, to).reverse();
  return `M${[...left, ...right].map((p) => p.join(' ')).join('L')}Z`;
};
const line = (u) => `M${edge(u).map((p) => p.join(' ')).join('L')}`;

const TILT = 7, TIP = { x: 250, y: 1062 };
const place = (dx = 0, dy = 0) => `translate(${TIP.x + dx} ${TIP.y + dy}) rotate(${TILT})`;

function Umbrella() {
  const outline = poly(-1, 1, 0, 1);
  const centre = poly(-0.5, 0.5, 0, 1);
  return (
    <Stage id="umbrella" title="Dark Chocolate umbrella with one Sand panel carrying the mark" w={600} h={1200} horizon={0.9} wall={C.beige} floor={C.sand} order={1}>
      {(idp) => (
        <g>
          {[10, 22, 34, 46].map((k) => (
            <g key={k} transform={`translate(${k * 0.74} ${k * 0.67})`} opacity="0.07">
              <g transform={place()}>
                <path d={outline} fill={SHADOW_INK} />
                <path d={`M0 ${TOP}V-930`} stroke={SHADOW_INK} strokeWidth="14" />
              </g>
            </g>
          ))}
          <ContactShadowG idp={idp} cx={TIP.x + 30} cy={TIP.y + 4} rx={60} opacity={0.5} />
          <g transform={place()}>
            <rect x="-4.5" y="-40" width="9" height="40" fill={`url(#${idp}-metal-dark)`} />
            <path d={outline} fill={C.chocolate} />
            <clipPath id={`${idp}-canopy`}>
              <path d={outline} />
            </clipPath>
            <g clipPath={`url(#${idp}-canopy)`}>
              <path d={centre} fill={C.sand} />
              <path d={centre} fill="#000000" opacity="0.06" />
              <g transform={`translate(0 ${TOP + 0.42 * LEN}) rotate(0)`}>
                <Mk cx={0} cy={0} s={40} fill={C.chocolate} sx={0.92} />
              </g>
              {[-0.5, 0.5].map((u) => <path key={u} d={line(u)} fill="none" stroke="#150D09" strokeOpacity="0.55" strokeWidth="2.2" />)}
              {[-0.78, 0.78, -0.25, 0.25].map((u) => <path key={u} d={line(u)} fill="none" stroke="#150D09" strokeOpacity="0.22" strokeWidth="1.5" />)}
            </g>
            <Cyl idp={idp} d={outline} />
            <path d={outline} fill="none" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="1.4" />
            <rect x="-40" y={TOP + 100} width="80" height="26" rx="4" fill={C.tribal} />
            <rect x="-40" y={TOP + 100} width="80" height="26" rx="4" fill={`url(#${idp}-shade)`} />
            <circle cx="0" cy={TOP + 113} r="6" fill={`url(#${idp}-metal)`} />
            <rect x="-5" y="-930" width="10" height="170" fill={`url(#${idp}-metal)`} />
            <path d={`M0 ${TOP}V-912C0 -980 72 -980 72 -912`} fill="none" stroke="#1E1410" strokeWidth="24" strokeLinecap="round" />
            <path d={`M-4 -930C-4 -970 62 -974 66 -920`} fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="3.5" strokeLinecap="round" />
          </g>
        </g>
      )}
    </Stage>
  );
}

// ---- Socks ----
const SOCK = 'M0 0H124V150C124 164 140 172 160 172H232C270 172 296 194 296 226C296 262 268 284 232 284H62C24 284 0 258 0 224Z';

function Sock({ idp, i, x, y, rot }) {
  const ribs = Array.from({ length: 17 }, (_, k) => 7 + k * 7);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <CastG d={SOCK} len={20} opacity={0.26} steps={6} />
      <clipPath id={`${idp}-sock-${i}`}>
        <path d={SOCK} />
      </clipPath>
      <path d={SOCK} fill={C.beige} filter={`url(#${idp}-fabric)`} />
      <g clipPath={`url(#${idp}-sock-${i})`}>
        {ribs.map((rx) => <path key={rx} d={`M${rx} 0V176`} stroke={SHADOW_INK} strokeOpacity="0.09" strokeWidth="2.4" />)}
        <path d="M122 172V0" stroke="#000000" strokeOpacity="0.1" strokeWidth="14" />
        <rect width="124" height="46" fill={C.tribal} filter={`url(#${idp}-fabric)`} />
        {ribs.map((rx) => <path key={rx} d={`M${rx} 0V46`} stroke="#000000" strokeOpacity="0.18" strokeWidth="2.6" />)}
        <path d="M0 47H124" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
        <Mk cx={62} cy={104} s={30} fill={C.tribal} />
        <path d="M0 214C16 262 52 268 88 266C70 230 40 214 0 214Z" fill="#E7DDC6" />
        <path d="M244 172C278 188 296 206 296 240C284 262 262 280 232 284C246 250 250 206 244 172Z" fill="#E7DDC6" />
        <Stitch d="M232 176C254 200 252 252 232 282" color={C.tribal} opacity={0.5} width={1.6} dash="4 4" />
        <Stitch d="M8 224C30 250 60 262 90 262" color={C.tribal} opacity={0.5} width={1.6} dash="4 4" />
        <path d={SOCK} fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="3" transform="translate(-1.5 -1.5)" />
      </g>
      <Sheet idp={idp} d={SOCK} />
    </g>
  );
}

function Socks() {
  return (
    <Stage id="socks" title="Beige socks with a Tribal Brown cuff and a small mark" w={600} h={600} horizon={0.08} wall={C.tribal} floor={C.sand} order={1}>
      {(idp) => (
        <g>
          <Sock idp={idp} i={0} x={64} y={70} rot={6} />
          <Sock idp={idp} i={1} x={200} y={262} rot={-4} />
        </g>
      )}
    </Stage>
  );
}

export const OUTDOOR_PLATES = {
  umbrella: { key: 'umbrella', cap: 'Umbrella', c: 2, r: 4, ar: 0.5, node: <Umbrella /> },
  socks: { key: 'socks', cap: 'Socks', c: 2, r: 2, ar: 1, node: <Socks /> },
};
