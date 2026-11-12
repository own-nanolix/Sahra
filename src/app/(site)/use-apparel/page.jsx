import Reveal from '@/components/site/Reveal';
import { pageMeta } from '@/lib/pages';
import { LINES } from '@/lib/brand';
import Collection from '@/components/pages/use-apparel/Collection';
import { TeePlate } from '@/components/pages/use-apparel/Tees';
import { HoodiePlate, JacketPlate } from '@/components/pages/use-apparel/Hoodies';
import { CapPlate } from '@/components/pages/use-apparel/Caps';
import { ArtworkSheet, Colourways, SpecSheet } from '@/components/pages/use-apparel/Sheets';
import s from '@/components/pages/use-apparel/use-apparel.module.css';

export const metadata = pageMeta('use-apparel');

// Plain names for the captions.
const TEE_CAPS = ['Beige t-shirt', 'Dark Chocolate t-shirt', 'Sand t-shirt'];
const TEE_SIDES = ['Front and back, side by side', 'Front over back', 'Front and back, fanned'];
const HOODIE_CAPS = [
  [<HoodiePlate key="a" n={0} />, 'Dark Chocolate hoodie', 'Stack and hook'],
  [<HoodiePlate key="b" n={1} />, 'Tribal Brown and Sand hoodies', 'Two hooks'],
  [<JacketPlate key="j" />, 'Dark jacket, back', 'Mark, tone on tone'],
];
const CAP_CAPS = ['Dark Chocolate cap', 'Beige cap', 'Tribal Brown cap'];

function Plate({ span, delay = 0, name, note, children }) {
  return (
    <Reveal as="figure" delay={delay} className={`tile tile-flush ${s.tile} ${s.plate} ${span || ''}`}>
      {children}
      <figcaption className={`${s.cap} t-small`}>
        <span>{name}</span>
        <span>{note}</span>
      </figcaption>
    </Reveal>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-use-apparel" aria-label="Apparel">
      <div className="wrap">
        <header className={s.head}>
          <h1 tabIndex={-1}>Apparel</h1>
          <p className="t-lead muted">{LINES.imagination.text}</p>
        </header>

        <Reveal as="figure" className={`${s.plate} ${s.collection}`}>
          <Collection />
          <figcaption className={`${s.cap} t-small`}>
            <span>The collection</span>
            <span>Rail and counter</span>
          </figcaption>
        </Reveal>

        <div className="bento">
          {/* LAYOUTS: t-shirts 6 x 3 beside hoodies 6 x 3: two columns of three plates each */}
          <div className={`span-6 ${s.column}`}>
            <div className={s.colHead}>
              <h2 className="t-h2">T-shirts</h2>
            </div>
            {TEE_CAPS.map((name, n) => (
              <Plate key={name} delay={n * 80} name={name} note={TEE_SIDES[n]}>
                <TeePlate n={n} />
              </Plate>
            ))}
          </div>
          <div className={`span-6 ${s.column}`}>
            <div className={s.colHead}>
              <h2 className="t-h2">Hoodies</h2>
            </div>
            {HOODIE_CAPS.map(([art, name, note], n) => (
              <Plate key={name} delay={n * 80 + 40} name={name} note={note}>
                {art}
              </Plate>
            ))}
          </div>

          <div className={s.section}>
            <h2 className="t-h2">Caps</h2>
          </div>
          {CAP_CAPS.map((name, n) => (
            <Plate key={name} span="span-4" delay={n * 80} name={name} note="Embroidered mark">
              <CapPlate n={n} />
            </Plate>
          ))}

          <div className={s.section}>
            <h2 className="t-h2">Colourways</h2>
          </div>
          <Plate span="span-12" name="T-shirt colourways" note="Beige, Dark Chocolate, Sand, Tribal Brown, Black">
            <Colourways />
          </Plate>
          <Plate span="span-12" name="Print artwork" note="Mark and word-mark">
            <ArtworkSheet />
          </Plate>

          <div className={s.section}>
            <h2 className="t-h2">Print specification</h2>
          </div>
          <Reveal as="figure" className={`tile tile-flush ${s.tile} ${s.plate} span-12`}>
            <div className={s.scroll} tabIndex={0} role="region" aria-label="Print specification drawing">
              <div className={s.scrollInner}>
                <SpecSheet />
              </div>
            </div>
            <figcaption className={`${s.cap} t-small`}>
              <span>T-shirt print areas</span>
              <span>Dimensions in mm</span>
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
