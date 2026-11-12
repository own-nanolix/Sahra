import { pageMeta } from '@/lib/pages';
import { DESCRIPTION, ABOUT, FIELDS, TAGS, CLIENT, DESIGNER } from '@/lib/brand';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import Opening from '@/components/pages/overview/Opening';
import Contents from '@/components/pages/overview/Contents';
import Principles from '@/components/pages/overview/Principles';
import Indexes from '@/components/pages/overview/Indexes';
import Play from '@/components/pages/overview/Play';
import { CoverArt, AboutArt } from '@/components/pages/overview/Arts';
import s from '@/components/pages/overview/overview.module.css';

export const metadata = pageMeta('overview');

// Overview: the intro slide of the case study rebuilt (m02), then a bento that opens on the word-mark on Dark
// Chocolate (m04) beside the contents, the brand, the principles, and two long ruled indexes.
export default function Page() {
  return (
    <section className="page" id="p-overview" aria-label="Overview">
      <Opening />

      <div className="wrap">
        <div className="bento" id="overview-cover">
          <Reveal className="tile tile-flush tile-dark tile-print span-8 rows-3 on-dark">
            <Play className={s.fill}>
              <CoverArt />
            </Play>
          </Reveal>
          <Reveal delay={120} className="tile tile-dark span-4 rows-3 on-dark" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 24 }}>
            <div>
              <p className="t-label">Contents</p>
              <h2 className="t-h3">On this page</h2>
            </div>
            <Contents />
          </Reveal>
        </div>

        <section className={s.block} id="overview-about" aria-labelledby="overview-about-h" tabIndex={-1}>
          <div className="bento">
            <Reveal className="tile tile-beige span-7 rows-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 20 }}>
              <div>
                <p className="t-label">{ABOUT.label}</p>
                <h2 className="t-h2" id="overview-about-h">
                  <Lines rows={ABOUT.headline.rows} as="span" />
                </h2>
              </div>
              <p className="t-lead">{DESCRIPTION}</p>
              <div className="row" aria-label="Fields and tags">
                {FIELDS.map((f) => (
                  <span className="chip chip-brown chip-sm" key={f}>{f}</span>
                ))}
                {TAGS.slice(3, 7).map((t) => (
                  <span className="chip chip-sm" key={t}>{t}</span>
                ))}
              </div>
              <p className="t-small">{CLIENT}. {DESIGNER}.</p>
            </Reveal>
            <Reveal delay={120} from="scale" className="tile tile-flush tile-dark tile-print span-5 rows-2">
              <Play className={s.fill}>
                <AboutArt />
              </Play>
            </Reveal>
          </div>
        </section>

        <Principles />

        <Indexes />
      </div>
    </section>
  );
}
