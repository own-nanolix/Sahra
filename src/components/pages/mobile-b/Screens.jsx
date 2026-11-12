'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/site/Icon';
import Field from '@/components/ui/Field';
import Toggle from '@/components/ui/Toggle';
import RuledRows from '@/components/ui/RuledRows';
import { Lines, Contact, SiteUrl } from '@/components/ui/Card';
import { toast } from '@/components/site/Toast';
import { quarterArch } from '@/components/art/KeyArt';
import { copy } from '@/lib/site';
import { tEnter } from '@/lib/motion';
import { ABOUT, CONTACT, CONTACT_BLOCKS, INTRO, LINES, NAV_LINKS, PEOPLE, PROFILE, SENDER } from '@/lib/brand';
import { Board, StatusBar, MarkHtml, WordHtml, NavBar, TabBar, Seg, Bars } from './Board';
import { PC_ARCH, PC_BIO } from './data';
import s from './mobile-b.module.css';

// The quarter arch as a decorative corner (HTML screens; the exportable versions live in Flat.jsx).
function Arch({ size = 150, quadrant = 'br', className = '' }) {
  const d = quarterArch(0, 0, size * 0.42, size, quadrant);
  return (
    <svg className={className} viewBox={`${quadrant.includes('l') ? -size : 0} ${quadrant.startsWith('t') ? -size : 0} ${size} ${size}`} width={size} height={size} aria-hidden="true">
      <path d={d} fill="currentColor" />
    </svg>
  );
}

// 10  Sign in (dark)
function S10({ name }) {
  return (
    <Board name={name} dark>
      <StatusBar />
      <Arch size={170} quadrant="bl" className={s.archTR} />
      <div className={s.body}>
        <WordHtml width={150} className={s.sand} />
        <Lines as="h2" rows={LINES.imagination.rows} className={s.display} />
        <form
          className={s.form}
          onSubmit={(e) => {
            e.preventDefault();
            toast('Preview only: nothing is sent');
          }}
        >
          <Field id={`${name}-email`} label="Email" type="email" autoComplete="email" />
          <Field id={`${name}-password`} label="Password" type="password" autoComplete="current-password" />
          <button type="submit" className="btn btn-lg btn-block">Sign in</button>
        </form>
        <SiteUrl className={s.foot}>sahra.sa</SiteUrl>
      </div>
    </Board>
  );
}

// 11  Section switcher (a sheet)
function S11({ name }) {
  const [sel, setSel] = useState(0);
  const refs = useRef([]);
  const move = (e) => {
    const k = e.key;
    const d = k === 'ArrowDown' || k === 'ArrowRight' ? 1 : k === 'ArrowUp' || k === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (sel + d + NAV_LINKS.length) % NAV_LINKS.length;
    setSel(n);
    refs.current[n]?.focus();
  };
  return (
    <Board name={name}>
      <StatusBar />
      <div className={s.body}>
        <p className="t-label">{ABOUT.label}</p>
        <h2 className={s.display}>{NAV_LINKS[sel].label}</h2>
        <div className={s.stack}>{[9, 6, 8, 5].map((w, i) => <Bars key={i} widths={[w]} />)}</div>
      </div>
      <div className={s.scrim} aria-hidden="true" />
      <div className={s.sheet} role="dialog" aria-label="Sections">
        <span className={s.grab} aria-hidden="true" />
        <p className="t-label">Sections</p>
        <div role="radiogroup" aria-label="Section" className="rows" onKeyDown={move}>
          {NAV_LINKS.map((l, i) => (
            <button
              key={l.id}
              ref={(el) => { refs.current[i] = el; }}
              type="button"
              role="radio"
              aria-checked={i === sel}
              tabIndex={i === sel ? 0 : -1}
              className={`ruled-row ${s.radio}`}
              onClick={() => setSel(i)}
            >
              <span className="t-num">{ABOUT.rows.find((r) => r.label === l.label)?.no}</span>
              <span className="ruled-row-label">{l.label}</span>
              <span className={s.tick} aria-hidden="true">{i === sel && <Icon name="check" size={18} />}</span>
            </button>
          ))}
        </div>
      </div>
    </Board>
  );
}

// 12  Notifications
function S12({ name, go }) {
  const [on, setOn] = useState([true, false, true]);
  return (
    <Board name={name}>
      <StatusBar />
      <NavBar title="Notifications" label="Sections" />
      <div className={s.body}>
        <ul className="rows">
          {ABOUT.rows.map((r, i) => (
            <li key={r.no} className={s.nrow}>
              <span className="t-num">{r.no}</span>
              <div>
                <p className="ruled-row-label">{r.label}</p>
                <Bars widths={[9]} />
              </div>
              <Toggle hideLabel label={`Notifications for ${r.label}`} checked={on[i]} onChange={(v) => setOn(on.map((x, j) => (j === i ? v : x)))} />
            </li>
          ))}
        </ul>
      </div>
      <TabBar current={12} go={go} />
    </Board>
  );
}

// 13  Reader
function S13({ name, go }) {
  const [i, setI] = useState(0);
  const n = INTRO.paragraphs.length;
  return (
    <Board name={name}>
      <StatusBar />
      <NavBar title="Reader" label={INTRO.title.text} />
      <div className={s.body}>
        <div className={s.prog} role="img" aria-label={`Paragraph ${i + 1} of ${n}`}>
          {INTRO.paragraphs.map((_, k) => <span key={k} data-on={k <= i ? 'true' : undefined} />)}
        </div>
        <motion.p key={i} className={s.read} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: tEnter }}>
          {INTRO.paragraphs[i]}
        </motion.p>
        <div className={s.ctl}>
          <button type="button" className="btn btn-outline btn-sm" disabled={i === 0} onClick={() => setI(i - 1)}>Previous</button>
          <span className="t-num">{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
          <button type="button" className="btn btn-sm" disabled={i === n - 1} onClick={() => setI(i + 1)}>Next</button>
        </div>
      </div>
      <TabBar current={13} go={go} />
    </Board>
  );
}

// 14  Help (accordion)
function S14({ name, go }) {
  const rows = ABOUT.rows.map((r, k) => ({ ...r, body: <p className={s.answer}>{INTRO.paragraphs[2 + k]}</p> }));
  return (
    <Board name={name}>
      <StatusBar />
      <NavBar title="Help" back onBack={() => go && go(12)} />
      <div className={s.body}>
        <RuledRows id={`${name}-help`} rows={rows} className={s.rr} />
      </div>
    </Board>
  );
}

// 15  Settings (the ground switch re-themes the screen)
function S15({ name, go }) {
  const [t, setT] = useState([true, true, false]);
  const [ground, setGround] = useState('Beige');
  const labels = ['Notifications', 'Saved', 'Files'];
  return (
    <Board name={name} dark={ground === 'Dark'}>
      <StatusBar />
      <NavBar title="Settings" label="Profile" />
      <div className={s.body}>
        <ul className="rows">
          {labels.map((l, i) => (
            <li key={l} className={s.srow}>
              <span className="ruled-row-label">{l}</span>
              <Toggle hideLabel label={l} checked={t[i]} onChange={(v) => setT(t.map((x, j) => (j === i ? v : x)))} />
            </li>
          ))}
          <li className={s.srow}>
            <span className="ruled-row-label">Ground</span>
            <Seg label="Ground" options={['Beige', 'Dark']} value={ground} onChange={setGround} />
          </li>
        </ul>
      </div>
      <TabBar current={15} go={go} />
    </Board>
  );
}

// 16  Files
function S16({ name, go }) {
  const [sel, setSel] = useState(0);
  // one real file; the other rows are quiet placeholders
  const items = ['Plan sheet', 'Placeholder row 1', 'Placeholder row 2', 'Placeholder row 3'];
  return (
    <Board name={name}>
      <StatusBar />
      <NavBar title="Files" label="Plan sheet" />
      <div className={s.body}>
        <ul className="rows">
          {items.map((l, i) => (
            <li key={l}>
              <button type="button" className={`ruled-row ${s.file}`} aria-pressed={i === sel} onClick={() => setSel(i)}>
                <Icon name={i === 0 ? 'plan' : 'document'} size={22} />
                {i === 0 ? <span className="ruled-row-label">{l}</span> : <span className="ruled-row-label"><span className="sr-only">{l}</span><Bars widths={[8]} /></span>}
                <span className={s.tick} aria-hidden="true">{i === sel && <Icon name="check" size={18} />}</span>
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn-block" onClick={() => toast('Preview only: nothing is downloaded')}>
          <Icon name="download" size={20} /> Download
        </button>
      </div>
      <TabBar current={16} go={go} />
    </Board>
  );
}

// The profile card of m12, re-measured from the full-size crop (896 x 716 there, 334 x 267 here): the header
// gradient with the quarter arch ending in a 45 degree cut, the line at the right, the mark tile over the header's
// edge, the black "Follow", a sans name and handle, and the bio in three lines. No platform tick or logo.
export function ProfileCardHtml({ idp }) {
  const [follow, setFollow] = useState(false);
  return (
    <article className={s.pcard} aria-label={PROFILE.name}>
      <div className={s.pheadBox}>
      <svg className={s.phead} viewBox="0 0 334 111.1" aria-hidden="true">
        <defs>
          <linearGradient id={`${idp}-hd`} x1="0" x2="334" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#35241C" />
            <stop offset="1" stopColor="#875D41" />
          </linearGradient>
          <linearGradient id={`${idp}-ar`} x1="40" x2="320" y1="0" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#35241C" stopOpacity="0" />
            <stop offset="0.6" stopColor="#35241C" stopOpacity="0.45" />
            <stop offset="1" stopColor="#35241C" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <rect width="334" height="111.1" fill={`url(#${idp}-hd)`} />
        <path d={PC_ARCH} fill="#875D41" />
        <path d={PC_ARCH} fill={`url(#${idp}-ar)`} />
      </svg>
      <Lines as="p" rows={PROFILE.header.rows} className={s.pline} />
      </div>
      <span className={s.ptile}><MarkHtml size={31.7} /></span>
      <button type="button" className={`btn btn-black ${s.pfollow}`} aria-pressed={follow} onClick={() => setFollow(!follow)}>{PROFILE.action}</button>
      <h3 className={s.pname}>{PROFILE.name}</h3>
      <p className={s.phandle}>{PROFILE.handle}</p>
      <p className={s.pbio}>{PC_BIO.map((l) => <span key={l}>{l}</span>)}</p>
    </article>
  );
}

// 17  Share (the profile card of m12, no platform tick or logo)
function S17({ name, go }) {
  return (
    <Board name={name} dark>
      <StatusBar />
      <NavBar title="Share" back onBack={() => go && go(16)} />
      <div className={s.body}>
        <ProfileCardHtml idp={`${name}-pc`} />
        <button
          type="button"
          className="btn btn-beige btn-block"
          onClick={async () => toast((await copy(CONTACT.web)) ? `Copied: ${CONTACT.web}` : 'Could not copy')}
        >
          <Icon name="copy" size={20} /> Copy link
        </button>
      </div>
    </Board>
  );
}

// 18  Profile (the business card of m08 as a screen)
function S18({ name, go }) {
  return (
    <Board name={name}>
      <StatusBar />
      <NavBar title="Profile" label={SENDER.brand} />
      <div className={s.body}>
        {/* the front of the business card of m08, landscape 85 x 55: name and role top left, the sand mark top
            right, the office and online blocks bottom left, the service block bottom right (the printed
            "linkedin.com/company/sahra" line is left out, as everywhere on the site) */}
        <article className={s.bcard} aria-label={`${PEOPLE.card.name}, ${PEOPLE.card.role}`}>
          <MarkHtml size={22} className={s.bmark} />
          <h3 className={s.bname}>{PEOPLE.card.name}</h3>
          <p className={s.brole}>{PEOPLE.card.role}</p>
          <div className={s.bleft}>
            <Contact lines={CONTACT_BLOCKS.office} />
            <Contact lines={CONTACT_BLOCKS.online} />
          </div>
          <Contact lines={CONTACT_BLOCKS.service} className={s.bright} />
        </article>
        <div className={s.ctl}>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => go && go(17)}><Icon name="share" size={18} /> Share</button>
          <SiteUrl>sahra.sa</SiteUrl>
        </div>
      </div>
      <TabBar current={18} go={go} />
    </Board>
  );
}

export const SCREENS = [
  { n: 10, title: 'Sign in', C: S10 },
  { n: 11, title: 'Section switcher', C: S11 },
  { n: 12, title: 'Notifications', C: S12 },
  { n: 13, title: 'Reader', C: S13 },
  { n: 14, title: 'Help', C: S14 },
  { n: 15, title: 'Settings', C: S15 },
  { n: 16, title: 'Files', C: S16 },
  { n: 17, title: 'Share', C: S17 },
  { n: 18, title: 'Profile', C: S18 },
];
