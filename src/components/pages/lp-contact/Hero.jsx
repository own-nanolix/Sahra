'use client';

import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Button from '@/components/ui/Button';
import { LINES, CONTACT_BLOCKS, PEOPLE } from '@/lib/brand';
import { ease, tEnter, dur } from '@/lib/motion';
import { still } from '@/lib/site';
import { CardFrontArt, CardBackArt } from './contact-art';
import s from './lp-contact.module.css';

// Hero: the business card (m08) front and back, turning on a real button, beside the three contact blocks set
// large as printed. The card is set down by turning once on entry; each press turns it half a turn and it lands.
// The blocks carry no labels on any printed piece, so none are added here (the order is the card's: office,
// online, then the second block of lines).
const GROUPS = [
  { key: 'office', lines: CONTACT_BLOCKS.office },
  { key: 'online', lines: CONTACT_BLOCKS.online },
  { key: 'service', lines: CONTACT_BLOCKS.service },
];

export default function Hero() {
  const [side, setSide] = useState('front');
  const ry = useMotionValue(0);
  const shadowX = useTransform(ry, (v) => Math.max(0.1, Math.abs(Math.cos((v * Math.PI) / 180))));
  const shadowO = useTransform(ry, (v) => 0.05 + 0.1 * Math.abs(Math.cos((v * Math.PI) / 180)));

  // Entry: the card comes down from its back to its front, slowly, and stops.
  useEffect(() => {
    if (still()) return undefined;
    ry.set(-180);
    const c = animate(ry, 0, { duration: dur.d5, ease: ease.inOut, delay: 0.25 });
    return () => c.stop();
  }, [ry]);

  const turn = () => {
    const next = side === 'front' ? 'back' : 'front';
    setSide(next);
    animate(ry, next === 'back' ? 180 : 0, still() ? { duration: 0 } : { duration: dur.d4, ease: ease.inOut });
  };

  return (
    <section className={s.hero} aria-labelledby="lp-contact-h1">
      <div className={`wrap ${s.heroGrid}`}>
        <div className={s.cardCol}>
          <div className={s.cardStage}>
            <motion.div className={s.cardShadow} style={{ x: 18, y: 20, scaleX: shadowX, opacity: shadowO }} aria-hidden="true" />
            <motion.div className={s.card} style={{ rotateY: ry }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={tEnter}>
              <div className={`${s.face} ${s.faceFront}`} aria-hidden={side === 'back'}>
                <CardFrontArt />
              </div>
              <div className={`${s.face} ${s.faceBack}`} aria-hidden={side === 'front'}>
                <CardBackArt />
              </div>
            </motion.div>
          </div>
          <div className={s.cardControls}>
            <Button variant="dark" icon="arrow-right" onClick={turn} aria-pressed={side === 'back'} label={side === 'front' ? 'Turn the card to its back' : 'Turn the card to its front'}>
              {side === 'front' ? 'Show back' : 'Show front'}
            </Button>
            <p className="t-small" aria-live="polite">{side === 'front' ? 'Front' : 'Back'}: {PEOPLE.card.name}, {PEOPLE.card.role}</p>
          </div>
        </div>

        <div className={s.heroCopy}>
          <motion.p className="t-label sand-ink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={tEnter}>
            Business card
          </motion.p>
          <h1 id="lp-contact-h1" tabIndex={-1} className="t-h1">
            {LINES.imagination.rows.map((r, i) => (
              <span key={r} className={s.mask}>
                <motion.span
                  style={{ display: 'block' }}
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: dur.d4, ease: ease.out, delay: 0.1 + i * 0.12 }}
                >
                  {r}
                </motion.span>
              </span>
            ))}
          </h1>
          <div className={s.bigBlocks}>
            {GROUPS.map((g, gi) => (
              <motion.address
                key={g.key}
                className={s.bigBlock}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...tEnter, delay: 0.45 + gi * 0.12 }}
              >
                <span className="t-num">{String(gi + 1).padStart(2, '0')}</span>
                {g.lines.map((l) => (
                  <span key={l} className={`t-serif ${s.bigLine}`}>{l}</span>
                ))}
              </motion.address>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
