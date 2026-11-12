import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import { groups, pages, pageById, href } from '@/lib/pages';
import { MOCKUPS } from './data';
import s from './overview.module.css';

const two = (n) => String(n).padStart(2, '0');

// A row of the ruled list that links to a page: number, serif label, "+".
function Row({ to, no, label, current = false }) {
  return (
    <li>
      <Link className="ruled-row" href={href(to)} aria-current={current ? 'page' : undefined}>
        <span className="t-num">{no}</span>
        <span className="ruled-row-label">{label}</span>
        <span className="ruled-row-plus" aria-hidden="true" />
      </Link>
    </li>
  );
}

// Two long ruled lists side by side: every chapter of the site (all thirty, grouped), and every mockup and
// product with the page that shows it.
export default function Indexes() {
  const starts = groups.map((g, gi) => groups.slice(0, gi).reduce((a, x) => a + x.pages.length, 0));
  return (
    <div className={s.indexes}>
      <section className={s.list} id="overview-chapters" aria-labelledby="overview-chapters-h" tabIndex={-1}>
        <Reveal>
          <p className="t-label">{pages.length} pages in {groups.length} groups</p>
          <h2 className="t-h2" id="overview-chapters-h">Every chapter</h2>
        </Reveal>
        {groups.map((g, gi) => (
          <Reveal key={g.name} className={s.group}>
            <h3 className={`t-label ${s.groupName}`}>{g.name}</h3>
            <ul className={`rows ${s.compactRows}`}>
              {g.pages.map((p, pi) => (
                <Row key={p.id} to={p.id} no={two(starts[gi] + pi + 1)} label={p.title} current={p.id === 'overview'} />
              ))}
            </ul>
          </Reveal>
        ))}
      </section>

      <section className={s.list} id="overview-mockups" aria-labelledby="overview-mockups-h" tabIndex={-1}>
        <Reveal>
          <p className="t-label">Seen in context</p>
          <h2 className="t-h2" id="overview-mockups-h">Mockups and products</h2>
        </Reveal>
        {MOCKUPS.map((m) => {
          const page = pageById(m.page);
          return (
            <Reveal key={m.page} className={s.group}>
              <h3 className={`t-label ${s.groupName}`}>
                <Link className="link" href={href(m.page)}>{page.title}</Link>
              </h3>
              <ul className={`rows ${s.compactRows}`}>
                {m.items.map((it, i) => (
                  <Row key={it} to={m.page} no={two(i + 1)} label={it} />
                ))}
              </ul>
            </Reveal>
          );
        })}
      </section>
    </div>
  );
}
