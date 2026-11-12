'use client';

import { still } from '@/lib/site';
import { CONTENTS } from './data';

// The contents of the page as ruled rows (the About page's rows, m12). A row scrolls to its section with
// JavaScript (never a #anchor) and moves focus there, so keyboard and screen-reader users arrive too.
function go(target) {
  const el = document.getElementById(target);
  if (!el) return;
  el.scrollIntoView({ behavior: still() ? 'auto' : 'smooth', block: 'start' });
  el.focus({ preventScroll: true });
}

export default function Contents() {
  return (
    <nav aria-label="Contents of this page">
      <ul className="rows" id="overview-contents">
        {CONTENTS.map((c) => (
          <li key={c.no}>
            <button type="button" className="ruled-row" onClick={() => go(c.target)}>
              <span className="t-num">{c.no}</span>
              <span className="ruled-row-label">{c.label}</span>
              <span className="ruled-row-plus" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
