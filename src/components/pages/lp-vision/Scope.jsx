'use client';

import { motion } from 'framer-motion';
import { SCOPE, SHEET } from '@/lib/brand';
import { ease, dur, stagger } from '@/lib/motion';
import s from './lp-vision.module.css';

// "Scope of work" from the project sheet of m02, as four columns under thin rules that draw on along the grid.
export default function Scope() {
  return (
    <section className={`${s.scope} wrap`} aria-labelledby="lp-vision-scope-title">
      <h2 id="lp-vision-scope-title" className="t-label">{SHEET[0][0]}</h2>
      <ol className={s.scopeList}>
        {SCOPE.map((label, i) => (
          <motion.li
            key={label}
            className={s.scopeItem}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: dur.d3, ease: ease.out, delay: i * stagger }}
          >
            <motion.span
              className={s.scopeRule}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: dur.d4, ease: ease.draw, delay: i * stagger }}
            />
            <span className="t-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="t-h3">{label}</span>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
