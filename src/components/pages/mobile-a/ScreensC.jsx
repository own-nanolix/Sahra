'use client';

import { useEffect, useRef, useState } from 'react';
import { ABOUT, CONTACT_BLOCKS, LINES, PALETTE, PEOPLE } from '@/lib/brand';
import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';
import CopyValue from '@/components/site/CopyValue';
import { Contact, Lines } from '@/components/ui/Card';
import { MarkTileG } from '@/components/art/Mark';
import { StatusBar, Word, MenuButton, BackButton, Row } from './Parts';
import s from './mobile-a.module.css';

// Screens 7 to 9: the full-screen menu, the contacts and the brand sheet.

// 7 Menu: Dark Chocolate, the ruled rows, the sign-off.
export function ScreenMenu({ go }) {
  const rows = [
    ...ABOUT.rows.map((r, i) => ({ ...r, key: r.no, to: [2, 3, 4][i] })),
    // only the case study's three rows are numbered; the two screens added here carry plain labels
    { key: 'contact', no: '', label: 'Contact', to: 8 },
    { key: 'brand', no: '', label: 'Brand', to: 9 },
  ];
  return (
    <div className={`${s.scr} ${s.dark}`}>
      <StatusBar dark />
      <Word className={s.sandWord} style={{ left: 28, top: 74, width: 118 }} />
      <button type="button" className={s.closeBtn} aria-label="Close menu" onClick={() => go(1)}>
        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
      </button>
      <button type="button" className={`${s.mLabel} slide-up`} onClick={() => go(1)}>{ABOUT.label}</button>
      <div className={s.menuRows}>
        {rows.map((r, i) => (
          <div key={r.key} className="slide-up" style={{ '--i': i + 1 }}>
            <Row no={r.no} label={r.label} tall onClick={() => go(r.to)} />
          </div>
        ))}
      </div>
      <button type="button" className={`site-url on-dark ${s.mUrl}`} onClick={() => go(8)}>sahra.sa</button>
    </div>
  );
}

// the three printed blocks, without invented headings: each is named only by its first line
const BLOCKS = ['office', 'service', 'online'];

function CopyBlock({ lines }) {
  const [done, setDone] = useState(false);
  const t = useRef(0);
  useEffect(() => () => clearTimeout(t.current), []);
  const onCopy = async () => {
    const ok = await copy(lines.join('\n'));
    toast(ok ? `Copied: ${lines[0]}` : 'Could not copy');
    setDone(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setDone(false), 1600);
  };
  return (
    <div className={s.cBlock}>
      <Contact lines={lines} className={s.cLines} />
      <button type="button" className={`${s.copyBtn} ${done ? s.copyDone : ''}`} onClick={onCopy} aria-label={`Copy the block ${lines[0]}`}>
        {done ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

// 8 Contact: the three printed blocks with copy buttons, the business card as a small card.
export function ScreenContact({ go }) {
  return (
    <div className={`${s.scr} ${s.beige}`}>
      <StatusBar />
      <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
      <MenuButton onClick={() => go(7)} />
      <h2 className={s.cTitle}>Contact</h2>
      <div className={s.cList}>
        {BLOCKS.map((k, i) => (
          <div key={k} className="slide-up" style={{ '--i': i + 1 }}>
            <CopyBlock lines={CONTACT_BLOCKS[k]} />
          </div>
        ))}
      </div>
      <div className={`${s.bizCard} slide-up`} style={{ '--i': 5 }}>
        <svg className={s.bizMark} viewBox="0 0 184 201" aria-hidden="true"><use href="#site-mark" /></svg>
        <p className={s.bizName}>{PEOPLE.card.name}</p>
        <p className={s.bizRole}>{PEOPLE.card.role}</p>
        <Contact lines={CONTACT_BLOCKS.office} className={s.bizLines} />
      </div>
    </div>
  );
}

const BAND_INK = ['beige', 'beige', 'beige', 'chocolate', 'chocolate', 'chocolate'];

// 9 Brand: the word-mark large, the palette as six bands, the mark tile.
export function ScreenBrand({ go }) {
  return (
    <div className={`${s.scr} ${s.dark}`}>
      <div className={s.brandTop}>
        <StatusBar dark />
        <BackButton onClick={() => go(1)} style={{ left: 22, top: 62 }} />
        <Word className={s.sandWord} style={{ left: 28, top: 126, width: 334 }} />
      </div>
      <ul className={s.bands}>
        {PALETTE.map((p, i) => (
          <li key={p.token} className={`${s.band} slide-up`} style={{ background: `var(--${p.token})`, color: `var(--${BAND_INK[i]})`, '--i': i }}>
            <span className={s.bandName}>{p.name}</span>
            <CopyValue value={p.hex} label={`${p.name} hex`} />
          </li>
        ))}
      </ul>
      <svg className={s.tile} viewBox="0 0 100 100" role="img" aria-label="The mark in its tile">
        <MarkTileG size={100} />
      </svg>
      <Lines as="p" rows={LINES.imagination.rows} className={s.brandLine} />
    </div>
  );
}
