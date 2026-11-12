// Scene 4: an event stage. A low stage across the frame, front view; a wide screen on a truss showing the hoarding
// artwork of m16; the word-mark above it; a counter at the left. Tribal Brown tint wall over a Beige floor, 3:1.
import Art from '@/components/art/Art';
import { WordmarkG, WordmarkDebossG } from '@/components/art/Mark';
import { BackdropG, CounterG, CastRectG, MaterialDefs, ContactShadowG, PlaceG, SCENE } from '@/components/art/Mockup';
import { rr, WallClip, WallCast, FloorCast, LightPatch, Glass } from './kit';
import { HoardingG } from './screens';

const W = 2400;
const H = 800;
const HZ = 718;
const STAGE = { x: 100, w: 2200, top: 598, band: 26, front: 94 };
const SCREEN = { x: 570, y: 168, w: 1260, h: 420 };
const POST = [512, 1856];

export default function SceneD() {
  const idp = 'showcase-d';
  const m = `${idp}-m`;
  const stageFront = STAGE.top + STAGE.band;
  const stageBase = stageFront + STAGE.front;
  const ctr = { x: 150, w: 340, top: 548, base: 792 };
  const beams = Array.from({ length: 45 }, (_, i) => i);
  const post = (x) => (
    <g key={x}>
      <rect x={x} y="128" width="32" height={STAGE.top - 128} fill={`url(#${m}-metal-dark)`} />
      {Array.from({ length: 16 }, (_, i) => {
        const y0 = 128 + i * ((STAGE.top - 128) / 16);
        const hgt = (STAGE.top - 128) / 16;
        return <path key={i} d={`M${x + 4} ${y0 + (i % 2 ? hgt : 0)}L${x + 28} ${y0 + (i % 2 ? 0 : hgt)}`} stroke="#8F877D" strokeWidth="2.2" />;
      })}
      <rect x={x - 10} y={STAGE.top - 8} width="52" height="8" fill="#1A1411" />
    </g>
  );
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="An event stage: a wide screen showing the hoarding artwork, the word-mark above it, a counter at the left" exportName="showcase-event-stage" style={{ width: '100%', height: 'auto' }}>
      <MaterialDefs idp={m} />
      <defs>
        <WallClip idp={idp} w={W} wallH={HZ} />
        <clipPath id={`${idp}-stageclip`}>
          <rect x={STAGE.x} y={STAGE.top} width={STAGE.w} height={STAGE.band + STAGE.front} />
        </clipPath>
        <clipPath id={`${idp}-hallclip`}>
          <rect y={HZ} width={W} height={H - HZ} />
        </clipPath>
      </defs>
      <BackdropG idp={idp} w={W} h={H} horizon={HZ / H} wall={SCENE.tribal40} floor={SCENE.beige} />
      <LightPatch idp={idp} x={60} wallH={HZ} opacity={0.34} pane={150} gap={30} run={0.45} />
      <LightPatch idp={idp} x={1540} wallH={HZ} opacity={0.22} pane={130} gap={26} run={0.45} />

      {/* shadows: the screen on the wall, the stage on the hall floor, the counter on the stage and the floor */}
      <WallCast idp={idp} d={rr(POST[0], 128, POST[1] + 32 - POST[0], STAGE.top - 128, 4)} len={44} opacity={0.2} />
      <g clipPath={`url(#${idp}-hallclip)`}>
        <FloorCast x={STAGE.x} y={stageBase} w={STAGE.w} len={46} k={0.32} opacity={0.24} />
        <FloorCast x={ctr.x} y={ctr.base} w={ctr.w} len={50} k={0.3} opacity={0.26} />
      </g>
      <g clipPath={`url(#${idp}-stageclip)`}>
        <g className="sun-shadow">
          <CastRectG x={ctr.x} y={ctr.top} w={ctr.w} h={ctr.base - ctr.top} len={64} opacity={0.3} />
        </g>
      </g>

      {/* the stage: top surface, front board, edge */}
      <PlaceG i={0}>
        <rect x={STAGE.x} y={STAGE.top} width={STAGE.w} height={STAGE.band} fill="#5A3F30" />
        <rect x={STAGE.x} y={STAGE.top} width={STAGE.w} height={STAGE.band} fill={`url(#${m}-shade-v)`} opacity="0.6" />
        <rect x={STAGE.x} y={stageFront} width={STAGE.w} height={STAGE.front} fill={`url(#${m}-board-dark)`} filter={`url(#${m}-fibre)`} />
        <rect x={STAGE.x} y={stageFront} width={STAGE.w} height="4" fill="#B58F6B" opacity="0.7" />
        <rect x={STAGE.x} y={stageBase - 8} width={STAGE.w} height="8" fill="#000000" opacity="0.3" />
        <rect x={STAGE.x + STAGE.w - 8} y={STAGE.top} width="8" height={STAGE.band + STAGE.front} fill="#000000" opacity="0.3" />
      </PlaceG>
      <ContactShadowG idp={`${idp}-cs`} cx={STAGE.x + STAGE.w / 2} cy={stageBase + 3} rx={STAGE.w / 2} blur={6} opacity={0.35} />

      {/* the truss and the screen */}
      <PlaceG i={1}>
        {POST.map(post)}
        <rect x={POST[0]} y="112" width={POST[1] + 32 - POST[0]} height="30" fill={`url(#${m}-metal-dark)`} />
        {beams.map((i) => {
          const sx = POST[0] + 8 + i * ((POST[1] + 32 - POST[0] - 16) / 44);
          const up = i % 2 === 0;
          return <path key={i} d={`M${sx.toFixed(1)} ${up ? 142 : 112}l${(((POST[1] + 32 - POST[0] - 16) / 44)).toFixed(1)} ${up ? -30 : 30}`} stroke="#8F877D" strokeWidth="2" />;
        })}
        <rect x={POST[0]} y="112" width={POST[1] + 32 - POST[0]} height="3" fill="#FFFFFF" opacity="0.3" />
      </PlaceG>
      <PlaceG i={2}>
        <g className="mock-lit">
          <rect x={SCREEN.x - 14} y={SCREEN.y - 14} width={SCREEN.w + 28} height={SCREEN.h + 28} rx="6" fill="#1A1411" />
          <rect x={SCREEN.x - 14} y={SCREEN.y - 14} width={SCREEN.w + 28} height="3" fill="#FFFFFF" opacity="0.22" />
          <g transform={`translate(${SCREEN.x} ${SCREEN.y})`}>
            <HoardingG idp={`${idp}-art`} w={SCREEN.w} h={SCREEN.h} />
          </g>
          <Glass idp={m} x={SCREEN.x} y={SCREEN.y} w={SCREEN.w} h={SCREEN.h} r={2} opacity={0.3} />
        </g>
        <WordmarkG x={W / 2 - 250} y={20} width={500} fill={SCENE.chocolate} />
      </PlaceG>

      {/* the counter in front of the stage, at the left */}
      <PlaceG i={3}>
        <CounterG x={ctr.x} y={ctr.top} w={ctr.w} h={ctr.base - ctr.top} slab={20} top={SCENE.beige} front={SCENE.tribal} plinth={14} />
        <rect x={ctr.x} y={ctr.top + 20} width={ctr.w} height={ctr.base - ctr.top - 34} fill={`url(#${m}-board)`} opacity="0.45" filter={`url(#${m}-fibre)`} />
        <WordmarkDebossG idp={`${idp}-wm`} x={ctr.x + 50} y={ctr.top + 96} width={240} tone="#946A4C" depth={3} />
      </PlaceG>
      <ContactShadowG idp={`${idp}-cc`} cx={ctr.x + ctr.w / 2} cy={ctr.base + 2} rx={ctr.w / 2 + 6} blur={6} opacity={0.4} />
    </Art>
  );
}
