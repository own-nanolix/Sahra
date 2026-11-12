'use client';

import { useState } from 'react';
import { ABOUT, CONTACT_BLOCKS, LINES, PALETTE, PEOPLE } from '@/lib/brand';
import { copy } from '@/lib/site';
import { toast } from '@/components/site/Toast';
import CopyValue from '@/components/site/CopyValue';
import { Contact } from '@/components/ui/Card';
import { MarkTileG } from '@/components/art/Mark';
import { StatusBar, Word, MenuButton, BackButton, Row } from './Parts';
import s from './mobile-a.module.css';

// Screens 7 to 9: the full-screen menu, the contacts and the brand sheet.

// 7 Menu: Dark Chocolate, the ruled rows, the sign-off.
export function ScreenMenu({ go }) {
  const rows = [
    ...ABOUT.rows.map((r, i) => ({ ...r, to: [2, 3, 4][i] })),
    { no: '04', label: 'Contact', to: 8 },
    { no: '05', label: 'Brand', to: 9 },
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
          <div key={r.no} className="slide-up" style={{ '--i': i + 1 }}>
            <Row no={r.no} label={r.label} tall onClick={() => go(r.to)} />
          </div>
        ))}
      </div>
      <button type="button" className={`site-url on-dark ${s.mUrl}`} onClick={() => go(8)}>sahra.sa</button>
    </div>
  );
}

const BLOCKS = [
  { key: 'office', name: 'Office' },
  { key: 'service', name: 'Support' },
  { key: 'online', name: 'Online' },
];

function CopyBlock({ name, lines }) {
  const [done, setDone] = useState(false);
  const onCopy = async () => {
    const ok = await copy(lines.join('\n'));
    toast(ok ? `Copied ${name.toLowerCase()} contact` : 'Could not copy');
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };
  return (
    <div className={s.cBlock}>
      <div>
        <p className={s.cName}>{name}</p>
        <Contact lines={lines} className={s.cLines} />
      </div>
      <button type="button" className={`${s.copyBtn} ${done ? s.copyDone : ''}`} onClick={onCopy} aria-label={`Copy ${name.toLowerCase()} contact`}>
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
        {BLOCKS.map((b, i) => (
          <div key={b.key} className="slide-up" style={{ '--i': i + 1 }}>
            <CopyBlock name={b.name} lines={CONTACT_BLOCKS[b.key]} />
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
      <p className={s.brandLine}>{LINES.imagination.text}</p>
    </div>
  );
}
