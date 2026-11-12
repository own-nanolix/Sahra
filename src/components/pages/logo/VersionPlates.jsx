// The primary lockup (m04), the four colour versions (m09), the lockup family and the mark with its tile.
import Art from '@/components/art/Art';
import { WordmarkG, MarkG, MarkTileG, LockupLineG, LockupUrlG, WordmarkVerticalG, LOCKUP_LINE, LOCKUP_VERTICAL, LOCKUP_URL, MARK_W, MARK_H } from '@/components/art/Mark';
import { HEX } from '@/lib/brand';
import { FIELD } from './data';

// m04: the word-mark in Sand on Dark Chocolate Brown, centred, about half the width (810 of 1600).
export function PrimaryPlate() {
  return (
    <Art viewBox="0 0 1600 1143" title="Primary lockup: the Sahra word-mark in Sand on Dark Chocolate Brown" exportName="logo-primary">
      <rect width="1600" height="1143" fill={HEX.chocolate} />
      <WordmarkG x={395} y={500} width={810} fill={HEX.sand} />
    </Art>
  );
}

// m09: one equal field of a colour version.
export function ColourwayPlate({ way }) {
  return (
    <Art viewBox={`0 0 ${FIELD.w} ${FIELD.h}`} title={`Colour version: ${way.name}`} exportName={`logo-colour-${way.id}`}>
      <rect width={FIELD.w} height={FIELD.h} fill={way.ground} />
      <WordmarkG x={FIELD.markX} y={FIELD.markY} width={FIELD.markW} fill={way.ink} />
    </Art>
  );
}

// The family of lockups. Each has its own ground and proportions.
const FAMILY = {
  row: { box: [2800, 700], title: 'Row lockup: the word-mark with We Build Spaces of Imagination at its right' },
  stack: { box: [1800, 1000], title: 'Stacked lockup: the word-mark above We Build Spaces of Imagination' },
  vertical: { box: [700, 1700], title: 'Vertical lockup: the word-mark reading from bottom to top' },
  url: { box: [1700, 700], title: 'Lockup with the web address' },
  tile: { box: [1000, 1000], title: 'The mark in its rounded tile' },
};
export const FAMILY_IDS = Object.keys(FAMILY);

export function LockupPlate({ id }) {
  const [w, h] = FAMILY[id].box;
  let ground = HEX.chocolate, body;
  if (id === 'row') {
    body = <LockupLineG x={(w - LOCKUP_LINE.row.w) / 2} y={(h - LOCKUP_LINE.row.h) / 2} layout="row" fill={HEX.sand} lineFill={HEX.beige} />;
  } else if (id === 'stack') {
    ground = HEX.beige;
    body = <LockupLineG x={(w - LOCKUP_LINE.stack.w) / 2} y={(h - LOCKUP_LINE.stack.h) / 2} layout="stack" fill={HEX.tribal} lineFill={HEX.chocolate} />;
  } else if (id === 'vertical') {
    body = <WordmarkVerticalG x={(w - LOCKUP_VERTICAL.w) / 2} y={(h - LOCKUP_VERTICAL.h) / 2} fill={HEX.sand} />;
  } else if (id === 'url') {
    ground = HEX.black;
    body = <LockupUrlG x={(w - LOCKUP_URL.w) / 2} y={(h - LOCKUP_URL.h) / 2} fill={HEX.beige} />;
  } else {
    body = <MarkTileG x={220} y={220} size={560} tile={HEX.beige} fill={HEX.tribal} />;
  }
  return (
    <Art viewBox={`0 0 ${w} ${h}`} title={FAMILY[id].title} exportName={`logo-lockup-${id}`}>
      <rect width={w} height={h} fill={ground} />
      {body}
    </Art>
  );
}

// The mark (the S) and the tile, four plates of one square.
export const MARK_PLATES = [
  { id: 'mark-sand', name: 'Mark in Sand, assembling', title: 'The mark in Sand on Dark Chocolate Brown, assembling from its two halves', ground: HEX.chocolate, kind: 'mark', fill: HEX.sand, animate: true },
  { id: 'mark-tribal', name: 'Mark in Tribal Brown', title: 'The mark in Tribal Brown on Beige', ground: HEX.beige, kind: 'mark', fill: HEX.tribal },
  { id: 'tile-beige', name: 'Beige tile', title: 'The mark in its Beige tile on Dark Chocolate Brown', ground: HEX.chocolate, kind: 'tile', tile: HEX.beige, fill: HEX.tribal },
  { id: 'tile-tribal', name: 'Tribal Brown tile', title: 'The mark in its Tribal Brown tile on Beige', ground: HEX.beige, kind: 'tile', tile: HEX.tribal, fill: HEX.beige },
];

export function MarkPlate({ item }) {
  const size = 520;
  const mh = (size * MARK_H) / MARK_W;
  return (
    <Art viewBox="0 0 1000 1000" title={item.title} exportName={`logo-${item.id}`}>
      <rect width="1000" height="1000" fill={item.ground} />
      {item.kind === 'mark' ? (
        <MarkG x={(1000 - size) / 2} y={(1000 - mh) / 2} size={size} fill={item.fill} topClass={item.animate ? 'mark-top' : undefined} bottomClass={item.animate ? 'mark-bottom' : undefined} />
      ) : (
        <MarkTileG x={220} y={220} size={560} tile={item.tile} fill={item.fill} />
      )}
    </Art>
  );
}

