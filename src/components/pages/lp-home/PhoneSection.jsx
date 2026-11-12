import Phone from '@/components/ui/Phone';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { wrap } from '@/components/art/Devices';
import { PhoneScreenArt, SCREEN } from './ArtHeader';
import { ABOUT } from '@/lib/brand';
import s from './lp-home.module.css';

// The original screen of m12, rebuilt twice: as a live page in the shared Phone frame (HTML, sized in container
// units so it scales with the frame) and as flat artwork. Both use the same measured coordinates (SCREEN) on the
// 390 x 844 artboard; HTML tops are the artwork's baselines minus the ascent at that size.
const u = (n) => `calc(${n} * var(--u))`;
const MENU = [0, 1, 2];
const { word: W, menu: M, label: L, head: H, text: T, rows: R } = SCREEN;

export default function PhoneSection() {
  return (
    <section className={`wrap ${s.phoneBand}`} aria-labelledby="lp-home-phone-h">
      <div className={s.phoneHead}>
        <p className="t-label">{ABOUT.label}</p>
        <h2 id="lp-home-phone-h" className="t-h2">The page on the phone</h2>
      </div>
      <div className={s.phoneGrid}>
        <Reveal className={s.phoneCol}>
          <Phone screen="lp-home-about" exportName="lp-home-phone-frame" className={s.phone} screenStyle={{ containerType: 'inline-size' }}>
            <div className={s.screen}>
              <svg className={s.scrWord} viewBox="0 0 1420 251" aria-hidden="true" style={{ left: u(W.x), top: u(W.y), width: u(W.w) }}>
                <use href="#site-wordmark" />
              </svg>
              {MENU.map((d) => (
                <span key={d} className={s.scrBar} style={{ left: u(M.x), top: u(M.y + d * M.gap), width: u(M.w) }} />
              ))}
              <p className={s.scrLabel} style={{ left: u(28), top: u(L.y - 11), fontSize: u(L.size), lineHeight: u(14) }}>{ABOUT.label}</p>
              <div className={s.scrHead} style={{ left: u(28), top: u(H.y - 27), fontSize: u(H.size), lineHeight: u(H.lh) }}>
                <Lines as="span" rows={ABOUT.headline.rows} />
              </div>
              <p className={s.scrText} style={{ left: u(28), top: u(T.y - 16), fontSize: u(T.size), lineHeight: u(T.lh) }}>
                {wrap(ABOUT.text, T.wrap).map((l) => <span key={l} style={{ display: 'block', whiteSpace: 'nowrap' }}>{l}</span>)}
              </p>
              {ABOUT.rows.map((r, i) => (
                <div key={r.no} className={s.scrRow} style={{ left: u(28), top: u(R.y + i * R.h), width: u(334), height: u(R.h), fontSize: u(14), lineHeight: u(17) }}>
                  <span className={s.scrNo} style={{ top: u(R.noY - 13.5) }}>{r.no}</span>
                  <span className={s.scrRowLabel} style={{ left: u(R.labelX), top: u(R.labelY - 19), fontSize: u(20), lineHeight: u(24) }}>{r.label}</span>
                  <span className={s.scrPlus} style={{ left: u(R.plusX - R.plus / 2), top: u(R.plusY - R.plus / 2), width: u(R.plus), height: u(R.plus) }} />
                </div>
              ))}
              <span className={s.scrEnd} style={{ left: u(28), top: u(R.y + 3 * R.h), width: u(334) }} />
            </div>
          </Phone>
          <p className={`t-label ${s.capC}`}>Live page in the phone frame</p>
        </Reveal>
        <Reveal delay={140} className={s.artCol}>
          <div className={s.artFrame}>
            <PhoneScreenArt />
          </div>
          <p className={`t-label ${s.capC}`}>The same screen as flat artwork</p>
        </Reveal>
      </div>
    </section>
  );
}
