// A vehicle wrap: a neutral, generic panel van seen from the side, on a street with a kerb in front. Dark Chocolate
// body, the sand word-mark large along the side, the quarter arch wrapping over the rear wheel arch, and the brand
// line and "→ sahra.sa" on the rear panel. Wheels with rims, door seams, a sliding-door rail, windows with a sheen.
import Art from '@/components/art/Art';
import { BackdropG, WallRibsG, MaterialDefs, SheenG, CastRectG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { quarterArch } from '@/components/art/KeyArt';
import { WordmarkG } from '@/components/art/Mark';
import { LINES, URL_LINE } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const P = 'use-world-vn';
const BODY = 'M104 530V446Q104 412 138 404L258 378L366 200Q374 188 396 188H1098Q1150 188 1150 240V556Q1150 566 1140 566H114Q104 566 104 556Z';
const WHEELS = [270, 960];
const CY = 574;

function Wheel({ cx }) {
  const spokes = Array.from({ length: 10 }, (_, i) => (i * 360) / 10);
  return (
    <g>
      <circle cx={cx + 6} cy={CY + 5} r="64" fill={SHADOW_INK} opacity="0.35" />
      <circle cx={cx} cy={CY} r="64" fill={`url(#${P}-m-rubber)`} />
      <circle cx={cx} cy={CY} r="64" fill="none" stroke="#000000" strokeOpacity="0.5" strokeWidth="3" />
      <circle cx={cx} cy={CY} r="52" fill="none" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="2" />
      <circle cx={cx} cy={CY} r="41" fill="#1E1410" />
      <circle cx={cx} cy={CY} r="38" fill={`url(#${P}-m-metal)`} />
      {spokes.map((a) => (
        <rect key={a} x={cx - 4} y={CY - 38} width="8" height="26" fill="#2A1F19" opacity="0.7" transform={`rotate(${a} ${cx} ${CY})`} />
      ))}
      <circle cx={cx} cy={CY} r="15" fill={`url(#${P}-m-metal-dark)`} />
      <circle cx={cx - 4} cy={CY - 4} r="5" fill="#FFFFFF" opacity="0.45" />
      {[0, 72, 144, 216, 288].map((a) => {
        const rad = (a * Math.PI) / 180;
        return <circle key={a} cx={r2(cx + Math.cos(rad) * 24)} cy={r2(CY + Math.sin(rad) * 24)} r="2.6" fill="#1E140F" />;
      })}
      <path d={`M${cx - 38} ${CY - 6}A38 38 0 0 1 ${cx + 6} ${CY - 38}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="3" />
    </g>
  );
}

export default function Van() {
  const lines = LINES.imagination.rows;
  const archBand = `${quarterArch(960, CY, 84, 152, 'tl')} ${quarterArch(960, CY, 84, 152, 'tr')}`;
  const cabWindow = 'M268 372L372 206H520V372Z';
  return (
    <Art viewBox="0 0 1400 800" title="Delivery van wrapped in the Sahra word-mark, the quarter arch and the brand line, side view on a street" exportName="use-world-van">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <clipPath id={`${P}-body`}>
          <path d={BODY} />
        </clipPath>
        <clipPath id={`${P}-cab`}>
          <path d={cabWindow} />
        </clipPath>
        <linearGradient id={`${P}-roof`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF6E8" stopOpacity="0.26" />
          <stop offset="0.16" stopColor="#FFF6E8" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000000" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${P}-win`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5B6A73" />
          <stop offset="0.5" stopColor="#25201D" />
          <stop offset="1" stopColor="#0E0A08" />
        </linearGradient>
      </defs>
      <BackdropG idp={`${P}-bd`} w={1400} h={800} horizon={0.7} wall={SCENE.sand} floor={SCENE.tribal40} />
      <WallRibsG x={0} y={0} w={1400} h={560} pitch={46} rib={20} fill="#B58F6B" opacity="0.7" />
      <rect y="0" width="1400" height="560" fill="#000000" opacity="0.06" />

      {/* hard shadow and contact shadow on the road */}
      <g className="sun-shadow">
        <CastRectG x={110} y={620} w={1040} h={14} len={34} opacity={0.2} />
      </g>
      <ContactShadowG idp={`${P}-s1`} cx={630} cy={640} rx={540} ry={9} opacity={0.45} />

      {/* the body, then the wrap clipped to it */}
      <path d={BODY} fill={`url(#${P}-m-board-dark)`} />
      <g clipPath={`url(#${P}-body)`}>
        <rect x="100" y="180" width="1060" height="400" fill="#35241C" />
        <path d={archBand} fill="#B58F6B" />
        <path d={archBand} fill={`url(#${P}-m-shade)`} opacity="0.35" />
        <WordmarkG x={548} y={236} width={560} fill="#B58F6B" />
        <WordmarkG x={548} y={236} width={560} fill={`url(#${P}-m-shade)`} opacity="0.3" />
        {/* door seams, the sliding-door rail and handles */}
        {[286, 528, 904].map((x) => (
          <g key={x}>
            <rect x={x} y="214" width="2.5" height="348" fill="#000000" opacity="0.65" />
            <rect x={x + 2.5} y="214" width="1.2" height="348" fill="#FFFFFF" opacity="0.14" />
          </g>
        ))}
        <rect x="528" y="448" width="590" height="9" fill="#120C09" />
        <rect x="528" y="448" width="590" height="2" fill="#FFFFFF" opacity="0.22" />
        <rect x="528" y="474" width="590" height="2" fill="#000000" opacity="0.4" />
        {[[492, 440], [1040, 412]].map(([x, y]) => (
          <g key={x}>
            <rect x={x} y={y} width="40" height="9" rx="4" fill="#120C09" />
            <rect x={x} y={y} width="40" height="2.5" rx="1" fill="#FFFFFF" opacity="0.35" />
          </g>
        ))}
        <path d="M104 536H1150V566H104Z" fill="#120C09" opacity="0.7" />
        <rect x="100" y="180" width="1060" height="400" fill={`url(#${P}-roof)`} />
        <path d="M104 404L258 378L366 200" fill="none" stroke="#FFFFFF" strokeOpacity="0.3" strokeWidth="2" />
        <path d="M396 189.5H1098" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2.4" />
        {/* the wheel arches */}
        {WHEELS.map((cx) => <circle key={cx} cx={cx} cy={CY} r="78" fill="#0E0A08" />)}
        {WHEELS.map((cx) => <circle key={`l${cx}`} cx={cx} cy={CY} r="80" fill="none" stroke="#FFFFFF" strokeOpacity="0.12" strokeWidth="2" />)}
        {/* a lamp at the front, a lamp at the rear edge */}
        <path d="M104 428Q104 414 126 410L158 406V452H104Z" fill="#E1D2C4" />
        <path d="M104 428Q104 414 126 410L158 406V430H104Z" fill="#FFFFFF" opacity="0.5" />
        <rect x="1136" y="262" width="14" height="86" fill="#875D41" />
        <rect x="1136" y="262" width="5" height="86" fill="#FFFFFF" opacity="0.4" />
      </g>

      {/* the cab window with a sheen, the mirror */}
      <path d={cabWindow} fill={`url(#${P}-win)`} />
      <g clipPath={`url(#${P}-cab)`}>
        <path d="M300 372L392 206H430L338 372Z" fill="#FFFFFF" opacity="0.16" />
        <SheenG idp={`${P}-m`} d={cabWindow} opacity={0.35} />
      </g>
      <path d={cabWindow} fill="none" stroke="#120C09" strokeWidth="6" />
      <rect x="246" y="316" width="22" height="44" rx="6" fill="#120C09" />
      <rect x="246" y="316" width="22" height="5" rx="2" fill="#FFFFFF" opacity="0.3" />

      {/* the rear panel: a slightly turned face with two windows, the brand line and the web address */}
      <g transform="translate(1150 188) skewY(5.9)">
        <rect width="172" height="378" fill={`url(#${P}-m-board-dark)`} />
        <rect width="172" height="378" fill="#35241C" opacity="0.5" />
        <rect x="14" y="26" width="66" height="96" rx="6" fill={`url(#${P}-win)`} />
        <rect x="92" y="26" width="66" height="96" rx="6" fill={`url(#${P}-win)`} />
        <path d="M30 122L52 26H66L44 122Z" fill="#FFFFFF" opacity="0.14" />
        <rect x="85" y="140" width="2.5" height="236" fill="#000000" opacity="0.65" />
        <rect x="76" y="226" width="7" height="26" rx="3" fill="#120C09" />
        <text className="serif" fontSize="19" letterSpacing="-0.4" fill="#B58F6B">
          {lines.map((t, i) => <tspan key={t} x="16" y={176 + i * 22}>{t}</tspan>)}
        </text>
        <rect x="16" y="292" width="92" height="28" rx="8" fill="#875D41" />
        <text className="sans" x="28" y="311" fontSize="14" fill="#F5F0E3">{URL_LINE}</text>
        <rect x="0" y="336" width="172" height="42" fill="#120C09" opacity="0.75" />
        <rect x="160" y="62" width="12" height="76" fill="#875D41" />
        <rect x="0" y="0" width="3" height="378" fill="#FFFFFF" opacity="0.18" />
      </g>

      {/* the wheels, over the arches */}
      {WHEELS.map((cx) => <Wheel key={cx} cx={cx} />)}

      {/* the kerb in front, then the pavement */}
      <rect y="706" width="1400" height="16" fill="#FFFFFF" opacity="0.75" />
      <rect y="722" width="1400" height="30" fill={SCENE.sand40} />
      <rect y="722" width="1400" height="4" fill={SHADOW_INK} opacity="0.3" />
      <rect y="752" width="1400" height="48" fill={SCENE.sand20} />
      {[120, 480, 840, 1200].map((x) => <rect key={x} x={x} y="752" width="2" height="48" fill={SHADOW_INK} opacity="0.12" />)}
    </Art>
  );
}
