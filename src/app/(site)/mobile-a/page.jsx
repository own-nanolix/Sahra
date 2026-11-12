import { pageMeta } from '@/lib/pages';
import Studio from '@/components/pages/mobile-a/Studio';

export const metadata = pageMeta('mobile-a');

export default function Page() {
  return (
    <section className="page" id="p-mobile-a" aria-label="Mobile app, screens 1 to 9">
      <div className="wrap stack">
        <h1 className="t-h1" tabIndex={-1}>Mobile app, screens 1 to 9</h1>
        <Studio />
      </div>
    </section>
  );
}
