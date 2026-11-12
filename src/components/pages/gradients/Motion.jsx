// Four looping motion studies. The keyframes live inside each SVG (a <style> element), so an exported file moves
// on its own; every one plays from a start state towards the base style, so with animation off it is complete.
// Slow and exact: no bounce. The animated class always sits on an inner <g>, never on an element with a transform.
import Art from '@/components/art/Art';
import { BrandDefs, PHOTO, quarterArch } from '@/components/art/KeyArt';
import { WordmarkDebossG, MarkG } from '@/components/art/Mark';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import GradDef from './GradDef';
import { byId } from './data';
import s from './gradients.module.css';

const SLOW = 'cubic-bezier(0.45, 0, 0.55, 1)'; // --ease-sun, written out because an exported file has no tokens
const still = (names) => `@media (prefers-reduced-motion: reduce) { ${names} { animation: none; } }`;

// 1. A wide gradient drifting behind a fixed frame and a fixed quarter arch.
function Drift() {
  const P = 'gradients-mo-drift';
  const g = { id: 'run', v: [0, 0, 1, 0], stops: [[0, HEX.chocolate], [0.45, HEX.tribal], [1, HEX.sand]] };
  return (
    <Art viewBox="0 0 400 400" title="Gradient drifting behind a quarter arch" exportName="gradients-motion-drift" preserveAspectRatio="xMidYMid slice">
      <style>{`.${P}-run { animation: ${P}-k 9s ${SLOW} infinite alternate both; }
@keyframes ${P}-k { from { transform: translateX(-640px); } to { transform: translateX(0); } }
${still(`.${P}-run`)}`}</style>
      <defs>
        <GradDef idp={P} g={g} />
        <clipPath id={`${P}-clip`}><rect width="400" height="400" rx="22" /></clipPath>
        <linearGradient id={`${P}-arch`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={HEX.beige} stopOpacity="0.9" />
          <stop offset="1" stopColor={HEX.beige} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <g clipPath={`url(#${P}-clip)`}>
        <g className={`${P}-run`}><rect width="1040" height="400" fill={`url(#${P}-run)`} /></g>
        <path d={quarterArch(240, 400, 70, 190, 'tl')} fill={`url(#${P}-arch)`} />
      </g>
    </Art>
  );
}

// 2. A shadow lengthening across a wall like sun on a wall: it grows from the foot of the slab and stops.
function Sun() {
  const P = 'gradients-mo-sun';
  return (
    <Art viewBox="0 0 400 400" title="Shadow lengthening across a wall" exportName="gradients-motion-shadow" preserveAspectRatio="xMidYMid slice">
      <style>{`.${P}-cast { transform-box: fill-box; transform-origin: 0 100%; animation: ${P}-k 8s ${SLOW} infinite alternate both; }
@keyframes ${P}-k { from { transform: scaleX(0.25); opacity: 0.6; } to { transform: none; opacity: 1; } }
${still(`.${P}-cast`)}`}</style>
      <BrandDefs idp={P} grain={0.07} />
      <clipPath id={`${P}-clip`}><rect width="400" height="400" rx="22" /></clipPath>
      <g clipPath={`url(#${P}-clip)`}>
        <rect width="400" height="400" fill={`url(#${P}-wall)`} filter={`url(#${P}-grain)`} />
        <rect y="330" width="400" height="70" fill={HEX.chocolate} />
        <g className={`${P}-cast`}><path d="M150 330V120L350 190V330Z" fill={HEX.chocolate} opacity="0.78" /></g>
        <rect x="90" y="120" width="60" height="210" fill={HEX.beige} />
        <rect x="90" y="120" width="12" height="210" fill="#FFFFFF" opacity="0.4" />
      </g>
    </Art>
  );
}

// 3. The quarter arch filling: a thick quarter ring drawn on along its own curve, then holding.
function Fill() {
  const P = 'gradients-mo-fill';
  const rm = 145, cx = 250, cy = 330, L = r2((Math.PI / 2) * rm);
  const d = `M${cx - rm} ${cy}A${rm} ${rm} 0 0 1 ${cx} ${cy - rm}`;
  return (
    <Art viewBox="0 0 400 400" title="Quarter arch filling along its curve" exportName="gradients-motion-arch-fill" preserveAspectRatio="xMidYMid slice">
      <style>{`.${P}-ring { stroke-dasharray: ${L}; animation: ${P}-k 7s ${SLOW} infinite alternate both; }
@keyframes ${P}-k { 0% { stroke-dashoffset: ${L}; } 70%, 100% { stroke-dashoffset: 0; } }
${still(`.${P}-ring`)}`}</style>
      <defs>
        <linearGradient id={`${P}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={HEX.beige} />
          <stop offset="1" stopColor={HEX.sand} />
        </linearGradient>
        <clipPath id={`${P}-clip`}><rect width="400" height="400" rx="22" /></clipPath>
      </defs>
      <g clipPath={`url(#${P}-clip)`}>
        <rect width="400" height="400" fill={HEX.tribal} />
        <path d={quarterArch(cx, cy, rm - 50, rm + 50, 'tl')} fill="none" stroke={HEX.beige} strokeOpacity="0.28" strokeWidth="1" />
        <path className={`${P}-ring`} d={d} fill="none" stroke={`url(#${P}-g)`} strokeWidth="100" />
      </g>
    </Art>
  );
}

// 4. A band of light sweeping across a blind-debossed word-mark on board.
function Light() {
  const P = 'gradients-mo-light';
  return (
    <Art viewBox="0 0 400 400" title="Light sweeping across a debossed word-mark" exportName="gradients-motion-light" preserveAspectRatio="xMidYMid slice">
      <style>{`.${P}-band { animation: ${P}-k 8s ${SLOW} infinite alternate both; }
@keyframes ${P}-k { from { transform: translateX(-380px); } to { transform: translateX(0); } }
${still(`.${P}-band`)}`}</style>
      <BrandDefs idp={P} grain={0.1} />
      <defs>
        <linearGradient id={`${P}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={PHOTO.wall} stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFF6E8" stopOpacity="0.34" />
          <stop offset="1" stopColor={PHOTO.wall} stopOpacity="0" />
        </linearGradient>
        <clipPath id={`${P}-clip`}><rect width="400" height="400" rx="22" /></clipPath>
      </defs>
      <g clipPath={`url(#${P}-clip)`}>
        <rect width="400" height="400" fill={HEX.tribal} filter={`url(#${P}-grain)`} />
        <WordmarkDebossG idp={`${P}-d`} x={44} y={174} width={312} depth={3} tone="#946A4D" />
        <MarkG x={44} y={44} size={44} fill="#946A4D" opacity="0.7" />
        <g className={`${P}-band`}><path d="M170 0H300L200 400H70Z" fill={`url(#${P}-sheen)`} /></g>
      </g>
    </Art>
  );
}

const STUDIES = [
  { C: Drift, label: 'Drift: a wide gradient slides behind the arch' },
  { C: Sun, label: 'Shadow: it lengthens from the foot of the slab and stops' },
  { C: Fill, label: 'Fill: the quarter arch draws on along its curve' },
  { C: Light, label: 'Light: a band crosses the debossed word-mark' },
];

export default function Motion() {
  return (
    <>
      {STUDIES.map(({ C, label }, i) => (
        <Reveal key={label} delay={i * 70} className={`tile tile-flush span-3 span-m-3 span-s-1 rows-2 ${s.fill}`} style={{ '--ar': '1 / 1' }}>
          <div className={s.fillArt}><C /></div>
          <p className={`t-small ${s.over}`}>{label}</p>
        </Reveal>
      ))}
    </>
  );
}
