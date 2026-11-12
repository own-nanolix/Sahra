'use client';

import { motion } from 'framer-motion';
import CopyValue from '@/components/site/CopyValue';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { LINES, CONTACT } from '@/lib/brand';
import { tEnter } from '@/lib/motion';
import { ArchArt } from './contact-art';
import s from './lp-contact.module.css';

// Every printed contact line as a ruled row with a copy button (the shared CopyValue), on Dark Chocolate.
// The three blocks as printed, unlabelled; each row is named only by what the line is.
const GROUPS = [
  { key: 'office', rows: [['Address', CONTACT.city], ['Phone', CONTACT.phone], ['Email', CONTACT.info]] },
  { key: 'service', rows: [['Phone', CONTACT.phone2], ['Email', CONTACT.support], ['Email', CONTACT.partnerships]] },
  { key: 'online', rows: [['Web', CONTACT.web], ['Handle', CONTACT.handle]] },
];

export default function CopyLines() {
  return (
    <section className={`on-dark ${s.lines}`} aria-labelledby="lp-contact-lines-h">
      <div className={s.linesArch} aria-hidden="true"><ArchArt /></div>
      <div className="wrap">
        <Reveal>
          <p className="t-label">Contact lines</p>
          <Lines as="h2" id="lp-contact-lines-h" rows={LINES.cleanArchitecture.rows} className="t-h2" />
        </Reveal>
        <div className={s.linesGrid}>
          {GROUPS.map((g, gi) => (
            <motion.div
              key={g.key}
              className={s.lineGroup}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ ...tEnter, delay: gi * 0.1 }}
            >
              <p className="t-num">{String(gi + 1).padStart(2, '0')}</p>
              <ul className={s.lineList}>
                {g.rows.map(([label, value]) => (
                  <li key={value} className={s.lineRow}>
                    <span className="t-label">{label}</span>
                    <CopyValue value={value} label={`${label} ${value}`} className={s.copyLine} />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
