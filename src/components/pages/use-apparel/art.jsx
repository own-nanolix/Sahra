// The printed artwork on the garments: always the shared mark and word-mark from Mark.jsx, in tee / hoodie
// local coordinates (the centre line is x = 150 for tees, x = 160 for hoodies).
import { MarkG, WordmarkG } from '@/components/art/Mark';

// Tee artwork. kind: 'mark' (chest), 'wordmark' (chest), 'faint' (large and faint, tone on tone).
export function TeeArt({ idp, kind, ink, opacity }) {
  if (kind === 'wordmark') return <WordmarkG idp={idp} x={86} y={92} width={128} fill={ink} opacity={opacity} />;
  if (kind === 'faint') return <MarkG idp={idp} x={72} y={64} size={156} fill={ink} opacity={opacity ?? 0.3} />;
  if (kind === 'mark') return <MarkG idp={idp} x={128} y={84} size={48} fill={ink} opacity={opacity} />;
  return null;
}

// The three t-shirts: colourway, front art, back art. One list drives the plate, the collection and the sheets.
export const TEES = [
  { way: 'beige', ink: '#875D41', front: 'mark', back: null, name: 'Beige t-shirt with the mark in Tribal Brown' },
  { way: 'chocolate', ink: '#B58F6B', front: 'wordmark', back: null, name: 'Dark Chocolate t-shirt with the word-mark in Sand' },
  { way: 'sand', ink: '#875D41', front: null, back: 'faint', name: 'Sand t-shirt with the mark large and faint on the back' },
];
