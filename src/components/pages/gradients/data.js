// Data for the gradients page. Colours are the published palette (HEX in @/lib/brand); stops are ours.
import { HEX } from '@/lib/brand';

const C = HEX;

// Each gradient: a name built from the published colour names, the vector in bounding-box units (x1 y1 x2 y2),
// the angle that vector makes, and its stops [offset, colour, name].
export const GRADIENTS = [
  { id: 'chocolate-tribal', name: 'Dark Chocolate Brown to Tribal Brown', angle: 0, v: [0, 0, 1, 0], stops: [[0, C.chocolate, 'Dark Chocolate Brown'], [1, C.tribal, 'Tribal Brown']], h: 170 },
  { id: 'beige-sand-tribal', name: 'Beige to Sand to Tribal Brown', angle: 90, v: [0, 0, 0, 1], stops: [[0, C.beige, 'Beige'], [0.55, C.sand, 'Sand'], [1, C.tribal, 'Tribal Brown']], h: 215 },
  { id: 'chocolate-black', name: 'Dark Chocolate Brown to Black', angle: 70, v: [0.2, 0, 0.8, 1], stops: [[0, C.chocolate, 'Dark Chocolate Brown'], [1, C.black, 'Black']], h: 260 },
  { id: 'sand-beige', name: 'Sand to Beige', angle: 270, v: [0, 1, 0, 0], stops: [[0, C.sand, 'Sand'], [1, C.beige, 'Beige']], h: 305 },
  { id: 'black-chocolate-tribal', name: 'Black to Dark Chocolate Brown to Tribal Brown', angle: 45, v: [0, 0, 1, 1], stops: [[0, C.black, 'Black'], [0.5, C.chocolate, 'Dark Chocolate Brown'], [1, C.tribal, 'Tribal Brown']], h: 350 },
  { id: 'white-beige', name: 'White to Beige', angle: 45, v: [0, 0, 1, 1], stops: [[0, C.white, 'White'], [1, C.beige, 'Beige']], h: 395 },
];

export const byId = (id) => GRADIENTS.find((g) => g.id === id);

// The profile card header (m12), measured from the reference: pixel samples along one row of the header,
// as a fraction of the card width, against the hex found there.
export const HEADER_SAMPLES = [
  [0.0, '#35241C'],
  [0.23, '#483225'],
  [0.46, '#5A3D2B'],
  [0.58, '#654431'],
  [0.7, '#6F4C36'],
  [0.81, '#78523B'],
  [0.93, '#81593F'],
  [1.0, '#875D41'],
];

// Four levels of paper grain (the filter's alpha amount) used on every surface in m01, m10 and m15.
export const GRAIN_LEVELS = [
  { id: 'one', label: 'Level 1', amount: 0.06, note: 'Barely there' },
  { id: 'two', label: 'Level 2', amount: 0.11, note: 'Soft paper' },
  { id: 'three', label: 'Level 3', amount: 0.18, note: 'Visible tooth' },
  { id: 'four', label: 'Level 4', amount: 0.3, note: 'Rough board' },
];

// Linear interpolation of two hex colours, used only to print what the rebuilt gradient gives at a sample.
export function mix(a, b, t) {
  const p = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const [x, y] = [p(a), p(b)];
  return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('').toUpperCase();
}
