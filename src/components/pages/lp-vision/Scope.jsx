'use client';

import { motion } from 'framer-motion';
import { SHEET } from '@/lib/brand';
import { ease, dur, stagger } from '@/lib/motion';
import s from './lp-vision.module.css';

// The project sheet of m02, as printed: five label / value rows. Here it is set as a narrow ledger in the right
// two thirds of the page, the label small at the left of each row and the value in the serif; each rule draws on
// along the grid, and the "/" separated scope of work breaks into its four parts, one under another.
export default function Scope() {
  return (
    <section className={`${s.scope} wrap`} aria-labelledby="lp-vision-scope-title">
      <h2 id="lp-vision-scope-title" className={`t-label ${s.scopeHead}`}>{SHEET[1][1]}</h2>
      <dl className={s.scopeList}>
        {SHEET.map(([label, value], i) => (
          <motion.div
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
              aria-hidden="true"
            />
            <dt className="t-small muted">{label}</dt>
            <dd className={s.scopeValue}>
              {value.split(' / ').map((part) => <span key={part} className="t-h3">{part}</span>)}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}
