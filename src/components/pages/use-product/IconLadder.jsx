// The app icon at 16, 32, 64, 128 and 256 px: the beige rounded tile with the tribal-brown mark (the profile
// tile of m12), at their real pixel sizes on a flat ladder on Beige. At the small sizes the mark is drawn a
// little larger inside its tile, so it stays legible at 16.
import Art from '@/components/art/Art';
import { MarkG, MARK_W, MARK_H } from '@/components/art/Mark';
import { r2 } from '@/lib/charts';
import s from './use-product.module.css';

export const ICON_SIZES = [16, 32, 64, 128, 256];

function Icon({ size }) {
  const mw = size <= 16 ? size * 0.62 : size <= 32 ? size * 0.56 : size * 0.48;
  const mh = (mw * MARK_H) / MARK_W;
  const rad = size * 0.22;
  return (
    <Art viewBox={`0 0 ${size} ${size}`} title={`App icon, ${size} px`} exportName={`use-product-icon-${size}`} width={size} height={size} className={s.iconSvg}>
      <rect width={size} height={size} rx={r2(rad)} fill="#F5F0E3" />
      <rect x="0.5" y="0.5" width={size - 1} height={size - 1} rx={r2(rad - 0.5)} fill="none" stroke="#875D41" strokeOpacity="0.28" />
      <MarkG x={r2((size - mw) / 2)} y={r2((size - mh) / 2)} size={r2(mw)} fill="#875D41" />
    </Art>
  );
}

export default function IconLadder() {
  return (
    <div className={s.ladder}>
      {ICON_SIZES.map((n, i) => (
        <div key={n} className={s.rung} style={{ '--i': i }}>
          <Icon size={n} />
          <span className="t-label">{n} px</span>
        </div>
      ))}
    </div>
  );
}
