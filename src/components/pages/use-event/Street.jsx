// Feather flags and the hanging banner. A street: pavement, kerb and road in front of a wall; flags stand on a
// cross base on the pavement (Dark Chocolate, Tribal Brown, Beige; the mark and the vertical word-mark), the
// banner on the wall behind carries the hoarding artwork of m16 on eyelets and cables.
import { CastG, CastRectG, ContactShadowG, StreetG, WallRibsG, PlaceG, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkVerticalG } from '@/components/art/Mark';
import { quarterArch } from '@/components/art/KeyArt';
import { Scene, Weave, Mark, HoardingArt, C } from './kit';

const FLAG = 'M0 -40V-560Q0 -740 112 -772C214 -684 254 -444 232 -300C216 -166 140 -76 0 -40Z';
const KINDS = {
  dark: { color: C.chocolate, ink: C.sand, name: 'Dark Chocolate' },
  tribal: { color: C.tribal, ink: C.beige, name: 'Tribal Brown' },
  beige: { color: C.beige, ink: C.tribal, name: 'Beige' },
};

// One feather flag: base centre at (0, 0), drawn at scale k.
function Flag({ p, m, kind, k = 1, id }) {
  const f = KINDS[kind];
  return (
    <g transform={`scale(${k})`}>
      <ContactShadowG idp={`${p}-fl${id}`} cx={20} cy={8} rx={150} ry={9} opacity="0.34" />
      <CastG d={FLAG} len={34} opacity={0.17} />
      {/* cross base: two feet and a hub */}
      <path d="M-150 20L146 -8L150 6L-146 34Z" fill="#2B2420" />
      <path d="M-120 -10L128 30L120 44L-128 4Z" fill="#3E342E" />
      <path d="M-150 20L146 -8" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
      <ellipse cx="0" cy="12" rx="22" ry="9" fill={`url(#${m}-metal-dark)`} />
      <rect x="-5" y="-44" width="10" height="56" fill={`url(#${m}-metal-dark)`} />
      {/* curved pole */}
      <path d="M0 -20V-560Q0 -740 112 -772" fill="none" stroke="#1E1815" strokeWidth="8" strokeLinecap="round" />
      <path d="M-2 -20V-560Q-2 -738 108 -770" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />
      <clipPath id={`${p}-fc${id}`}>
        <path d={FLAG} />
      </clipPath>
      <g clipPath={`url(#${p}-fc${id})`}>
        <Weave x={-4} y={-780} w={260} h={760} m={m} color={f.color} pitch={6} />
        <Mark x={78} y={-690} size={72} fill={f.ink} />
        <WordmarkVerticalG x={78} y={-520} scale={0.17} fill={f.ink} />
        <rect x="-4" y="-780" width="260" height="760" fill={`url(#${m}-shade)`} />
        <rect x="0" y="-780" width="14" height="760" fill={SHADOW_INK} opacity="0.3" />
        <path d="M18 -560V-70" stroke={f.ink} strokeOpacity="0.4" strokeWidth="1.3" strokeDasharray="6 4" />
      </g>
      <path d={FLAG} fill="none" stroke={SHADOW_INK} strokeOpacity="0.2" strokeWidth="1.5" />
    </g>
  );
}

const FLAG_SCENES = {
  dark: { wall: C.beige, pave: C.sand20, road: C.tribal40, horizon: 0.62, ribs: false },
  tribal: { wall: C.sand40, pave: C.beige60, road: C.sand, horizon: 0.64, ribs: true },
  beige: { wall: C.chocolate, pave: C.tribal40, road: C.tribal, horizon: 0.6, ribs: false },
};

export function FlagPlate({ kind }) {
  const sc = FLAG_SCENES[kind];
  const hy = 1000 * sc.horizon;
  const base = hy + (1000 - hy) * 0.38 * 0.62;
  return (
    <Scene name={`flag-${kind}`} title={`Feather flag, ${KINDS[kind].name}`} w={870} h={1000} horizon={sc.horizon} wall={sc.wall} floor={sc.pave}>
      {(p, m) => (
        <>
          {sc.ribs && <WallRibsG x={0} y={0} w={870} h={hy} pitch={30} rib={13} fill={sc.wall} />}
          {kind === 'beige' && <path d={quarterArch(650, hy, 130, 250, 'tl')} fill={C.black} opacity="0.35" />}
          <StreetG y={hy} w={870} h={1000} pavement={sc.pave} road={sc.road} slab={290} />
          <PlaceG i={1} x={400} y={base}>
            <Flag p={p} m={m} kind={kind} k={0.86} id="a" />
          </PlaceG>
        </>
      )}
    </Scene>
  );
}

// The hoarding artwork as a hanging banner: hem, eyelets and two cables.
function Banner({ p, m, x, y, w, id }) {
  const h = (w * 530) / 1600;
  const hem = Math.max(8, w * 0.012);
  const eye = [[x - hem * 0.5, y - hem * 0.5], [x + w + hem * 0.5, y - hem * 0.5], [x - hem * 0.5, y + h + hem * 0.5], [x + w + hem * 0.5, y + h + hem * 0.5]];
  return (
    <g>
      <CastRectG x={x - hem} y={y - hem} w={w + hem * 2} h={h + hem * 2} len={w * 0.03} opacity="0.2" />
      <rect x={x - hem} y={y - hem} width={w + hem * 2} height={h + hem * 2} fill={C.beige} filter={`url(#${m}-fabric)`} />
      <HoardingArt p={`${p}-b${id}`} x={x} y={y} w={w} />
      <rect x={x - hem} y={y - hem} width={w + hem * 2} height={h + hem * 2} fill={`url(#${m}-shade)`} opacity="0.5" />
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.chocolate} strokeOpacity="0.18" strokeWidth="1.2" />
      {eye.map(([ex, ey], i) => (
        <g key={i}>
          <circle cx={ex + 1.5} cy={ey + 2} r={hem * 0.62} fill={SHADOW_INK} opacity="0.3" />
          <circle cx={ex} cy={ey} r={hem * 0.6} fill={`url(#${m}-metal)`} />
          <circle cx={ex} cy={ey} r={hem * 0.28} fill={SHADOW_INK} />
        </g>
      ))}
    </g>
  );
}

function Cables({ x, y, w, top, m }) {
  const pts = [[x - 4, y - 4, x + w * 0.04, top], [x + w + 4, y - 4, x + w * 0.96, top]];
  return (
    <g>
      {pts.map(([x0, y0, x1, y1], i) => (
        <g key={i}>
          <path d={`M${x0 + 3} ${y0}L${x1 + 3} ${y1}`} stroke={SHADOW_INK} strokeOpacity="0.2" strokeWidth="3" />
          <path d={`M${x0} ${y0}L${x1} ${y1}`} stroke="#7B746C" strokeWidth="2.4" />
          <circle cx={x1} cy={y1 + 6} r="7" fill={`url(#${m}-metal)`} />
        </g>
      ))}
    </g>
  );
}

export function BannerPlate() {
  return (
    <Scene name="banner" title="Hanging banner with the hoarding artwork" w={1620} h={600} horizon={0.93} wall={C.tribal} floor={C.chocolate}>
      {(p, m) => (
        <>
          <WallRibsG x={0} y={0} w={1620} h={558} pitch={36} rib={16} fill={C.tribal} />
          <Cables x={190} y={96} w={1240} top={0} m={m} />
          <PlaceG i={1}>
            <Banner p={p} m={m} x={190} y={96} w={1240} id="a" />
          </PlaceG>
          <ContactShadowG idp={`${p}-skirt`} cx={810} cy={560} rx={760} ry={4} opacity="0.3" blur={4} />
        </>
      )}
    </Scene>
  );
}

export function StreetScene() {
  const hy = 800 * 0.68;
  const flags = [['dark', 120], ['tribal', 380], ['beige', 1380]];
  return (
    <Scene name="street" title="Street scene: three flags and the banner" w={1600} h={800} horizon={0.68} wall={C.sand40} floor={C.sand20}>
      {(p, m) => (
        <>
          <WallRibsG x={0} y={0} w={1600} h={hy} pitch={34} rib={15} fill={C.sand40} />
          <Cables x={600} y={100} w={760} top={0} m={m} />
          <PlaceG i={0}>
            <Banner p={p} m={m} x={600} y={100} w={760} id="s" />
          </PlaceG>
          <StreetG y={hy} w={1600} h={800} pavement={C.sand20} road={C.tribal40} slab={360} />
          {flags.map(([kind, x], i) => (
            <PlaceG key={kind} i={i + 1} x={x} y={hy + 62}>
              <Flag p={p} m={m} kind={kind} k={0.7} id={kind} />
            </PlaceG>
          ))}
        </>
      )}
    </Scene>
  );
}
