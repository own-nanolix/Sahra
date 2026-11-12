'use client';

import { useState } from 'react';
import Link from 'next/link';
import Toggle from '@/components/ui/Toggle';
import Reveal from '@/components/site/Reveal';
import s from './lp-vision.module.css';

// The two posters of m11, out of their double frame: each stands alone on a flat field of Sand meeting a floor of
// Tribal Brown at a hard horizon, the left one high and wide, the right one lower and narrower, each with its own
// hard shadow to the lower right. One control: the evening light, a slow change of the field and a longer, softer
// shadow (colour, opacity and transform only).
export default function Wall({ left, right }) {
  const [dusk, setDusk] = useState(false);
  return (
    <section className={`${s.wall} ${dusk ? s.wallDusk : ''}`} aria-labelledby="lp-vision-posters-title">
      <div className={`wrap ${s.wallInner}`}>
        <Reveal className={s.wallHead}>
          <h2 id="lp-vision-posters-title" className={`t-label ${s.wallLabel}`}>Posters</h2>
          <Toggle label="Evening light" checked={dusk} onChange={setDusk} className={s.wallToggle} />
        </Reveal>
        <div className={s.posters}>
          <Reveal className={`${s.frame} ${s.frameLeft}`}>{left}</Reveal>
          <Reveal delay={160} className={`${s.frame} ${s.frameRight}`}>{right}</Reveal>
        </div>
        <p className={s.wallFoot}>
          <Link href="/lp-spaces/" className="link">Spaces</Link>
        </p>
      </div>
    </section>
  );
}
