import Link from 'next/link';
import { NAV_LINKS, BRAND } from '@/lib/brand';

// The landing navigation, from the About page on the phone (m12): the word-mark at the left, the page's own
// words ("About Sahra", "Philosophy", "Our Process", "Our Vision") and the web address "→ sahra.sa" as the action
// (it leads to the contact page).
// <LandingNav current="lp-process" />   tone: "light" (default, dark type on Beige) | "dark" (Beige type on dark grounds)
export default function LandingNav({ current, tone = 'light', className = '' }) {
  const dark = tone === 'dark';
  return (
    <nav className={`lp-nav ${dark ? 'on-dark' : ''} ${className}`} aria-label={BRAND} style={{ color: dark ? 'var(--beige)' : 'var(--chocolate)' }}>
      <Link href="/lp-home/" className="lp-brand" aria-label="Sahra, About Sahra" aria-current={current === 'lp-home' ? 'page' : undefined}>
        <svg viewBox="0 0 1420 251" aria-hidden="true" style={{ color: dark ? 'var(--sand)' : 'var(--tribal)' }}>
          <use href="#site-wordmark" />
        </svg>
      </Link>
      <div className="lp-links">
        {NAV_LINKS.map((l) => (
          <Link key={l.id} href={`/${l.id}/`} aria-current={current === l.id ? 'page' : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="lp-actions">
        <Link href="/lp-contact/" className={`btn btn-sm btn-url ${dark ? 'btn-beige' : ''}`} aria-current={current === 'lp-contact' ? 'page' : undefined}>
          sahra.sa
          <span className="sr-only"> contact</span>
        </Link>
      </div>
    </nav>
  );
}
