// Data for the logo page. Colour pairs are the four published colour versions (m09) plus the primary (m04).
import { HEX } from '@/lib/brand';
import { WM } from '@/components/art/Mark';

// m09, in reading order: ground, then the word-mark on it.
export const COLOURWAYS = [
  { id: 'beige-on-sand', name: 'Beige on Sand', ground: HEX.sand, ink: HEX.beige },
  { id: 'sand-on-tribal', name: 'Sand on Tribal Brown', ground: HEX.tribal, ink: HEX.sand },
  { id: 'tribal-on-beige', name: 'Tribal Brown on Beige', ground: HEX.beige, ink: HEX.tribal },
  { id: 'beige-on-black', name: 'Beige on Black', ground: HEX.black, ink: HEX.beige },
];

// m09 field: 800 x 477, the word-mark 388 wide at (206, 204).
export const FIELD = { w: 800, h: 477, markX: 206, markY: 204, markW: 388 };

// Clear space is measured in x, the stroke of the word-mark. The rule (4x) and the minimum widths below are
// our own working values for the guide: the case study prints none.
export const CLEAR = 4;
export const MIN_SIZES = [
  { id: 'wordmark', name: 'Word-mark', width: 120 },
  { id: 'row', name: 'Row lockup', width: 240 },
  { id: 'mark', name: 'Mark', width: 24 },
  { id: 'tile', name: 'Mark in its tile', width: 32 },
];

// What the traced construction measures, in word-mark units (1 unit = 1 px of the artwork at 1420 wide).
export const MEASURES = [
  { n: '01', label: 'Stroke, x', value: `${WM.X}` },
  { n: '02', label: 'Tall stems with a cut top, h and alif', value: `${WM.XT}` },
  { n: '03', label: 'Bowls and corners, outer / inner radius', value: `${WM.R} / ${WM.r}` },
  { n: '04', label: 'Corners of the hah, outer / inner radius', value: `${WM.RS} / ${WM.rs}` },
  { n: '05', label: 'Gap between the halves of the S, y', value: `${WM.GAP}` },
  { n: '06', label: 'Cut ends, labelled as printed (Latin / Arabic)', value: '34° / 42°' },
];

// The six misuses. `kind` picks the treatment in MisusePlates.
export const MISUSES = [
  { id: 'stretch', label: 'Do not stretch or squash it', kind: 'stretch' },
  { id: 'rotate', label: 'Do not tilt it', kind: 'rotate' },
  { id: 'outline', label: 'Do not draw it as an outline', kind: 'outline' },
  { id: 'contrast', label: 'Do not set Sand on Beige', kind: 'contrast' },
  { id: 'colour', label: 'Do not use colours outside the palette', kind: 'colour' },
  { id: 'shadow', label: 'Do not add shadows or effects', kind: 'shadow' },
];

// The two inks of the drawing plates, for text drawn inside the artwork.
// alert is the shared error ink (--error-ink in globals.css, HEX.error).
export const PLATE_INK = { dark: HEX.chocolate, muted: HEX.muted, alert: HEX.error };
