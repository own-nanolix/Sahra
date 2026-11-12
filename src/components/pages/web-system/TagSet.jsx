'use client';

import { useState } from 'react';
import Chip from '@/components/ui/Chip';
import { TAGS } from '@/lib/brand';
import s from './web-system.module.css';

// Tags: the case study's own tags as static labels in each tone, then the same words as pressable filters.
const TONES = [undefined, 'brown', 'dark', 'sand', 'beige'];

export default function TagSet() {
  const [on, setOn] = useState(['branding']);
  const flip = (t) => setOn((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  return (
    <div className={s.tagBlock}>
      <div className="row" aria-label="Tag tones">
        {TONES.map((tone, i) => (
          <Chip key={tone || 'line'} tone={tone}>{TAGS[i]}</Chip>
        ))}
      </div>
      <div className="row" aria-label="Small tags">
        {TONES.map((tone, i) => (
          <Chip key={tone || 'line'} tone={tone} size="sm">{TAGS[i + 5]}</Chip>
        ))}
      </div>
      <div className="row" role="group" aria-label="Pressable tags">
        {TAGS.slice(0, 4).map((t) => (
          <Chip key={t} pressed={on.includes(t)} onClick={() => flip(t)}>{t}</Chip>
        ))}
      </div>
    </div>
  );
}
