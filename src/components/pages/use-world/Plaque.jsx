// A room plaque, close front view: a ribbed wall, a door frame at the right, one plaque on standoffs carrying the
// mark, a plain room word and a quiet pale bar where a name would be.
import Art from '@/components/art/Art';
import { BackdropG, WallRibsG, MaterialDefs, SheenG, CastRectG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { IconUse } from '@/components/site/Icon';
import { Bolts } from './parts';

const P = 'use-world-pq';
const X = 196, Y = 196, W = 450, H = 376;

export default function Plaque() {
  const face = `M${X} ${Y}H${X + W}V${Y + H}H${X}Z`;
  return (
    <Art viewBox="0 0 1000 900" title="Room plaque with the mark and a pale bar for a name, on a ribbed wall" exportName="use-world-plaque">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <clipPath id={`${P}-face`}>
          <rect x={X} y={Y} width={W} height={H} rx="14" />
        </clipPath>
        <linearGradient id={`${P}-light`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6E8" stopOpacity="0.3" />
          <stop offset="0.55" stopColor="#FFF6E8" stopOpacity="0" />
          <stop offset="1" stopColor="#35241C" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <BackdropG idp={`${P}-bd`} w={1000} h={900} horizon={0.88} wall={SCENE.tribal20} floor={SCENE.tribal} />
      <WallRibsG x={0} y={0} w={1000} h={792} pitch={36} rib={16} fill="#E7DFD9" />
      <rect width="1000" height="792" fill={`url(#${P}-light)`} />
      <rect y="770" width="1000" height="22" fill="#4A3426" />
      <rect y="770" width="1000" height="2.5" fill="#FFFFFF" opacity="0.3" />

      {/* the door frame, with depth */}
      <rect x="772" y="0" width="228" height="792" fill="#2A1D16" />
      <rect x="772" y="0" width="10" height="792" fill="#FFFFFF" opacity="0.2" />
      <rect x="782" y="0" width="14" height="792" fill="#000000" opacity="0.35" />
      <rect x="796" y="0" width="204" height="770" fill="url(#use-world-pq-m-board-dark)" />
      <rect x="796" y="0" width="204" height="770" fill={`url(#${P}-m-shade)`} opacity="0.45" />
      <rect x="810" y="396" width="14" height="86" rx="7" fill={`url(#${P}-m-metal)`} />
      <rect x="810" y="396" width="14" height="86" rx="7" fill={`url(#${P}-m-shade-v)`} />

      {/* the plaque: a hard shadow that lengthens, a contact shadow, the board with painted edges */}
      <g className="sun-shadow">
        <CastRectG x={X + 4} y={Y + 8} w={W} h={H} len={40} opacity={0.26} />
      </g>
      <rect x={X + 12} y={Y + 12} width={W} height={H} rx="14" fill="#1E140F" opacity="0.18" filter={`url(#${P}-m-soft)`} />
      <rect x={X + 7} y={Y + 7} width={W} height={H} rx="14" fill="#C9BFB0" />
      <rect x={X} y={Y} width={W} height={H} rx="14" fill={`url(#${P}-m-card)`} filter={`url(#${P}-m-paper-grain)`} />
      <g clipPath={`url(#${P}-face)`}>
        <rect x={X} y={Y} width={W} height="4" fill="#FFFFFF" opacity="0.9" />
        <rect x={X} y={Y} width="4" height={H} fill="#FFFFFF" opacity="0.7" />
        <rect x={X} y={Y + H - 5} width={W} height="5" fill={SHADOW_INK} opacity="0.12" />
        <MarkG x={X + 36} y={Y + 44} size={76} fill="#875D41" />
        <IconUse name="door" x={X + W - 92} y={Y + 44} size={46} color="#875D41" />
        <rect x={X + 36} y={Y + 164} width={W - 72} height="1.5" fill="#875D41" opacity="0.4" />
        <text className="serif" x={X + 36} y={Y + 250} fontSize="58" letterSpacing="-1.2" fill="#35241C">Meeting room</text>
        <rect x={X + 36} y={Y + 304} width="250" height="20" rx="10" fill="#E1D2C4" />
      </g>
      <SheenG idp={`${P}-m`} d={face} opacity={0.22} />
      <Bolts xs={[X + 18, X + W - 18]} y={Y + 18} r={4} />
      <Bolts xs={[X + 18, X + W - 18]} y={Y + H - 18} r={4} />
      <ContactShadowG idp={`${P}-s1`} cx={500} cy={792} rx={500} ry={7} opacity={0.3} />
    </Art>
  );
}
