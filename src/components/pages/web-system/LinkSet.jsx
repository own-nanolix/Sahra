import Link from 'next/link';
import { NAV_LINKS, CONTACT } from '@/lib/brand';
import CopyValue from '@/components/site/CopyValue';
import s from './web-system.module.css';

// Links: the "→ sahra.sa" address (arrow drawn by CSS, slides on hover), inline underlined links that draw out on
// hover, and the same on Dark Chocolate (Sand).
export default function LinkSet() {
  return (
    <div className={s.linkList}>
      <div className="row" style={{ gap: 28 }}>
        <Link href="/lp-contact/" className="site-url" style={{ fontSize: 16 }}>sahra.sa</Link>
        <Link href="/lp-contact/" className="site-url" style={{ fontSize: 13 }}>sahra.sa</Link>
      </div>
      <p className={s.inline}>
        {NAV_LINKS.map((l) => (
          <Link key={l.id} href={`/${l.id}/`} className="link">{l.label}</Link>
        ))}
      </p>
      <p className={s.inline}>
        <CopyValue value={CONTACT.info} />
        <CopyValue value={CONTACT.support} />
      </p>
      <div className={`${s.darkStrip} on-dark`}>
        <Link href="/lp-contact/" className="site-url on-dark">sahra.sa</Link>
        {NAV_LINKS.slice(1, 3).map((l) => (
          <Link key={l.id} href={`/${l.id}/`} className="link">{l.label}</Link>
        ))}
      </div>
    </div>
  );
}
