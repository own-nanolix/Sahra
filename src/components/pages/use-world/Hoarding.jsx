// The hoarding (m16) on a street with a kerb, front view. Left two thirds an abstract timber court cut by a
// large rounded corner, the beige word-mark and the brand line on it; the right third beige with the line, the
// sub line and the tribal-brown button. Measured from m16: the split at 57 %, the corner radius 60 of 528.
import Art from '@/components/art/Art';
import { BackdropG, StreetG, MaterialDefs, SheenG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { cornerCut } from '@/components/art/KeyArt';
import { WordmarkG } from '@/components/art/Mark';
import { HOARDING } from '@/lib/brand';
import { Court, Bolts, Bar, INK } from './parts';

const P = 'use-world-hd';
const TOP = 190, H = 528, SPLIT = 915, W = 1600, RAD = 62;

export default function Hoarding() {
  const board = cornerCut(0, 0, SPLIT, H, RAD, 'br');
  const seams = [470, 1200];
  return (
    <Art viewBox="0 0 1600 1000" title="Street hoarding with the Sahra court and the line Refined living spaces designed for comfort and simplicity" exportName="use-world-hoarding">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <clipPath id={`${P}-sheet`}>
          <rect width={W} height={H} />
        </clipPath>
        <linearGradient id={`${P}-rail`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4A3D36" />
          <stop offset="0.5" stopColor="#2A1F19" />
          <stop offset="1" stopColor="#120C09" />
        </linearGradient>
        <linearGradient id={`${P}-fall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={SHADOW_INK} stopOpacity="0.38" />
          <stop offset="1" stopColor={SHADOW_INK} stopOpacity="0" />
        </linearGradient>
      </defs>
      <BackdropG idp={`${P}-bd`} w={W} h={1000} horizon={0.745} wall={SCENE.tribal40} floor={SCENE.sand20} line={false} />
      {/* a pale tower of simple blocks behind the hoarding, the minimum of city */}
      <g opacity="0.5">
        <rect x="150" y="48" width="170" height="142" fill={SCENE.tribal20} />
        <rect x="320" y="92" width="120" height="98" fill={SCENE.sand40} />
        <rect x="1130" y="36" width="210" height="154" fill={SCENE.tribal20} />
        <rect x="1340" y="86" width="140" height="104" fill={SCENE.sand40} />
      </g>
      <StreetG y={745} w={W} h={1000} kerb={18} pavement={SCENE.sand20} road="#BFAE9F" slab={260} />
      <rect y="745" width={W} height="34" fill={`url(#${P}-fall)`} />
      <ContactShadowG idp={`${P}-s`} cx={800} cy={749} rx={790} ry={6} opacity="0.4" blur="4" />

      {/* the plinth and the top rail of the hoarding, with depth */}
      <g>
        <Bar x={0} y={718} w={W} h={30} fill={`url(#${P}-rail)`} hi={0.22} />
        <Bar x={0} y={170} w={W} h={22} fill={`url(#${P}-rail)`} hi={0.4} />
        <Bolts xs={Array.from({ length: 20 }, (_, i) => 40 + i * 80)} y={181} r={2.6} />
        {seams.map((x) => <rect key={x} x={x - 6} y="170" width="12" height="578" fill="#1A120D" opacity="0.88" />)}
      </g>

      <g transform={`translate(0 ${TOP})`}>
        {/* the beige sheet, the whole width, with print grain */}
        <rect width={W} height={H} fill={`url(#${P}-m-card)`} filter={`url(#${P}-m-paper-grain)`} />
        <g clipPath={`url(#${P}-sheet)`}>
          <path d="M1190 0H1420L1600 140V260L1330 0Z" fill="#FFFFFF" opacity="0.16" />
          <path d="M1260 0H1600V90Z" fill={SHADOW_INK} opacity="0.05" />
        </g>
        {/* the court, cut by the large rounded corner */}
        <g clipPath={`url(#${P}-court)`}>
          <Court idp={`${P}-ct`} w={SPLIT} h={H} />
        </g>
        <clipPath id={`${P}-court`}>
          <path d={board} />
        </clipPath>
        <path d={board} fill="none" stroke="#000000" strokeOpacity="0.28" strokeWidth="1.5" />

        {/* beige word-mark top left, the brand line bottom left */}
        <WordmarkG x={50} y={46} width={285} fill="#F5F0E3" opacity="0.94" />
        <text className="serif" fontSize="38" letterSpacing="-0.8" fill="#F5F0E3" opacity="0.92">
          {HOARDING.photoLine.rows.map((t, i) => <tspan key={t} x="52" y={440 + i * 42}>{t}</tspan>)}
        </text>

        {/* the right third */}
        <text className="serif" fontSize="52" letterSpacing="-1.3" fill={INK}>
          {HOARDING.line.rows.map((t, i) => <tspan key={t} x="968" y={80 + i * 53}>{t}</tspan>)}
        </text>
        <text className="sans" fontSize="24" letterSpacing="-0.4" fill="#5C4A3E">
          {HOARDING.sub.rows.map((t, i) => <tspan key={t} x="968" y={250 + i * 32}>{t}</tspan>)}
        </text>
        <rect x="968" y="447" width="139" height="42" rx="14" fill="url(#use-world-hd-m-board)" />
        <rect x="968" y="447" width="139" height="3" rx="1.5" fill="#FFFFFF" opacity="0.28" />
        <text className="sans" x="987" y="474" fontSize="20" fill="#F5F0E3">{HOARDING.button}</text>

        {/* the panel seams and a slow sheen over the print */}
        {seams.map((x) => <path key={x} d={`M${x} 0V${H}`} stroke="#000000" strokeOpacity="0.18" strokeWidth="1.2" />)}
        <SheenG idp={`${P}-m`} d={`M0 0H${W}V${H}H0Z`} opacity={0.3} />
      </g>

      {/* the hard shadow of the top rail lengthens down the sheet */}
      <g className="sun-shadow">
        <path d={`M0 192H${W}L${W - 26} 208H-26Z`} fill={SHADOW_INK} opacity="0.2" />
      </g>
    </Art>
  );
}
