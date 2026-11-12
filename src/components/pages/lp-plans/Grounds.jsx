'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Segmented } from '@/components/ui/Toggle';
import CopyValue from '@/components/site/CopyValue';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { LINES, HEX, SENDER } from '@/lib/brand';
import { tEnter, tMove } from '@/lib/motion';
import { SheetArt } from './plan-art';
import s from './lp-plans.module.css';

// The visitor switches the sheet between Beige and Dark grounds. The stage behind it changes ground with a
// slow colour transition; the sheet is swapped with a short slide. The values listed beside it are the palette's own.
const GROUNDS = {
  Beige: {
    tone: 'beige',
    stage: 'field-beige',
    parts: [
      ['Ground', 'Beige', HEX.beige],
      ['Lines and text', 'Dark Chocolate Brown', HEX.chocolate],
      ['Heading', 'Tribal Brown', HEX.tribal],
      ['Mark', 'Sand', HEX.sand],
    ],
  },
  Dark: {
    tone: 'dark',
    stage: 'field-chocolate',
    parts: [
      ['Ground', 'Dark Chocolate Brown', HEX.chocolate],
      ['Lines and text', 'Beige', HEX.beige],
      ['Heading', 'Sand', HEX.sand],
      ['Mark', 'Sand', HEX.sand],
    ],
  },
};

export default function Grounds() {
  const [ground, setGround] = useState('Beige');
  const g = GROUNDS[ground];
  const dark = ground === 'Dark';
  return (
    <section className={s.grounds} aria-labelledby="lp-plans-grounds-h">
      <div className={`wrap ${s.groundsGrid}`}>
        <div className={s.groundsCopy}>
          <Reveal>
            <p className="t-label sand-ink">{SENDER.developement}</p>
            <Lines as="h2" id="lp-plans-grounds-h" rows={LINES.refined.rows} className="t-line" />
          </Reveal>
          <Reveal delay={100}>
            <div className={s.switchRow}>
              <span className="t-label" id="lp-plans-ground-label">Sheet ground</span>
              <Segmented id="lp-plans-ground" label="Sheet ground" options={['Beige', 'Dark']} value={ground} onChange={setGround} />
            </div>
          </Reveal>
          <Reveal delay={160}>
            <ul className={s.parts} aria-live="polite">
              {g.parts.map(([label, name, hex]) => (
                <li key={label} className={s.part}>
                  <span className={s.swatch} style={{ background: hex }} aria-hidden="true" />
                  <span className={s.partText}>
                    <span className="t-label">{label}</span>
                    <span className="t-serif">{name}</span>
                  </span>
                  <CopyValue value={hex} label={`${name} hex`} className="t-small" />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className={`${s.groundStage} ${dark ? s.stageDark : s.stageLight}`} data-ground={ground}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={g.tone}
              className={s.sheetWrap}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0, transition: tEnter }}
              exit={{ opacity: 0, y: -10, transition: tMove }}
            >
              <SheetArt tone={g.tone} animate={false} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
