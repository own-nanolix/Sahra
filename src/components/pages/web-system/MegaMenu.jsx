'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ease, dur } from '@/lib/motion';
import { NAV_LINKS, CONTACT_BLOCKS, LINES } from '@/lib/brand';
import { Contact } from '@/components/ui/Card';
import { MegaArt } from './artwork';
import s from './web-system.module.css';

// The open mega menu on Dark Chocolate. Signature moment: a Tribal Brown wall covers the panel and slides aside
// (transform only, out-quart, no bounce); closing slides it back. Escape closes and returns focus to the button.
// Entries: the case study's own words (About Sahra, Philosophy, Our Process, Our Vision) and the site's landing pages.
const MORE = [
  { id: 'lp-spaces', label: 'Spaces' },
  { id: 'lp-plans', label: 'Plans' },
  { id: 'lp-contact', label: 'Contact' },
];

export default function MegaMenu() {
  const [open, setOpen] = useState(true);
  const stage = useRef(null);
  const trigger = useRef(null);
  const panel = useRef(null);
  const seen = useInView(stage, { once: true, margin: '0px 0px -15% 0px' });
  const still = useReducedMotion();
  const t = { duration: still ? 0 : dur.d4, ease: ease.out };

  const close = () => {
    setOpen(false);
    trigger.current?.focus();
  };
  const toggle = () => {
    if (open) return close();
    setOpen(true);
    requestAnimationFrame(() => panel.current?.querySelector('a')?.focus({ preventScroll: true }));
  };
  const onKeyDown = (e) => {
    if (e.key === 'Escape' && open) {
      e.stopPropagation();
      close();
    }
  };

  return (
    <div onKeyDown={onKeyDown}>
      <div className={s.megaBar}>
        <svg viewBox="0 0 1420 251" aria-hidden="true"><use href="#site-wordmark" /></svg>
        <button
          ref={trigger}
          type="button"
          id="web-system-mega-trigger"
          className={s.megaBtn}
          aria-expanded={open}
          aria-controls="web-system-mega-panel"
          onClick={toggle}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div className={s.megaStage} ref={stage}>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="panel"
              id="web-system-mega-panel"
              ref={panel}
              role="region"
              aria-label="Menu"
              className={s.megaPanel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: still ? 0 : dur.d2, ease: ease.out } }}
              exit={{ opacity: 0, transition: { duration: still ? 0 : dur.d4, ease: ease.inOut } }}
            >
              <MegaArt idp="web-system-mega" className={s.megaArt} />
              <div className={s.megaGroup}>
                <h3>About Sahra</h3>
                {NAV_LINKS.map((l, i) => (
                  <Link key={l.id} href={`/${l.id}/`} className={s.megaLink}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{l.label}</span>
                  </Link>
                ))}
                <h3 style={{ marginTop: 28 }}>Pages</h3>
                {MORE.map((l, i) => (
                  <Link key={l.id} href={`/${l.id}/`} className={s.megaLink}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <span>{l.label}</span>
                  </Link>
                ))}
              </div>
              <div className={s.megaSide}>
                <p className="t-line">
                  {LINES.imagination.rows.map((r) => <span key={r} style={{ display: 'block' }}>{r}</span>)}
                </p>
                <Contact lines={CONTACT_BLOCKS.office} />
                <Contact lines={CONTACT_BLOCKS.service} />
                <Link href="/lp-contact/" className="site-url on-dark">sahra.sa</Link>
              </div>
              <motion.div
                className={s.wall}
                aria-hidden="true"
                initial={{ x: '0%' }}
                animate={{ x: seen ? '104%' : '0%' }}
                exit={{ x: '0%' }}
                transition={t}
              >
                <span className={s.wallTag}>{LINES.imagination.text}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {!open && <p className={`${s.megaClosed} t-line`}>{LINES.imagination.text}</p>}
      </div>
    </div>
  );
}
