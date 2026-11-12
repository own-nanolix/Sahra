// Scene 1: a phone standing on a desk edge, front view, three data cards leaning against the wall behind it at
// different heights. Beige wall over a Sand desk, 16:9. One SVG: backdrop, window light, shadows, objects.
import Art from '@/components/art/Art';
import { BrandDefs } from '@/components/art/KeyArt';
import { PhoneG, ScreenAboutG } from '@/components/art/Devices';
import { BackdropG, DeskEdgeG, MaterialDefs, ContactShadowG, PlaceG, SCENE } from '@/components/art/Mockup';
import { rr, WallClip, WallCast, FloorCast, LightPatch, Glass } from './kit';
import { RowsCardG, PlanCardG, ProfileCardG } from './screens';

const W = 1600;
const H = 900;
const HZ = 500;
const EDGE = 800;
const BASE = 546;

// a card seen from the front: thickness at the right, its face, content, shading and a lit top edge
function Shell({ m, w, h, r = 26, fill, children }) {
  return (
    <g>
      <path d={rr(7, 2, w, h, r)} fill="#BFB29C" />
      {fill && <path d={rr(0, 0, w, h, r)} fill={fill} filter={`url(#${m}-paper-grain)`} />}
      {children}
      <path d={rr(0, 0, w, h, r)} fill={`url(#${m}-shade)`} opacity="0.55" />
      <path d={`M${r} 1H${w - r}`} stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="2" />
    </g>
  );
}

export default function SceneA() {
  const idp = 'showcase-a';
  const m = `${idp}-m`;
  const b = `${idp}-b`;
  const cards = [
    { x: 180, w: 320, h: 440 },
    { x: 540, w: 340, h: 370 },
    { x: 1070, w: 380, h: 336 },
  ];
  const ph = { x: 785, w: 230, base: 748 };
  const k = ph.w / 430;
  const phH = (ph.w * 884) / 430;
  const phY = ph.base - phH;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="A phone showing the About page on a desk edge, three data cards leaning on the wall behind it" exportName="showcase-phone-cards" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={m} />
      <BrandDefs idp={b} />
      <defs>
        <linearGradient id={`${idp}-desk`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.2" />
        </linearGradient>
        <clipPath id={`${idp}-deskclip`}>
          <rect y={HZ} width={W} height={EDGE - HZ} />
        </clipPath>
        <WallClip idp={idp} w={W} wallH={HZ} />
      </defs>

      <BackdropG idp={idp} w={W} h={H} horizon={HZ / H} wall={SCENE.beige} floor={SCENE.sand} />
      <LightPatch idp={idp} x={60} wallH={HZ} opacity={0.5} pane={130} run={0.62} />
      <rect y={HZ} width={W} height={EDGE - HZ} fill={`url(#${idp}-desk)`} />
      <g clipPath={`url(#${idp}-deskclip)`} fill="#FFFFFF" opacity="0.16">
        {[0, 1, 2].map((i) => <path key={i} d={`M${60 + 310 + i * 152} ${HZ}h130l${0.62 * (EDGE - HZ)} ${EDGE - HZ}h-130z`} />)}
      </g>
      <DeskEdgeG y={EDGE} w={W} thickness={30} top={SCENE.sand40} edge={SCENE.tribal} />
      <rect y={EDGE + 40} width={W} height={H - EDGE - 40} fill={SCENE.chocolate} />
      <rect y={EDGE + 40} width={W} height={H - EDGE - 40} fill={`url(#${m}-shade-v)`} opacity="0.5" />

      {/* hard shadows on the wall and the desk */}
      {cards.map((c, i) => (
        <g key={i}>
          <WallCast idp={idp} d={rr(c.x, BASE - c.h, c.w, c.h, 26)} len={26} opacity={0.2} />
          <FloorCast x={c.x} y={BASE} w={c.w} len={44} k={0.3} opacity={0.15} />
        </g>
      ))}
      <WallCast idp={idp} d={rr(ph.x, phY, ph.w, phH, 34)} len={58} opacity={0.17} />
      <FloorCast x={ph.x + 6} y={ph.base} w={ph.w - 12} len={96} k={0.34} opacity={0.24} />
      {cards.map((c, i) => <ContactShadowG key={i} idp={`${idp}-cc${i}`} cx={c.x + c.w / 2} cy={BASE + 3} rx={c.w / 2} blur={5} opacity={0.3} />)}
      <ContactShadowG idp={`${idp}-cp`} cx={ph.x + ph.w / 2} cy={ph.base + 2} rx={ph.w / 2 + 6} blur={6} opacity={0.4} />

      <PlaceG i={0} x={cards[0].x} y={BASE - cards[0].h}>
        <Shell m={m} w={cards[0].w} h={cards[0].h} fill={`url(#${m}-paper)`}>
          <RowsCardG w={cards[0].w} h={cards[0].h} />
        </Shell>
      </PlaceG>
      <PlaceG i={1} x={cards[1].x} y={BASE - cards[1].h}>
        <Shell m={m} w={cards[1].w} h={cards[1].h} fill={`url(#${m}-card)`}>
          <PlanCardG idp={idp} w={cards[1].w} h={cards[1].h} />
        </Shell>
      </PlaceG>
      <PlaceG i={2} x={cards[2].x} y={BASE - cards[2].h}>
        <Shell m={m} w={cards[2].w} h={cards[2].h} r={30}>
          <ProfileCardG bd={b} w={cards[2].w} h={cards[2].h} />
        </Shell>
      </PlaceG>

      <PlaceG i={3} x={ph.x} y={phY}>
        <g className="mock-lit">
          <PhoneG idp={`${idp}-ph`} w={ph.w}>
            <ScreenAboutG idp={`${idp}-about`} />
          </PhoneG>
          <Glass idp={m} x={20 * k} y={20 * k} w={390 * k} h={844 * k} r={48 * k} />
        </g>
      </PlaceG>
    </Art>
  );
}
