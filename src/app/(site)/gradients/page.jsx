import { pageMeta } from '@/lib/pages';
import { HEX } from '@/lib/brand';
import Reveal from '@/components/site/Reveal';
import { ProfileHeaderArt, SampleTable } from '@/components/pages/gradients/Hero';
import Library from '@/components/pages/gradients/Library';
import Anatomy from '@/components/pages/gradients/Anatomy';
import Grain from '@/components/pages/gradients/Grain';
import Pieces from '@/components/pages/gradients/Pieces';
import Motion from '@/components/pages/gradients/Motion';
import s from '@/components/pages/gradients/gradients.module.css';

export const metadata = pageMeta('gradients');

function Head({ id, title, children }) {
  return (
    <div className={s.sectionHead}>
      <h2 className="t-h2" id={id}>{title}</h2>
      <p className="t-small">{children}</p>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-gradients" aria-label="Gradients and key art">
      <div className="wrap band stack-lg">
        <header className={s.head}>
          <p className="t-label slide-up" style={{ '--i': 0 }}>Brand foundations</p>
          <h1 className="t-h1 slide-up" tabIndex={-1} style={{ '--i': 1 }}>Gradients and key art</h1>
          <p className="t-lead slide-up" style={{ '--i': 2 }}>
            One gradient is printed in the case study: the brown header of the profile card. It is rebuilt first, measured,
            and everything else on this page grows from it in the same palette.
          </p>
        </header>

        <section aria-labelledby="gradients-h-hero">
          <Head id="gradients-h-hero" title="The profile card header">
            Dark Chocolate Brown at the left edge, Tribal Brown at the right, and the lighter quarter arch fading into it.
          </Head>
          <div className="bento">
            <Reveal className={`tile tile-dark span-7 ${s.heroCard}`}>
              <ProfileHeaderArt />
            </Reveal>
            <Reveal delay={90} className={`tile tile-beige span-5 ${s.heroNote}`}>
              <h3 className="t-h3">Measured against the reference</h3>
              <p className="t-small">
                Pixels sampled along one row of the header, as a share of the card width, beside the colour the rebuilt
                two-stop gradient gives at the same place. Stops: {HEX.chocolate} at 0%, {HEX.tribal} at 100%, left to right.
              </p>
              <SampleTable />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="gradients-h-library">
          <Head id="gradients-h-library" title="Gradient library">
            Six gradients named from the published colours. Each plate exports as its own SVG; the rings mark its stops.
          </Head>
          <div className="bento">
            <Library />
          </div>
        </section>

        <section aria-labelledby="gradients-h-anatomy">
          <Head id="gradients-h-anatomy" title="Anatomy of a gradient">
            The vector, the stops and the angle, drawn the way the construction drawing marks the word-mark: blue anchors,
            red angle lines, fine brown rules.
          </Head>
          <div className="bento">
            <Anatomy />
          </div>
        </section>

        <section aria-labelledby="gradients-h-grain">
          <Head id="gradients-h-grain" title="Grain">
            A fine paper grain sits on every surface in the flat lays. Flat against grained, then four levels over Beige
            paper and Tribal Brown board.
          </Head>
          <div className="bento">
            <Grain />
          </div>
        </section>

        <section aria-labelledby="gradients-h-key">
          <Head id="gradients-h-key" title="Key art">
            Six full-size pieces from the brand&apos;s own geometry. The architecture is abstract flat fields and gradients in the
            photo tones; the only lines of text are the ones the case study prints.
          </Head>
          <div className="bento">
            <Pieces />
          </div>
        </section>

        <section aria-labelledby="gradients-h-motion">
          <Head id="gradients-h-motion" title="Motion studies">
            Four loops, slow and exact, with no bounce. The keyframes travel inside each SVG, and each one is finished
            artwork when animation is off.
          </Head>
          <div className="bento">
            <Motion />
          </div>
        </section>
      </div>
    </section>
  );
}
