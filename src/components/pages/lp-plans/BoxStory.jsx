'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import RuledRows from '@/components/ui/RuledRows';
import Reveal from '@/components/site/Reveal';
import { PLAN, ABOUT } from '@/lib/brand';
import { ease, tSun, tMove, dur } from '@/lib/motion';
import { BoxLidArt, BoxSpineArt, BoxTrayArt, BoxSheetArt, BoxRingsArt } from './plan-art';
import s from './lp-plans.module.css';

// The story scroll: the presentation box (m13) is pinned at the LEFT and opens in stages while the plan
// paragraph (verbatim, split at its sentences) and the three ruled rows scroll at the right.
//   stage 0 closed (the lid over the tray) 1 lid 2 spine 3 tray, rings and sheet 4 the sheet lifts
const SENTENCES = PLAN.text.split(/(?<=\.)\s+/);
const NAMES = ['Lid', 'Spine', 'Tray', 'Sheet'];
const ROW_LINKS = ['/lp-philosophy/', '/lp-process/', '/lp-vision/'];
const rows = ABOUT.rows.map((r, i) => ({ ...r, href: ROW_LINKS[i] }));
const slide = (to, delay = 0) => ({ duration: dur.d5, ease: ease.sun, delay: to ? delay : 0 });

export default function BoxStory() {
  const [stage, setStage] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number(e.target.getAttribute('data-step'));
          if (e.isIntersecting) setStage(i + 1);
          else if (i === 0 && e.boundingClientRect.top > 0) setStage(0);
        });
      },
      { rootMargin: '-42% 0px -42% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.storySection} aria-labelledby="lp-plans-story-h">
      <div className="wrap">
        <h2 id="lp-plans-story-h" className="sr-only">The presentation box, opened in stages</h2>
        <div className="story" style={{ '--story': '6fr 5fr' }}>
          <div className={`story-pin ${s.pin}`}>
            <MotionConfig reducedMotion="user">
              <div className={s.boxStage} role="group" aria-label="The presentation box opening in stages">
                <motion.div className={s.layer} initial={false} animate={{ x: stage >= 1 ? '0%' : '26%' }} transition={tSun}>
                  <BoxLidArt />
                </motion.div>
                <motion.div
                  className={s.layer}
                  style={{ transformOrigin: '47% 50%' }}
                  initial={false}
                  animate={{ opacity: stage >= 2 ? 1 : 0, scaleX: stage >= 2 ? 1 : 0.2 }}
                  transition={slide(stage >= 2)}
                >
                  <BoxSpineArt />
                </motion.div>
                <motion.div className={s.layer} initial={false} animate={{ opacity: stage >= 3 ? 1 : 0, x: stage >= 3 ? '0%' : '7%' }} transition={slide(stage >= 3)}>
                  <BoxTrayArt />
                </motion.div>
                <motion.div
                  className={s.layer}
                  initial={false}
                  animate={{ opacity: stage >= 3 ? 1 : 0, x: stage >= 3 ? '0%' : '7%', y: stage >= 4 ? '-3.4%' : '0%' }}
                  transition={stage >= 4 ? tSun : slide(stage >= 3, 0.35)}
                >
                  <BoxSheetArt />
                </motion.div>
                <motion.div className={s.layer} initial={false} animate={{ opacity: stage >= 3 ? 1 : 0, x: stage >= 3 ? '0%' : '7%' }} transition={slide(stage >= 3, 0.5)}>
                  <BoxRingsArt />
                </motion.div>
              </div>
            </MotionConfig>
            <ol className={s.progress} aria-label="Stages">
              {NAMES.map((n, i) => (
                <motion.li key={n} className={s.progressItem} initial={false} animate={{ opacity: stage >= i + 1 ? 1 : 0.42 }} transition={tMove}>
                  <span className={s.progressBar} data-on={stage >= i + 1 ? 'true' : 'false'} />
                  <span className="t-label">{n}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="story-steps">
            {SENTENCES.map((t, i) => (
              <div key={t} className="story-step" data-step={i} ref={(el) => { refs.current[i] = el; }}>
                <Reveal>
                  <p className="t-label sand-ink">{NAMES[i]}</p>
                  <p className={`t-line ${s.sentence}`}>{t}</p>
                </Reveal>
              </div>
            ))}
            <div className="story-step" data-step={SENTENCES.length} ref={(el) => { refs.current[SENTENCES.length] = el; }}>
              <Reveal>
                <p className="t-label sand-ink">{NAMES[3]}</p>
                <RuledRows id="lp-plans-rows" rows={rows} className={s.rowsGap} />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
