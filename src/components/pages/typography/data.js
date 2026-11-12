// Typography page data. The family, weights, character set and paragraphs are the published ones (m06) from
// @/lib/brand. The scale values mirror the shared classes in globals.css (t-display ... t-label).
import { TYPE } from '@/lib/brand';

export const FAMILY = TYPE.family;
export const SERIF_WEIGHTS = [
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
  { name: 'SemiBold', value: 600 },
  { name: 'Bold', value: 700 },
];
// The sans voice is unnamed in the case study; it is set light to regular, slightly tight.
export const SANS_WEIGHTS = [
  { name: 'Light', value: 300 },
  { name: 'Regular', value: 400 },
  { name: 'Medium', value: 500 },
];

// size in px at a 1440 wide screen (the upper end of each clamp), line height as a number, tracking in em.
export const SCALE = [
  { cls: 't-display', name: 'Display', voice: 'serif', size: 92, lh: 1.02, track: -0.025, sample: 'Spaces' },
  { cls: 't-h1', name: 'Heading 1', voice: 'serif', size: 66, lh: 1.05, track: -0.02, sample: 'Spaces that elevate' },
  { cls: 't-h2', name: 'Heading 2', voice: 'serif', size: 46, lh: 1.07, track: -0.015, sample: 'Spaces that elevate' },
  { cls: 't-line', name: 'Brand line', voice: 'serif', size: 37, lh: 1.06, track: -0.015, sample: 'We Build Spaces of Imagination' },
  { cls: 't-h3', name: 'Heading 3', voice: 'serif', size: 27, lh: 1.12, track: -0.01, sample: 'Spaces that elevate everyday living' },
  { cls: 't-lead', name: 'Lead', voice: 'sans', size: 19, lh: 1.45, track: -0.015, sample: 'A refined approach to real estate, where design meets functionality.' },
  { cls: 't-body', name: 'Body', voice: 'sans', size: 16, lh: 1.55, track: -0.01, sample: 'A refined approach to real estate, where design meets functionality.' },
  { cls: 't-small', name: 'Small', voice: 'sans', size: 13, lh: 1.45, track: -0.01, sample: 'A refined approach to real estate, where design meets functionality.' },
  { cls: 't-label', name: 'Label', voice: 'sans', size: 12, lh: 1.35, track: 0, sample: 'About Sahra' },
  { cls: 'contact', name: 'Contact', voice: 'sans', size: 12, lh: 1.38, track: -0.005, sample: '+966 55 123 4567' },
];

export const CHARSET = TYPE.charset;
export const SPECIMEN = TYPE.specimen;
export const PARAGRAPHS = TYPE.text;
export const WEIGHT_LINES = TYPE.weights;
export const GLYPH_ROWS = [CHARSET[0], CHARSET[1], CHARSET[2], CHARSET[3]];

// Ink on white and Beige, used inside the artwork.
export const INK = '#1E140F';
export const GREY = '#767676'; // the grey of the three lighter weights on the slide, 4.5:1 on white
