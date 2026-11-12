// A site fence panel: a printed sheet in a steel frame on two concrete feet, in front of a dark wall. Beige
// word-mark on Sand (colour version 1 of m09), the brand line, and a court field with one large rounded corner.
import Art from '@/components/art/Art';
import { BackdropG, BlockG, MaterialDefs, SheenG, CastG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { cornerCut } from '@/components/art/KeyArt';
import { WordmarkG } from '@/components/art/Mark';
import { LINES, URL_LINE } from '@/lib/brand';
import { Court, Bolts, Bar } from './parts';

const P = 'use-world-fn';
const SX = 150, SY = 230, SW = 700, SH = 400;

export default function Fence() {
  const sheet = `M${SX} ${SY}H${SX + SW}V${SY + SH}H${SX}Z`;
  const court = cornerCut(SX + 440, SY, 260, SH, 78, 'tl');
  return (
    <Art viewBox="0 0 1000 900" title="Site fence panel printed with the word-mark and the brand line, on concrete feet" exportName="use-world-fence">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <clipPath id={`${P}-court`}>
          <path d={court} />
        </clipPath>
        <clipPath id={`${P}-sheet`}>
          <rect x={SX} y={SY} width={SW} height={SH} />
        </clipPath>
        <pattern id={`${P}-mesh`} width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M0 0H14M0 0V14" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
        </pattern>
      </defs>
      <BackdropG idp={`${P}-bd`} w={1000} h={900} horizon={0.76} wall={SCENE.chocolate} floor={SCENE.sand20} />
      <rect width="1000" height="684" fill="#000000" opacity="0.1" />
      <rect x="0" y="684" width="1000" height="6" fill={SHADOW_INK} opacity="0.3" />

      {/* hard shadow on the wall behind, a contact shadow on the ground */}
      <g className="sun-shadow">
        <CastG d={sheet} len={46} opacity={0.4} />
      </g>
      <ContactShadowG idp={`${P}-s1`} cx={500} cy={716} rx={430} ry={10} opacity={0.4} />

      {/* the frame: two posts, a top and a bottom rail */}
      <Bar x={SX - 30} y={SY - 36} w={26} h={SH + 120} fill={`url(#${P}-m-metal)`} />
      <Bar x={SX + SW + 4} y={SY - 36} w={26} h={SH + 120} fill={`url(#${P}-m-metal)`} />
      <Bar x={SX - 30} y={SY - 36} w={SW + 60} h={26} fill={`url(#${P}-m-metal)`} />
      <Bar x={SX - 30} y={SY + SH + 10} w={SW + 60} h={24} fill={`url(#${P}-m-metal)`} />
      <rect x={SX - 26} y={SY - 36} width="18" height={SH + 120} fill={`url(#${P}-m-shade)`} opacity="0.5" />

      {/* the printed sheet, with print grain and the mesh of the fence behind the print */}
      <rect x={SX} y={SY} width={SW} height={SH} fill={`url(#${P}-m-board-sand)`} filter={`url(#${P}-m-paper-grain)`} />
      <g clipPath={`url(#${P}-sheet)`}>
        <rect x={SX} y={SY} width={SW} height={SH} fill={`url(#${P}-mesh)`} />
        <g clipPath={`url(#${P}-court)`}>
          <g transform={`translate(${SX + 440} ${SY})`}>
            <Court idp={`${P}-ct`} w={260} h={SH} lines={20} />
          </g>
        </g>
        <WordmarkG x={SX + 40} y={SY + 44} width={340} fill="#F5F0E3" />
        <text className="serif" fontSize="34" letterSpacing="-0.7" fill="#F5F0E3">
          {LINES.imagination.rows.map((t, i) => <tspan key={t} x={SX + 42} y={SY + SH - 96 + i * 38}>{t}</tspan>)}
        </text>
        <text className="sans" x={SX + 42} y={SY + SH - 24} fontSize="17" fill="#35241C">{URL_LINE}</text>
        <path d={`M${SX} ${SY}h${SW}v6h-${SW}z`} fill="#FFFFFF" opacity="0.3" />
        <path d={`M${SX} ${SY}h8v${SH}h-8z`} fill="#FFFFFF" opacity="0.18" />
        <SheenG idp={`${P}-m`} d={sheet} opacity={0.22} />
      </g>
      <Bolts xs={[SX + 14, SX + SW - 14, SX + SW / 2]} y={SY + 14} r={3.4} />
      <Bolts xs={[SX + 14, SX + SW - 14, SX + SW / 2]} y={SY + SH - 14} r={3.4} />

      {/* two concrete feet, with a top face and a lit side */}
      <BlockG x={SX - 36} y={668} w={150} h={50} d={24} front="#C9BFB0" top="#E2DACD" side="#A59D93" />
      <BlockG x={SX + SW - 114} y={668} w={150} h={50} d={24} front="#C9BFB0" top="#E2DACD" side="#A59D93" />
      <rect x={SX - 36} y={668} width="150" height="4" fill="#FFFFFF" opacity="0.4" />
      <rect x={SX + SW - 114} y={668} width="150" height="4" fill="#FFFFFF" opacity="0.4" />
    </Art>
  );
}
