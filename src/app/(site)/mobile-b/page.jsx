import { pageMeta } from '@/lib/pages';
import Showcase from '@/components/pages/mobile-b/Showcase';
import Components from '@/components/pages/mobile-b/Components';
import Patterns from '@/components/pages/mobile-b/Patterns';
import { FlatShelf } from '@/components/pages/mobile-b/Flat';
import s from '@/components/pages/mobile-b/mobile-b.module.css';

export const metadata = pageMeta('mobile-b');

// Mobile screens 10 to 18: the About page of the case study (m12) carried into an app, in its own language.
export default function Page() {
  return (
    <section className="page" id="p-mobile-b" aria-label="Mobile app, screens 10 to 18">
      <div className="wrap">
        <header className={s.intro}>
          <p className="t-label">Product</p>
          <h1 className="t-h1" tabIndex={-1}>Mobile app, screens 10 to 18</h1>
          <p className="t-lead muted">
            Nine screens on Beige and Dark Chocolate: serif headlines, thin ruled rows with a number, a label and a plus,
            rounded buttons, the quarter arch and the mark in its tile.
          </p>
        </header>
        <div className="bento bento-6">
          <Showcase />
          <div className={`tile ${s.compTile}`}>
            <h2 className="t-h3">Mobile components</h2>
            <p className="t-small">Each one has states you can switch.</p>
            <Components />
          </div>
          <div className={`tile tile-beige span-6 ${s.flatTile}`}>
            <h2 className="t-h3">Flat artwork</h2>
            <p className="t-small">Screens and components as exportable SVG.</p>
            <FlatShelf />
          </div>
          <Patterns />
        </div>
      </div>
    </section>
  );
}
