import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import RuledRows from '@/components/ui/RuledRows';
import { ABOUT, SCOPE, HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import s from './lp-process.module.css';

// The three ruled rows of the About page (m12) as links to the other landing pages, with the four scope words of
// the project sheet (m02) set along a drawn line: a rule with a cut end for each step, equal in length.
const HREF = { Philosophy: '/lp-philosophy/', 'Our Process': '/lp-process/', 'Our Vision': '/lp-vision/' };

export default function Next() {
  const rows = ABOUT.rows.map((r) => ({ no: r.no, label: r.label, href: HREF[r.label] }));
  const unit = 360;
  return (
    <section className={s.next} id="lp-process-next" aria-labelledby="lp-process-next-title">
      <div className="wrap">
        <div className={s.nextGrid}>
          <Reveal>
            <h2 id="lp-process-next-title" className="t-label" style={{ marginBottom: 14 }}>{ABOUT.label}</h2>
            <RuledRows id="lp-process-next-rows" rows={rows} />
          </Reveal>
          <Reveal delay={140}>
            <Art viewBox="0 0 1440 260" title="The four scope words along a drawn line" exportName="lp-process-scope-line" className={s.scopeLine}>
              <path d="M0 150H1440" stroke={HEX.tribal} strokeWidth="2" className="draw" style={{ '--len': 1440 }} />
              {SCOPE.map((w, i) => {
                const x = i * unit;
                return (
                  <g key={w} className="fade-in" style={{ '--i': i * 2 + 2 }}>
                    <path d={`M${x} 150V${r2(110)}L${x + 36} 74`} stroke={HEX.tribal} strokeWidth="2" fill="none" />
                    <circle cx={x} cy="150" r="7" fill={HEX.chocolate} />
                    <text x={x + 4} y="196" fontSize="14" className="sans" fill={HEX.muted}>{`0${i + 1}`}</text>
                    <text x={x + 4} y="236" fontSize="38" className="serif" fill={HEX.chocolate}>{w}</text>
                  </g>
                );
              })}
            </Art>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
