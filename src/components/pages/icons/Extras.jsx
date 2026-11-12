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
  { no: '01', label: 'Size', body: 'Draw on the 24 px grid. Use 16 px in small buttons and chips, 20 px in the standard button, 24 px beside text, and 32 or 48 px on plaques and sheets. At other sizes the stroke falls between pixels and softens.' },
  { no: '02', label: 'Colour', body: 'Give an icon the ink of the text beside it: Dark Chocolate Brown on light grounds, Beige on dark ones. Keep Sand for dark grounds; on Beige use it only for large artwork.' },
  { no: '03', label: 'Stroke', body: 'Keep one stroke; do not thicken or thin it to suit a size. If an icon is too crowded at 16 px, redraw it on the grid rather than scaling it.' },
  { no: '04', label: 'Corners and ends', body: 'Draw corners as quarter circles and bowls as true circles, and cut free ends on the word-mark’s diagonal. Do not soften, round off or cap them.' },
];
