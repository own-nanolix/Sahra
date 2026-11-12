import Art from '@/components/art/Art';
import { QuarterArchG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { SCOPE, SHEET, HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './lp-philosophy.module.css';

// The four scope steps of the project sheet (m02) as four panels, each with a quarter arch one ring thicker than
// the one before: the arch grows from a thin line to a full band as the scope widens.
const PANEL = 400;

export default function Scope() {
  const label = SHEET[0][0];
  return (
    <section className={s.scope} id="lp-philosophy-scope" aria-labelledby="lp-philosophy-scope-title">
      <div className="wrap">
        <Reveal className={s.scopeHead}>
          <h2 id="lp-philosophy-scope-title" className="t-label">{label}</h2>
          <p className={`t-small ${s.scopeNote}`}>{SHEET[0][1]}</p>
        </Reveal>
        <Art viewBox="0 0 1600 420" title="Four scope steps, each with a thicker quarter arch" exportName="lp-philosophy-scope" className={s.scopeSvg}>
          {SCOPE.map((name, i) => {
            const x = i * PANEL;
            const w = 10 + i * 20;
            return (
              <g key={name}>
                <rect x={x + 6} y="6" width={PANEL - 12} height="320" fill={i % 2 ? HEX.beige : HEX.white} stroke={HEX.tribal} strokeOpacity="0.25" />
                <g className="fade-in" style={{ '--i': i * 3 }}>
                  <QuarterArchG cx={x + PANEL - 6} cy={326} r={r2(150 - w)} R={150} quadrant="tl" fill={i % 2 ? HEX.tribal : HEX.sand} />
                </g>
                <text x={x + 24} y="370" fontSize="13" className="sans" fill={HEX.muted}>{`0${i + 1}`}</text>
                <text x={x + 24} y="402" fontSize="30" className="serif" fill={HEX.chocolate}>{name}</text>
              </g>
            );
          })}
        </Art>
      </div>
    </section>
  );
}
