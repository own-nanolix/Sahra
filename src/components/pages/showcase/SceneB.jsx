// Scene 2: a line-up of eight phones on one long shelf, front view, evenly spaced, each showing a different screen
// in the brand's language, with a wall of ribs behind. Sand tint wall over a Tribal Brown floor, 21:9.
import Art from '@/components/art/Art';
import { BrandDefs } from '@/components/art/KeyArt';
import { PhoneG, ScreenAboutG } from '@/components/art/Devices';
import { BackdropG, WallRibsG, MaterialDefs, ContactShadowG, PlaceG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { rr, WallClip, WallCast, FloorCast, LightPatch, Glass } from './kit';
import { ScreenDarkG, ScreenPlanPhoneG, ScreenPaletteG, ScreenMenuG, ScreenProfileG, ScreenArchG, ScreenMarkG } from './screens';

const W = 2100;
const H = 900;
const HZ = 770;
const SHELF = { x: 70, w: 1960, top: 582, band: 24, thick: 30 };
const BASE = SHELF.top + SHELF.band / 2;
const N = 8;
const PW = 172;

export default function SceneB() {
  const idp = 'showcase-b';
  const m = `${idp}-m`;
  const b = `${idp}-b`;
  const slot = SHELF.w / N;
  const k = PW / 430;
  const ph = (PW * 884) / 430;
  const screens = [
    <ScreenAboutG key="a" idp={`${idp}-about`} />,
    <ScreenDarkG key="b" />,
    <ScreenPlanPhoneG key="c" />,
    <ScreenPaletteG key="d" />,
    <ScreenMenuG key="e" />,
    <ScreenProfileG key="f" bd={b} />,
    <ScreenArchG key="g" bd={b} />,
    <ScreenMarkG key="h" />,
  ];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Eight phones on one long shelf in front of a ribbed wall, each showing a different screen of the brand" exportName="showcase-phone-lineup" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={m} />
      <BrandDefs idp={b} />
      <defs>
        <WallClip idp={idp} w={W} wallH={HZ} />
        <clipPath id={`${idp}-band`}>
          <rect x={SHELF.x} y={SHELF.top} width={SHELF.w} height={SHELF.band} />
        </clipPath>
      </defs>

      <BackdropG idp={idp} w={W} h={H} horizon={HZ / H} wall={SCENE.sand40} floor={SCENE.tribal} />
      <WallRibsG w={W} h={HZ} pitch={34} rib={14} fill={SCENE.sand40} />
      <LightPatch idp={idp} x={150} wallH={HZ} opacity={0.24} pane={160} gap={34} run={0.5} />
      <rect y={HZ} width={W} height={H - HZ} fill={`url(#${m}-shade-v)`} opacity="0.4" />

      {/* the shelf: top surface, front board, and the shadow it throws on the ribs below */}
      <path d={`M${SHELF.x} ${SHELF.top + SHELF.band + SHELF.thick}h${SHELF.w}l22 26h${-SHELF.w}z`} fill={SHADOW_INK} opacity="0.2" />
      <rect x={SHELF.x} y={SHELF.top} width={SHELF.w} height={SHELF.band} fill={SCENE.beige} />
      <rect x={SHELF.x} y={SHELF.top} width={SHELF.w} height="3" fill={SHADOW_INK} opacity="0.14" />
      <rect x={SHELF.x} y={SHELF.top + SHELF.band} width={SHELF.w} height={SHELF.thick} fill={`url(#${m}-board)`} filter={`url(#${m}-fibre)`} />
      <rect x={SHELF.x} y={SHELF.top + SHELF.band} width={SHELF.w} height="3" fill="#FFFFFF" opacity="0.4" />
      <rect x={SHELF.x + SHELF.w - 6} y={SHELF.top + SHELF.band} width="6" height={SHELF.thick} fill="#2B1D17" opacity="0.3" />

      {screens.map((_, i) => {
        const x = SHELF.x + slot * i + (slot - PW) / 2;
        const y = BASE - ph;
        return (
          <g key={i}>
            <WallCast idp={idp} d={rr(x, y, PW, ph, 26)} len={34} opacity={0.17} />
            <g clipPath={`url(#${idp}-band)`}>
              <FloorCast x={x + 4} y={BASE} w={PW - 8} len={44} k={0.22} opacity={0.26} />
            </g>
            <ContactShadowG idp={`${idp}-c${i}`} cx={x + PW / 2} cy={BASE + 1} rx={PW / 2 + 4} blur={4} opacity={0.4} />
          </g>
        );
      })}

      {screens.map((scr, i) => {
        const x = SHELF.x + slot * i + (slot - PW) / 2;
        const y = BASE - ph;
        const phone = (
          <>
            <PhoneG idp={`${idp}-p${i}`} w={PW}>{scr}</PhoneG>
            <Glass idp={m} x={20 * k} y={20 * k} w={390 * k} h={844 * k} r={48 * k} opacity={0.3} />
          </>
        );
        return (
          <PlaceG key={i} i={i} x={x} y={y}>
            {i === 0 ? <g className="mock-lit">{phone}</g> : phone}
          </PlaceG>
        );
      })}
    </Art>
  );
}
