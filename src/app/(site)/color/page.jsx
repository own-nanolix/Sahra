import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import { HEX } from '@/lib/brand';
import PaletteSlide from '@/components/pages/color/PaletteSlide';
import SpecTable from '@/components/pages/color/SpecTable';
import { ProportionBar, ScaleArt, TintLadder } from '@/components/pages/color/ScaleArt';
import { PairingArt, SemanticArt } from '@/components/pages/color/PairingArt';
import { PairingTester, TintMixer } from '@/components/pages/color/Tester';
import { NEUTRAL_SCALE, PAIRINGS, PRIMARY_SCALE, ratio } from '@/components/pages/color/data';
import s from '@/components/pages/color/color.module.css';

export const metadata = pageMeta('color');

function Head({ no, title, children }) {
  return (
    <Reveal className={s.sectionHead}>
      <span className="t-num">{no}</span>
      <h2 className="t-h2">{title}</h2>
      {children ? <p className="t-lead muted">{children}</p> : null}
    </Reveal>
  );
}

export default function Page() {
  const sandOnBeige = ratio(HEX.sand, HEX.beige);
  const sandInkOnBeige = ratio(HEX.sandInk, HEX.beige);
  return (
    <section className="page" id="p-color" aria-label="Colour">
      <div className="wrap">
        <header className={s.hero}>
          <h1 className="t-display" tabIndex={-1}>
            <span className={s.heroLine}><span style={{ '--i': 0 }}>Colour</span></span>
          </h1>
          <div className={s.heroText}>
            <p className="t-lead slide-up" style={{ '--i': 3 }}>
              Six colours taken from the desert: Black and Dark Chocolate Brown for depth, Tribal Brown and Sand for
              warmth, Beige and White for light. Tribal Brown, Sand and Beige carry four published tints.
            </p>
          </div>
        </header>

        <div className={s.slideFrame}>
          <PaletteSlide />
        </div>
        <p className={`t-small ${s.slideCap}`}>
          <span>The palette as published: names, HEX, RGB, HSB and CMYK exactly as printed.</span>
          <span>Click any value in the tables below to copy it.</span>
        </p>

        <Head no="01" title="Colour scales">
          Every step of the scale with its token, HEX and RGB. Contrast on the light ground (Beige) and on the dark
          ground (Dark Chocolate Brown) is computed from the hex values.
        </Head>
        <div className="bento bento-6">
          <Reveal className="tile span-6">
            <h3 className="t-h3">Primary scale</h3>
            <p className="t-small">Dark Chocolate Brown, then Tribal Brown and Sand at 100, 80, 60, 40 and 20%.</p>
            <SpecTable rows={PRIMARY_SCALE} caption="Primary colour scale" />
          </Reveal>
          <Reveal className="tile span-6">
            <h3 className="t-h3">Neutral scale</h3>
            <p className="t-small">Black, Beige and its tints, White, and the four inks used for small text.</p>
            <SpecTable rows={NEUTRAL_SCALE} caption="Neutral colour scale" />
          </Reveal>
          <Reveal className="tile tile-flush span-6">
            <div className={s.scrollX} tabIndex={0} role="region" aria-label="Primary scale sheet">
              <ScaleArt rows={PRIMARY_SCALE} title="Primary colour scale with contrast on Beige and on Dark Chocolate Brown" exportName="color-scale-primary" />
            </div>
          </Reveal>
          <Reveal className="tile tile-flush span-6">
            <div className={s.scrollX} tabIndex={0} role="region" aria-label="Neutral scale sheet">
              <ScaleArt rows={NEUTRAL_SCALE} title="Neutral colour scale with contrast on Beige and on Dark Chocolate Brown" exportName="color-scale-neutral" />
            </div>
          </Reveal>
        </div>

        <Head no="02" title="Tints">
          Each tint is the published colour at 80, 60, 40 and 20% strength over White. Mix any of them below.
        </Head>
        <div className="bento bento-6">
          {['tribal', 'sand', 'beige'].map((t, i) => (
            <Reveal key={t} className="tile tile-flush span-2 span-m-3" delay={i * 80}>
              <TintLadder token={t} exportName={`color-tints-${t}`} />
            </Reveal>
          ))}
          <Reveal className="tile span-6 span-m-3">
            <h3 className="t-h3">Tint mixer</h3>
            <TintMixer />
          </Reveal>
        </div>

        <Head no="03" title="Proportion">
          A suggested balance for a surface: mostly Beige and White, the browns as structure, Sand and Black as accents.
        </Head>
        <div className="bento bento-6">
          <Reveal className="tile tile-flush span-6">
            <div className={s.scrollX} tabIndex={0} role="region" aria-label="Proportion bar">
              <ProportionBar />
            </div>
          </Reveal>
        </div>

        <Head no="04" title="Accessible pairings">
          Six text-on-ground pairings that reach 4.5:1 for small text. Pick your own below.
        </Head>
        <div className="bento bento-6">
          {PAIRINGS.map((p, i) => (
            <Reveal key={p.id} className="tile tile-flush span-2 span-m-3" delay={(i % 3) * 80}>
              <PairingArt pair={p} exportName={`color-pairing-${p.id}`} />
              <div className="tile" style={{ borderRadius: 0 }}>
                <p className="t-small">{p.use}</p>
              </div>
            </Reveal>
          ))}
          <Reveal className="tile span-4 span-m-6">
            <h3 className="t-h3">Pairing tester</h3>
            <PairingTester />
          </Reveal>
          <Reveal className={`tile tile-beige span-2 span-m-6 ${s.note}`}>
            <h3 className="t-h3">One that fails</h3>
            <p className={s.noteFig}>{sandOnBeige}:1</p>
            <p className="t-body">
              Sand on Beige. Small Sand-coloured text on Beige or White uses Sand ink, which reaches{' '}
              {sandInkOnBeige}:1. Large type and artwork keep Sand.
            </p>
          </Reveal>
        </div>

        <Head no="05" title="Semantic tokens">
          The same names in light and in dark mode: ground, surface, text, muted text, accent and action.
        </Head>
        <div className="bento bento-6">
          <Reveal className="tile tile-flush span-3">
            <SemanticArt mode="light" exportName="color-semantic-light" />
          </Reveal>
          <Reveal className="tile tile-flush span-3" delay={100}>
            <SemanticArt mode="dark" exportName="color-semantic-dark" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
