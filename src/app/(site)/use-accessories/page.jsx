import { pageMeta } from '@/lib/pages';
import Bento from '@/components/pages/use-accessories/Bento';
import s from '@/components/pages/use-accessories/use-accessories.module.css';

export const metadata = pageMeta('use-accessories');

export default function Page() {
  return (
    <section className="page" id="p-use-accessories" aria-label="Accessories">
      <div className="wrap band">
        <header className={s.head}>
          <p className="t-label">Brand objects</p>
          <h1 className="t-h1" tabIndex={-1}>Accessories</h1>
          <p className="t-lead muted">Totes, mugs, bottles, stickers, patches, desk and gift pieces: each object set down in its own scene, lit from the upper left.</p>
        </header>
        <Bento />
      </div>
    </section>
  );
}
