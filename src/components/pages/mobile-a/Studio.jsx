'use client';

import { useEffect, useRef, useState } from 'react';
import Phone from '@/components/ui/Phone';
import Button from '@/components/ui/Button';
import Reveal from '@/components/site/Reveal';
import { Artboard, Swap } from './Parts';
import { ScreenAbout, ScreenPhilosophy, ScreenProcess } from './ScreensA';
import { ScreenVision, ScreenSpaces, ScreenPlan } from './ScreensB';
import { ScreenMenu, ScreenContact, ScreenBrand } from './ScreensC';
import ArtSet from './ArtSet';
import s from './mobile-a.module.css';

// The bento of the page: the live phone (4 x 4, pinned at the left), the nine captions as ruled rows (8 x 4),
// the strip of all nine screens on Dark Chocolate (12 x 2) and the exportable artwork.

export const SCREENS = [
  { name: 'About', C: ScreenAbout },
  { name: 'Philosophy', C: ScreenPhilosophy },
  { name: 'Our Process', C: ScreenProcess },
  { name: 'Our Vision', C: ScreenVision },
  { name: 'Spaces', C: ScreenSpaces },
  { name: 'Plan sheet', C: ScreenPlan },
  { name: 'Menu', C: ScreenMenu },
  { name: 'Contact', C: ScreenContact },
  { name: 'Brand', C: ScreenBrand },
];
const COUNT = SCREENS.length;
const THUMB = 0.4;
const noop = () => {};
const two = (k) => String(k).padStart(2, '0');

export default function Studio() {
  const [n, setN] = useState(1);
  const liveRef = useRef(null);
  const cur = SCREENS[n - 1];

  // Left / Right step through the screens. Shift + arrows belong to the site's dock, so they are left alone,
  // as are keys typed in a field or inside a scrolling region of a screen.
  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const t = e.target;
      if (t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.closest('[role="region"], [role="dialog"], [role="radiogroup"], [role="tablist"], [role="slider"]'))) return;
      const d = e.key === 'ArrowRight' ? 1 : -1;
      setN((v) => ((v - 1 + d + COUNT) % COUNT) + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const step = (d) => setN((v) => ((v - 1 + d + COUNT) % COUNT) + 1);
  // Picking a screen from the list or the strip brings the phone into view on a narrow page.
  const pick = (k) => {
    setN(k);
    if (window.innerWidth <= 900 && liveRef.current) liveRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <>
      <div className="bento">
        <div className={`tile tile-beige span-4 rows-4 ${s.liveTile}`}>
          <h2 className="sr-only">Live phone</h2>
          <div ref={liveRef} className={s.liveBox}>
            <Phone screen={`mobile-a-${two(n)}-live`} exportName="mobile-a-phone-frame" className={s.livePhone}>
              <Artboard>
                <Swap key={n}>
                  <cur.C go={pick} idp={`mobile-a-s${n}-live`} />
                </Swap>
              </Artboard>
            </Phone>
          </div>
        </div>

        <Reveal className={`tile tile-line span-8 rows-4 ${s.capTile}`}>
          <p className="t-label" aria-live="polite">{`Screen ${n} of ${COUNT}`}</p>
          <h2 className={`t-h1 ${s.capName}`}>{cur.name}</h2>
          <div className="row">
            <Button variant="outline" icon="arrow-left" onClick={() => step(-1)}>Previous</Button>
            <Button variant="dark" iconRight="arrow-right" onClick={() => step(1)}>Next</Button>
          </div>
          <p className="t-small">Left and Right arrow keys step through the screens.</p>
          <ol className={`rows ${s.capList}`} aria-label="The nine screens">
            {SCREENS.map((c, i) => (
              <li key={c.name}>
                <button type="button" className={`ruled-row ${s.capRow}`} aria-current={i + 1 === n ? 'true' : undefined} onClick={() => pick(i + 1)}>
                  <span className="t-num">{two(i + 1)}</span>
                  <span className="ruled-row-label">{c.name}</span>
                  <span className="ruled-row-plus" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </Reveal>

        <section className={`tile tile-dark span-12 rows-2 ${s.stripTile}`} aria-label="All nine screens">
          <h2 className={`t-label ${s.stripHead}`}>All nine screens</h2>
          <ul className={s.strip}>
            {SCREENS.map((c, i) => {
              const k = i + 1;
              return (
                <li key={c.name} className={s.thumbItem}>
                  <div className={`${s.thumb} ${k === n ? s.thumbOn : ''}`} style={{ width: 390 * THUMB + 6, height: 844 * THUMB + 6 }}>
                    <div inert aria-hidden="true">
                      <Artboard name={`mobile-a-${two(k)}`} scale={THUMB}>
                        <c.C go={noop} thumb idp={`mobile-a-s${k}-row`} />
                      </Artboard>
                    </div>
                    <button type="button" className={s.thumbBtn} aria-label={`Show screen ${k}, ${c.name}`} aria-current={k === n ? 'true' : undefined} onClick={() => pick(k)} />
                  </div>
                  <span className={s.thumbCap}>{`${two(k)} ${c.name}`}</span>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <section className={`tile tile-line ${s.artTile}`} aria-label="Exportable artwork">
        <h2 className="t-h3">Artwork of the screens</h2>
        <ArtSet />
      </section>
    </>
  );
}
