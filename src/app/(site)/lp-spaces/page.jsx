import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import Button from '@/components/ui/Button';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { DESCRIPTION, INTRO, LETTER, LINES, POSTER_BODY, PROJECT_TITLE } from '@/lib/brand';
import Hero from '@/components/pages/lp-spaces/Hero';
import Story from '@/components/pages/lp-spaces/Story';
import Sun from '@/components/pages/lp-spaces/Sun';
import SunDial from '@/components/pages/lp-spaces/SunDial';
import { WallPinG, BrickPinG, SunStepsG, FlatPosterG, CardG } from '@/components/pages/lp-spaces/art';
import s from '@/components/pages/lp-spaces/lp-spaces.module.css';

export const metadata = pageMeta('lp-spaces');

// Sections, in order (nav and footer shared):
//   1 nav
//   2 hero: the two posters of m11 as two tall panels, re-measured (headline, body column, three contact blocks, mark)
//   3 the case study's own description, centred between two rules
//   4 the story: TWO pinned visuals at the left (curved wall with sky, curved brick) that swap beside one text column
//   5 the stepped-shadow divider, sliding like the sun along a wall
//   6 the poster of m14 as the print itself, beside the hoarding's line and the fifth intro paragraph
//   7 light on a wall: one plain slider moves the sun and the stair's shadow lengthens
//   8 the white card of m10 (landscape, as printed) beside the letter's words
//   9 footer

// The text column of the story: the poster lines, the poster body and the white card's lines, in the order the
// posters (m11) and the card (m10) print them. `visual` says which of the two pinned visuals is shown.
const STEPS = [
  {
    id: 'lp-spaces-step-imagination',
    visual: 'wall',
    body: (
      <h2 className="t-display">
        <Lines as="span" rows={LINES.imagination.rows} />
      </h2>
    ),
  },
  {
    id: 'lp-spaces-step-body',
    visual: 'wall',
    body: <p className={s.lead}>{POSTER_BODY}</p>,
  },
  {
    id: 'lp-spaces-step-built-around',
    visual: 'brick',
    body: (
      <h2 className="t-display">
        <Lines as="span" rows={LINES.builtAround.rows} />
      </h2>
    ),
  },
  {
    id: 'lp-spaces-step-elevate',
    visual: 'brick',
    body: (
      <>
        <h2 className="t-h1">
          <Lines as="span" rows={LINES.elevate.rows} />
        </h2>
        <p className={`${s.lead} ${s.leadAfter}`}>{LINES.refined.text}</p>
      </>
    ),
  },
];

export default function Page() {
  return (
    <section className="page" id="p-lp-spaces" aria-label="Landing: Spaces" style={{ paddingBottom: 0 }}>
      {/* 1: navigation */}
      <LandingNav current="lp-spaces" />

      {/* 2: the two posters of m11 as two tall panels */}
      <Hero />

      {/* 3: the case study's own description, centred under the posters, between two rules */}
      <section className={`${s.intro} wrap`} aria-labelledby="lp-spaces-intro-title">
        <Reveal>
          <h2 id="lp-spaces-intro-title" className="t-label">{PROJECT_TITLE}</h2>
        </Reveal>
        <Reveal delay={120}>
          <p className={s.introText}>{DESCRIPTION}</p>
        </Reveal>
      </section>

      {/* 4: the story: two pinned visuals that swap beside one text column */}
      <Story
        steps={STEPS}
        visuals={{
          wall: (
            <Art viewBox="0 0 640 800" title="A curved wall against the sky" exportName="lp-spaces-curved-wall" className={s.visual}>
              <WallPinG idp="lp-spaces-wall" />
            </Art>
          ),
          brick: (
            <Art viewBox="0 0 640 800" title="A wall of curved brick" exportName="lp-spaces-curved-brick" className={s.visual}>
              <BrickPinG idp="lp-spaces-brick" />
            </Art>
          ),
        }}
      />

      {/* 5: the stepped-shadow divider, the sun moving on a wall */}
      <Sun>
        <Art viewBox="0 0 3120 400" title="Staircases of light and shade on a plaster wall" exportName="lp-spaces-sun-steps" className={s.sunArt} preserveAspectRatio="xMidYMid slice" decorative>
          <SunStepsG idp="lp-spaces-sun" />
        </Art>
      </Sun>

      {/* 6: the poster of m14 as the print itself, flat in its thin black frame, beside the hoarding's line */}
      <section className={`${s.framed} wrap`} aria-labelledby="lp-spaces-framed-title">
        <Reveal from="scale" className={s.framedArt}>
          <Art viewBox="0 0 524 829" title="Poster: Spaces that elevate everyday living with intention" exportName="lp-spaces-framed-poster">
            <FlatPosterG idp="lp-spaces-fp" />
          </Art>
        </Reveal>
        <div className={s.framedText}>
          <Reveal>
            <h2 id="lp-spaces-framed-title" className="t-h2">
              <Lines as="span" rows={LINES.refinedLiving.rows} />
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="t-lead">{INTRO.paragraphs[4]}</p>
          </Reveal>
          <Reveal delay={200}>
            <Button url href="/lp-contact/">sahra.sa</Button>
          </Reveal>
        </div>
      </section>

      {/* 7: light on a wall: one control moves the sun */}
      <section className={`${s.light} wrap`} aria-label="Light on a wall">
        <SunDial />
      </section>

      {/* 8: the white card, with the letter's words */}
      <section className={`${s.card} field-studio`} aria-labelledby="lp-spaces-card-title">
        <div className={`${s.cardGrid} wrap`}>
          <div className={s.cardText}>
            <Reveal>
              <h2 id="lp-spaces-card-title" className="t-label">{LETTER.sender}</h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="t-lead">{LETTER.paragraphs[0]}</p>
            </Reveal>
            <Reveal delay={180}>
              <p className="t-body muted">{LETTER.paragraphs[2]}</p>
            </Reveal>
          </div>
          <Reveal from="scale" className={s.cardArt}>
            <Art viewBox="0 0 680 520" title="White card: Spaces that elevate everyday living with intention" exportName="lp-spaces-card">
              <CardG idp="lp-spaces-cd" />
            </Art>
          </Reveal>
        </div>
      </section>

      {/* 9: footer */}
      <LandingFooter />
    </section>
  );
}
