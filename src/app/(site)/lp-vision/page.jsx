import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { WM, MarkG } from '@/components/art/Mark';
import { ConstructionG, DRAWING } from '@/components/art/KeyArt';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import RuledRows from '@/components/ui/RuledRows';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { ABOUT, INTRO, LINES, CONTACT, CONTACT_BLOCKS } from '@/lib/brand';
import { Contact } from '@/components/ui/Card';
import Hero from '@/components/pages/lp-vision/Hero';
import Story from '@/components/pages/lp-vision/Story';
import Wall from '@/components/pages/lp-vision/Wall';
import Scope from '@/components/pages/lp-vision/Scope';
import { HoardingG, PosterLeftG, PosterRightG, ArchRingsG, CourtLinesG, CONSTRUCTION_BOX } from '@/components/pages/lp-vision/art';
import s from '@/components/pages/lp-vision/lp-vision.module.css';

export const metadata = pageMeta('lp-vision');

// Intro paragraphs 3, 4 and 6 of the intro slide (m02), verbatim.
const STORY = [INTRO.paragraphs[2], INTRO.paragraphs[3], INTRO.paragraphs[5]];
// The three ruled rows of the About page (m12) lead to the landing pages of the same names.
// The brand lines, each beside a flat field in the photo tones (stand-ins for the photographs).
const LINE_ROWS = [
  { line: LINES.imagination, field: 'field-wall' },
  { line: LINES.elevate, field: 'field-timber' },
  { line: LINES.builtAround, field: 'field-desert' },
  { line: LINES.refinedLiving, field: 'field-dusk' },
];
const ROWS = ABOUT.rows.map((r, i) => ({ ...r, href: ['/lp-philosophy/', '/lp-process/', '/lp-vision/'][i] }));

export default function Page() {
  return (
    <section className="page" id="p-lp-vision" aria-label="Landing: Our Vision">
      {/* 1 and 2: navigation over the hero */}
      <div className={s.stage}>
        <div className={s.navOver}>
          <LandingNav current="lp-vision" tone="dark" />
        </div>
        <Hero />
      </div>

      {/* 3: built with intention, with the word-mark's construction drawing on */}
      <section className={`${s.intro} wrap`} aria-labelledby="lp-vision-intro-title">
        <div className={s.introHead}>
          <Reveal>
            <p className="t-label">{ABOUT.label}</p>
            <h2 id="lp-vision-intro-title" className="t-h1" style={{ marginTop: 16 }}>
              <Lines as="span" rows={ABOUT.headline.rows} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lead">{ABOUT.text}</p>
            <p className={`t-body muted ${s.introMore}`}>{INTRO.paragraphs[0]}</p>
            <p className={`t-body muted ${s.introMore}`}>{INTRO.paragraphs[1]}</p>
          </Reveal>
        </div>
        <Reveal from="scale" className={s.construction}>
          <Art viewBox={CONSTRUCTION_BOX} title="Construction drawing of the word-mark, guides and anchors" exportName="lp-vision-construction">
            <rect x="-90" y="-40" width={WM.W + 180} height={WM.DESC + 90} fill={DRAWING.paper} />
            <ConstructionG draw />
          </Art>
        </Reveal>
      </section>

      {/* 4: scope of work */}
      <Scope />

      {/* 4b: the brand lines as ruled rows */}
      <section className={`${s.lines} wrap`} aria-labelledby="lp-vision-lines-title">
        <h2 id="lp-vision-lines-title" className="t-label">{LINES.imagination.text}</h2>
        <ul className={s.lineList}>
          {LINE_ROWS.map(({ line, field }, i) => (
            <Reveal as="li" key={line.text} delay={i * 60} className={s.lineRow}>
              <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
              <p className="t-line">{line.text}</p>
              <span className={`${s.lineField} ${field}`} aria-hidden="true" />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* 5: the story: a pinned band whose crop slides while the intro paragraphs rise under it */}
      <section className={s.story} aria-label="Our Vision, in the brand's own words">
        <Story
          steps={STORY}
          art={
            <Art
              viewBox="0 0 4400 800"
              title="The hoarding artwork: field with the word-mark, rounded corner, beige panel with the brand lines"
              exportName="lp-vision-hoarding"
              className={s.bandArt}
              preserveAspectRatio="xMidYMid slice"
            >
              <HoardingG idp="lp-vision-hoarding" />
            </Art>
          }
        />
      </section>

      {/* 6: the poster lines on Dark Chocolate, the quarter arch filling */}
      <section className={`${s.statement} on-dark`} aria-labelledby="lp-vision-statement-title">
        <div className={`${s.statementGrid} wrap`}>
          <Reveal className={s.statementText}>
            <h2 id="lp-vision-statement-title" className="t-display">
              <Lines as="span" rows={LINES.elevate.rows} />
            </h2>
            <p className={`t-lead ${s.statementSub}`}>{LINES.refined.text}</p>
            <Button variant="beige" url href="/lp-contact/">sahra.sa</Button>
          </Reveal>
          <Reveal from="scale" className={s.arch}>
            <Art viewBox="0 0 600 600" title="Quarter arch of five rings" exportName="lp-vision-arch" decorative>
              <ArchRingsG />
            </Art>
          </Reveal>
        </div>
      </section>

      {/* 7: the court as a line drawing, with the three ruled rows */}
      <section className={`${s.drawing} wrap`} aria-labelledby="lp-vision-drawing-title">
        <Reveal from="scale" className={s.drawingArt}>
          <Art viewBox="0 0 1600 700" title="The timber court drawn as lines: frame, slats, opening and stair" exportName="lp-vision-court-lines">
            <rect width="1600" height="700" fill={DRAWING.paper} />
            <CourtLinesG />
          </Art>
        </Reveal>
        <div className={s.drawingText}>
          <Reveal>
            <h2 id="lp-vision-drawing-title" className="t-h2">
              <Lines as="span" rows={LINES.cleanArchitecture.rows} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <RuledRows id="lp-vision-rows" rows={ROWS} />
          </Reveal>
        </div>
      </section>

      {/* 8: Black, as the right poster of m14: the line with "design" and "and" at opposite ends */}
      <section className={`${s.black} field-black`} aria-labelledby="lp-vision-black-title">
        <div className={`${s.blackGrid} wrap`}>
          <Reveal>
            <h2 id="lp-vision-black-title" className="t-display">
              <Lines as="span" rows={LINES.designing.rows} />
            </h2>
          </Reveal>
          <div className={s.blackFoot}>
            <Art viewBox="0 0 184 201" title="The mark, assembling from its two halves" exportName="lp-vision-mark" className={s.blackMark}>
              <MarkG size={184} fill="#B58F6B" topClass="mark-top" bottomClass="mark-bottom" />
            </Art>
            <div className={s.blackContacts}>
              <Contact lines={CONTACT_BLOCKS.office} />
              <p className="t-body">{CONTACT.web}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9: the two posters of m11, side by side on a ribbed wall */}
      <Wall>
        <Reveal className={s.frame}>
          <Art viewBox="0 0 600 840" title="Poster: We Build Spaces of Imagination" exportName="lp-vision-poster-left">
            <PosterLeftG idp="lp-vision-pl" />
          </Art>
        </Reveal>
        <Reveal delay={140} className={s.frame}>
          <Art viewBox="0 0 600 840" title="Poster: Built around how people live today" exportName="lp-vision-poster-right">
            <PosterRightG idp="lp-vision-pr" />
          </Art>
        </Reveal>
      </Wall>

      {/* 10: footer */}
      <LandingFooter />
    </section>
  );
}
