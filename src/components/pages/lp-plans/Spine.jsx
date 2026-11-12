import Reveal from '@/components/site/Reveal';
import { SpineBandArt } from './plan-art';
import s from './lp-plans.module.css';

// The spine of the presentation box laid flat across the page: the contact blocks read as one long line of
// board, from the mark at the left to the first block at the right.
export default function Spine() {
  return (
    <section className={s.spine} aria-labelledby="lp-plans-spine-h">
      <div className="wrap">
        <Reveal className={s.spineHead}>
          <h2 id="lp-plans-spine-h" className="t-label sand-ink">Spine</h2>
          <span className={s.spineRule} aria-hidden="true" />
        </Reveal>
        <Reveal delay={100} className={s.spineBand}>
          <SpineBandArt />
        </Reveal>
      </div>
    </section>
  );
}
