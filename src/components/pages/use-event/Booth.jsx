// The exhibition booth: wide front view. Dark Chocolate back wall with the Sand word-mark and a quarter-arch
// portal, a side wall with the poster, a counter with "→ sahra.sa", a plinth with the presentation box, stools.
import { CastRectG, ContactShadowG, CounterG, BlockG, PlaceG, SheenG, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkG } from '@/components/art/Mark';
import { WordmarkDebossG } from '@/components/art/Mark';
import { quarterArch, cornerCut } from '@/components/art/KeyArt';
import { Scene, PosterArt, C } from './kit';

// One-point perspective: the vanishing point sits at the eye height in the middle of the back wall. A point on
// the side wall at scale s (1 at the back wall's edge, growing towards the viewer) and at height dy (back-wall
// units from the eye line) lands at (VX + 450 s, EYE + dy s).
const EYE = 325;
const VX = 700;
const S_FRONT = 1.4;
const at = (s, dy) => [Math.round((VX + 450 * s) * 10) / 10, Math.round((EYE + dy * s) * 10) / 10];
const r1 = (v) => Math.round(v * 1000) / 1000;

// The poster (local 500 x 700) laid onto the side wall between scales s0 and s1, in vertical strips, each strip
// with its own affine map, so the artwork narrows and grows with the wall.
function WallPoster({ p, s0, s1, top, bottom, strips = 14 }) {
  const id = `${p}-wposter`;
  return (
    <g>
      <defs>
        <g id={id}><PosterArt p={p} x={0} y={0} w={500} /></g>
      </defs>
      {Array.from({ length: strips }, (_, i) => {
        const u0 = (500 * i) / strips, u1 = (500 * (i + 1)) / strips;
        const sa = s0 + ((s1 - s0) * i) / strips, sb = s0 + ((s1 - s0) * (i + 1)) / strips;
        const [x0, y0] = at(sa, top), [x1, y1] = at(sb, top), [, yb] = at(sa, bottom);
        const a = (x1 - x0) / (u1 - u0), b = (y1 - y0) / (u1 - u0), d = (yb - y0) / 700;
        const e = x0 - a * u0, f = y0 - b * u0;
        return (
          <g key={i} transform={`matrix(${r1(a)} ${r1(b)} 0 ${r1(d)} ${r1(e)} ${r1(f)})`} clipPath={`url(#${id}-c${i})`}>
            <clipPath id={`${id}-c${i}`}><rect x={u0 - 0.6} y="0" width={u1 - u0 + 1.2} height="700" /></clipPath>
            <use href={`#${id}`} />
          </g>
        );
      })}
    </g>
  );
}

function Stool({ p, x, y, i }) {
  return (
    <PlaceG i={i}>
      <ContactShadowG idp={`${p}-st${i}`} cx={x} cy={y + 4} rx={44} ry={7} />
      <g stroke="#6C645C" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d={`M${x - 26} ${y - 66}L${x - 38} ${y}M${x + 26} ${y - 66}L${x + 38} ${y}M${x} ${y - 62}V${y}`} />
        <path d={`M${x - 32} ${y - 28}H${x + 32}`} strokeWidth="3" />
      </g>
      <ellipse cx={x} cy={y - 72} rx="44" ry="11" fill="#1E140F" />
      <ellipse cx={x} cy={y - 76} rx="44" ry="11" fill={C.chocolate} />
      <ellipse cx={x - 10} cy={y - 79} rx="26" ry="4" fill="#FFFFFF" opacity="0.14" />
    </PlaceG>
  );
}

export default function Booth() {
  const [fx, fTop] = at(S_FRONT, -235), [, fBot] = at(S_FRONT, 235);
  const sideTop = `M1150 90L${fx} ${fTop}V${fBot}L1150 560Z`;
  const PS = [1.1, 1.3], PT = -120, PB = 92;
  const post = [at(PS[0], PT), at(PS[1], PT), at(PS[1], PB), at(PS[0], PB)].map(([x, y]) => `${x} ${y}`);
  const seams = [475, 700, 925];
  return (
    <Scene name="booth" title="Exhibition booth" w={1600} h={700} horizon={0.8} wall={C.beige} floor={C.sand}>
      {(p, m) => (
        <>
          <g stroke={SHADOW_INK} strokeOpacity="0.09" fill="none">
            {[600, 645, 695].map((y) => <path key={y} d={`M0 ${y}H1600`} />)}
          </g>
          <CastRectG x={250} y={540} w={900} h={20} len={60} />
          {/* back wall */}
          <rect x="250" y="90" width="900" height="470" fill={`url(#${m}-board-dark)`} filter={`url(#${m}-fibre)`} />
          {seams.map((x) => (
            <g key={x}>
              <rect x={x} y="108" width="2" height="452" fill="#000000" opacity="0.4" />
              <rect x={x + 2} y="108" width="1.5" height="452" fill="#FFFFFF" opacity="0.1" />
            </g>
          ))}
          <rect x="250" y="90" width="900" height="18" fill="#1E140F" />
          <rect x="250" y="108" width="900" height="3" fill="#FFFFFF" opacity="0.1" />
          <rect x="250" y="90" width="900" height="470" fill={`url(#${m}-shade)`} opacity="0.5" />
          <WordmarkG x={600} y={218} width={430} fill={C.sand} />
          {/* quarter-arch portal */}
          <path d={cornerCut(300, 250, 170, 310, 170, 'tr')} fill={`url(#${m}-board)`} />
          <path d={cornerCut(300, 250, 170, 310, 170, 'tr')} fill="#1E140F" opacity="0.5" />
          <path d={`M300 250H470V560H300Z`} fill="none" />
          <path d={quarterArch(300, 420, 170, 214, 'tr')} fill={C.sand} />
          <rect x="300" y="420" width="170" height="140" fill="#000000" opacity="0.08" />
          {/* side wall with the poster */}
          <path d={sideTop} fill={`url(#${m}-board)`} filter={`url(#${m}-fibre)`} />
          <path d={sideTop} fill={C.chocolate} opacity="0.3" />
          <path d={`M1150 90L${fx} ${fTop}`} stroke="#1E140F" strokeWidth={18} strokeOpacity="0.9" />
          <path d={`M1150 560L${fx} ${fBot}`} stroke="#1E140F" strokeOpacity="0.35" strokeWidth="4" />
          <path d="M1150 90V560" stroke="#000000" strokeOpacity="0.4" strokeWidth="3" />
          {/* the poster's own hard shadow on the wall, then the poster in perspective */}
          <path d={`M${[at(PS[0] + 0.012, PT + 8), at(PS[1] + 0.012, PT + 8), at(PS[1] + 0.012, PB + 8), at(PS[0] + 0.012, PB + 8)].map(([x, y]) => `${x} ${y}`).join('L')}Z`} fill={SHADOW_INK} opacity="0.3" />
          <g className="mock-lit">
            <path d={`M${post.join('L')}Z`} fill={C.beige} />
            <WallPoster p={p} s0={PS[0]} s1={PS[1]} top={PT} bottom={PB} />
            <path d={`M${post.join('L')}Z`} fill={`url(#${m}-glass)`} opacity="0.5" />
          </g>
          <ContactShadowG idp={`${p}-wall`} cx={700} cy={561} rx={430} ry={5} opacity="0.22" blur={4} />
          {/* counter */}
          <PlaceG i={1}>
            <CastRectG x={520} y={618} w={440} h={22} len={50} />
            <CounterG x={520} y={466} w={440} h={174} slab={22} top={C.beige} front={C.tribal} plinth={16} />
            <rect x="520" y="488" width="440" height="136" fill={`url(#${m}-board)`} opacity="0.55" filter={`url(#${m}-fibre)`} />
            <text x="566" y="568" className="sans" fontSize="36" fill={C.beige} letterSpacing="-0.5">→ sahra.sa</text>
          </PlaceG>
          {/* plinth with the presentation box */}
          <PlaceG i={2}>
            <CastRectG x={1008} y={622} w={96} h={18} len={44} />
            <BlockG x={1010} y={470} w={92} h={170} d={30} front={C.beige} top={C.white} side={C.sand40} />
            <rect x="1010" y="470" width="92" height="170" fill={`url(#${m}-shade)`} opacity="0.5" />
            <BlockG x={1020} y={446} w={72} h={26} d={14} front={C.tribal} top="#9A6E50" side="#5E3F2C" />
            <WordmarkDebossG idp={`${p}-bx`} x={1031} y={453} width={50} tone="#9A6E50" depth={1.5} />
          </PlaceG>
          <Stool p={p} x={330} y={640} i={3} />
          <Stool p={p} x={420} y={662} i={4} />
          <SheenG idp={m} d="M300 250H470V560H300Z" opacity="0.1" />
        </>
      )}
    </Scene>
  );
}
