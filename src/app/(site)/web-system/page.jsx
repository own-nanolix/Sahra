import { pageMeta } from '@/lib/pages';
import LandingNav from '@/components/ui/LandingNav';
import LandingFooter from '@/components/ui/LandingFooter';
import RuledRows from '@/components/ui/RuledRows';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import { ABOUT, INTRO, LINES } from '@/lib/brand';
import ButtonSet from '@/components/pages/web-system/ButtonSet';
import LinkSet from '@/components/pages/web-system/LinkSet';
import TagSet from '@/components/pages/web-system/TagSet';
import StateStrip from '@/components/pages/web-system/StateStrip';
import FeatureCards from '@/components/pages/web-system/FeatureCards';
import MegaMenu from '@/components/pages/web-system/MegaMenu';
import Specification from '@/components/pages/web-system/Specification';
import { ButtonAnatomyArt, CardAnatomyArt, RowAnatomyArt } from '@/components/pages/web-system/artwork';
import s from '@/components/pages/web-system/web-system.module.css';

export const metadata = pageMeta('web-system');

// The rows open on the About paragraph and on intro paragraphs of the case study, verbatim.
const ROWS = ABOUT.rows.map((r, i) => ({
  ...r,
  body: <p className="t-body">{[ABOUT.text, INTRO.paragraphs[2], INTRO.paragraphs[3]][i]}</p>,
}));

function Head({ title, note }) {
  return (
    <div className={s.tileHead}>
      <h2>{title}</h2>
      {note && <span>{note}</span>}
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-web-system" aria-label="Web system">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-display">Web system</h1>
          <p className="t-lead t-balance" style={{ maxWidth: '24em' }}>{LINES.refined.text}</p>
          <span className={s.rule} aria-hidden="true" />
        </header>

        <div className="bento">
          <Reveal className="tile span-8 rows-2">
            <Head title="Buttons" note="rest, hover, focus-visible, active, disabled" />
            <ButtonSet />
          </Reveal>

          <Reveal className="tile tile-beige span-4 rows-2" delay={80}>
            <Head title="Links" />
            <LinkSet />
            <div style={{ marginTop: 28 }}>
              <Head title="Tags" />
              <TagSet />
            </div>
          </Reveal>

          <Reveal className="tile tile-line span-12">
            <Head title="Link and tag states" note="rest, hover, focus-visible, active" />
            <StateStrip />
          </Reveal>

          <Reveal className={`tile span-12 ${s.navTile}`}>
            <Head title="Navigation bar" note="light and dark" />
            <div className={s.navDemo}>
              <div className={s.navLight}><LandingNav current="lp-process" tone="light" /></div>
              <div className={s.navDark}><LandingNav current="lp-vision" tone="dark" /></div>
            </div>
          </Reveal>

          <Reveal className="tile tile-line span-12">
            <Head title="Feature cards" note="three structures" />
            <FeatureCards />
          </Reveal>

          <Reveal className="tile tile-beige span-6">
            <Head title="Content block" />
            <div className={s.block}>
              <span className="t-label">{ABOUT.label}</span>
              <Lines as="h3" rows={ABOUT.headline.rows} className="t-h2" />
              <p className="t-body">{ABOUT.text}</p>
            </div>
          </Reveal>

          <Reveal className="tile span-6" delay={80}>
            <Head title="List rows" note="opens as an accordion" />
            <RuledRows id="web-system-rows" rows={ROWS} />
          </Reveal>

          <Reveal className={`tile span-12 ${s.footTile}`}>
            <Head title="Footer" />
            <LandingFooter />
          </Reveal>

          <Reveal className={`tile tile-dark span-12 ${s.megaTile}`}>
            <Head title="Mega menu" note="Escape closes and returns focus" />
            <MegaMenu />
          </Reveal>

          <Reveal className="tile tile-line span-12">
            <Head title="Anatomy" note="measurements in px" />
            <div className={s.anatomy}>
              <ButtonAnatomyArt />
              <RowAnatomyArt />
              <CardAnatomyArt className={s.anatomyWide} />
            </div>
            <div style={{ marginTop: 28 }}>
              <Specification />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
