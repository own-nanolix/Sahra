import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { FlatLayPlate } from '@/components/pages/use-stationery/FlatLay';
import { LetterPlate, LetterheadArt, EnvelopeArt } from '@/components/pages/use-stationery/Print';
import { CardsPlate, CardFrontArt, CardDarkArt, CardBackArt } from '@/components/pages/use-stationery/Cards';
import { ShelfPlate, NotebookArt, SlipcaseArt, PenArt } from '@/components/pages/use-stationery/Books';
import { BrochurePlate } from '@/components/pages/use-stationery/Brochure';
import { ReportCoverArt } from '@/components/pages/use-stationery/Report';
import { ReportSlidesPlate, SlideArt, SLIDES } from '@/components/pages/use-stationery/Slides';
import s from '@/components/pages/use-stationery/use-stationery.module.css';

export const metadata = pageMeta('use-stationery');

// A mockup plate: a tile that is filled edge to edge by one SVG, with its plain name below.
function Plate({ span = 8, name, children, delay = 0 }) {
  return (
    <Reveal className={`tile tile-flush span-${span}`} delay={delay}>
      <figure className={s.fig}>
        <div className={s.plate}>{children}</div>
        <figcaption className={`${s.cap} ${s.padCap}`}>{name}</figcaption>
      </figure>
    </Reveal>
  );
}

// A tile of flat print artwork on a light ground.
function Flat({ span = 4, children, delay = 0 }) {
  return (
    <Reveal className={`tile tile-beige span-${span} ${s.flatTile}`} delay={delay}>
      {children}
    </Reveal>
  );
}

function Art({ name, children, className = '' }) {
  return (
    <figure className={`${s.fig} ${className}`}>
      <div className={`${s.art}`}>{children}</div>
      <figcaption className={s.cap}>{name}</figcaption>
    </figure>
  );
}

// Every piece on this page, as plain names.
const PIECES = [
  'Flat lay', 'Letterhead', 'Envelope', 'Business card, front', 'Business card, front in Dark Chocolate',
  'Business card, back', 'Notebook', 'Slipcase book', 'Pen', 'Tri-fold brochure', 'Report cover with spine', 'Slide deck, five slides',
];

export default function Page() {
  return (
    <section className="page" id="p-use-stationery" aria-label="Stationery">
      <div className={`wrap ${s.head}`}>
        <span className={`t-label ${s.enter}`} style={{ '--i': 0 }}>Applications</span>
        <h1 className={`t-display ${s.enter}`} style={{ '--i': 1 }} tabIndex={-1}>Stationery</h1>
        <p className={`t-lead muted ${s.enter}`} style={{ '--i': 2 }}>
          Print pieces are square, with the word-mark blind-debossed into brown board. Every piece below is its own SVG and
          can be exported.
        </p>
      </div>

      <div className="wrap">
        <Reveal from="scale">
          <figure className={s.fig}>
            <div className={s.plate}><FlatLayPlate /></div>
            <figcaption className={s.cap}>Flat lay</figcaption>
          </figure>
        </Reveal>
      </div>

      <section className={`wrap ${s.section}`} aria-labelledby="use-stationery-h-pieces">
        <header className={s.sectionHead}>
          <h2 className="t-h2" id="use-stationery-h-pieces">Pieces</h2>
        </header>
        <div className={`bento ${s.bento3}`}>
          <Plate name="Letterhead and envelope"><LetterPlate /></Plate>
          <Flat delay={80}>
            <Art name="Letterhead"><LetterheadArt /></Art>
          </Flat>

          <Plate name="Business cards"><CardsPlate /></Plate>
          <Flat delay={80}>
            <div className={s.stackArts}>
              <Art name="Envelope"><EnvelopeArt /></Art>
              <div className={s.pairArts}>
                <Art name="Card front"><CardFrontArt /></Art>
                <Art name="Card front, Dark Chocolate"><CardDarkArt /></Art>
                <Art name="Card back" className={s.wide}><CardBackArt /></Art>
              </div>
            </div>
          </Flat>

          <Plate name="Pen and notebooks"><ShelfPlate /></Plate>
          <Flat delay={80}>
            <Art name="Notebook"><NotebookArt /></Art>
          </Flat>

          <Flat>
            <div className={s.stackArts}>
              <Art name="Slipcase book"><SlipcaseArt /></Art>
              <Art name="Pen" className={s.slim}><PenArt /></Art>
            </div>
          </Flat>
          <Plate name="Tri-fold brochure" delay={80}><BrochurePlate /></Plate>

          <Plate name="Report cover and slides"><ReportSlidesPlate /></Plate>
          <Flat delay={80}>
            <Art name="Report cover with spine"><ReportCoverArt /></Art>
          </Flat>
        </div>
      </section>

      <section className={`wrap ${s.section}`} aria-labelledby="use-stationery-h-slides">
        <header className={s.sectionHead}>
          <h2 className="t-h2" id="use-stationery-h-slides">Slide deck</h2>
          <p className="t-body muted">
            Five slides at 1600 by 900: the intro, the word-mark, the palette, the type and the four colour versions. Scroll
            sideways to see them all.
          </p>
        </header>
        <div className={s.strip} tabIndex={0} role="region" aria-label="The five slides, scroll sideways">
          <div className={s.slides}>
            {SLIDES.map((sl, i) => (
              <figure className={s.slide} key={sl.name}>
                <SlideArt n={i} />
                <span>{`${i + 1}. ${sl.title.replace(/^Slide \d, the /, '').replace(/^./, (c) => c.toUpperCase())}`}</span>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={`wrap ${s.section}`} aria-labelledby="use-stationery-h-list">
        <header className={s.sectionHead}>
          <h2 className="t-h2" id="use-stationery-h-list">Exportable pieces</h2>
        </header>
        <p className="t-body muted">
          Twenty graphics on this page are separate SVG files: five flat prints, three card faces, a pen, six plates
          and five slides.
          Each can be exported on its own.
        </p>
        <p className="t-small muted">
          Light falls from the upper left; every shadow is hard and falls to the lower right.
        </p>
        <ol className={s.list}>
          {PIECES.map((name, i) => (
            <li key={name}>
              <span className="t-num muted">{String(i + 1).padStart(2, '0')}</span>
              <span className="t-line">{name}</span>
            </li>
          ))}
        </ol>
      </section>
    </section>
  );
}
