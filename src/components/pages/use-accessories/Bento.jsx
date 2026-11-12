// The accessory plates in a dense 8-column bento: small objects in small tiles, the desk mat in a wide one.
import Reveal from '@/components/site/Reveal';
import { TOTE_PLATES } from './Totes';
import { MUG_PLATES } from './Mugs';
import { BOTTLE_PLATES } from './Bottles';
import { STICKER_PLATES } from './Stickers';
import { PATCH_PLATES, KEYCHAIN_PLATE } from './Patches';
import { COUNTER_PLATES } from './Counter';
import { DESK_PLATES } from './Desk';
import { OUTDOOR_PLATES } from './Outdoor';
import { GIFT_PLATES } from './Gift';
import s from './use-accessories.module.css';

const [toteA, toteB] = TOTE_PLATES;
const [mugA, mugB] = MUG_PLATES;
const [bottleA, bottleB] = BOTTLE_PLATES;
const [stickers, pins] = STICKER_PLATES;

// DOM order = reading order; the dense grid packs each block into 8 columns.
const PLATES = [
  toteA, toteB, mugA, mugB, COUNTER_PLATES.coasters,
  bottleA, bottleB, stickers, pins, KEYCHAIN_PLATE,
  DESK_PLATES.mat,
  ...PATCH_PLATES,
  DESK_PLATES.pad, COUNTER_PLATES.cup, OUTDOOR_PLATES.socks,
  OUTDOOR_PLATES.umbrella, GIFT_PLATES.front, GIFT_PLATES.back, GIFT_PLATES.carrier,
];

export default function Bento() {
  return (
    <div className={s.field}>
      <div className={s.grid}>
        {PLATES.map((p, i) => (
          <Reveal key={p.key} as="figure" delay={(i % 4) * 60} className={s.tile} style={{ gridColumn: `span ${p.c}`, gridRow: `span ${p.r}`, '--ar': p.ar }}>
            {p.node}
            <figcaption className={s.cap}>{p.cap}</figcaption>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
