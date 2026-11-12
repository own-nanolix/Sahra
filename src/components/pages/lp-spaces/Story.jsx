'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal from '@/components/site/Reveal';
import { ease, dur } from '@/lib/motion';
import s from './lp-spaces.module.css';

// The story scroll with TWO pinned visuals that swap. The visuals (a curved wall with sky, curved brick) stay
// pinned at the left; one text column scrolls at the right. When a step with `visual: 'brick'` reaches the
// middle of the screen, the brick rises over the wall behind a clip that opens upwards, and back again.
// `visuals` = { wall, brick } (server-rendered artwork); `steps` = [{ id, visual, body }] (body is React content).
const NAMES = { wall: 'Curved wall with sky', brick: 'Curved brick' };

export default function Story({ visuals, steps }) {
  const box = useRef(null);
  const [active, setActive] = useState(0);

  // The step nearest the middle of the screen decides which visual is shown (set from the observer callback).
  useEffect(() => {
    const els = box.current ? [...box.current.querySelectorAll('[data-step]')] : [];
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute('data-step')));
        });
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const showing = steps[active]?.visual || 'wall';
  const go = (visual) => {
    const i = steps.findIndex((st) => st.visual === visual);
    const el = box.current?.querySelector(`[data-step="${i}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div ref={box} className={`story ${s.story}`} style={{ '--story': '6fr 5fr' }}>
      <div className={`story-pin ${s.pin}`}>
        <div className={s.pinFrame}>
          <div className={`${s.layer} ${s.layerWall}`}>{visuals.wall}</div>
          <div className={`${s.layer} ${s.layerBrick} ${showing === 'brick' ? s.layerOn : ''}`}>{visuals.brick}</div>
        </div>
        <p className={s.pinCount} aria-hidden="true">
          {String(active + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
        </p>
        <div className={s.pinFoot} role="group" aria-label="Pinned visual">
          {Object.keys(NAMES).map((k) => (
            <button key={k} type="button" className={s.pinBtn} aria-pressed={showing === k} onClick={() => go(k)}>
              {NAMES[k]}
            </button>
          ))}
        </div>
      </div>
      <div className={`story-steps ${s.steps}`}>
        {steps.map((st, i) => (
          <article key={st.id} data-step={i} className={`story-step ${s.step} ${active === i ? s.stepOn : ''}`}>
            <Reveal>
              <p className="t-num">{String(i + 1).padStart(2, '0')}</p>
              <motion.span
                className={s.stepRule}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: dur.d4, ease: ease.draw }}
              />
              {st.body}
            </Reveal>
          </article>
        ))}
      </div>
    </div>
  );
}
