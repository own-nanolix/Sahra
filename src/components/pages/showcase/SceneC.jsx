// Scene 3, a pair of plates of the same family. C1: a laptop open on a single block plinth, three-quarter front,
// on a Tribal Brown wall over a Dark Chocolate floor. C2 (4:3): a tablet with the plan on a counter, on a Dark
// Chocolate wall over a Sand floor. Each plate is ONE SVG.
import Art from '@/components/art/Art';
import { BrandDefs } from '@/components/art/KeyArt';
import { TabletG } from '@/components/art/Devices';
import { WordmarkDebossG } from '@/components/art/Mark';
import { BackdropG, BlockG, CounterG, CastG, MaterialDefs, ContactShadowG, PlaceG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { rr, WallClip, WallCast, FloorCast, LightPatch, Glass } from './kit';
import { ScreenLandingG, ScreenPlanTabletG } from './screens';

// ---------- C1: laptop on a plinth ----------

const LW = 560; // laptop deck width
const LD = { dx: 36, dy: 42 }; // deck depth in the oblique view
const LID_H = 360;

// the open laptop in its own frame: origin at the front-left corner of the deck, y up is negative
function Laptop({ idp, m, bd }) {
  const keyRows = 5;
  const keyCols = 13;
  const pt = (u, v) => `${(u * LW + v * LD.dx).toFixed(1)} ${(-v * LD.dy).toFixed(1)}`;
  const keys = [];
  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      const u0 = 0.07 + (c * 0.86) / keyCols;
      const u1 = u0 + 0.86 / keyCols - 0.006;
      const v0 = 0.42 + (r * 0.5) / keyRows;
      const v1 = v0 + 0.5 / keyRows - 0.03;
      keys.push(`M${pt(u0, v0)}L${pt(u1, v0)}L${pt(u1, v1)}L${pt(u0, v1)}Z`);
    }
  }
  const sx = 532 / 1440;
  return (
    <g>
      <defs>
        <clipPath id={`${idp}-lidscreen`}>
          <rect x={LD.dx + 14} y={-LID_H - LD.dy + 14} width="532" height="332" rx="5" />
        </clipPath>
      </defs>
      {/* deck: top plane, keys, front edge */}
      <path d={`M0 0H${LW}L${LW + LD.dx} ${-LD.dy}H${LD.dx}Z`} fill={`url(#${m}-metal)`} />
      <path d={keys.join('')} fill="#2A211C" opacity="0.88" />
      <path d={`M${pt(0.38, 0.06)}L${pt(0.62, 0.06)}L${pt(0.62, 0.3)}L${pt(0.38, 0.3)}Z`} fill="none" stroke="#6B6058" strokeWidth="1.2" />
      <rect y="0" width={LW} height="13" fill="#8F877D" />
      <rect y="0" width={LW} height="3" fill="#FFFFFF" opacity="0.5" />
      <path d={`M${LW} 0l${LD.dx} ${-LD.dy}v13l${-LD.dx} ${LD.dy}z`} fill="#6F675E" />
      {/* lid: back panel with the screen */}
      <path d={`M${LW + LD.dx} ${-LD.dy}h8v${-LID_H}h-8z`} fill="#1A1411" />
      <rect x={LD.dx} y={-LID_H - LD.dy} width={LW} height={LID_H} rx="12" fill="#2E2621" />
      <rect x={LD.dx} y={-LID_H - LD.dy} width={LW} height="3" rx="1.5" fill="#FFFFFF" opacity="0.22" />
      <rect x={LD.dx + 14} y={-LID_H - LD.dy + 14} width="532" height="332" rx="5" fill="#120D0A" />
      <g clipPath={`url(#${idp}-lidscreen)`}>
        <g transform={`translate(${LD.dx + 14} ${-LID_H - LD.dy + 14}) scale(${sx.toFixed(5)})`}>
          <ScreenLandingG bd={bd} />
        </g>
      </g>
      <circle cx={LD.dx + LW / 2} cy={-LID_H - LD.dy + 7} r="2.4" fill="#0C0907" />
      <Glass idp={m} x={LD.dx + 14} y={-LID_H - LD.dy + 14} w={532} h={332} r={5} opacity={0.32} />
    </g>
  );
}

export function SceneC1() {
  const idp = 'showcase-c1';
  const m = `${idp}-m`;
  const b = `${idp}-b`;
  const W = 1500;
  const H = 900;
  const HZ = 620;
  const blk = { x: 400, y: 590, w: 700, h: 200, d: 110 };
  const dx = blk.d * 0.6;
  const sil = `M${blk.x} ${blk.y + blk.h}V${blk.y}L${blk.x + dx} ${blk.y - blk.d}H${blk.x + blk.w + dx}V${blk.y + blk.h - blk.d}L${blk.x + blk.w} ${blk.y + blk.h}Z`;
  // the laptop sits on the top face of the plinth; the whole object takes a slight shear for the three-quarter view
  const lx = 482;
  const ly = 568;
  const shear = 0.045;
  const lidTop = -LID_H - LD.dy;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A laptop open on a single block plinth, three-quarter front, on a Tribal Brown wall" exportName="showcase-laptop-plinth" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={m} />
      <BrandDefs idp={b} />
      <defs>
        <WallClip idp={idp} w={W} wallH={HZ} />
      </defs>
      <BackdropG idp={idp} w={W} h={H} horizon={HZ / H} wall={SCENE.tribal} floor={SCENE.chocolate} />
      <rect width={W} height={HZ} fill={`url(#${m}-shade)`} opacity="0.25" />
      <LightPatch idp={idp} x={40} wallH={HZ} color="#F5F0E3" opacity={0.13} pane={140} gap={30} run={0.55} />
      <rect y={HZ} width={W} height={H - HZ} fill={`url(#${m}-shade-v)`} opacity="0.5" />

      {/* shadows: the plinth on the floor and the wall behind, the laptop on the wall */}
      <g className="sun-shadow">
        <CastG d={sil} len={92} steps={30} opacity={0.3} />
      </g>
      <g clipPath={`url(#${idp}-wallclip)`}>
        <g transform={`translate(${lx} ${ly}) matrix(1 ${shear} 0 1 0 0)`}>
          <g className="sun-shadow">
            <CastG d={rr(LD.dx, lidTop, LW, LID_H, 12)} len={54} steps={18} opacity={0.2} />
          </g>
        </g>
      </g>
      <ContactShadowG idp={`${idp}-cb`} cx={blk.x + blk.w / 2 + 30} cy={blk.y + blk.h + 3} rx={blk.w / 2 + 40} blur={9} opacity={0.5} />

      <PlaceG i={0}>
        <BlockG x={blk.x} y={blk.y} w={blk.w} h={blk.h} d={blk.d} front={SCENE.beige} top={SCENE.white} side={SCENE.sand40} />
        <rect x={blk.x} y={blk.y} width={blk.w} height={blk.h} fill={`url(#${m}-shade)`} opacity="0.4" />
        <path d={`M${blk.x + blk.w} ${blk.y}l${dx} ${-blk.d}v${blk.h}l${-dx} ${blk.d}z`} fill="#35241C" opacity="0.22" />
        <rect x={blk.x} y={blk.y} width={blk.w} height="3" fill="#FFFFFF" opacity="0.8" />
        <ContactShadowG idp={`${idp}-cl`} cx={lx + LW / 2 + 24} cy={ly + 8} rx={LW / 2} ry={12} blur={6} opacity={0.4} />
      </PlaceG>
      <PlaceG i={1}>
        <g transform={`translate(${lx} ${ly}) matrix(1 ${shear} 0 1 0 0)`}>
          <g className="mock-lit">
            <Laptop idp={idp} m={m} bd={b} />
          </g>
        </g>
      </PlaceG>
    </Art>
  );
}

// ---------- C2: tablet with the plan on a counter, 4:3 ----------

export function SceneC2() {
  const idp = 'showcase-c2';
  const m = `${idp}-m`;
  const W = 1200;
  const H = 900;
  const HZ = 700;
  const TOP = 600; // front of the counter slab
  const tab = { w: 560, x: 300, base: 592 };
  const th = (tab.w * 900) / 1260;
  const ty = tab.base - th;
  const mug = { x: 930, base: 590 };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A tablet showing the plan sheet, standing on a counter, on a Dark Chocolate wall" exportName="showcase-tablet-counter" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={m} />
      <defs>
        <WallClip idp={idp} w={W} wallH={HZ} />
      </defs>
      <BackdropG idp={idp} w={W} h={H} horizon={HZ / H} wall={SCENE.chocolate} floor={SCENE.sand} />
      <rect width={W} height={HZ} fill={`url(#${m}-shade)`} opacity="0.2" />
      <LightPatch idp={idp} x={30} wallH={HZ} color="#F5F0E3" opacity={0.1} pane={110} gap={26} run={0.5} />
      <rect y={HZ} width={W} height={H - HZ} fill={`url(#${m}-shade-v)`} opacity="0.35" />

      {/* the counter: top surface, slab and front */}
      <rect x="54" y={TOP - 26} width="1092" height="26" fill={SCENE.beige60} />
      <rect x="54" y={TOP - 26} width="1092" height="26" fill={`url(#${m}-shade)`} opacity="0.35" />
      <CounterG x={60} y={TOP} w={1080} h={190} slab={20} top={SCENE.beige} front={SCENE.tribal} plinth={14} />
      <rect x="60" y={TOP + 20} width="1080" height="170" fill={`url(#${m}-board)`} opacity="0.5" filter={`url(#${m}-fibre)`} />
      <WordmarkDebossG idp={`${idp}-wm`} x={110} y={TOP + 74} width={280} tone="#946A4C" depth={3} />
      <ContactShadowG idp={`${idp}-cf`} cx={600} cy={792} rx={560} ry={9} blur={6} opacity={0.4} />

      <WallCast idp={idp} d={rr(tab.x, ty, tab.w, th, 28)} len={44} opacity={0.3} />
      <WallCast idp={idp} d={rr(mug.x, mug.base - 92, 96, 92, 10)} len={34} opacity={0.3} />
      <g clipPath={`url(#${idp}-counterclip)`}>
        <FloorCast x={tab.x + 6} y={tab.base} w={tab.w - 12} len={70} k={0.3} opacity={0.34} />
        <FloorCast x={mug.x} y={mug.base} w={96} len={44} k={0.3} opacity={0.34} />
      </g>
      <defs>
        <clipPath id={`${idp}-counterclip`}>
          <rect x="54" y={TOP - 26} width="1092" height="26" />
        </clipPath>
      </defs>
      <ContactShadowG idp={`${idp}-ct`} cx={tab.x + tab.w / 2} cy={tab.base + 2} rx={tab.w / 2} blur={5} opacity={0.5} />
      <ContactShadowG idp={`${idp}-cm`} cx={mug.x + 48} cy={mug.base + 2} rx={52} blur={4} opacity={0.5} />

      <PlaceG i={0} x={mug.x} y={mug.base - 92}>
        <path d="M96 24q36 0 36 28t-36 28" fill="none" stroke="#E9E0CE" strokeWidth="11" />
        <rect width="96" height="92" rx="10" fill={`url(#${m}-ceramic)`} />
        <ellipse cx="48" cy="2" rx="46" ry="9" fill="#DCCFB9" />
        <ellipse cx="48" cy="3" rx="39" ry="6.5" fill="#4A3126" />
        <rect width="96" height="92" rx="10" fill={`url(#${m}-shade)`} opacity="0.6" />
      </PlaceG>
      <PlaceG i={1} x={tab.x} y={ty}>
        <g className="mock-lit">
          <rect x={tab.w * 0.3} y={th - 5} width={tab.w * 0.4} height="9" rx="3" fill="#1A1411" />
          <TabletG idp={`${idp}-tb`} w={tab.w}>
            <ScreenPlanTabletG />
          </TabletG>
          <Glass idp={m} x={(40 * tab.w) / 1260} y={(40 * tab.w) / 1260} w={(1180 * tab.w) / 1260} h={(820 * tab.w) / 1260} r={5} opacity={0.3} />
        </g>
      </PlaceG>
      <path d={`M54 ${TOP - 26}H1146`} stroke={SHADOW_INK} strokeOpacity="0.2" />
    </Art>
  );
}
