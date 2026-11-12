import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import Plate from '@/components/pages/use-packaging/Plate';
import { TapeDark, TapeKraft, TapeStrips } from '@/components/pages/use-packaging/Tape';
import { ShippingSand, ShippingChocolate } from '@/components/pages/use-packaging/Shipping';
import { ProductDark, ProductTall, Tube } from '@/components/pages/use-packaging/Products';
import { BagDark, BagTribal, BagBeige } from '@/components/pages/use-packaging/Bags';
import { TissuePaper, SealSticker, ShippingLabelPlate } from '@/components/pages/use-packaging/Inside';
import s from '@/components/pages/use-packaging/use-packaging.module.css';

export const metadata = pageMeta('use-packaging');

// Two columns of tall and short tiles, alternating down each column (tall = 4:5, short = 4:3).
const COLS = [
  [['Tape, Dark Chocolate', TapeDark], ['Tape strips', TapeStrips], ['Shipping box, Sand', ShippingSand], ['Product box, dark', ProductDark], ['Shopping bag, Dark Chocolate', BagDark], ['Cream tube', Tube], ['Shopping bag, Tribal Brown', BagTribal]],
  [['Tape, Sand', TapeKraft], ['Shipping box, Dark Chocolate', ShippingChocolate], ['Tissue paper', TissuePaper], ['Product box, tall', ProductTall], ['Seal sticker', SealSticker], ['Shopping bag, Beige', BagBeige], ['Shipping label', ShippingLabelPlate]],
];

function Tile({ name, Art, delay }) {
  return (
    <Reveal as="figure" className={s.tile} delay={delay}>
      <div className="mock"><Art /></div>
      <figcaption className="mock-cap"><span>{name}</span></figcaption>
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-packaging" aria-label="Packaging">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1} className="t-h1">Packaging</h1>
          <p className="t-lead muted">Tape, boxes, bags, tissue, seal and label, printed with the word-mark and the mark.</p>
        </header>
        <figure className={s.plate}>
          <div className="mock"><Plate /></div>
          <figcaption className="mock-cap"><span>Presentation box</span></figcaption>
        </figure>
        <div className={s.cols}>
          {COLS.map((col, i) => (
            <div className={s.col} key={i}>
              {col.map(([name, Art], j) => <Tile key={name} name={name} Art={Art} delay={j * 60} />)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
