'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import Art from '@/components/art/Art';
import { LINES } from '@/lib/brand';
import { ease, dur, stagger } from '@/lib/motion';
import { CourtG } from './art';
import s from './lp-vision.module.css';

// The opening: a full-bleed patch of sky seen up a timber-lined court (the photograph of m14 / m16, drawn as flat
// fields), the brand line bottom left in Beige. The lines rise out of their masks one by one and stop.
export default function Hero() {
  const reduce = useReducedMotion();
  const line = (i) => ({
    initial: reduce ? false : { y: '108%' },
    animate: { y: '0%' },
    transition: { duration: dur.d4, ease: ease.out, delay: 0.35 + i * stagger * 2 },
  });
  return (
    <section className={s.hero} aria-labelledby="lp-vision-hero-title">
      <Art viewBox="0 0 1600 900" title="A patch of sky seen up a timber-lined court" exportName="lp-vision-court" className={s.heroArt} preserveAspectRatio="xMidYMid slice">
        <CourtG idp="lp-vision-court" />
      </Art>
      <div className={s.heroText}>
        <h1 id="lp-vision-hero-title" tabIndex={-1} className={`t-display ${s.heroTitle}`}>
          {LINES.imagination.rows.map((r, i) => (
            <span key={r} className={s.mask}>
              <motion.span style={{ display: 'block' }} {...line(i)}>{r}</motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className={s.heroMeta}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur.d3, ease: ease.out, delay: 1.1 }}
        >
          <span className={s.cue} aria-hidden="true" />
          <p className="t-label on-dark">Our Vision</p>
          <Link href="/lp-contact/" className="site-url on-dark">sahra.sa</Link>
        </motion.div>
      </div>
    </section>
  );
}
