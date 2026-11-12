'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { tEnter, tMove } from '@/lib/motion';

// The ruled rows of the About page (m12): a thin rule, a number, a serif label and a "+" at the right.
//   <RuledRows id="lp-home-about" rows={ABOUT.rows} />                      static rows
//   <RuledRows id="..." rows={[{ no, label, body }]} />                     rows open and close (accordion)
//   <RuledRows id="..." rows={[{ no, label, href: '/lp-philosophy/' }]} />  rows are links
// id must start with the page id.
export default function RuledRows({ id, rows, className = '', single = true }) {
  const [open, setOpen] = useState([]);
  const toggle = (k) => setOpen((o) => (o.includes(k) ? o.filter((x) => x !== k) : single ? [k] : [...o, k]));
  return (
    <ul className={`rows ${className}`} id={id}>
      {rows.map((r) => {
        const k = r.no || r.label;
        const inner = (
          <>
            <span className="t-num">{r.no}</span>
            <span className="ruled-row-label">{r.label}</span>
            <span className="ruled-row-plus" aria-hidden="true" />
          </>
        );
        if (r.href) {
          return (
            <li key={k}>
              <Link className="ruled-row" href={r.href}>{inner}</Link>
            </li>
          );
        }
        if (!r.body) {
          return (
            <li key={k}>
              <div className="ruled-row">{inner}</div>
            </li>
          );
        }
        const isOpen = open.includes(k);
        const pid = `${id}-row-${String(k).replace(/\W+/g, '-').toLowerCase()}`;
        return (
          <li key={k}>
            <button type="button" className="ruled-row" aria-expanded={isOpen} aria-controls={pid} onClick={() => toggle(k)}>
              {inner}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={pid}
                  key="body"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0, transition: tEnter }}
                  exit={{ opacity: 0, transition: tMove }}
                  className="ruled-row-body"
                >
                  {r.body}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
