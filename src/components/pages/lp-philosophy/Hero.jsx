import Link from 'next/link';
import Art from '@/components/art/Art';
import { MarkG } from '@/components/art/Mark';
import LandingNav from '@/components/ui/LandingNav';
import { LINES, CONTACT } from '@/lib/brand';
import { HEX } from '@/lib/brand';
import s from './lp-philosophy.module.css';

// The right half of m14: "Designing spaces / that connect purpose, / design ... and / modern living" set huge on
// Black, the Sand mark at the bottom left and "www.sahra.sa" at the bottom right. Each line rises out of its own
// mask; the mark assembles from its two halves.
export default function Hero() {
  const rows = LINES.designing.rows;
  return (
    <header className={s.hero} id="lp-philosophy-hero">
      <LandingNav current="lp-philosophy" tone="dark" />
      <div className={s.heroBody}>
        <h1 className={s.headline} tabIndex={-1} aria-label={LINES.designing.text}>
          {rows.map((r, i) => (
            <span className={s.mask} key={i} aria-hidden="true">
              <span className={`${s.line} ${Array.isArray(r) ? s.spread : ''}`} style={{ '--i': i }}>
                {Array.isArray(r) ? r.map((w) => <span key={w}>{w}</span>) : r}
              </span>
            </span>
          ))}
        </h1>
        <div className={s.heroFoot}>
          <Art viewBox="0 0 184 201" title="Sahra mark in Sand" exportName="lp-philosophy-mark" className={s.heroMark}>
            <MarkG size={184} fill={HEX.sand} topClass="mark-top" bottomClass="mark-bottom" />
          </Art>
          <Link href="/lp-contact/" className={s.heroUrl}>
            {CONTACT.web}
          </Link>
        </div>
      </div>
      <span className={s.heroRule} aria-hidden="true" />
    </header>
  );
}
