// The m11 composition: two posters in a dark double frame on a ribbed concrete wall, front view, a floor strip
// below with bands of hard light. Each poster sits behind glass with a slow sheen.
import Art from '@/components/art/Art';
import { BackdropG, WallRibsG, MaterialDefs, SheenG, CastG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { PosterImagination, PosterBuilt, Bolts, Bar } from './parts';

const P = 'use-world-ps';
const PW = 360, PH = 504, PAD = 44;
const FW = PW + PAD * 2, FH = PH + PAD * 2;
const FY = 128;
const FRAMES = [245, 715];

export default function Posters() {
  const case_ = `M${FRAMES[0] - 12} ${FY - 12}H${FRAMES[1] + FW + 12}V772H${FRAMES[0] - 12}Z`;
  return (
    <Art viewBox="0 0 1400 900" title="Two Sahra posters in a dark double frame on a ribbed concrete wall" exportName="use-world-posters">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <linearGradient id={`${P}-frame`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4A3F31" />
          <stop offset="0.5" stopColor="#2B241B" />
          <stop offset="1" stopColor="#15110C" />
        </linearGradient>
        {FRAMES.map((fx, i) => (
          <clipPath key={fx} id={`${P}-glass${i}`}>
            <rect x={fx + PAD} y={FY + PAD} width={PW} height={PH} />
          </clipPath>
        ))}
      </defs>
      <BackdropG idp={`${P}-bd`} w={1400} h={900} horizon={0.86} wall={SCENE.sand40} floor={SCENE.sand} />
      <WallRibsG x={0} y={0} w={1400} h={774} pitch={14} rib={6} fill="#D9C9B8" />
      <rect width="1400" height="774" fill={SHADOW_INK} opacity="0.07" />
      {/* hard light bands across the floor, falling to the lower right */}
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M${-60 + i * 330} 774H${40 + i * 330}L${i * 330 - 90} 900H${-190 + i * 330}Z`} fill="#FFF6E8" opacity="0.16" />
      ))}

      {/* the double case: a hard shadow on the wall, the dark frame with depth */}
      <g className="sun-shadow">
        <CastG d={case_} len={34} opacity={0.2} />
      </g>
      <path d={case_} fill={`url(#${P}-frame)`} />
      <rect x={FRAMES[0] - 12} y={FY - 12} width={FRAMES[1] + FW - FRAMES[0] + 24} height="4" fill="#FFFFFF" opacity="0.28" />
      <Bar x={FRAMES[0] - 12} y={FY + FH + 8} w={FRAMES[1] + FW - FRAMES[0] + 24} h={772 - FY - FH - 8}fill="#1C160F" hi={0.12} />
      <rect x={FRAMES[0] + FW + 2} y={FY - 12} width={FRAMES[1] - FRAMES[0] - FW - 4} height={772 - FY - FH + FH + 12 - 12} fill="#0E0B08" />
      {FRAMES.map((fx, i) => (
        <g key={fx}>
          <rect x={fx} y={FY} width={FW} height={FH} fill={`url(#${P}-frame)`} />
          <rect x={fx} y={FY} width={FW} height="3" fill="#FFFFFF" opacity="0.2" />
          <rect x={fx} y={FY} width="3" height={FH} fill="#FFFFFF" opacity="0.14" />
          <rect x={fx + 14} y={FY + 14} width={FW - 28} height={FH - 28} fill="#1A150F" />
          <rect x={fx + PAD - 6} y={FY + PAD - 6} width={PW + 12} height={PH + 12} fill="#0B0806" />
          <g clipPath={`url(#${P}-glass${i})`}>
            {i === 0
              ? <PosterImagination idp={`${P}-p0`} x={fx + PAD} y={FY + PAD} w={PW} h={PH} body />
              : <PosterBuilt idp={`${P}-p1`} x={fx + PAD} y={FY + PAD} w={PW} h={PH} body />}
            {/* the frame's hard shadow on the glass, then a pale reflection */}
            <path d={`M${fx + PAD} ${FY + PAD}h${PW}l-10 10h-${PW - 10}v${PH - 10}l-10 10z`} fill="#000000" opacity="0.22" />
            <path d={`M${fx + PAD + 30} ${FY + PAD + PH}L${fx + PAD + 190} ${FY + PAD}h60L${fx + PAD + 90} ${FY + PAD + PH}Z`} fill="#FFFFFF" opacity="0.06" />
            <SheenG idp={`${P}-m`} d={`M${fx + PAD} ${FY + PAD}h${PW}v${PH}h-${PW}z`} opacity={0.28} />
          </g>
          <Bolts xs={[fx + 26, fx + FW - 26]} y={FY + 26} r={3.6} />
          <Bolts xs={[fx + 26, fx + FW - 26]} y={FY + FH - 26} r={3.6} />
        </g>
      ))}
      <ContactShadowG idp={`${P}-s1`} cx={700} cy={774} rx={560} ry={8} opacity={0.42} />
    </Art>
  );
}
