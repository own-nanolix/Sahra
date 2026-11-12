'use client';

import { useEffect, useRef } from 'react';
import Art from '@/components/art/Art';
import { GuideGridG } from '@/components/art/KeyArt';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { LINES } from '@/lib/brand';
import { PlanG } from './plan-art';
import s from './lp-plans.module.css';

// The plan, enlarged on its grid: a wide drawing on White that draws on when it comes into view. Three crops of
// the same plan stand under it (plain labels: the building, the stair, the car park).
const CROPS = [
  { id: 'building', label: 'Building', box: '20 24 214 392' },
  { id: 'stair', label: 'Stair', box: '116 24 120 120' },
  { id: 'park', label: 'Car park', box: '232 24 172 392' },
];

export default function PlanStudy() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        el.setAttribute('data-seen', 'true');
        io.disconnect();
      }
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={s.study} ref={ref} aria-labelledby="lp-plans-study-h">
      <div className="wrap">
        <div className={s.studyHead}>
          <Reveal>
            <p className="t-label sand-ink">Floor plan</p>
            <Lines as="h2" id="lp-plans-study-h" rows={LINES.builtAround.rows} className="t-h1" />
          </Reveal>
          <Reveal delay={120}>
            <p className={`t-lead muted ${s.studyNote}`}>{LINES.refined.text}</p>
          </Reveal>
        </div>

        <div className={s.studyBoard}>
          <Art viewBox="-20 -10 440 460" title="The floor plan, drawn without dimensions or room labels" exportName="lp-plans-plan-large" style={{ width: '100%', height: 'auto' }}>
            <GuideGridG x={-20} y={-10} w={440} h={460} step={20} stroke="#CDBFAE" opacity="0.35" />
            <PlanG ink="#35241C" animate />
          </Art>
        </div>

        <ul className={s.crops}>
          {CROPS.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 90}>
                <Art viewBox={c.box} title={`Plan detail: ${c.label}`} exportName={`lp-plans-detail-${c.id}`} style={{ width: '100%', height: 'auto' }}>
                  <rect x="-20" y="-10" width="440" height="460" fill="#FFFFFF" />
                  <PlanG ink="#875D41" />
                </Art>
                <p className="t-label" style={{ marginTop: 10 }}>{c.label}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
