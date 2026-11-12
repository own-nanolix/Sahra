// A citylight and two roll-up banners on a pavement, front view. The citylight carries the poster of m14 in a
// dark frame with a glass front; the two roll-ups carry the two posters of m11, simplified.
import Art from '@/components/art/Art';
import { BackdropG, StreetG, MaterialDefs, SheenG, CastG, CastRectG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { BrandDefs, CurvedWallG, BrickCurveG } from '@/components/art/KeyArt';
import { MarkG } from '@/components/art/Mark';
import { LINES, CONTACT_BLOCKS } from '@/lib/brand';
import { PosterElevate, Bar, Bolts, INK } from './parts';

const P = 'use-world-cl';
const FEET = 756;

function Contacts({ x, y, fill, size = 8 }) {
  const blocks = [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];
  return (
    <text className="sans" fontSize={size} fill={fill}>
      {blocks.map((b, bi) => b.map((t, i) => <tspan key={t} x={x} y={y + bi * (size + 3) * 3.2 + i * (size + 3)}>{t}</tspan>))}
    </text>
  );
}

// One roll-up: printed vinyl in a cassette base with end caps, a hanging bar at the top.
function RollUp({ idp, x, y, w, h, dark }) {
  const rows = dark ? LINES.imagination.rows : LINES.builtAround.rows;
  const fs = w * 0.115;
  return (
    <g>
      <clipPath id={`${idp}-vinyl`}>
        <rect x={x} y={y} width={w} height={h} />
      </clipPath>
      <g clipPath={`url(#${idp}-vinyl)`}>
        <BrandDefs idp={`${idp}-b`} />
        {dark ? (
          <>
            <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-b-dusk)`} />
            <CurvedWallG idp={`${idp}-w`} x={x} y={y + h * 0.1} w={w} h={h * 0.5} skyline={0.3} />
            <MarkG x={x + 18} y={y + h - 62} size={30} fill="#B58F6B" />
            <Contacts x={x + w * 0.5} y={y + h - 104} fill="#E1D2C4" size={w * 0.04} />
          </>
        ) : (
          <>
            <rect x={x} y={y} width={w} height={h} fill="#EFE6D3" />
            <BrickCurveG idp={`${idp}-k`} x={x + w * 0.56} y={y + h * 0.26} w={w * 0.36} h={h * 0.5} courses={22} />
            <Contacts x={x + 18} y={y + h - 104} fill="#5C4A3E" size={w * 0.04} />
          </>
        )}
        <text className="serif" fontSize={fs} letterSpacing="-0.4" fill={dark ? '#F5F0E3' : INK}>
          {rows.map((t, i) => <tspan key={t} x={x + 18} y={y + 34 + i * fs * 1.08}>{t}</tspan>)}
        </text>
        <rect x={x} y={y} width={w} height={h} fill={`url(#${P}-m-shade)`} opacity="0.5" />
        <rect x={x} y={y} width="7" height={h} fill="#FFFFFF" opacity="0.14" />
      </g>
      {/* hanging bar and the cassette base */}
      <Bar x={x - 3} y={y - 10} w={w + 6} h={10} fill={`url(#${P}-m-metal)`} />
      <rect x={x + w * 0.46} y={y - 22} width="10" height="12" fill={`url(#${P}-m-metal)`} />
      <rect x={x - 14} y={y + h} width={w + 28} height="40" rx="8" fill={`url(#${P}-m-metal)`} />
      <rect x={x - 14} y={y + h} width={w + 28} height="40" rx="8" fill={`url(#${P}-m-shade-v)`} />
      <rect x={x - 6} y={y + h + 6} width={w + 12} height="3" fill="#FFFFFF" opacity="0.6" />
      <Bolts xs={[x + 4, x + w - 4]} y={y + h + 28} r={3} />
      <rect x={x + w * 0.3} y={y + h + 40} width="20" height="5" fill="#2A1F19" />
      <rect x={x + w * 0.7} y={y + h + 40} width="20" height="5" fill="#2A1F19" />
    </g>
  );
}

export default function Citylight() {
  const fx = 128, fy = 64, fw = 470, fh = 640; // outer frame
  const pad = 38;
  const frame = `M${fx} ${fy}H${fx + fw}V${fy + fh}H${fx}Z`;
  return (
    <Art viewBox="0 0 1400 900" title="Citylight with the poster Spaces that elevate everyday living with intention and two roll-up banners on a pavement" exportName="use-world-citylight">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <clipPath id={`${P}-glass`}>
          <rect x={fx + pad} y={fy + pad} width={fw - pad * 2} height={fh - pad * 2 - 6} />
        </clipPath>
        <linearGradient id={`${P}-glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6E8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFF6E8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <BackdropG idp={`${P}-bd`} w={1400} h={900} horizon={0.78} wall={SCENE.beige} floor={SCENE.sand40} line={false} />
      <rect y="640" width="1400" height="62" fill={SCENE.sand20} />
      <StreetG y={700} w={1400} h={900} kerb={14} pavement={SCENE.sand40} road={SCENE.tribal40} slab={230} />
      <rect y="700" width="1400" height="2" fill={SHADOW_INK} opacity="0.1" />

      {/* hard shadows on the wall, to the lower right */}
      <CastG d={frame} len={34} opacity={0.14} />
      <CastRectG x={830} y={240} w={190} h={480} len={30} opacity={0.14} />
      <CastRectG x={1100} y={240} w={190} h={480} len={30} opacity={0.14} />

      {/* the citylight: stand, feet, frame, glass */}
      <ContactShadowG idp={`${P}-s1`} cx={363} cy={FEET + 2} rx={230} ry={10} />
      <g>
        <Bar x={176} y={fy + fh} w={26} h={FEET - fy - fh} fill={`url(#${P}-m-metal-dark)`} />
        <Bar x={524} y={fy + fh} w={26} h={FEET - fy - fh} fill={`url(#${P}-m-metal-dark)`} />
        <rect x={158} y={FEET - 12} width="62" height="12" fill={`url(#${P}-m-metal-dark)`} />
        <rect x={506} y={FEET - 12} width="62" height="12" fill={`url(#${P}-m-metal-dark)`} />
        <path d={`M${fx + fw} ${fy}l18 10v${fh}l-18 -10z`} fill="#140E0B" />
        <path d={`M${fx} ${fy}l18 -10h${fw}l-18 10z`} fill="#4A3D36" />
        <rect x={fx} y={fy} width={fw} height={fh} fill={`url(#${P}-m-metal-dark)`} />
        <rect x={fx + 4} y={fy + 4} width={fw - 8} height="3" fill="#FFFFFF" opacity="0.32" />
        <rect x={fx + 4} y={fy + 4} width="3" height={fh - 8} fill="#FFFFFF" opacity="0.22" />
        <rect x={fx + fw - 8} y={fy + 4} width="4" height={fh - 8} fill="#000000" opacity="0.4" />
        <rect x={fx + pad - 5} y={fy + pad - 5} width={fw - pad * 2 + 10} height={fh - pad * 2 + 4} fill="#0E0906" />
        <Bolts xs={[fx + 14, fx + fw - 14]} y={fy + 14} r={3.4} />
        <Bolts xs={[fx + 14, fx + fw - 14]} y={fy + fh - 14} r={3.4} />
      </g>
      <g clipPath={`url(#${P}-glass)`}>
        <PosterElevate idp={`${P}-pe`} x={fx + pad} y={fy + pad} w={fw - pad * 2} h={fh - pad * 2 - 6} />
        {/* the frame throws a hard shadow on the glass at upper left */}
        <path d={`M${fx + pad} ${fy + pad}h${fw}l-10 12h-${fw}v${fh}l-12 -12z`} fill={SHADOW_INK} opacity="0.2" />
        <rect x={fx + pad} y={fy + pad} width={fw - pad * 2} height="150" fill={`url(#${P}-glow)`} opacity="0.35" />
        <SheenG idp={`${P}-m`} d={`M${fx + pad} ${fy + pad}h${fw - pad * 2}v${fh - pad * 2}h-${fw - pad * 2}z`} opacity={0.3} />
      </g>

      {/* the two roll-ups */}
      <ContactShadowG idp={`${P}-s2`} cx={925} cy={FEET + 2} rx={120} ry={7} />
      <ContactShadowG idp={`${P}-s3`} cx={1195} cy={FEET + 2} rx={120} ry={7} />
      <RollUp idp={`${P}-r1`} x={830} y={240} w={190} h={480} dark />
      <RollUp idp={`${P}-r2`} x={1100} y={240} w={190} h={480} />
    </Art>
  );
}
