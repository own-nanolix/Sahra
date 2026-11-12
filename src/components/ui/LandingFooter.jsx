import Link from 'next/link';
import { NAV_LINKS, CONTACT_BLOCKS, LINES, CLIENT, CONTACT } from '@/lib/brand';

// The landing footer, in the language of the letterhead and the posters: Dark Chocolate ground, the brand
// line in the serif, the three contact blocks as printed, and the word-mark in Sand along the bottom.
export default function LandingFooter({ className = '' }) {
  return (
    <footer className={`lp-footer on-dark ${className}`}>
      <div className="wrap">
        <div className="lp-footer-grid">
          <div className="lp-footer-brand">
            <svg viewBox="0 0 184 201" width="40" height="44" role="img" aria-label="Sahra" style={{ color: 'var(--sand)' }}>
              <use href="#site-mark" />
            </svg>
            <p className="t-line" style={{ marginTop: 28 }}>
              {LINES.imagination.rows.map((r) => <span key={r} style={{ display: 'block' }}>{r}</span>)}
            </p>
            <p style={{ marginTop: 20 }}>
              <Link href="/lp-contact/" className="site-url">sahra.sa</Link>
            </p>
          </div>
          <div>
            <p className="lp-foot-head">About Sahra</p>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}><Link href={`/${l.id}/`}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <address className="contact">
            {CONTACT_BLOCKS.office.map((l) => <span key={l}>{l}</span>)}
          </address>
          <div className="stack">
            <address className="contact">
              {CONTACT_BLOCKS.service.map((l) => <span key={l}>{l}</span>)}
            </address>
            <address className="contact">
              {CONTACT_BLOCKS.online.map((l) => <span key={l}>{l}</span>)}
            </address>
          </div>
        </div>
        <svg className="lp-footer-mark" viewBox="0 0 1420 251" width="100%" aria-hidden="true">
          <use href="#site-wordmark" />
        </svg>
        <div className="lp-footer-base">
          <span>{CLIENT}</span>
          <span>{CONTACT.city}</span>
        </div>
      </div>
    </footer>
  );
}
