import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Hoarding from '@/components/pages/use-world/Hoarding';
import Citylight from '@/components/pages/use-world/Citylight';
import Reception from '@/components/pages/use-world/Reception';
import Plaque from '@/components/pages/use-world/Plaque';
import Van from '@/components/pages/use-world/Van';
import Posters from '@/components/pages/use-world/Posters';
import Fence from '@/components/pages/use-world/Fence';
import s from '@/components/pages/use-world/use-world.module.css';

export const metadata = pageMeta('use-world');

function Plate({ Scene, name, note, span, delay = 0 }) {
  return (
    <Reveal delay={delay} className={`${span} ${s.cell}`}>
      <figure className={s.plate}>
        <Scene />
        <figcaption className={s.cap}>
          <h2>{name}</h2>
          <span>{note}</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-world" aria-label="In the world">
      <div className="wrap">
        <header className={s.head}>
          <h1 className="t-h1" tabIndex={-1}>In the world</h1>
          <p className={`t-lead muted ${s.lead}`}>Hoarding, citylight, roll-ups, reception, room plaque, vehicle.</p>
        </header>

        <Reveal className={s.hero}>
          <figure className={s.plate}>
            <Hoarding />
            <figcaption className={s.cap}>
              <h2>Hoarding</h2>
              <span>Street, front view</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className={`bento ${s.grid}`}>
          <Plate Scene={Citylight} name="Citylight and roll-ups" note="Pavement, front view" span="span-7" />
          <Plate Scene={Plaque} name="Room plaque" note="Ribbed wall, close view" span="span-5" delay={80} />
          <Plate Scene={Reception} name="Reception and wayfinding" note="Counter and wall" span="span-5" />
          <Plate Scene={Van} name="Vehicle wrap" note="Side view, kerb in front" span="span-7" delay={80} />
          <Plate Scene={Posters} name="Posters in frames" note="Ribbed wall, front view" span="span-7" />
          <Plate Scene={Fence} name="Site fence panel" note="Front view" span="span-5" delay={80} />
        </div>
      </div>
    </section>
  );
}
