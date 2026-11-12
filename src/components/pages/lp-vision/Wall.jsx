'use client';

import { useState } from 'react';
import Link from 'next/link';
import Toggle from '@/components/ui/Toggle';
import Reveal from '@/components/site/Reveal';
import s from './lp-vision.module.css';

// The ribbed wall that carries the two posters of m11. One control: the evening light, a slow change of the
// wall's ground and of the raking shade across it (colour and opacity only).
export default function Wall({ children }) {
  const [dusk, setDusk] = useState(false);
  return (
    <section className={`${s.wall} ${dusk ? s.wallDusk : ''}`} aria-labelledby="lp-vision-posters-title">
      <div className="wrap">
        <Reveal className={s.wallHead}>
          <h2 id="lp-vision-posters-title" className={`t-label ${s.wallLabel}`}>Posters</h2>
          <Toggle label="Evening light" checked={dusk} onChange={setDusk} className={s.wallToggle} />
        </Reveal>
        <div className={s.posters}>{children}</div>
        <p className={s.wallFoot}>
          <Link href="/lp-spaces/" className="link">Spaces</Link>
        </p>
      </div>
    </section>
  );
}
