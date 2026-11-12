import { ABOUT, LINES } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import RuledRows from '@/components/ui/RuledRows';
import { Lines } from '@/components/ui/Card';
import { ArchRings } from './ArchArt';
import s from './lp-philosophy.module.css';

// A dark pause after the story: the poster line of m14 / m10 with the three ruled rows of the About page (m12)
// as links, and nested quarter arches growing from the corner.
export default function Statement() {
  const rows = ABOUT.rows.map((r, i) => ({
    no: r.no,
    label: r.label,
    href: ['/lp-philosophy/', '/lp-process/', '/lp-vision/'][i],
  }));
  return (
    <section className={`field-chocolate on-dark ${s.statement}`} id="lp-philosophy-statement" aria-labelledby="lp-philosophy-statement-title">
      <div className="wrap">
        <div className={s.statementGrid}>
          <Reveal>
            <Lines as="h2" rows={LINES.elevate.rows} className="t-h1" id="lp-philosophy-statement-title" />
            <p className={`t-lead ${s.refined}`}>{LINES.refined.text}</p>
          </Reveal>
          <Reveal delay={140}>
            <p className="t-label" style={{ marginBottom: 14 }}>{ABOUT.label}</p>
            <RuledRows id="lp-philosophy-rows" rows={rows} />
          </Reveal>
        </div>
      </div>
      <ArchRings className={s.rings} />
    </section>
  );
}
