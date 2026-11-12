import Phone from '@/components/ui/Phone';
import Reveal from '@/components/site/Reveal';
import { Lines } from '@/components/ui/Card';
import { PhoneScreenArt } from './ArtHeader';
import { ABOUT } from '@/lib/brand';
import s from './lp-home.module.css';

// The original screen of m12, rebuilt twice: as a live page in the shared Phone frame (HTML, sized in container
// units so it scales with the frame) and as flat artwork. Coordinates follow the 390 x 844 artboard.
const u = (n) => `calc(${n} * var(--u))`;
const MENU = [0, 7, 14];

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
              <svg className={s.scrWord} viewBox="0 0 1420 251" aria-hidden="true" style={{ left: u(28), top: u(74), width: u(118) }}>
                <use href="#site-wordmark" />
              </svg>
              {MENU.map((d) => (
                <span key={d} className={s.scrBar} style={{ left: u(334), top: u(74 + d), width: u(26) }} />
              ))}
              <p className={s.scrLabel} style={{ left: u(28), top: u(186), fontSize: u(12) }}>{ABOUT.label}</p>
              <div className={s.scrHead} style={{ left: u(28), top: u(211), fontSize: u(33), lineHeight: u(38) }}>
                <Lines as="span" rows={ABOUT.headline.rows} />
              </div>
              <p className={s.scrText} style={{ left: u(28), top: u(364), width: u(334), fontSize: u(13), lineHeight: u(20) }}>{ABOUT.text}</p>
              {ABOUT.rows.map((r, i) => (
                <div key={r.no} className={s.scrRow} style={{ left: u(28), top: u(560 + i * 74), width: u(334), height: u(74), fontSize: u(13) }}>
                  <span className={s.scrNo} style={{ top: u(31) }}>{r.no}</span>
                  <span className={s.scrRowLabel} style={{ left: u(70), top: u(20), fontSize: u(20) }}>{r.label}</span>
                  <span className={s.scrPlus} style={{ left: u(320), top: u(33), width: u(12), height: u(12) }} />
                </div>
              ))}
              <span className={s.scrEnd} style={{ left: u(28), top: u(560 + 3 * 74), width: u(334) }} />
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
