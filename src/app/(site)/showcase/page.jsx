import { pageMeta } from '@/lib/pages';
import { LINES } from '@/lib/brand';
import { Lines } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import SceneA from '@/components/pages/showcase/SceneA';
import SceneB from '@/components/pages/showcase/SceneB';
import { SceneC1, SceneC2 } from '@/components/pages/showcase/SceneC';
import SceneD from '@/components/pages/showcase/SceneD';
import s from '@/components/pages/showcase/showcase.module.css';

export const metadata = pageMeta('showcase');

function Cap({ left, right }) {
  return (
    <div className="mock-cap">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

function Head({ id, title, note }) {
  return (
    <div className={s.sceneHead}>
      <h2 id={`showcase-h-${id}`} className="t-h3">{title}</h2>
      <p className="t-label">{note}</p>
    </div>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-showcase" aria-label="Showcase">
      <div className="wrap">
        <header className={s.head}>
          <h1 className="t-display" tabIndex={-1}>Showcase</h1>
          <Lines rows={LINES.imagination.rows} className={`t-line ${s.headLine}`} />
        </header>

        <Reveal as="section" className={s.scene} aria-labelledby="showcase-h-a">
          <Head id="a" title="Phone with data cards" note="16:9" />
          <div className="mock"><SceneA /></div>
          <Cap left="Beige wall over a Sand desk" right="Phone on a desk edge, three cards behind" />
        </Reveal>

        <Reveal as="section" className={s.scene} aria-labelledby="showcase-h-b">
          <Head id="b" title="Line-up of eight phones" note="21:9" />
          <div className="mock"><SceneB /></div>
          <Cap left="Sand tint wall over Tribal Brown" right="Eight screens on one shelf" />
        </Reveal>

        <Reveal as="section" className={s.scene} aria-labelledby="showcase-h-c">
          <Head id="c" title="Laptop and tablet" note="5:3 and 4:3" />
          <div className={s.pair}>
            <div>
              <div className="mock"><SceneC1 /></div>
              <Cap left="Tribal Brown wall over Dark Chocolate" right="Laptop on a plinth" />
            </div>
            <div>
              <div className="mock"><SceneC2 /></div>
              <Cap left="Dark Chocolate wall over Sand" right="Tablet on a counter" />
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className={s.scene} aria-labelledby="showcase-h-d">
          <Head id="d" title="Event stage" note="3:1" />
          <div className="mock"><SceneD /></div>
          <Cap left="Tribal Brown tint wall over Beige" right="Stage, screen, counter" />
        </Reveal>
      </div>
    </section>
  );
}
