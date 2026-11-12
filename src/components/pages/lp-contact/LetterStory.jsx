'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import Reveal from '@/components/site/Reveal';
import { LETTER, SENDER } from '@/lib/brand';
import { tSun, tMove } from '@/lib/motion';
import { EnvelopeBackArt, LetterArt, EnvelopeFrontArt } from './contact-art';
import s from './lp-contact.module.css';

// A short story scroll: the dark envelope (m10) is pinned at the RIGHT; as the five paragraphs of the letter pass
// at the left, the letter rises out of the envelope and the paragraph being read stays strong on the sheet.
//   step 0 the From and To blocks   steps 1 to 5 the paragraphs   step 6 the close
const STEPS = LETTER.paragraphs.length + 2;
// How far the letter has risen (percent of the stage height) at each step: it comes out and stops.
const RISE = [46, 24, 0, 0, 0, 0, 0];

function Block({ lines }) {
  return (
    <address className={s.letterBlock}>
      {lines.map((l, i) => (
        <span key={l} className={i === 0 ? 'sand-ink' : undefined}>{l}</span>
      ))}
    </address>
  );
}

export default function LetterStory() {
  const [step, setStep] = useState(0);
  const stepsRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setStep(Number(e.target.getAttribute('data-step')));
        });
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    stepsRef.current.querySelectorAll('[data-step]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const active = step >= 1 && step <= LETTER.paragraphs.length ? step : 0;

  return (
    <section className={s.storySection} aria-labelledby="lp-contact-story-h">
      <div className="wrap">
        <div className="story story-right" style={{ '--story': '6fr 5fr' }}>
          <div className={`story-pin ${s.pin}`}>
            <MotionConfig reducedMotion="user">
              <div className={s.envStage} role="group" aria-label="The letter rising out of the dark envelope">
                <div className={s.layer}><EnvelopeBackArt /></div>
                <motion.div className={s.layer} initial={false} animate={{ y: `${RISE[step]}%` }} transition={tSun}>
                  <LetterArt active={active} />
                </motion.div>
                <div className={s.layer}><EnvelopeFrontArt /></div>
              </div>
            </MotionConfig>
            <ol className={s.dots} aria-label="Paragraphs">
              {LETTER.paragraphs.map((p, i) => (
                <motion.li key={p} initial={false} animate={{ opacity: active === i + 1 ? 1 : 0.35, scaleX: active === i + 1 ? 1 : 0.7 }} transition={tMove} className={s.dot} />
              ))}
            </ol>
          </div>

          <div className={`story-steps ${s.steps}`} ref={stepsRef}>
            <div className="story-step" data-step={0}>
              <Reveal>
                <p className="t-label sand-ink">Letter</p>
                <h2 id="lp-contact-story-h" className="t-line">{SENDER.developement}</h2>
                <div className={s.letterBlocks}>
                  <Block lines={LETTER.from} />
                  <Block lines={LETTER.to} />
                </div>
              </Reveal>
            </div>
            {LETTER.paragraphs.map((p, i) => (
              <div key={p} className="story-step" data-step={i + 1}>
                <Reveal>
                  <p className="t-num">{String(i + 1).padStart(2, '0')}</p>
                  <p className={`t-lead ${s.paragraph}`}>{p}</p>
                </Reveal>
              </div>
            ))}
            <div className="story-step" data-step={STEPS - 1}>
              <Reveal>
                <p className="t-h2 t-serif">{LETTER.close}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
