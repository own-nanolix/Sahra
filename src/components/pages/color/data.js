// Colour page data. Hex values come from the published palette (m05) in @/lib/brand; every ratio is computed
// here from those hex values with the shared contrast(); the tints are computed by mixing with white.
import { PALETTE, HEX } from '@/lib/brand';
import { contrast, hexToRgb } from '@/lib/site';

export const LIGHT = HEX.beige; // the page ground
export const DARK = HEX.chocolate; // the dark ground

const byToken = Object.fromEntries(PALETTE.map((p) => [p.token, p]));
export const colour = (token) => byToken[token];

const hx = (n) => Math.round(n).toString(16).padStart(2, '0').toUpperCase();

// A tint is the colour at pct % strength over white (m05: 80, 60, 40, 20).
export function tintOf(hex, pct) {
  const c = hex.replace('#', '');
  const ch = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16));
  return '#' + ch.map((v) => hx(v * (pct / 100) + 255 * (1 - pct / 100))).join('');
}

// The best of Ink and Beige for text on a fill.
export const onFill = (hex) => (contrast(hex, HEX.ink) >= contrast(hex, HEX.beige) ? HEX.ink : HEX.beige);

export function grade(r) {
  if (r >= 7) return { label: 'AAA', tone: 'ok' };
  if (r >= 4.5) return { label: 'AA', tone: 'ok' };
  if (r >= 3) return { label: 'Large only', tone: 'mid' };
  return { label: 'Fail', tone: 'bad' };
}

export const ratio = (a, b) => contrast(a, b).toFixed(2);
export const rgbOf = (hex) => hexToRgb(hex);

const STEPS = [80, 60, 40, 20];
function ladder(token) {
  const p = byToken[token];
  return [
    { id: token, name: p.name, token: `--${token}`, hex: p.hex.toUpperCase(), pct: 100 },
    ...STEPS.map((pct) => ({ id: `${token}-${pct}`, name: `${p.name} ${pct}%`, token: `--${token}-${pct}`, hex: tintOf(p.hex, pct), pct })),
  ];
}
export const LADDERS = { tribal: ladder('tribal'), sand: ladder('sand'), beige: ladder('beige') };

// Primary scale: the three browns and the tints of Tribal Brown and Sand.
export const PRIMARY_SCALE = [
  { id: 'chocolate', name: 'Dark Chocolate Brown', token: '--chocolate', hex: HEX.chocolate },
  ...LADDERS.tribal,
  ...LADDERS.sand,
];
// Neutral scale: Black, Beige and its tints, White, and the four small-text inks of the system.
export const NEUTRAL_SCALE = [
  { id: 'black', name: 'Black', token: '--black', hex: HEX.black },
  ...LADDERS.beige,
  { id: 'white', name: 'White', token: '--white', hex: HEX.white },
  { id: 'ink', name: 'Ink', token: '--ink', hex: HEX.ink },
  { id: 'muted', name: 'Muted', token: '--muted', hex: HEX.muted },
  { id: 'sand-ink', name: 'Sand ink', token: '--sand-ink', hex: HEX.sandInk },
  { id: 'beige-muted', name: 'Beige muted', token: '--beige-muted', hex: HEX.beigeMuted },
];

// Six accessible pairings (text colour on ground). Every ratio shown is computed.
export const PAIRINGS = [
  { id: 'beige-chocolate', fg: HEX.beige, bg: HEX.chocolate, fgName: 'Beige', bgName: 'Dark Chocolate Brown', use: 'Folders, footers, the dark grounds' },
  { id: 'sand-chocolate', fg: HEX.sand, bg: HEX.chocolate, fgName: 'Sand', bgName: 'Dark Chocolate Brown', use: 'The mark and small accents on dark' },
  { id: 'tribal-beige', fg: HEX.tribal, bg: HEX.beige, fgName: 'Tribal Brown', bgName: 'Beige', use: 'Accent text and links on the page ground' },
  { id: 'beige-tribal', fg: HEX.beige, bg: HEX.tribal, fgName: 'Beige', bgName: 'Tribal Brown', use: 'Board, the primary button' },
  { id: 'beige-black', fg: HEX.beige, bg: HEX.black, fgName: 'Beige', bgName: 'Black', use: 'The strongest statements (m14)' },
  { id: 'sandink-white', fg: HEX.sandInk, bg: HEX.white, fgName: 'Sand ink', bgName: 'White', use: 'Small sand-coloured text on light grounds' },
];

// Semantic tokens in both modes. kind "ground" rows show the colour only; other rows show ratio on `on`.
export const SEMANTIC = {
  light: {
    name: 'Light mode',
    ground: HEX.beige,
    rows: [
      { name: 'Background', token: '--bg', hex: HEX.beige, kind: 'ground' },
      { name: 'Surface', token: '--surface', hex: HEX.white, kind: 'ground' },
      { name: 'Text', token: '--fg', hex: HEX.ink, on: HEX.beige },
      { name: 'Muted text', token: '--muted', hex: HEX.muted, on: HEX.beige },
      { name: 'Accent', token: '--accent', hex: HEX.tribal, on: HEX.beige },
      { name: 'Small accent text', token: '--sand-ink', hex: HEX.sandInk, on: HEX.beige },
      { name: 'Action text', token: '--beige', hex: HEX.beige, on: HEX.tribal },
    ],
  },
  dark: {
    name: 'Dark mode',
    ground: HEX.chocolate,
    rows: [
      { name: 'Background', token: '--chocolate', hex: HEX.chocolate, kind: 'ground' },
      { name: 'Surface', token: '--black', hex: HEX.black, kind: 'ground' },
      { name: 'Text', token: '--beige', hex: HEX.beige, on: HEX.chocolate },
      { name: 'Muted text', token: '--beige-muted', hex: HEX.beigeMuted, on: HEX.chocolate },
      { name: 'Accent', token: '--sand', hex: HEX.sand, on: HEX.chocolate },
      { name: 'Accent on black', token: '--sand', hex: HEX.sand, on: HEX.black },
      { name: 'Action text', token: '--chocolate', hex: HEX.chocolate, on: HEX.sand },
    ],
  },
};

// The balance of the six colours as the case study itself shows them: the share of the pixels of its sixteen images
// (downsampled to 400 px wide) that sit within a small distance (14 RGB units) of each published value. Measured by
// us from the reference images, not published; the off-white studio ground of the flat lays counts as Beige.
export const BALANCE = [
  { token: 'beige', name: 'Beige', share: 31.7 },
  { token: 'white', name: 'White', share: 20.8 },
  { token: 'chocolate', name: 'Dark Chocolate Brown', share: 20.7 },
  { token: 'black', name: 'Black', share: 14.1 },
  { token: 'tribal', name: 'Tribal Brown', share: 8.8 },
  { token: 'sand', name: 'Sand', share: 3.9 },
];

// Every colour a tester can pick (published six plus the four inks).
export const TESTER_COLOURS = [
  ...PALETTE.map((p) => ({ id: p.token, name: p.name, hex: p.hex.toUpperCase() })),
  { id: 'ink', name: 'Ink', hex: HEX.ink },
  { id: 'muted', name: 'Muted', hex: HEX.muted },
  { id: 'sand-ink', name: 'Sand ink', hex: HEX.sandInk },
  { id: 'beige-muted', name: 'Beige muted', hex: HEX.beigeMuted },
];
