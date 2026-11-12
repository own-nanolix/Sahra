'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { Lines, Contact } from '@/components/ui/Card';
import { LINES, CONTACT_BLOCKS } from '@/lib/brand';
import { tEnter } from '@/lib/motion';
import { SignoffArt } from './contact-art';
import s from './lp-contact.module.css';

// The sign-off on Black: the brand line, "→ sahra.sa", the online block, and the word-mark settling into place.
export default function Signoff() {
  return (
    <section className={`on-dark ${s.signoff}`} aria-labelledby="lp-contact-signoff-h">
      <div className="wrap">
        <div className={s.signGrid}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={tEnter}>
            <Lines as="h2" id="lp-contact-signoff-h" rows={LINES.imagination.rows} className="t-h1" />
          </motion.div>
          <motion.div className={s.signSide} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ ...tEnter, delay: 0.15 }}>
            <Button variant="beige" size="lg" url href="/lp-home/">sahra.sa</Button>
            <Contact lines={CONTACT_BLOCKS.online} />
          </motion.div>
        </div>
        <div className={s.signMark}>
          <SignoffArt />
        </div>
      </div>
    </section>
  );
}
