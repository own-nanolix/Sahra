import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import TypeSlide from '@/components/pages/typography/TypeSlide';
import { CharsetArt, PrimaryArt, ScaleArt, SecondaryArt } from '@/components/pages/typography/FaceArt';
import { BoxesArt, BreaksArt, ContactsArt, LeadingArt, UrlArt } from '@/components/pages/typography/HabitArt';
import { BeigePoster, HierarchyArt } from '@/components/pages/typography/PosterArt';
import { Lines } from '@/components/ui/Card';
import RuledRows from '@/components/ui/RuledRows';
import { ABOUT } from '@/lib/brand';
import Tester from '@/components/pages/typography/Tester';
import { SCALE } from '@/components/pages/typography/data';
import s from '@/components/pages/typography/typography.module.css';

export const metadata = pageMeta('typography');

function Head({ no, title, children }) {
  return (
    <Reveal className={s.sectionHead}>
      <span className="t-num">{no}</span>
      <h2 className="t-h2">{title}</h2>
      {children ? <p className="t-lead muted">{children}</p> : null}
    </Reveal>
  );
}

function Scroll({ label, children }) {
  return (
    <div className={s.scrollX} tabIndex={0} role="region" aria-label={label}>
      {children}
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-typography" aria-label="Typography">
      <div className="wrap">
        <header className={s.hero}>
          <h1 className="t-display" tabIndex={-1}>
            <span className={s.heroLine}><span style={{ '--i': 0 }}>Typography</span></span>
          </h1>
          <div className={s.heroText}>
            <p className="t-lead slide-up" style={{ '--i': 3 }}>
              Two voices: a text serif for headlines and brand lines, a light grotesque for everything small. The
              balance between them is the brand&apos;s dialogue between elegance and precision.
            </p>
            <p className="t-small slide-up" style={{ '--i': 4 }}>
              The brand serif, Test Tiempos Text, is a commercial face. This site is set in the closest free match;
              the font names are in the report.
            </p>
          </div>
        </header>

        <div className={s.slideFrame}>
          <TypeSlide />
        </div>
        <p className={`t-small ${s.slideCap}`}>
          <span>The type slide as published: copy, weights and specimen as printed.</span>
          <span>The three lighter weights are set in a darker grey so they can be read.</span>
        </p>

        <Head no="01" title="The two typefaces">
          The serif in four weights; the sans in the three it needs. Headlines are sentence case, never all capitals.
        </Head>
        <div className="bento">
          <Reveal className="tile tile-flush span-7">
            <Scroll label="Primary typeface sheet"><PrimaryArt /></Scroll>
          </Reveal>
          <Reveal className="tile tile-flush span-5" delay={100}>
            <Scroll label="Secondary typeface sheet"><SecondaryArt /></Scroll>
          </Reveal>
        </div>

        <Head no="02" title="The type scale">
          Ten steps from Display to Contact. Each is a shared class; sizes shown are at a 1440 px screen and grow and
          shrink with the window.
        </Head>
        <div className="bento">
          <Reveal className="tile tile-flush span-8">
            <Scroll label="Type scale sheet"><ScaleArt /></Scroll>
          </Reveal>
          <Reveal className="tile tile-beige span-4" delay={100}>
            <h3 className="t-h3">Where each step is used</h3>
            <ul className={s.habits}>
              {SCALE.map((x) => (
                <li key={x.cls}>
                  <span className="t-num">{x.size}</span>
                  <span>
                    <b className="t-serif" style={{ fontWeight: 400 }}>{x.name}</b>
                    <span className="t-small"> {x.voice === 'serif' ? 'serif' : 'sans'}, leading {x.lh}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Head no="03" title="Character set">
          Capitals, lower case, figures and the symbols of the slide, then every glyph in its own cell.
        </Head>
        <div className="bento">
          <Reveal className="tile tile-flush span-12">
            <Scroll label="Character set sheet"><CharsetArt /></Scroll>
          </Reveal>
        </div>

        <Head no="04" title="Hierarchy in use">
          Two posters rebuilt: the black poster with its four levels marked, and the beige poster of the pair.
        </Head>
        <div className="bento">
          <Reveal className="tile tile-flush tile-print span-8">
            <Scroll label="Hierarchy poster"><HierarchyArt /></Scroll>
          </Reveal>
          <Reveal className="tile tile-flush tile-print span-4" delay={100}>
            <BeigePoster />
          </Reveal>
        </div>

        <Head no="05" title="The voices on a page">
          The About page of the case study, set live: label, headline, text and ruled rows in the two voices.
        </Head>
        <div className="bento">
          <Reveal className="tile span-5 span-m-6">
            <p className="t-label">{ABOUT.label}</p>
            <Lines rows={ABOUT.headline.rows} as="p" className="t-h1" />
            <p className="t-body muted" style={{ marginTop: 16 }}>{ABOUT.text}</p>
          </Reveal>
          <Reveal className="tile tile-beige span-7 span-m-6" delay={100}>
            <RuledRows id="typography-about" rows={ABOUT.rows} />
            <p className="t-small" style={{ marginTop: 16 }}>
              Number and label are small sans; the row title is the serif at 24 px; the plus is drawn, not typed.
            </p>
          </Reveal>
        </div>

        <Head no="06" title="Habits of the line">
          Short lines, tight leading, a line pushed to both ends. Line boxes show how much room each step takes.
        </Head>
        <div className="bento">
          <Reveal className="tile tile-flush span-12">
            <Scroll label="Line-breaking habits"><BreaksArt /></Scroll>
          </Reveal>
          <Reveal className="tile tile-flush span-6">
            <Scroll label="Leading study"><LeadingArt /></Scroll>
          </Reveal>
          <Reveal className="tile tile-flush span-6" delay={100}>
            <Scroll label="Line boxes"><BoxesArt /></Scroll>
          </Reveal>
        </div>

        <Head no="07" title="Address and contacts">
          The web address always carries its arrow. Contacts are set very small, in stacked blocks of three lines.
        </Head>
        <div className="bento">
          <Reveal className="tile tile-flush span-6">
            <Scroll label="Web address style"><UrlArt /></Scroll>
          </Reveal>
          <Reveal className="tile tile-flush span-6" delay={100}>
            <Scroll label="Contact blocks"><ContactsArt /></Scroll>
          </Reveal>
        </div>

        <Head no="08" title="Type tester">
          Set your own text in either voice and change weight, size, leading and tracking.
        </Head>
        <div className="bento">
          <Reveal className="tile span-12">
            <Tester />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
