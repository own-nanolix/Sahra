import { pageMeta } from '@/lib/pages';
import { HEX, LINES } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import Plate from '@/components/pages/logo/Plate';
import { ConstructionPlate, ConstructionDetailPlate } from '@/components/pages/logo/ConstructionPlates';
import { ClearSpacePlate, MinSizePlate } from '@/components/pages/logo/SpacePlates';
import { PrimaryPlate, ColourwayPlate, LockupPlate, MarkPlate, MARK_PLATES } from '@/components/pages/logo/VersionPlates';
import { MisusePlate } from '@/components/pages/logo/MisusePlates';
import { ArchWindowPlate, ArchHeaderPlate, CropPlate, DebossPlate } from '@/components/pages/logo/SecondaryPlates';
import DrawOn from '@/components/pages/logo/DrawOn';
import { COLOURWAYS, MEASURES, MIN_SIZES, MISUSES, CLEAR } from '@/components/pages/logo/data';
import s from '@/components/pages/logo/logo.module.css';

export const metadata = pageMeta('logo');

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

export default function Page() {
  return (
    <section className={`page ${s.page}`} id="p-logo" aria-label="Logo">
      <div className={`wrap ${s.head}`}>
        <span className={`t-label ${s.enter}`} style={{ '--i': 0 }}>Brand foundations</span>
        <h1 className={`t-display ${s.enter}`} style={{ '--i': 1 }} tabIndex={-1}>Logo</h1>
        <p className={`t-lead muted ${s.enter}`} style={{ '--i': 2 }}>
          Latin and Arabic joined in one line of equal strokes, drawn on a grid with exact cuts. Every graphic on this page is
          its own SVG and can be exported.
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

      <Section n="01" id="construction" title="Construction" lead="One stroke, x, repeated everywhere. Corners are quarter circles on concentric radii and every cut end runs on the same diagonal, labelled 42° in the drawing as the designers printed it.">
        <div className={s.grid}>
          <Reveal className={s.c12}>
            <Plate caption="The word-mark on its guides: outline, anchor points, unit bars and cut lines">
              <Scroll label="Construction drawing, scrolls sideways"><ConstructionPlate /></Scroll>
            </Plate>
          </Reveal>
          <Reveal className={s.c8}>
            <Plate caption="Close-up of the S and the a: the unit bars x and y, the cuts at 42°">
              <Scroll label="Construction close-up, scrolls sideways"><ConstructionDetailPlate /></Scroll>
            </Plate>
          </Reveal>
          <Reveal className={s.c4} delay={120}>
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
        <div className={s.grid}>
          <Reveal className={s.c7}>
            <Plate caption={`Clear space: ${CLEAR}x on every side`}>
              <Scroll label="Clear space diagram, scrolls sideways"><ClearSpacePlate /></Scroll>
            </Plate>
          </Reveal>
          <Reveal className={s.c5} delay={120}>
            <div className={s.minGrid}>
              {MIN_SIZES.map((item) => (
                <Plate key={item.id} caption={`${item.name}, ${item.width} px`}>
                  <MinSizePlate item={item} />
                </Plate>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      <Section n="03" id="colour" title="Colour versions" lead="Four versions on equal fields. Nothing else is approved for the word-mark: the mark also appears in Sand on Dark Chocolate Brown, as the primary lockup above.">
        <Reveal>
          <div className={s.colours}>
            {COLOURWAYS.map((way) => <ColourwayPlate key={way.id} way={way} />)}
          </div>
        </Reveal>
        <ul className={s.colourNames} aria-label="The four colour versions">
          {COLOURWAYS.map((way) => (
            <li key={way.id}><span className="t-label">{way.name}</span></li>
          ))}
        </ul>
      </Section>

      <Section n="04" id="lockups" title="Lockups" lead={`The word-mark with the line "${LINES.imagination.text}", stacked as on the hoarding, vertical as on the box, with the web address, and the mark in its rounded tile.`}>
        <div className={s.grid}>
          <Reveal className={s.c12}>
            <Plate caption="Row: the word-mark with the brand line at its right"><LockupPlate id="row" /></Plate>
          </Reveal>
          <Reveal className={`${s.c3} ${s.rowSpan2}`}>
            <Plate className={s.fill} ratio="700 / 1700" ground={HEX.chocolate} caption="Vertical, reading bottom to top"><LockupPlate id="vertical" /></Plate>
          </Reveal>
          <Reveal className={s.c9} delay={80}>
            <Plate caption="Stack: the line below the word-mark"><LockupPlate id="stack" /></Plate>
          </Reveal>
          <Reveal className={s.c5} delay={120}>
            <Plate caption="With the web address"><LockupPlate id="url" /></Plate>
          </Reveal>
          <Reveal className={s.c4} delay={160}>
            <Plate caption="The mark in its rounded tile"><LockupPlate id="tile" /></Plate>
          </Reveal>
        </div>
      </Section>

      <Section n="05" id="mark" title="The mark" lead="The S of the word-mark alone: two interlocking brackets with a gap of y between them, assembling from opposite corners.">
        <div className={s.marks}>
          {MARK_PLATES.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <Plate caption={item.name}><MarkPlate item={item} /></Plate>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section n="06" id="misuse" title="What not to do" lead="Six ways the word-mark is never used.">
        <div className={s.misuse}>
          {MISUSES.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 80}>
              <Plate><MisusePlate item={item} /></Plate>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section n="07" id="secondary" title="The secondary graphic" lead="The quarter arch is a thick quarter ring: a window onto the architecture, the header of the profile card. The word-mark itself, enlarged and cropped, becomes a pattern; pressed blind into board it becomes a finish.">
        <div className={s.grid}>
          <Reveal className={s.c8}>
            <Plate caption="Quarter arch on the profile card header"><ArchHeaderPlate /></Plate>
          </Reveal>
          <Reveal className={s.c4} delay={100}>
            <Plate caption="Quarter arch as a window"><ArchWindowPlate /></Plate>
          </Reveal>
          <Reveal className={s.c6}>
            <Plate caption="The whole word-mark, enlarged and cropped by the edge"><CropPlate /></Plate>
          </Reveal>
          <Reveal className={s.c6} delay={100}>
            <Plate caption="Blind deboss on Tribal Brown board"><DebossPlate /></Plate>
          </Reveal>
        </div>
      </Section>

      <Section n="08" id="draw" title="Drawn on" lead="Lines draw on along the grid, then the shape fills and stops. Slow and exact, with no bounce.">
        <Reveal><div className="on-dark" style={{ borderRadius: 'var(--r-card-sm)' }}><DrawOn /></div></Reveal>
      </Section>
    </section>
  );
}
