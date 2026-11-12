'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Phone from '@/components/ui/Phone';
import Icon from '@/components/site/Icon';
import { tEnter } from '@/lib/motion';
import { SCREENS } from './Screens';
import s from './mobile-b.module.css';

const SCREEN_STYLE = { containerType: 'inline-size' };
const BLOCK = 'input, textarea, select, [contenteditable], [role="dialog"], [role="radiogroup"], [role="tablist"], [role="slider"]';

// Two tiles that share one state: the live phone (right) and the nine screens as a 3 x 3 (click selects).
export default function Showcase() {
  const [n, setN] = useState(10);
  const [dir, setDir] = useState(1);
  const idx = n - 10;
  const show = (v) => {
    const k = Math.min(18, Math.max(10, v));
    setDir(k >= n ? 1 : -1);
    setN(k);
  };
  const onKey = (e) => {
    if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) return;
    if (e.target.closest && e.target.closest(BLOCK)) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); show(n + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(n - 1); }
  };
  const { C, title } = SCREENS[idx];
  return (
    <>
      <div className={`tile tile-dark ${s.phoneTile}`}>
        <section className={s.live} aria-label="Live phone" tabIndex={0} onKeyDown={onKey}>
          <h2 className="t-h3">Live phone</h2>
          <p className="t-small" aria-live="polite">
            Screen {n}, {title}. Left and Right arrow keys step through the screens.
          </p>
          <Phone className={s.livePhone} screenStyle={SCREEN_STYLE} exportName="mobile-b-phone-frame">
            <motion.div key={n} className={s.fill} initial={{ opacity: 0, x: dir * 36 }} animate={{ opacity: 1, x: 0, transition: tEnter }}>
              <C name="mobile-b-live" go={show} />
            </motion.div>
          </Phone>
          <div className={s.stepper}>
            <button type="button" className="btn btn-beige btn-sm btn-icon" aria-label="Previous screen" disabled={n === 10} onClick={() => show(n - 1)}>
              <Icon name="chevron-left" size={20} />
            </button>
            <ol className={s.nums}>
              {SCREENS.map((x) => (
                <li key={x.n}>
                  <button type="button" className={s.numBtn} aria-label={`Screen ${x.n}, ${x.title}`} aria-current={x.n === n ? 'true' : undefined} onClick={() => show(x.n)}>
                    {x.n}
                  </button>
                </li>
              ))}
            </ol>
            <button type="button" className="btn btn-beige btn-sm btn-icon" aria-label="Next screen" disabled={n === 18} onClick={() => show(n + 1)}>
              <Icon name="chevron-right" size={20} />
            </button>
          </div>
        </section>
      </div>

      <div className={`tile tile-beige ${s.gridTile}`}>
        <h2 className="t-h3">All nine screens</h2>
        <ul className={s.grid3}>
          {SCREENS.map((x) => (
            <li key={x.n} className={s.cell} data-current={x.n === n ? 'true' : undefined}>
              <div inert aria-hidden="true">
                <Phone className={s.cellPhone} screenStyle={SCREEN_STYLE}>
                  <x.C name={`mobile-b-${x.n}`} go={undefined} />
                </Phone>
              </div>
              <button type="button" className={s.cellBtn} aria-label={`Show screen ${x.n}, ${x.title}`} aria-current={x.n === n ? 'true' : undefined} onClick={() => show(x.n)} />
              <p className="t-label">{x.n} {x.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
