// Every number charted on the data page. Each is counted in code from the case study's own text, the published
// palette, the traced word-mark or the site's own structure (pages.json). Nothing here is invented.
import { INTRO, LETTER, TYPE, PLAN, POSTER_BODY, ABOUT, PALETTE, SCOPE, CONTACT_BLOCKS, HEX } from '@/lib/brand';
import { pages, groups } from '@/lib/pages';
import { GLYPHS, WM } from '@/components/art/Mark';

// Prefix sums: offsets([3, 2, 4]) -> [0, 3, 5]
export const offsets = (vals) => vals.map((_, i) => vals.slice(0, i).reduce((x, y) => x + y, 0));
export const words =(t) => t.trim().split(/\s+/).length;
const sum = (a) => a.reduce((x, y) => x + y, 0);

export const introWords = INTRO.paragraphs.map(words); // 6 paragraphs
export const letterWords = LETTER.paragraphs.map(words); // 5 paragraphs
export const typeWords = TYPE.text.map(words); // 2 paragraphs
export const introCumulative = introWords.map((_, i) => sum(introWords.slice(0, i + 1)));

export const CHAR_NAMES = ['Capitals', 'Lower case', 'Figures', 'Symbols'];
export const charLines = TYPE.charset.map((l) => [...l].length);

// Copy blocks of the case study with their word counts.
export const blocks = [
  { name: 'Intro slide', n: sum(introWords) },
  { name: 'Letter', n: sum(letterWords) },
  { name: 'Type slide', n: sum(typeWords) },
  { name: 'Poster body', n: words(POSTER_BODY) },
  { name: 'Plan sheet', n: words(PLAN.text) },
  { name: 'About page', n: words(ABOUT.text) },
];
export const blockTotal = sum(blocks.map((b) => b.n));

// Palette, parsed from the printed values.
export const colours = PALETTE.map((p) => {
  const [r, g, b] = p.rgb.split(',').map((v) => parseInt(v, 10));
  const [c, m, y, k] = p.cmyk.split(',').map((v) => parseInt(v, 10));
  return { ...p, r, g, b, c, m, y, k, short: p.name === 'Dark Chocolate Brown' ? 'Chocolate' : p.name };
});

// The site's own structure.
export const groupCounts = groups.map((g) => ({ name: g.name, n: g.pages.length }));
export const pageCount = pages.length;
export const exportsByPage = pages.map((p) => ({ id: p.id, title: p.title, n: p.minExports }));
export const topExports = [...exportsByPage].sort((a, b) => b.n - a.n || a.title.localeCompare(b.title)).slice(0, 8);
const edges = [0, 5, 10, 20, 40, Infinity];
export const exportBins = edges.slice(0, -1).map((lo, i) => {
  const hi = edges[i + 1];
  return { lo, hi, n: exportsByPage.filter((p) => p.n >= lo && p.n < hi).length, label: hi === Infinity ? `${lo}+` : `${lo}-${hi - 1}` };
});

// The traced word-mark: anchor points per letter.
export const glyphAnchors = [...GLYPHS.latin, ...GLYPHS.arabic].map((g) => ({
  id: g.id,
  name: g.id === 'a2' ? 'a (last)' : g.name,
  n: g.p.pts.length,
}));
export const anchorTotal = sum(glyphAnchors.map((g) => g.n));
export const rankedAnchors = [...glyphAnchors].sort((a, b) => b.n - a.n).slice(0, 7);
export const cut = { drawn: WM.CUT_DRAWN, measured: WM.CUT_MEASURED };

export const scope = SCOPE;
export const contactLines = Object.entries(CONTACT_BLOCKS).map(([k, v]) => ({ name: k[0].toUpperCase() + k.slice(1), n: v.length }));
export const weights = TYPE.weights;

// Series colours: the published palette and tints only.
export const RING_COLORS = [HEX.chocolate, HEX.tribal, HEX.sand, '#CFBEB3', '#E1D2C4', HEX.black];

export const CAPTIONS = {
  intro: 'Counts the words in each of the six intro-slide paragraphs.',
  letter: 'Counts the words in each of the five letter paragraphs.',
};
