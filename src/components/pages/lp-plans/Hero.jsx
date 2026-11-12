'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { LINES, URL_LINE } from '@/lib/brand';
import { ease, tEnter, tSun, dur } from '@/lib/motion';
import { HeroTabletArt } from './plan-art';
import s from './lp-plans.module.css';

// Hero: a tablet with the plan screen, tilted, on Tribal Brown. The headline sits low at the left; the tablet
// is set down from the right, its shadow lengthens, and the plan draws on along its grid.
const lineV = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: dur.d4, ease: ease.out, delay: 0.15 + i * 0.12 } }),
};

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="lp-plans-h1">
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.heroCopy}>
          <motion.p className={s.heroLabel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={tEnter}>
            Floor plan
          </motion.p>
          <h1 id="lp-plans-h1" tabIndex={-1} className="t-display">
            {LINES.elevate.rows.map((r, i) => (
              <span key={r} className={s.lineMask}>
                <motion.span custom={i} variants={lineV} initial="hidden" animate="show" style={{ display: 'block' }}>
                  {r}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p className={`t-lead ${s.heroSub}`} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...tEnter, delay: 0.7 }}>
            {LINES.refined.text}
          </motion.p>
          <motion.div className="row" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ ...tEnter, delay: 0.85 }} style={{ marginTop: 28 }}>
            <Button variant="beige" url href="/lp-contact/" size="lg">sahra.sa</Button>
            <span className="sr-only">{URL_LINE}</span>
          </motion.div>
        </div>
        <motion.div
          className={s.heroArt}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={tSun}
        >
          <HeroTabletArt />
        </motion.div>
      </div>
    </section>
  );
}
