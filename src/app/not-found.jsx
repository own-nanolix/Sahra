import Link from 'next/link';
import { MarkG } from '@/components/art/Mark';

export const metadata = { title: 'Page not found' };

// A quiet 404 on Dark Chocolate, in the voice of the posters.
export default function NotFound() {
  return (
    <main id="site-main" className="page field-chocolate on-dark" style={{ display: 'grid', alignContent: 'center', gap: 28, padding: 'var(--pad)' }}>
      <svg viewBox="0 0 184 201" width="44" height="48" aria-hidden="true">
        <MarkG fill="#B58F6B" />
      </svg>
      <p className="t-label">404</p>
      <h1 className="t-h1">This page is not part of the brand system</h1>
      <p className="t-lead" style={{ color: 'var(--beige-muted)', maxWidth: '32em' }}>The address does not match any of the thirty pages.</p>
      <p className="row" style={{ gap: 10 }}>
        <Link className="btn btn-beige" href="/overview/">Go to the overview</Link>
        <Link className="btn btn-outline" href="/overview/?index=1">Open the index</Link>
      </p>
    </main>
  );
}
