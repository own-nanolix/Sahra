'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { Lines, Contact } from '@/components/ui/Card';
import { LINES, CONTACT_BLOCKS } from '@/lib/brand';
import { tSun } from '@/lib/motion';
import { ClosingArchArt } from './plan-art';
import s from './lp-plans.module.css';

// The closing call, set on one centre axis: the quarter arch with the mark standing over the brand line, then the
// "→ sahra.sa" button, then the three contact blocks in a row under a rule.
export default function Closing() {
  return (
    <section className={`on-dark ${s.closing}`} aria-labelledby="lp-plans-closing-h">
      <div className={`wrap ${s.closingAxis}`}>
        <motion.div className={s.closingArt} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={tSun}>
          <ClosingArchArt />
        </motion.div>
        <Reveal>
          <Lines as="h2" id="lp-plans-closing-h" rows={LINES.imagination.rows} className="t-display" />
        </Reveal>
        <Reveal delay={120}>
          <Button variant="beige" size="lg" url href="/lp-contact/">sahra.sa</Button>
        </Reveal>
        <Reveal delay={200} className={s.closingBlocks}>
          {[CONTACT_BLOCKS.office, CONTACT_BLOCKS.service, CONTACT_BLOCKS.online].map((b) => <Contact key={b[0]} lines={b} />)}
        </Reveal>
      </div>
    </section>
  );
}
