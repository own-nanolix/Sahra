'use client';

import Icon from '@/components/site/Icon';
import { TABS } from './data';
import s from './mobile-b.module.css';

// The 390 x 844 artboard of one screen. It fills the shared Phone's screen and scales with CSS (see .board).
export function Board({ name, dark = false, className = '', children }) {
  return (
    <div className={`${s.board} ${dark ? `on-dark ${s.dark}` : ''} ${className}`} data-screen={name}>
      {children}
    </div>
  );
}

// Neutral shapes only: no clock, no signal bars with figures.
export function StatusBar() {
  return (
    <div className={s.status} aria-hidden="true">
      <span className={s.sbPill} />
      <span className={s.sbRight}>
        <span className={s.sbDot} />
        <span className={s.sbWide} />
        <span className={s.sbBatt} />
      </span>
    </div>
  );
}

// The mark from the sprite (decorative).
export function MarkHtml({ size = 28, className = '' }) {
  return (
    <svg viewBox="0 0 184 201" width={size} height={(size * 201) / 184} className={className} aria-hidden="true">
      <use href="#site-mark" />
    </svg>
  );
}

export function WordHtml({ width = 118, className = '' }) {
  return (
    <svg viewBox="0 0 1420 251" width={width} height={(width * 251) / 1420} className={className} aria-hidden="true">
      <use href="#site-wordmark" />
    </svg>
  );
}

// Screen header: back control, a serif title, a trailing action.
export function NavBar({ title, label, back, onBack, action, onAction, actionLabel }) {
  return (
    <header className={s.nav}>
      {back ? (
        <button type="button" className={s.navBtn} aria-label="Back" onClick={onBack}>
          <Icon name="chevron-left" size={22} />
        </button>
      ) : (
        <span className={s.navBtn} aria-hidden="true" />
      )}
      <div className={s.navTitle}>
        {label && <span className="t-label">{label}</span>}
        <h2 className={s.navH}>{title}</h2>
      </div>
      {action ? (
        <button type="button" className={s.navBtn} aria-label={actionLabel} onClick={onAction}>
          <Icon name={action} size={22} />
        </button>
      ) : (
        <span className={s.navBtn} aria-hidden="true" />
      )}
    </header>
  );
}

// The tab bar. On screens it really navigates: go(n) swaps the screen in the live phone.
export function TabBar({ current, go, pressed }) {
  return (
    <nav className={s.tabbar} aria-label="Screens">
      {TABS.map((t) => (
        <button key={t.to} type="button" className={s.tb} aria-current={t.to === current ? 'page' : undefined} data-pressed={pressed === t.to ? 'true' : undefined} onClick={() => go && go(t.to)}>
          <Icon name={t.icon} size={22} />
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}

// A two-option ground switch that works on both grounds.
export function Seg({ label, options, value, onChange }) {
  return (
    <div className={s.seg} role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o} type="button" className={s.segBtn} aria-pressed={o === value} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </div>
  );
}

// A quiet line of placeholder bars.
export function Bars({ widths = [8, 5] }) {
  return (
    <span className={s.bars} aria-hidden="true">
      {widths.map((w, i) => <span key={i} className="ph" style={{ width: `${w}em` }} />)}
    </span>
  );
}
