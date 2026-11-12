'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { Lines, Contact } from '@/components/ui/Card';
import { LINES, CONTACT_BLOCKS } from '@/lib/brand';
import { tSun } from '@/lib/motion';
import { ClosingArchArt } from './plan-art';
import s from './lp-plans.module.css';

// The closing call: the brand line, the "→ sahra.sa" button and the office contacts, beside the quarter arch.
export default function Closing() {
  return (
    <section className={`on-dark ${s.closing}`} aria-labelledby="lp-plans-closing-h">
      <div className={`wrap ${s.closingGrid}`}>
        <div>
          <Reveal>
            <Lines as="h2" id="lp-plans-closing-h" rows={LINES.imagination.rows} className="t-display" />
          </Reveal>
          <Reveal delay={120}>
            <div className="row" style={{ marginTop: 32, gap: 24 }}>
              <Button variant="beige" size="lg" url href="/lp-contact/">sahra.sa</Button>
              <Contact lines={CONTACT_BLOCKS.office} />
            </div>
          </Reveal>
        </div>
        <motion.div className={s.closingArt} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={tSun}>
          <ClosingArchArt />
        </motion.div>
      </div>
    </section>
  );
}
