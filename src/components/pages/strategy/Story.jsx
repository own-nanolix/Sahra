import Link from 'next/link';
import Reveal from '@/components/site/Reveal';
import Play from '@/components/pages/overview/Play';
import { Lines } from '@/components/ui/Card';
import { INTRO, LINES, URL_LINE } from '@/lib/brand';
import { previous, next, href } from '@/lib/pages';
import { ProblemArt, ScopeArt, VisionArt, JourneyArt, SheetArt, RowsArt } from './Arts';
import s from './strategy.module.css';

// The six intro paragraphs as six bento rows that change shape: 8 + 4, 4 + 8, 6 + 6, 12, 3 + 9, 9 + 3.
// Each row sets one paragraph beside (or above) a diagram drawn from that paragraph's own words.
// `kind` and `heading` are short labels of ours; `quote` is a verbatim fragment of the paragraph.
const P = INTRO.paragraphs;
const ROWS = [
  { id: 'problem', kind: 'Problem', quote: 'redefining how people connect with spaces', text: P[0], text_span: 'span-8', art_span: 'span-4', Art: ProblemArt, ground: 'field-white', artFirst: false },
  { id: 'positioning', kind: 'Solution', quote: 'clarity, trust and elegance', text: P[1], text_span: 'span-4', art_span: 'span-8', Art: ScopeArt, ground: 'field-beige', artFirst: false },
  { id: 'vision', kind: 'Solution', quote: 'where vision meets reality', text: P[2], text_span: 'span-6', art_span: 'span-6', Art: VisionArt, ground: 'field-white', artFirst: false },
  { id: 'purpose', kind: 'Impact', quote: 'a journey of discovery, belonging and aspiration', text: P[3], text_span: 'span-12', art_span: 'span-12', Art: JourneyArt, ground: 'field-beige', artFirst: false },
  { id: 'connections', kind: 'Impact', quote: 'transparency, care and long-term vision', text: P[4], text_span: 'span-9', art_span: 'span-3', Art: SheetArt, ground: 'field-white', artFirst: true },
  { id: 'unfolds', kind: 'Impact', quote: 'we create places where life unfolds', text: P[5], text_span: 'span-9', art_span: 'span-3', Art: RowsArt, ground: 'field-beige', artFirst: false },
];

function TextBlock({ n, row }) {
  return (
    <div className={s.text}>
      <div className={s.textHead}>
        <span className="t-num">{String(n).padStart(2, '0')}</span>
        <span className="chip chip-sm">{row.kind}</span>
      </div>
      <p className={`t-line ${s.pull}`}>{'“'}{row.quote}{'”'}</p>
      <p className={`t-body ${s.para}`}>{row.text}</p>
    </div>
  );
}

function StoryRow({ row, n }) {
  const Art = row.Art;
  const textTile = (
    <Reveal key="t" className={`tile ${row.ground} ${row.text_span} ${s.tileText}`}>
      <TextBlock n={n} row={row} />
    </Reveal>
  );
  const artTile = (
    <Reveal key="a" delay={120} from="scale" className={`tile tile-flush tile-print ${row.ground} ${row.art_span} ${s.tileArt}`}>
      <Play className={s.artPlay}>
        <Art />
      </Play>
    </Reveal>
  );
  return (
    <section className={`bento ${s.row}`} id={`strategy-${row.id}`} aria-label={`${row.kind}: paragraph ${n}`}>
      {row.artFirst ? [artTile, textTile] : [textTile, artTile]}
    </section>
  );
}

// The page's closing tile: the brand line, and the neighbouring chapters.
export function Close() {
  const before = previous('strategy');
  const after = next('strategy');
  return (
    <Reveal className={`tile tile-dark on-dark ${s.close}`}>
      <div className={s.closeText}>
        <p className="t-label">We Build Spaces of Imagination</p>
        <Lines rows={LINES.elevate.rows} as="h2" className="t-h1" />
        <p className="t-lead">{LINES.refined.text}</p>
      </div>
      <div className={s.closeLinks}>
        <Link className="btn btn-outline" href={href(before.id)}>{before.title}</Link>
        <Link className="btn btn-beige" href={href(after.id)}>{after.title}</Link>
        <span className="site-url on-dark">{URL_LINE.replace('→ ', '')}</span>
      </div>
    </Reveal>
  );
}

export default function Story() {
  return (
    <div className={`wrap ${s.story}`}>
      {ROWS.map((row, i) => (
        <StoryRow key={row.id} row={row} n={i + 1} />
      ))}
    </div>
  );
}
