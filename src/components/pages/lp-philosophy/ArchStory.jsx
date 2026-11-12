'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import { INTRO, LINES, ABOUT } from '@/lib/brand';
import { ArchFill, SEGMENTS } from './ArchArt';
import s from './lp-philosophy.module.css';

// The story scroll: the quarter arch is pinned at the LEFT and fills one segment per paragraph while the six
// paragraphs of the intro slide (m02, verbatim) scroll past at the right. The step nearest the middle of the
// screen is the active one; the arch follows it.
export default function ArchStory() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean);
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

  const goTo = (i) => {
    const el = refs.current[i];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className={s.story} id="lp-philosophy-story" aria-labelledby="lp-philosophy-story-title">
      <div className="wrap">
        <div className={s.storyHead}>
          <p className="t-label">{LINES.imagination.text}</p>
          <h2 id="lp-philosophy-story-title" className="t-h2 t-balance">
            {LINES.intention.rows.map((r) => (
              <span key={r} style={{ display: 'block' }}>{r}</span>
            ))}
          </h2>
          <p className={`t-body ${s.storyLead}`}>{ABOUT.text}</p>
        </div>
        <div className={`story ${s.storyGrid}`} style={{ '--story': '5fr 7fr' }}>
          <div className={`story-pin ${s.pin}`}>
            <div className={s.archBox}>
              <ArchFill active={active} className={s.archSvg} />
              <p className={s.counter} aria-hidden="true">
                <span className="t-figure">{String(active + 1).padStart(2, '0')}</span>
                <span className="t-num"> / {String(SEGMENTS).padStart(2, '0')}</span>
              </p>
            </div>
            <div className={s.dots} role="group" aria-label="Paragraphs">
              {INTRO.paragraphs.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={s.dot}
                  aria-label={`Paragraph ${i + 1}`}
                  aria-current={i === active ? 'true' : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
          <div className={`story-steps ${s.steps}`}>
            {INTRO.paragraphs.map((p, i) => (
              <article
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                data-step={i}
                className={`story-step ${s.step}`}
                data-active={i === active ? 'true' : 'false'}
              >
                <p className="t-num">{String(i + 1).padStart(2, '0')}</p>
                <p className={s.stepText}>{p}</p>
              </article>
            ))}
            <div className={s.stepsEnd}>
              <p className="t-label">{ABOUT.rows[1].no} {ABOUT.rows[1].label}</p>
              <Button href="/lp-process/" variant="outline" iconRight="arrow-right">{ABOUT.rows[1].label}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
