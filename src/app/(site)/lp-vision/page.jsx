import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import { WM } from '@/components/art/Mark';
import { ConstructionG, DRAWING } from '@/components/art/KeyArt';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import RuledRows from '@/components/ui/RuledRows';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { ABOUT, INTRO, LINES } from '@/lib/brand';
import Hero from '@/components/pages/lp-vision/Hero';
import Story from '@/components/pages/lp-vision/Story';
import Wall from '@/components/pages/lp-vision/Wall';
import Scope from '@/components/pages/lp-vision/Scope';
import { HoardingG, PosterLeftG, PosterRightG, BlackStatementG, CourtLinesG, CONSTRUCTION_BOX } from '@/components/pages/lp-vision/art';
import s from '@/components/pages/lp-vision/lp-vision.module.css';

export const metadata = pageMeta('lp-vision');

// Sections, in order (nav and footer shared):
//   1 nav over the hero   2 hero: the court, full bleed   3 "Our Vision": the intro slide's first two paragraphs over
//   the construction drawing   4 the project sheet as ruled label / value rows   5 the brand lines, each beside a
//   flat field   6 the story: the hoarding band pinned at the TOP, its crop sliding   7 the m14 spread: the poster's
//   lines on Beige beside the black statement   8 the court as a line drawing with the three ruled rows
//   9 the two posters of m11, staggered on a flat field   10 footer.

// Intro paragraphs 3, 4 and 6 of the intro slide (m02), verbatim.
const STORY = [INTRO.paragraphs[2], INTRO.paragraphs[3], INTRO.paragraphs[5]];
// "Our Vision" is the third ruled row of the About page (m12): this page carries its name and number.
const VISION = ABOUT.rows[2];
// The brand lines, each beside a flat field in the photo tones (stand-ins for the photographs).
const LINE_ROWS = [
  { line: LINES.imagination, field: 'field-wall' },
  { line: LINES.elevate, field: 'field-timber' },
  { line: LINES.builtAround, field: 'field-desert' },
  { line: LINES.refinedLiving, field: 'field-dusk' },
];
// The three ruled rows of the About page (m12) lead to the landing pages of the same names.
const ROWS = ABOUT.rows.map((r, i) => ({ ...r, href: ['/lp-philosophy/', '/lp-process/', '/lp-vision/'][i] }));

export default function Page() {
  return (
    <section className="page" id="p-lp-vision" aria-label="Landing: Our Vision" style={{ paddingBottom: 0 }}>
      {/* 1 and 2: navigation over the hero */}
      <div className={s.stage}>
        <div className={s.navOver}>
          <LandingNav current="lp-vision" tone="dark" />
        </div>
        <Hero />
      </div>

      {/* 3: Our Vision, the intro slide's paragraphs justified in two columns, the construction drawing on */}
      <section className={`${s.intro} wrap`} aria-labelledby="lp-vision-intro-title">
        <div className={s.introHead}>
          <Reveal className={s.introTitle}>
            <p className="t-num">{VISION.no}</p>
            <h2 id="lp-vision-intro-title" className="t-display">{VISION.label}</h2>
          </Reveal>
          <div className={s.introCols}>
            <Reveal delay={120}>
              <p className={`t-justify ${s.introMore}`}>{INTRO.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={200}>
              <p className={`t-justify ${s.introMore}`}>{INTRO.paragraphs[1]}</p>
            </Reveal>
          </div>
        </div>
        <Reveal from="scale" className={s.construction}>
          <Art viewBox={CONSTRUCTION_BOX} title="Construction drawing of the word-mark, guides and anchors" exportName="lp-vision-construction">
            <rect x="-90" y="-40" width={WM.W + 180} height={WM.DESC + 90} fill={DRAWING.paper} />
            <ConstructionG draw />
          </Art>
        </Reveal>
      </section>

      {/* 4: the project sheet of m02 */}
      <Scope />

      {/* 5: the brand lines as ruled rows */}
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

      {/* 6: the story: a pinned band whose crop slides while the intro paragraphs rise under it */}
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

      {/* 7: the m14 spread: the poster's beige panel set large at the left, the black statement at the right */}
      <section className={s.spread} aria-labelledby="lp-vision-spread-title">
        <div className={`${s.spreadGrid} wrap`}>
          <div className={s.spreadText}>
            <Reveal>
              <h2 id="lp-vision-spread-title" className="t-display">
                <Lines as="span" rows={LINES.elevate.rows} />
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className={`t-lead ${s.spreadSub}`}>
                <Lines as="span" rows={LINES.refined.rows} />
              </p>
            </Reveal>
            <Reveal delay={200} className={s.spreadFoot}>
              <p className={`t-serif ${s.spreadSign}`}>
                <Lines as="span" rows={LINES.imagination.rows} />
              </p>
              <Button url href="/lp-contact/">sahra.sa</Button>
            </Reveal>
          </div>
          <Reveal delay={80} className={s.spreadArt}>
            <Art viewBox="0 0 800 1131" title="Designing spaces that connect purpose, design and modern living, on Black" exportName="lp-vision-black-statement">
              <BlackStatementG />
            </Art>
          </Reveal>
        </div>
      </section>

      {/* 8: the court as a line drawing, with the three ruled rows */}
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

      {/* 9: the two posters of m11, staggered on a flat field with a hard horizon */}
      <Wall
        left={
          <Art viewBox="0 0 600 840" title="Poster: We Build Spaces of Imagination" exportName="lp-vision-poster-left">
            <PosterLeftG idp="lp-vision-pl" />
          </Art>
        }
        right={
          <Art viewBox="0 0 600 840" title="Poster: Built around how people live today" exportName="lp-vision-poster-right">
            <PosterRightG idp="lp-vision-pr" />
          </Art>
        }
      />

      {/* 10: footer */}
      <LandingFooter />
    </section>
  );
}
