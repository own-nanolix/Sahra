import Reveal from '@/components/site/Reveal';
import Play from '@/components/pages/overview/Play';
import { DESCRIPTION } from '@/lib/brand';
import DescriptionArt from './DescriptionArt';
import s from './strategy.module.css';

// The page description of the case study, read clause by clause. A 5 + 7 bento: three ruled clauses, then the
// drawing made from them. Every clause is a verbatim fragment of the description.
const CLAUSES = [
  { no: '01', label: 'transforming desert landscapes into vibrant, livable destinations' },
  { no: '02', label: 'Blending natural desert tones with clean, contemporary design' },
  { no: '03', label: 'a unique balance between nature, comfort, and modern lifestyle' },
];

export default function Description() {
  return (
    <section className={`wrap ${s.description}`} id="strategy-description" aria-labelledby="strategy-description-h" tabIndex={-1}>
      <Reveal className={s.sectionHead}>
        <p className="t-label">The page description</p>
        <h2 className="t-h1" id="strategy-description-h">
          <span className={s.hline}>Sahra is a real estate company</span>
          <span className={s.hline}>specializing in transforming</span>
          <span className={s.hline}>desert landscapes</span>
        </h2>
      </Reveal>
      <div className="bento">
        <Reveal className={`tile field-white span-5 ${s.clauses}`}>
          <ol className="rows" id="strategy-clauses">
            {CLAUSES.map((c) => (
              <li key={c.no}>
                <div className="ruled-row">
                  <span className="t-num">{c.no}</span>
                  <span className="ruled-row-label">{c.label}</span>
                  <span className="ruled-row-plus" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
          <p className="t-small">{DESCRIPTION}</p>
        </Reveal>
        <Reveal delay={120} from="scale" className={`tile tile-flush tile-print field-beige span-7 ${s.tileArt}`}>
          <Play className={s.artPlay}>
            <DescriptionArt />
          </Play>
        </Reveal>
      </div>
    </section>
  );
}
