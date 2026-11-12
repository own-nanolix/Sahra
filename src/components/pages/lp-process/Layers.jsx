'use client';

import { useState } from 'react';
import Chip from '@/components/ui/Chip';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { LINES } from '@/lib/brand';
import { PlanArt, LAYERS } from './PlanArt';
import s from './lp-process.module.css';

// The plan on its own, large, with one chip per layer: take layers away to read the plan a part at a time.
// The labels are plain English names of what each layer draws (our words), nothing more.
const LABELS = {
  shell: 'Walls',
  openings: 'Doors',
  grid: 'Grid',
  people: 'Desks',
  circulation: 'Dashed path',
  light: 'Windows',
  scale: 'Scale bar',
  flow: 'Arrows',
  materials: 'Hatching',
  park: 'Car park',
};

export default function Layers() {
  const [on, setOn] = useState(LAYERS);
  const toggle = (id) => setOn((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));
  return (
    <section className={s.layers} id="lp-process-layers" aria-labelledby="lp-process-layers-title">
      <div className="wrap">
        <div className={s.layersGrid}>
          <Reveal className={s.layersPlan}>
            <PlanArt idp="lp-process-layers" exportName="lp-process-plan-layers" hl={on} />
          </Reveal>
          <Reveal delay={140} className={s.layersSide}>
            <Lines as="h2" id="lp-process-layers-title" className="t-h3" rows={LINES.cleanArchitecture.rows} />
            <p className={`t-label ${s.layersText}`}>Plan layers</p>
            <div className={s.layersChips} role="group" aria-label="Plan layers">
              {LAYERS.map((id) => (
                <Chip key={id} pressed={on.includes(id)} onClick={() => toggle(id)}>
                  {LABELS[id]}
                </Chip>
              ))}
            </div>
            <div className="row" style={{ marginTop: 20 }}>
              <Button size="sm" variant="outline" onClick={() => setOn(LAYERS)}>All layers</Button>
              <Button size="sm" variant="ghost" onClick={() => setOn([])}>Clear</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
