'use client';

import { useEffect, useRef, useState } from 'react';
import Reveal from '@/components/site/Reveal';
import Button from '@/components/ui/Button';
import RuledRows from '@/components/ui/RuledRows';
import { Lines, Contact } from '@/components/ui/Card';
import { ABOUT, INTRO, LINES, PLAN, POSTER_BODY, CONTACT_BLOCKS } from '@/lib/brand';
import { ArchWindowArt } from './ArtHeader';
import { IntroSlideArt, WallSkyArt, BrickPosterArt, SkyPosterArt, HoardingArt } from './ArtPosters';
import { PlanSheetArt, ContactsArt } from './ArtPlan';
import s from './lp-home.module.css';

// The story scroll: text steps run on the left, one visual stays pinned on the RIGHT (CSS position: sticky) and
// changes as each step crosses the middle of the screen.
const ROW_BODIES = [INTRO.paragraphs[1], INTRO.paragraphs[2], INTRO.paragraphs[3]];
const ROWS = ABOUT.rows.map((r, i) => ({ ...r, body: <p className="t-body">{ROW_BODIES[i]}</p> }));

const VISUALS = [
  { id: 'arch', name: 'Quarter arch', art: <ArchWindowArt /> },
  { id: 'intro', name: 'Intro slide', art: <IntroSlideArt /> },
  { id: 'wall', name: 'Wall and sky poster', art: <WallSkyArt /> },
  { id: 'brick', name: 'Brick poster', art: <BrickPosterArt /> },
  { id: 'sky', name: 'Sky poster', art: <SkyPosterArt /> },
  { id: 'hoarding', name: 'Hoarding', art: <HoardingArt /> },
  { id: 'plan', name: 'Plan sheet', art: <PlanSheetArt /> },
  { id: 'contacts', name: 'Contacts', art: <ContactsArt /> },
];

function Step({ i, label, title, children, setRef }) {
  return (
    <section ref={setRef(i)} className={`story-step ${s.step}`} aria-labelledby={`lp-home-step-${i}`}>
      <Reveal className={s.stepIn}>
        <p className="t-label">
          <span className="t-num">{String(i + 1).padStart(2, '0')}</span> {label}
        </p>
        <h2 id={`lp-home-step-${i}`} className="t-h2 t-balance">{title}</h2>
        {children}
      </Reveal>
    </section>
  );
}

export default function Story() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  const setRef = (i) => (el) => {
    refs.current[i] = el;
  };

  useEffect(() => {
    const els = refs.current.filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(els.indexOf(e.target));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`wrap ${s.storyWrap}`}>
      <div className="story story-right" style={{ '--story': 'minmax(0, 5fr) minmax(0, 6fr)' }}>
        <div className={`story-pin ${s.pin}`}>
          <div className={s.stage} role="group" aria-label={`Pinned visual: ${VISUALS[active].name}`}>
            {VISUALS.map((v, i) => (
              <div key={v.id} className={s.slide} data-active={i === active} aria-hidden={i !== active}>
                {v.art}
              </div>
            ))}
            <ol className={s.dots} aria-hidden="true">
              {VISUALS.map((v, i) => (
                <li key={v.id} data-active={i === active} />
              ))}
            </ol>
          </div>
        </div>

        <div className="story-steps">
          <Step i={0} label="About Sahra" title="Philosophy, Our Process and Our Vision" setRef={setRef}>
            <RuledRows id="lp-home-story-rows" rows={ROWS} />
          </Step>

          <Step i={1} label="Intro" title={LINES.imagination.text} setRef={setRef}>
            <div className="stack">
              {[0, 4, 5].map((n) => (
                <p key={n} className="t-body t-justify">{INTRO.paragraphs[n]}</p>
              ))}
            </div>
          </Step>

          <Step i={2} label="Posters" title="Sahra develops spaces that go beyond structure" setRef={setRef}>
            <p className="t-body">{POSTER_BODY}</p>
          </Step>

          <Step i={3} label="Posters" title={<Lines rows={LINES.builtAround.rows} as="span" />} setRef={setRef}>
            <p className="t-body muted">{LINES.imagination.text}</p>
          </Step>

          <Step i={4} label="Posters" title={<Lines rows={LINES.elevate.rows} as="span" />} setRef={setRef}>
            <p className="t-lead">{LINES.refined.text}</p>
          </Step>

          <Step i={5} label="Hoarding" title={<Lines rows={LINES.refinedLiving.rows} as="span" />} setRef={setRef}>
            <p className="t-lead">{LINES.cleanArchitecture.text}</p>
            <p>
              <Button url href="/lp-contact/">sahra.sa</Button>
            </p>
          </Step>

          <Step i={6} label="Plan sheet" title="Floor planning at Sahra" setRef={setRef}>
            <p className="t-body">{PLAN.text}</p>
          </Step>

          <Step i={7} label="Contacts" title="Riyadh, Saudi Arabia" setRef={setRef}>
            <div className="contact-group">
              <Contact lines={CONTACT_BLOCKS.office} />
              <Contact lines={CONTACT_BLOCKS.service} />
              <Contact lines={CONTACT_BLOCKS.online} />
            </div>
          </Step>
        </div>
      </div>
    </div>
  );
}
