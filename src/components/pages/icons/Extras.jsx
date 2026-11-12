import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import { UTIL, ICON_LABELS } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import GlyphG from './GlyphG';
import InView from './InView';
import s from './icons.module.css';

// The four colour versions of the word-mark (m09), applied to one icon: the icon takes the mark's pairs of colours.
const WAYS = [
  { key: 'beige-on-sand', label: 'Beige on Sand', ground: HEX.sand, ink: HEX.beige },
  { key: 'sand-on-tribal', label: 'Sand on Tribal Brown', ground: HEX.tribal, ink: HEX.sand },
  { key: 'tribal-on-beige', label: 'Tribal Brown on Beige', ground: HEX.beige, ink: HEX.tribal },
  { key: 'beige-on-black', label: 'Beige on Black', ground: HEX.black, ink: HEX.beige },
];

export function Colourways({ icon = 'key' }) {
  return (
    <InView className={`grid cols-2 ${s.ways}`}>
      {WAYS.map((w, i) => (
        <Reveal key={w.key} delay={i * 70} className={s.way}>
          <Art viewBox="0 0 240 240" title={`The ${icon} icon, ${w.label}`} exportName={`icons-colour-${w.key}`} className={s.wayArt}>
            <rect width="240" height="240" fill={w.ground} />
            <g className="slide-up" style={{ '--i': i }}>
              <GlyphG name={icon} x={72} y={72} size={96} fill={w.ink} />
            </g>
          </Art>
          <span className="t-label">{w.label}</span>
        </Reveal>
      ))}
    </InView>
  );
}

// Interface extras: the same grid and stroke, for controls and states.
export function UtilSheet() {
  const names = Object.keys(UTIL);
  return (
    <ul className={s.cells} id="icons-util-cells">
      {names.map((name, i) => (
        <li key={name} className={s.cell}>
          <span className={s.cellArt}>
            <Art
              viewBox="0 0 24 24"
              title={`Icon: ${ICON_LABELS[name]}`}
              exportName={`icons-ui-${name}`}
              width={32}
              height={32}
              style={{ width: 32, height: 32 }}
            >
              <g className={s.ink} style={{ '--n': i }}>
                <GlyphG name={name} fill={HEX.chocolate} />
              </g>
            </Art>
          </span>
          <span className={`t-label ${s.cellName}`}>{ICON_LABELS[name]}</span>
        </li>
      ))}
    </ul>
  );
}

export const USAGE = [
  { no: '01', label: 'Size', body: 'Draw at 24 px. Use 16 px inside small buttons and chips, 20 px in the standard button, 32 px and 48 px on plaques and sheets. Never draw between these sizes: the 2 px stroke must land on the pixel grid.' },
  { no: '02', label: 'Colour', body: 'An icon takes the ink of the text beside it: Chocolate on light grounds, Beige on dark ones. Sand is kept for dark grounds, where it passes; on Beige it is for large artwork only.' },
  { no: '03', label: 'Stroke', body: 'One stroke, never thickened or thinned to suit a size. If an icon is too crowded at 16 px, it is redrawn on the grid, not scaled.' },
  { no: '04', label: 'Corners and ends', body: 'Corners are quarter circles, bowls are true circles, and free ends are cut on the word-mark’s diagonal. Nothing is softened, rounded off or capped.' },
];
