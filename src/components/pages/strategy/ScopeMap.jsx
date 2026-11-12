import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import { SCOPE } from '@/lib/brand';
import { pageById, href } from '@/lib/pages';
import s from './strategy.module.css';

// Where each of the four scope steps lives on this site: a reading guide, four columns of ruled links.
// The mapping is ours (which chapter shows which step of the scope of work); the step names are the case study's.
const MAP = [
  { step: SCOPE[0], pages: ['overview', 'strategy', 'lp-philosophy'] },
  { step: SCOPE[1], pages: ['logo', 'color', 'typography', 'icons'] },
  { step: SCOPE[2], pages: ['gradients', 'motion', 'lp-vision', 'lp-spaces'] },
  { step: SCOPE[3], pages: ['campaign', 'use-stationery', 'use-world', 'lp-contact'] },
];

export default function ScopeMap() {
  return (
    <section className={`wrap ${s.map}`} id="strategy-map" aria-labelledby="strategy-map-h" tabIndex={-1}>
      <Reveal className={s.sectionHead}>
        <p className="t-label">Scope of work</p>
        <h2 className="t-h2" id="strategy-map-h">
          <span className={s.hline}>Four steps,</span>
          <span className={s.hline}>and where to read them</span>
        </h2>
      </Reveal>
      <div className="bento">
        {MAP.map((m, i) => (
          <Reveal key={m.step} delay={i * 80} className={`tile span-3 span-m-3 ${i % 2 ? 'tile-beige' : ''} ${s.mapTile}`} as="article" aria-labelledby={`strategy-map-${i + 1}`}>
            <p className="t-num">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="t-h3" id={`strategy-map-${i + 1}`}>{m.step}</h3>
            <ul className="rows">
              {m.pages.map((id) => (
                <li key={id}>
                  <Link className="ruled-row" href={href(id)}>
                    <span className="t-num" aria-hidden="true" />
                    <span className="ruled-row-label">{pageById(id).title}</span>
                    <span className="ruled-row-plus" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
