'use client';

import { motion, MotionConfig } from 'framer-motion';
import { DESCRIPTION, SCOPE, SHEET } from '@/lib/brand';
import { ease, dur, listV, itemV, tDraw } from '@/lib/motion';
import s from './strategy.module.css';

// The designed entrance: a thin rule draws across the top, the title rises out of its mask, the page description
// and the four scope steps follow one after another. Motion is slow and exact; nothing overshoots.
const rise = {
  hidden: { y: '110%' },
  show: (i) => ({ y: '0%', transition: { duration: dur.d4, ease: ease.out, delay: 0.2 + i * 0.12 } }),
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <header className={`wrap ${s.hero}`} id="strategy-hero">
        <motion.span
          className={s.heroRule}
          aria-hidden="true"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={tDraw}
        />
        <div className={s.heroGrid}>
          <div className={s.heroTitle}>
            <p className="t-label">{SHEET[0][0]}</p>
            <h1 tabIndex={-1} className={`t-display ${s.h1}`}>
              {['Strategy'].map((w, i) => (
                <span className={s.mask} key={w}>
                  <motion.span className={s.maskIn} custom={i} variants={rise} initial="hidden" animate="show">
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>
          <div className={s.heroText}>
            <motion.p
              className="t-lead"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: { duration: dur.d3, ease: ease.out, delay: 0.55 } }}
            >
              {DESCRIPTION}
            </motion.p>
            <motion.ol className={s.steps} aria-label="Scope of work" variants={listV} initial="hidden" animate="show">
              {SCOPE.map((c, i) => (
                <motion.li key={c} variants={itemV} className={s.step}>
                  <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t-serif">{c}</span>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </header>
    </MotionConfig>
  );
}
