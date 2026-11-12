// Grain: the fine paper grain on every surface of m01, m10 and m15. One comparison and four intensity levels.
import Art from '@/components/art/Art';
import { GrainFilter } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import { GRAIN_LEVELS } from './data';
import s from './gradients.module.css';

// Beige paper over Tribal Brown board, the two grounds the grain sits on in the flat lays.
function Grounds({ w, h, filter }) {
  return (
    <g filter={filter}>
      <rect width={w} height={h * 0.45} fill={HEX.beige} />
      <rect y={h * 0.45} width={w} height={h * 0.55} fill={HEX.tribal} />
    </g>
  );
}

function Comparison() {
  const P = 'gradients-grain-compare';
  return (
    <Art viewBox="0 0 480 420" title="Flat against grained, side by side" exportName="gradients-grain-compare" preserveAspectRatio="xMidYMid slice">
      <defs>
        <GrainFilter idp={P} amount={0.14} />
        <clipPath id={`${P}-l`}><rect width="240" height="420" /></clipPath>
        <clipPath id={`${P}-r`}><rect x="240" width="240" height="420" /></clipPath>
      </defs>
      <g clipPath={`url(#${P}-l)`}><Grounds w={480} h={420} /></g>
      <g clipPath={`url(#${P}-r)`}><Grounds w={480} h={420} filter={`url(#${P}-grain)`} /></g>
      <path d="M240 0V420" stroke={HEX.chocolate} strokeWidth="1" strokeOpacity="0.5" />
    </Art>
  );
}

function Level({ lv, i }) {
  const P = `gradients-grain-${lv.id}`;
  return (
    <Art viewBox="0 0 200 300" title={`Paper grain, ${lv.label.toLowerCase()}`} exportName={`gradients-grain-${lv.id}`} preserveAspectRatio="xMidYMid slice">
      <defs><GrainFilter idp={P} amount={lv.amount} seed={4 + i} /></defs>
      <Grounds w={200} h={300} filter={`url(#${P}-grain)`} />
    </Art>
  );
}

export default function Grain() {
  return (
    <>
      <Reveal className={`tile tile-flush span-4 rows-2 ${s.fill}`} style={{ '--ar': '480 / 420' }}>
        <div className={s.fillArt}><Comparison /></div>
        <p className={`t-small ${s.over}`}>Flat, then grained</p>
      </Reveal>
      {GRAIN_LEVELS.map((lv, i) => (
        <Reveal key={lv.id} delay={(i + 1) * 70} className={`tile tile-flush span-2 span-m-3 span-s-1 rows-2 ${s.fill}`} style={{ '--ar': '2 / 3' }}>
          <div className={s.fillArt}><Level lv={lv} i={i} /></div>
          <p className={`t-small ${s.over}`}>{lv.label}: {lv.note}</p>
        </Reveal>
      ))}
    </>
  );
}
