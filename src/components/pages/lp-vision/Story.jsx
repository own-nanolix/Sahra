'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import { LINES } from '@/lib/brand';
import { ease, dur } from '@/lib/motion';
import s from './lp-vision.module.css';

// The story. A wide band stays pinned at the TOP of the screen (the hoarding artwork of m16); as the page scrolls,
// its crop slides sideways, from the field with the word-mark to the beige panel, while text blocks rise under it.
// `art` is the server-rendered band artwork; `steps` are the paragraphs, verbatim.
export default function Story({ art, steps }) {
  const root = useRef(null);
  const view = useRef(null);
  const track = useRef(null);
  const [at, setAt] = useState(0);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end end'] });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v = view.current;
    const t = track.current;
    if (!v || !t) return;
    const max = Math.max(0, t.offsetWidth - v.offsetWidth);
    const k = Math.min(1, Math.max(0, p / 0.92));
    t.style.transform = `translate3d(${-Math.round(max * k)}px, 0, 0)`;
    setAt(Math.min(steps.length - 1, Math.floor(k * steps.length)));
  });

  return (
    <div ref={root} className={s.storyRoot}>
      <div className={s.bandPin}>
        <div ref={view} className={s.bandView}>
          <div ref={track} className={s.bandTrack}>{art}</div>
        </div>
        <motion.div className={s.bandBar} style={{ scaleX: scrollYProgress }} aria-hidden="true" />
        <ol className={s.ticks} aria-hidden="true">
          {steps.map((_, i) => (
            <li key={i} className={`${s.tick} ${i === at ? s.tickOn : ''}`}>{String(i + 1).padStart(2, '0')}</li>
          ))}
        </ol>
      </div>
      <div className={`story-steps ${s.steps}`}>
        {steps.map((text, i) => (
          <article key={i} className={`story-step ${s.step} ${i % 2 ? s.stepRight : ''}`}>
            <Reveal>
              <p className="t-num">{String(i + 1).padStart(2, '0')}</p>
              <motion.span
                className={s.stepRule}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: dur.d4, ease: ease.draw }}
              />
              <p className={s.stepText}>{text}</p>
            </Reveal>
          </article>
        ))}
      </div>
      <Reveal className={s.storyEnd}>
        <p className="t-line">{LINES.imagination.text}</p>
        <Button url href="/lp-contact/">sahra.sa</Button>
      </Reveal>
    </div>
  );
}
