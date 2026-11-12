import { pageMeta } from '@/lib/pages';
import { HEX, LINES } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import Plate from '@/components/pages/logo/Plate';
import { ConstructionPlate, ConstructionDetailPlate } from '@/components/pages/logo/ConstructionPlates';
import { ClearSpacePlate, MinSizePlate } from '@/components/pages/logo/SpacePlates';
import { PrimaryPlate, ColourwayPlate, LockupPlate, MarkPlate, MarkConstructionPlate, MARK_PLATES } from '@/components/pages/logo/VersionPlates';
import { MisusePlate } from '@/components/pages/logo/MisusePlates';
import { ArchWindowPlate, ArchHeaderPlate, CropPlate, DebossPlate } from '@/components/pages/logo/SecondaryPlates';
import DrawOn from '@/components/pages/logo/DrawOn';
import { COLOURWAYS, MEASURES, MIN_SIZES, MISUSES, CLEAR } from '@/components/pages/logo/data';
import s from '@/components/pages/logo/logo.module.css';

export const metadata = pageMeta('logo');

// The logo page follows its LAYOUTS.md line: the primary word-mark full width on Dark Chocolate as m04, then an
// 8-column bento of unequal tiles, section by section: construction 8 wide, clear space 5 beside the four minimum
// sizes in a 3-wide column, the colour versions as m09's 2 x 2, the lockups in four ratios, the misuse strip of
// six square tiles, the mark and its tile as a 2 x 2 in the corner, the secondary graphic, the draw-on 8 x 2.

// A numbered section with its heading and a short lead.
function Section({ n, id, title, lead, children }) {
  return (
    <section className={`wrap ${s.section}`} aria-labelledby={`logo-h-${id}`}>
      <Reveal>
        <header className={s.sectionHead}>
          <span className="t-num muted">{n}</span>
          <h2 className="t-h2" id={`logo-h-${id}`}>{title}</h2>
          {lead && <p className="t-body muted">{lead}</p>}
        </header>
      </Reveal>
      {children}
    </section>
  );
}

// A wide drawing that keeps its size and scrolls inside its own box on a narrow screen.
function Scroll({ label, children }) {
  return (
    <div className={s.scroll} tabIndex={0} role="region" aria-label={label}>
      <div className={s.scrollIn}>{children}</div>
    </div>
  );
}

// A bento tile that holds one plate (the plate draws its own ground; the tile only places it).
function Cell({ span, className = '', delay = 0, children, as }) {
  return (
    <Reveal as={as} delay={delay} className={`tile tile-flush ${s.cell} ${span} ${className}`}>
      {children}
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className={`page ${s.page}`} id="p-logo" aria-label="Logo">
      <div className={`wrap ${s.head}`}>
        <span className={`t-label ${s.enter}`} style={{ '--i': 0 }}>Brand foundations</span>
        <h1 className={`t-display ${s.enter}`} style={{ '--i': 1 }} tabIndex={-1}>Logo</h1>
        <p className={`t-lead muted ${s.enter}`} style={{ '--i': 2 }}>
          Latin and Arabic joined in one line of equal strokes, drawn on a grid with exact cuts.
        </p>
      </div>

      <div className="wrap">
        <Reveal from="scale">
          <figure className={s.plate}>
            <div className={s.hero}><PrimaryPlate /></div>
            <figcaption className={s.cap}>
              <span className="t-label">Primary lockup</span>
              <span className="t-small">The word-mark in Sand on Dark Chocolate Brown, centred.</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>

      <Section n="01" id="construction" title="Construction" lead="One stroke, x, repeated everywhere. Corners are quarter circles on concentric radii and every cut end runs on the same diagonal, labelled in the drawing as the designers printed it: 34° on the Latin cuts, 42° on the Arabic cuts.">
        <div className="bento bento-8">
          <Cell span="span-8">
            <Plate caption="The word-mark on its guides: outline, anchor points, unit bars and cut lines">
              <Scroll label="Construction drawing, scrolls sideways"><ConstructionPlate /></Scroll>
            </Plate>
          </Cell>
          <Cell span="span-5">
            <Plate caption="Close-up of the S and the a: the unit bars x and y, the cuts at 34°">
              <Scroll label="Construction close-up, scrolls sideways"><ConstructionDetailPlate /></Scroll>
            </Plate>
          </Cell>
          <Reveal delay={120} className={`tile tile-line span-3 ${s.measureTile}`}>
            <h3 className="t-h3">Measurements</h3>
            <ul className={s.measures} aria-label="Measurements of the word-mark in its own units">
              {MEASURES.map((m) => (
                <li key={m.n}>
                  <span className="t-num muted">{m.n}</span>
                  <span className={s.label}>{m.label}</span>
                  <span className={s.value}>{m.value}</span>
                </li>
              ))}
            </ul>
            <p className={`t-small ${s.measuresNote}`}>Units are pixels of the artwork when the word-mark is 1420 wide.</p>
          </Reveal>
        </div>
      </Section>

      <Section n="02" id="space" title="Clear space and minimum size" lead={`Keep ${CLEAR}x clear on every side, where x is the stroke. Below the minimum widths the cuts and the ring above the join stop reading.`}>
        <div className="bento bento-8">
          <Cell span="span-5">
            <Plate caption={`Clear space: ${CLEAR}x on every side`}>
              <Scroll label="Clear space diagram, scrolls sideways"><ClearSpacePlate /></Scroll>
            </Plate>
          </Cell>
          <Cell span="span-3" delay={120}>
            <div className={s.minGrid}>
              {MIN_SIZES.map((item) => (
                <Plate key={item.id}>
                  <MinSizePlate item={item} />
                </Plate>
              ))}
            </div>
          </Cell>
        </div>
      </Section>

      <Section n="03" id="colour" title="Colour versions" lead="Four versions on equal fields, as the case study shows them. With Sand on Dark Chocolate Brown, the primary lockup above, these are the word-mark's colours.">
        <div className="bento bento-8">
          <Cell span="span-8" className={s.coloursTile}>
            <div className={s.colours}>
              {COLOURWAYS.map((way) => <ColourwayPlate key={way.id} way={way} />)}
            </div>
            <ul className={s.colourNames} aria-label="The four colour versions">
              {COLOURWAYS.map((way) => (
                <li key={way.id}><span className="t-label">{way.name}</span></li>
              ))}
            </ul>
          </Cell>
        </div>
      </Section>

      <Section n="04" id="lockups" title="Lockups" lead={`The word-mark with the line "${LINES.imagination.text}", stacked as on the hoarding, vertical as on the box, and with the web address.`}>
        <div className="bento bento-8">
          <Cell span="span-8">
            <Plate caption="Row: the word-mark with the brand line at its right"><LockupPlate id="row" /></Plate>
          </Cell>
          <Cell span="span-2 rows-2" className={s.stretch}>
            <Plate className={s.fill} ratio="700 / 1700" ground={HEX.chocolate} caption="Vertical, reading bottom to top"><LockupPlate id="vertical" /></Plate>
          </Cell>
          <Cell span="span-6" delay={80}>
            <Plate caption="Stack: the line below the word-mark"><LockupPlate id="stack" /></Plate>
          </Cell>
          <Cell span="span-6" delay={120}>
            <Plate caption="With the web address"><LockupPlate id="url" /></Plate>
          </Cell>
        </div>
      </Section>

      <Section n="05" id="misuse" title="What not to do" lead="Six ways the word-mark is never used.">
        <div className={`bento bento-6 ${s.strip}`}>
          {MISUSES.map((item, i) => (
            <Cell key={item.id} span="span-1 span-m-2 span-s-1" delay={i * 60}>
              <Plate><MisusePlate item={item} /></Plate>
            </Cell>
          ))}
        </div>
      </Section>

      <Section n="06" id="mark" title="The mark" lead="The S of the word-mark alone: two interlocking brackets with a gap of y between them, assembling from opposite corners; and the mark in its rounded tile, as on the profile card.">
        <div className="bento bento-8">
          {MARK_PLATES.slice(0, 2).map((item, i) => (
            <Cell key={item.id} span="span-2 span-m-3 span-s-1" delay={i * 80}>
              <Plate caption={item.name}><MarkPlate item={item} /></Plate>
            </Cell>
          ))}
          <Cell span="span-4 rows-2" className={s.stretch} delay={120}>
            <Plate className={s.fill} ratio="1 / 1" ground="var(--beige)" caption="The mark on its construction: the gap y and the cuts at 34°"><MarkConstructionPlate /></Plate>
          </Cell>
          {MARK_PLATES.slice(2).map((item, i) => (
            <Cell key={item.id} span="span-2 span-m-3 span-s-1" delay={(i + 2) * 80}>
              <Plate caption={item.name}><MarkPlate item={item} /></Plate>
            </Cell>
          ))}
        </div>
      </Section>

      <Section n="07" id="secondary" title="The secondary graphic" lead="The quarter arch is a thick quarter ring: a window onto the architecture, the header of the profile card. The word-mark itself, enlarged and cropped, becomes a pattern; pressed blind into board it becomes a finish.">
        <div className="bento bento-8">
          <Cell span="span-5">
            <Plate caption="Quarter arch on the profile card header"><ArchHeaderPlate /></Plate>
          </Cell>
          <Cell span="span-3" delay={100}>
            <Plate caption="Quarter arch as a window"><ArchWindowPlate /></Plate>
          </Cell>
          <Cell span="span-4">
            <Plate caption="The whole word-mark, enlarged and cropped by the edge"><CropPlate /></Plate>
          </Cell>
          <Cell span="span-4" delay={100}>
            <Plate caption="Blind deboss on Tribal Brown board"><DebossPlate /></Plate>
          </Cell>
        </div>
      </Section>

      <Section n="08" id="draw" title="Drawn on" lead="Lines draw on along the grid, then the shape fills and stops. Slow and exact, with no bounce.">
        <div className="bento bento-8">
          <Cell span="span-8 rows-2" className="on-dark">
            <DrawOn />
          </Cell>
        </div>
      </Section>
    </section>
  );
}
