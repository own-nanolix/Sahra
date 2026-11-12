'use client';

import { motion, MotionConfig } from 'framer-motion';
import { LINES, INTRO, SHEET, CREDITS } from '@/lib/brand';
import { ease, dur, listV, itemV, tDraw, stagger } from '@/lib/motion';
import { CreditBadges } from './Arts';
import s from './overview.module.css';

// The intro slide of the case study rebuilt (m02) on its white ground: the title behind its thin vertical rule at
// the left, the six justified paragraphs in a centre column, the project sheet low as label / value rows, the
// credit badges bottom left, level with the last row of the sheet. The designed entrance: the rule draws down,
// the title rises line by line out of its masks, the paragraphs follow one after another, then the sheet rows
// settle in as they come into view.
const rowV = {
  hidden: { y: '108%' },
  show: (i) => ({ y: '0%', transition: { duration: dur.d4, ease: ease.out, delay: 0.25 + i * 0.12 } }),
};

export default function Opening() {
  return (
    <MotionConfig reducedMotion="user">
      <div className={`field-white ${s.ground}`}>
        <div className={`wrap ${s.opening}`} id="overview-opening" tabIndex={-1}>
          <div className={s.slide}>
            <header className={s.title}>
              <motion.span
                className={s.rule}
                aria-hidden="true"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ ...tDraw, delay: 0.05 }}
              />
              <h1 tabIndex={-1} className={`t-h2 ${s.h1}`}>
                {LINES.imagination.rows.map((row, i) => (
                  <span className={s.mask} key={row}>
                    <motion.span className={s.maskIn} custom={i} variants={rowV} initial="hidden" animate="show">
                      {row}
                    </motion.span>
                  </span>
                ))}
              </h1>
            </header>

            <motion.div className={s.body} variants={listV} initial="hidden" animate="show">
              {INTRO.paragraphs.map((p, i) => (
                <motion.p key={i} variants={itemV} className={`t-justify ${s.para}`}>
                  {p}
                </motion.p>
              ))}
            </motion.div>

            <div className={s.credits} id="overview-credits" tabIndex={-1}>
              <motion.ul
                className={s.creditList}
                aria-label="Credits"
                variants={listV}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              >
                {CREDITS.map((c) => (
                  <motion.li key={c} variants={itemV} className="t-small">
                    {c}
                  </motion.li>
                ))}
              </motion.ul>
              <div className={s.badges}>
                <CreditBadges />
              </div>
            </div>

            <motion.dl
              className={s.sheet}
              aria-label="Project sheet"
              variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.1 } } }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            >
              {SHEET.map(([label, value]) => (
                <motion.div className={s.sheetRow} key={label} variants={itemV}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
