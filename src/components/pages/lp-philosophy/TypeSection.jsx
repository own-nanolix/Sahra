import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import { TYPE, HEX } from '@/lib/brand';
import s from './lp-philosophy.module.css';

// The type slide (m06) as a quieter section: the two paragraphs on typography as structure, the weights list,
// the character set, and the giant "Aa123%!" across the bottom.
export default function TypeSection() {
  return (
    <section className={`field-white ${s.type}`} id="lp-philosophy-type" aria-labelledby="lp-philosophy-type-title">
      <div className="wrap">
        <div className={s.typeTop}>
          <h2 id="lp-philosophy-type-title" className="t-h3">{TYPE.family}</h2>
          <div className={s.charset} aria-label="Character set">
            {TYPE.charset.map((c) => (
              <p key={c} className="t-small">{c}</p>
            ))}
          </div>
        </div>
        <div className={s.typeBody}>
          <Reveal>
            <p className={`t-body ${s.typePara}`}>{TYPE.text[0]}</p>
          </Reveal>
          <Reveal delay={120}>
            <p className={`t-body ${s.typePara}`}>{TYPE.text[1]}</p>
          </Reveal>
          <Reveal delay={220}>
            <ul className={s.weights} aria-label="Weights">
              {TYPE.weights.map((w, i) => (
                <li key={w} className={i === 0 ? s.weightOn : undefined}>{w}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Art viewBox="0 0 1600 330" title="Aa123%! set in the brand serif" exportName="lp-philosophy-specimen" className={s.specimen}>
          <rect width="1600" height="330" fill={HEX.white} />
          <path d="M0 292H1600" stroke={HEX.tribal} strokeWidth="1" opacity="0.4" className="draw" style={{ '--len': 1600 }} />
          <text x="0" y="292" fontSize="360" fontWeight="500" letterSpacing="-10" textLength="1480" lengthAdjust="spacingAndGlyphs" className="serif fade-in" fill={HEX.chocolate}>
            {TYPE.specimen}
          </text>
        </Art>
      </div>
    </section>
  );
}
