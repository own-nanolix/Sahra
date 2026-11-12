import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import OpenBox from '@/components/pages/use-product/OpenBox';
import { BoxFront, BoxSide } from '@/components/pages/use-product/ClosedBox';
import { Slipcase, Kit } from '@/components/pages/use-product/Packaging';
import Cards, { COLOURWAYS } from '@/components/pages/use-product/Cards';
import { LidDetail, RingDetail } from '@/components/pages/use-product/Detail';
import DeviceScene from '@/components/pages/use-product/DeviceScene';
import IconLadder from '@/components/pages/use-product/IconLadder';
import { Plate } from '@/components/pages/use-product/parts';
import s from '@/components/pages/use-product/use-product.module.css';

export const metadata = pageMeta('use-product');

export default function Page() {
  return (
    <section className="page" id="p-use-product" aria-label="Product">
      <div className="wrap">
        <header className={s.head}>
          <div className={s.headRow}>
            <h1 tabIndex={-1} className="t-display">
              <span className={s.lineMask}><span className={s.line} style={{ '--i': 0 }}>Product</span></span>
            </h1>
            <p className={`t-lead ${s.sub}`}>
              The presentation box and its packaging, the access card in three colourways, the screens and the app icon.
            </p>
          </div>
        </header>

        <Plate span="span-12" caption="Presentation box, open" className={s.heroPlate}>
          <OpenBox />
        </Plate>

        <div className="bento">
          <Plate span="span-8" caption="Front">
            <BoxFront />
          </Plate>
          <Plate span="span-4" caption="Side" delay={80}>
            <BoxSide />
          </Plate>

          <Plate span="span-6" caption="Slipcase">
            <Slipcase />
          </Plate>
          <Plate span="span-6" caption="Kit contents" delay={80}>
            <Kit />
          </Plate>

          <Plate span="span-6" caption="Lid, blind deboss">
            <LidDetail />
          </Plate>
          <Plate span="span-6" caption="Rings and sheet" delay={80}>
            <RingDetail />
          </Plate>

          {COLOURWAYS.map((c, i) => (
            <Plate key={c.key} span="span-4" caption={`Access card, front and back: ${c.name}`} delay={i * 80}>
              <Cards c={c} />
            </Plate>
          ))}

          <Plate span="span-8" caption="Tablet, phone and watch">
            <DeviceScene />
          </Plate>
          <Reveal as="figure" delay={80} className={`tile tile-flush span-4 ${s.plate} ${s.ladderTile}`}>
            <div style={{ padding: 'clamp(16px, 1.8vw, 28px)' }}>
              <IconLadder />
            </div>
            <figcaption className={`mock-cap ${s.cap}`}>
              <span>App icon</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
