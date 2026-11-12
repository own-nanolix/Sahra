'use client';

import { useEffect, useRef, useState } from 'react';
import Chip from '@/components/ui/Chip';
import { PLAN, LETTER } from '@/lib/brand';
import { PlanArt } from './PlanArt';
import s from './lp-process.module.css';

// The story scroll: the floor plan is pinned in the CENTRE column and the steps alternate left and right of it.
// The step nearest the middle of the screen lights one part of the plan. The texts are the sentences of the plan
// paragraph (m13) and the letter's paragraphs on circulation, light, scale, flow and materials (m10), verbatim.
const sentences = (t) => t.split(/(?<=\.)\s+/);
const PLAN_S = sentences(PLAN.text);
const LETTER_S = sentences(LETTER.paragraphs[3]);

// "Circulation, light, scale and flow": the four words of the letter, each one lights its own layer.
const LENSES = [
  { id: 'circulation', label: 'Circulation' },
  { id: 'light', label: 'Light' },
  { id: 'scale', label: 'Scale' },
  { id: 'flow', label: 'Flow' },
];

const STEPS = [
  { text: PLAN_S[0], hl: ['shell', 'grid'] },
  { text: PLAN_S[1], hl: ['openings', 'park'] },
  { text: PLAN_S[2], hl: ['grid', 'scale'] },
  { text: `${LETTER_S[0]} ${LETTER_S[1]}`, hl: ['people'] },
  { text: LETTER_S[2], hl: null, lens: true },
  { text: LETTER.paragraphs[4], hl: ['materials'] },
];

export default function PlanStory() {
  const [active, setActive] = useState(0);
  const [lens, setLens] = useState('circulation');
  const refs = useRef([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute('data-step')));
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    refs.current.filter(Boolean).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = STEPS[active];
  const hl = step.lens ? [lens] : step.hl;

  return (
    <section className={s.story} id="lp-process-story" aria-labelledby="lp-process-story-title">
      <div className="wrap">
        <h2 id="lp-process-story-title" className={`t-label ${s.storyLabel}`}>Our Process</h2>
        <div className={`story ${s.storyGrid}`}>
          <div className={`story-pin ${s.pin}`}>
            <PlanArt idp="lp-process-story" exportName="lp-process-plan" hl={hl} className={s.pinPlan} />
            <p className={s.pinCount} aria-hidden="true">
              <span className="t-serif">{String(active + 1).padStart(2, '0')}</span>
              <span className="t-num"> / {String(STEPS.length).padStart(2, '0')}</span>
            </p>
          </div>
          <div className={s.steps}>
            {STEPS.map((st, i) => (
              <div
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                data-step={i}
                data-side={i % 2 ? 'r' : 'l'}
                className={s.slot}
                style={{ gridRow: i + 1 }}
              >
              <article
                data-side={i % 2 ? 'r' : 'l'}
                data-active={i === active ? 'true' : 'false'}
                className={`story-step ${s.step}`}
              >
                <p className="t-num">{String(i + 1).padStart(2, '0')}</p>
                <p className={s.stepText}>{st.text}</p>
                {st.lens && (
                  <div className={`row ${s.lenses}`} role="group" aria-label="Show on the plan">
                    {LENSES.map((l) => (
                      <Chip key={l.id} pressed={lens === l.id} onClick={() => { setLens(l.id); setActive(i); }}>
                        {l.label}
                      </Chip>
                    ))}
                  </div>
                )}
              </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
