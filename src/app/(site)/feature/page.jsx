import { pageMeta } from '@/lib/pages';
import { CONTACT_BLOCKS, PLAN } from '@/lib/brand';
import { Contact, SiteUrl } from '@/components/ui/Card';
import Reveal from '@/components/site/Reveal';
import Explorer from '@/components/pages/feature/Explorer';
import Artwork from '@/components/pages/feature/Artwork';
import s from '@/components/pages/feature/feature.module.css';

export const metadata = pageMeta('feature');

export default function Page() {
  return (
    <section className="page" id="p-feature" aria-label="Plan explorer">
      <div className="wrap">
        <header className={s.head}>
          <div>
            <p className="t-label">{PLAN.sender}</p>
            <h1 className="t-display" tabIndex={-1}>Plan explorer</h1>
          </div>
          <div className={s.headContacts}>
            <Contact lines={CONTACT_BLOCKS.service.slice(1)} />
            <Contact lines={CONTACT_BLOCKS.office} />
            <SiteUrl>sahra.sa</SiteUrl>
          </div>
        </header>

        <Reveal as="section" aria-labelledby="feature-h-sheet">
          <div className={s.secHead}>
            <h2 id="feature-h-sheet" className="t-h2">The sheet</h2>
          </div>
          <Explorer />
        </Reveal>

        <section aria-labelledby="feature-h-art" style={{ marginTop: 'var(--band)' }}>
          <div className={s.secHead}>
            <h2 id="feature-h-art" className="t-h2">Artwork</h2>
          </div>
          <Artwork />
        </section>
      </div>
    </section>
  );
}
