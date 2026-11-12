'use client';

import { useEffect, useRef } from 'react';
import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Lines } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import RuledRows from '@/components/ui/RuledRows';
import { ABOUT } from '@/lib/brand';
import { ease, dur, listV, itemV, tEnter } from '@/lib/motion';
import { still } from '@/lib/site';
import { ArchHeaderArt } from './ArtHeader';
import s from './lp-home.module.css';

// The hero is the phone page of m12 grown to desktop: the small label, the headline, the paragraph and the three
// ruled rows, with the profile card's arch header at the right. Signature moment: the quarter arch fills along its
// length, first as the page loads, then further as the visitor scrolls (the page sets --lp-fill on the wrapper).
const ROWS = [
  { no: '01', label: 'Philosophy', href: '/lp-philosophy/' },
  { no: '02', label: 'Our Process', href: '/lp-process/' },
  { no: '03', label: 'Our Vision', href: '/lp-vision/' },
];

export default function Hero() {
  const ref = useRef(null);
  const base = useMotionValue(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const fill = useTransform([base, scrollYProgress], ([b, p]) => Math.min(1, b + p * 0.8));

  useEffect(() => {
    if (still()) {
      base.set(1);
      return undefined;
    }
    const run = animate(base, 0.42, { duration: dur.d5, ease: ease.draw, delay: 0.5 });
    return () => run.complete();
  }, [base]);

  return (
    <section ref={ref} className={`wrap ${s.hero}`} aria-labelledby="lp-home-h1">
      <div className={s.heroGrid}>
        <motion.div className={s.heroText} variants={listV} initial="hidden" animate="show">
          <motion.p variants={itemV} className="t-label">{ABOUT.label}</motion.p>
          <motion.div variants={itemV}>
            <h1 id="lp-home-h1" tabIndex={-1} className="t-display t-balance">
              <Lines as="span" rows={ABOUT.headline.rows} />
            </h1>
          </motion.div>
          <motion.p variants={itemV} className="t-lead" style={{ maxWidth: '31em' }}>{ABOUT.text}</motion.p>
          <motion.div variants={itemV}>
            <RuledRows id="lp-home-hero-rows" rows={ROWS} />
          </motion.div>
          <motion.p variants={itemV}>
            <Button url href="/lp-contact/">sahra.sa</Button>
          </motion.p>
        </motion.div>

        <motion.div
          className={s.heroCard}
          initial={{ opacity: 0, x: 48 }}
          animate={{ opacity: 1, x: 0, transition: { ...tEnter, duration: dur.d4, delay: 0.2 } }}
        >
          <motion.div className={s.fillWrap} style={{ '--lp-fill': fill }}>
            <ArchHeaderArt />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
