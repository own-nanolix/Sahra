import Reveal from '@/components/site/Reveal';
import Play from './Play';
import { PRINCIPLES } from './data';
import { ClarityArt, IntentionArt, TransparencyArt, PrecisionArt } from './Arts';
import s from './overview.module.css';

// The brand's principles as four tiles of four sizes (6 x 2, 3 x 2, 3 x 1, 3 x 1). Each quotes the case study's own
// sentence, then shows it as a small drawing made from the words themselves.
const ART = { clarity: ClarityArt, intention: IntentionArt, transparency: TransparencyArt, precision: PrecisionArt };
const TILE = [
  { cls: 'span-6 rows-2', surface: '', layout: s.wide },
  { cls: 'span-3 rows-2 tile-beige', surface: '', layout: s.tall },
  { cls: 'span-3 rows-1 tile-beige', surface: '', layout: s.compact },
  { cls: 'span-3 rows-1', surface: '', layout: s.compact },
];

export default function Principles() {
  return (
    <section className={s.block} id="overview-principles" aria-labelledby="overview-principles-h" tabIndex={-1}>
      <Reveal>
        <p className="t-label">Principles</p>
        <h2 className="t-h1" id="overview-principles-h">
          <span className={s.hline}>Clarity, trust</span>
          <span className={s.hline}>and elegance</span>
        </h2>
      </Reveal>
      <div className={`bento ${s.bentoGap}`}>
        {PRINCIPLES.map((p, i) => {
          const Art = ART[p.id];
          const t = TILE[i];
          const compact = t.layout === s.compact;
          return (
            <Reveal key={p.id} delay={i * 80} className={`tile ${t.cls} ${t.layout} ${s.principle}`} as="article" aria-labelledby={`overview-principle-${p.id}`}>
              <div className={s.pText}>
                <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="t-h3" id={`overview-principle-${p.id}`}>{p.title}</h3>
                {!compact && (
                  <blockquote className={s.quote}>
                    <p>{'“'}{p.quote}{'”'}</p>
                    <footer className="t-label">Case study, {p.from.toLowerCase()}</footer>
                  </blockquote>
                )}
                {compact && <p className="t-label">Case study, {p.from.toLowerCase()}</p>}
              </div>
              <Play className={s.pArt}>
                <Art />
              </Play>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
