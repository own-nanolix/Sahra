// Reception signage with wayfinding: a counter in front of a wall that carries the word-mark in raised letters
// (thickness, a soft highlight on the upper left edges, a hard shadow to the lower right that lengthens), and
// wayfinding plaques at the right: the case study's own section words and plain facility words with icons.
import Art from '@/components/art/Art';
import { BackdropG, CounterG, WallRibsG, MaterialDefs, SheenG, CastG, CastRectG, ContactShadowG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkG } from '@/components/art/Mark';
import { IconUse } from '@/components/site/Icon';
import { Bolts } from './parts';

const P = 'use-world-rc';
const WX = 70, WY = 132, WW = 540;
// Plain wayfinding words only (the case study's web-page headings are not places in a building).
const SECTIONS = ['Lifts', 'Stairs', 'Lounge', 'Exit'];
const FACILITIES = [['key', 'Reception'], ['door', 'Meeting room'], ['car', 'Parking']];
const TURN = [0, -90, 180, 90]; // arrow right, up, left, down

function Letters({ x, y, fill, ...rest }) {
  return <WordmarkG x={x} y={y} width={WW} fill={fill} {...rest} />;
}

export default function Reception() {
  const sign = 'M680 96H950V332H680Z';
  return (
    <Art viewBox="0 0 1000 800" title="Reception with the raised word-mark on the wall, a counter and wayfinding plaques" exportName="use-world-reception">
      <MaterialDefs idp={`${P}-m`} />
      <defs>
        <clipPath id={`${P}-counter`}>
          <rect x={WX} y="458" width="520" height="168" />
        </clipPath>
        <linearGradient id={`${P}-wash`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6E8" stopOpacity="0.2" />
          <stop offset="0.5" stopColor="#FFF6E8" stopOpacity="0" />
          <stop offset="1" stopColor="#000000" stopOpacity="0.18" />
        </linearGradient>
      </defs>
      <BackdropG idp={`${P}-bd`} w={1000} h={800} horizon={0.72} wall={SCENE.tribal} floor={SCENE.chocolate} />
      <rect width="1000" height="576" fill={`url(#${P}-wash)`} />
      {/* wall panel joints and the skirting */}
      {[318, 656].map((x) => (
        <g key={x}>
          <rect x={x} y="0" width="4" height="576" fill={SHADOW_INK} opacity="0.35" />
          <rect x={x + 4} y="0" width="1.5" height="576" fill="#FFF6E8" opacity="0.22" />
        </g>
      ))}
      <rect y="560" width="1000" height="16" fill="#2B1D17" />
      <rect y="560" width="1000" height="2" fill="#FFFFFF" opacity="0.2" />

      {/* the raised word-mark: a hard shadow that lengthens, then thickness, the lit edge and the face */}
      <g className="sun-shadow">
        <WordmarkG x={WX + 26} y={WY + 24} width={WW} fill={SHADOW_INK} opacity="0.34" />
      </g>
      {[5, 4, 3, 2, 1].map((i) => <Letters key={i} x={WX + i * 1.1} y={WY + i * 1.1} fill="#7C5B3F" />)}
      <Letters x={WX - 1.8} y={WY - 1.8} fill="#F1DDC3" opacity="0.9" />
      <Letters x={WX} y={WY} fill="url(#use-world-rc-m-board-sand)" filter="url(#use-world-rc-m-fibre)" />
      <Letters x={WX} y={WY} fill="url(#use-world-rc-m-shade)" opacity="0.5" />

      {/* the counter, with a ribbed front and a beige top */}
      <CastRectG x={WX} y={618} w={520} h={10} len={46} opacity={0.3} />
      <ContactShadowG idp={`${P}-s1`} cx={330} cy={628} rx={290} ry={9} />
      <CounterG x={WX} y={440} w={520} h={190} slab={18} top={SCENE.beige} front={SCENE.sand} plinth={14} />
      <g clipPath={`url(#${P}-counter)`} opacity="0.55">
        <WallRibsG x={WX} y="458" w={520} h={168} pitch={26} rib={11} fill="none" />
      </g>
      <rect x={WX - 6} y="440" width="532" height="3" fill="#FFFFFF" opacity="0.7" />
      {/* a bell and a pen stand on the top */}
      <ContactShadowG idp={`${P}-s2`} cx={420} cy={440} rx={26} ry={4} />
      <path d="M396 440a24 24 0 0 1 48 0z" fill={`url(#${P}-m-ceramic)`} />
      <rect x="415" y="410" width="10" height="6" rx="2" fill={`url(#${P}-m-metal)`} />
      <rect x="150" y="414" width="26" height="26" rx="4" fill="url(#use-world-rc-m-board-dark)" />
      <rect x="156" y="388" width="3" height="28" fill="#1E140F" transform="rotate(-6 157 416)" />
      <rect x="164" y="384" width="3" height="32" fill="#875D41" transform="rotate(5 165 416)" />

      {/* the directional plaque: dark board, standoff bolts, a lit sheen, one row per section word */}
      <CastG d={sign} len={16} opacity={0.3} />
      <rect x="680" y="96" width="270" height="236" rx="10" fill={`url(#${P}-m-board-dark)`} filter={`url(#${P}-m-fibre)`} />
      <rect x="680" y="96" width="270" height="3" fill="#FFFFFF" opacity="0.2" />
      {SECTIONS.map((t, i) => {
        const y = 104 + i * 56;
        return (
          <g key={t}>
            {i > 0 && <rect x="700" y={y - 4} width="230" height="1" fill="#B58F6B" opacity="0.4" />}
            <g transform={`rotate(${TURN[i]} 725 ${y + 26})`}>
              <IconUse name="arrow-right" x={711} y={y + 12} size={28} color="#B58F6B" />
            </g>
            <text className="sans" x="760" y={y + 34} fontSize="23" fill="#F5F0E3">{t}</text>
          </g>
        );
      })}
      <Bolts xs={[694, 936]} y={110} r={3.4} />
      <Bolts xs={[694, 936]} y={318} r={3.4} />
      <SheenG idp={`${P}-m`} d={sign} opacity={0.25} />

      {/* the facility plaques: beige card, tribal-brown icon and plain word */}
      <CastG d="M680 352H950V556H680Z" len={14} opacity={0.3} />
      {FACILITIES.map(([icon, word], i) => {
        const y = 352 + i * 70;
        return (
          <g key={word}>
            <rect x="680" y={y} width="270" height="62" rx="10" fill={`url(#${P}-m-card)`} filter={`url(#${P}-m-paper-grain)`} />
            <rect x="680" y={y} width="270" height="2.5" rx="1" fill="#FFFFFF" opacity="0.9" />
            <rect x="692" y={y + 11} width="40" height="40" rx="9" fill="#875D41" />
            <IconUse name={icon} x={698} y={y + 17} size={28} color="#F5F0E3" />
            <text className="sans" x="748" y={y + 39} fontSize="22" fill="#35241C">{word}</text>
            <IconUse name="arrow-right" x={914} y={y + 17} size={28} color="#875D41" />
          </g>
        );
      })}
      <ContactShadowG idp={`${P}-s3`} cx={815} cy={576} rx={150} ry={4} opacity={0.2} />
    </Art>
  );
}
