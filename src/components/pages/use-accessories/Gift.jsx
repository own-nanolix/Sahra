// The gift card (front and back) standing in a counter display, and the card carriers. No value, number or
// code is printed anywhere: quiet pale bars stand in for those fields.
import { BlockG, CastRectG } from '@/components/art/Mockup';
import { QuarterArchG } from '@/components/art/KeyArt';
import Stage, { C, Ledge, Mk, Wm, Sheet, rrect, SHADOW_INK } from './kit';

const CW = 520, CH = 328, CXL = 190, CYT = 84;
const CARD = rrect(CXL, CYT, CW, CH, 22);

function Front() {
  return (
    <g>
      <clipPath id="use-accessories-gift-front-clip"><path d={CARD} /></clipPath>
      <path d={CARD} fill={C.chocolate} />
      <g clipPath="url(#use-accessories-gift-front-clip)">
        <QuarterArchG cx={CXL + CW} cy={CYT + CH * 0.62} r={70} R={190} quadrant="tl" fill={C.tribal} />
        <QuarterArchG cx={CXL + CW} cy={CYT + CH * 0.62} r={70} R={190} quadrant="tl" fill="#000000" opacity="0.12" />
      </g>
      <Mk cx={CXL + 66} cy={CYT + CH - 62} s={56} fill={C.sand} />
      <text x={CXL + CW - 40} y={CYT + CH - 42} textAnchor="end" className="sans" fontSize="22" fill={C.sand} letterSpacing="-0.4">→ sahra.sa</text>
    </g>
  );
}

function Back() {
  const groups = [0, 1, 2, 3];
  return (
    <g>
      <path d={CARD} fill={C.beige} />
      <Mk cx={CXL + 56} cy={CYT + 58} s={36} fill={C.tribal} />
      <rect x={CXL + 40} y={CYT + 128} width="190" height="30" rx="8" fill={C.sand40} />
      {groups.map((g) => (
        <rect key={g} x={CXL + 40 + g * 118} y={CYT + 190} width="98" height="24" rx="7" fill={C.sand40} opacity="0.85" />
      ))}
      <rect x={CXL + 40} y={CYT + 232} width="110" height="18" rx="6" fill={C.sand20} />
      <Wm cx={CXL + CW - 118} cy={CYT + CH - 44} w={150} fill={C.tribal} />
      <text x={CXL + 40} y={CYT + CH - 38} className="sans" fontSize="20" fill={C.tribal} letterSpacing="-0.4">→ sahra.sa</text>
    </g>
  );
}

// One card in a clear display stand on a counter, front view.
function GiftCard({ id, title, face, wall, counter, edge }) {
  return (
    <Stage id={id} title={title} w={900} h={600} horizon={0.55} wall={wall} floor={counter} order={1}>
      {(idp) => (
        <g>
          <Ledge y={524} w={900} h={600} thick={30} edge={edge} apron={C.chocolate} />
          <path d="M205 452H715L810 498H300Z" fill={SHADOW_INK} opacity="0.26" />
          <CastRectG x={CXL} y={CYT} w={CW} h={CH} len={26} opacity={0.18} />
          <BlockG x={170} y={440} w={560} h={20} d={34} front={C.white} top={C.beige60} side={C.sand40} />
          <rect x="170" y="440" width="560" height="20" fill={`url(#${idp}-glass)`} opacity="0.7" />
          {face === 'front' ? <Front /> : <Back />}
          <path d={CARD} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
          <Sheet idp={idp} d={CARD} />
          <path d={`M${CXL + 30} ${CYT + 8}H${CXL + CW - 60}`} stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
          <rect x="178" y="372" width="544" height="72" rx="8" fill="#FFFFFF" opacity="0.2" />
          <rect x="178" y="372" width="544" height="72" rx="8" fill={`url(#${idp}-glass)`} />
          <rect x="178" y="372" width="544" height="72" rx="8" fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="2" />
        </g>
      )}
    </Stage>
  );
}

const CARRIERS = [
  { id: 'chocolate', board: 'board-dark', ink: C.sand, inner: C.tribal, innerInk: C.beige },
  { id: 'tribal', board: 'board', ink: C.beige, inner: C.chocolate, innerInk: C.sand },
  { id: 'beige', board: 'card', ink: C.tribal, inner: C.chocolate, innerInk: C.sand },
];

function Carriers() {
  const w = 320, h = 410, top = 82;
  return (
    <Stage id="carrier" title="Gift card carriers in a counter display" w={1800} h={600} horizon={0.6} wall={C.sand} floor={C.tribal40} order={1}>
      {(idp) => (
        <g>
          <Ledge y={528} w={1800} h={600} thick={30} edge={C.chocolate} apron={C.chocolate} />
          {CARRIERS.map((c, i) => {
            const x = 190 + i * 520, pk = top + 250;
            return (
              <g key={c.id}>
                <CastRectG x={x} y={top} w={w} h={h} len={26} opacity={0.2} />
                <path d={`M${x + 10} ${top + h - 2}H${x + w}L${x + w + 120} ${top + h + 40}H${x + 130}Z`} fill={SHADOW_INK} opacity="0.24" />
                <clipPath id={`${idp}-cl-${c.id}`}><rect x={x} y={top} width={w} height={h} /></clipPath>
                <rect x={x} y={top} width={w} height={h} fill={`url(#${idp}-${c.board})`} filter={`url(#${idp}-fibre)`} />
                <g clipPath={`url(#${idp}-cl-${c.id})`}>
                  <rect x={x + 38} y={top + 150} width={w - 76} height="220" rx="14" fill={c.inner} />
                  <Mk cx={x + 76} cy={top + 192} s={34} fill={c.innerInk} />
                  <path d={`M${x} ${h + top}V${pk}H${x + w - 80}L${x + w} ${pk - 80}V${h + top}Z`} fill={`url(#${idp}-${c.board})`} filter={`url(#${idp}-fibre)`} />
                  <path d={`M${x} ${pk}H${x + w - 80}L${x + w} ${pk - 80}`} fill="none" stroke="#000000" strokeOpacity="0.28" strokeWidth="3" transform="translate(0 3)" />
                  <path d={`M${x} ${pk}H${x + w - 80}L${x + w} ${pk - 80}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="2" />
                  <text className="serif" x={x + 34} y={top + 62} fontSize="27" fill={c.ink} letterSpacing="-0.4">We Build Spaces</text>
                  <text className="serif" x={x + 34} y={top + 94} fontSize="27" fill={c.ink} letterSpacing="-0.4">of Imagination</text>
                  <text className="sans" x={x + 34} y={top + h - 34} fontSize="21" fill={c.ink} letterSpacing="-0.3">→ sahra.sa</text>
                  <Wm cx={x + w - 100} cy={top + h - 64} w={120} fill={c.ink} opacity="0.9" />
                </g>
                <rect x={x + w - 6} y={top} width="6" height={h} fill="#000000" opacity="0.18" />
                <rect x={x} y={top} width={w} height="3" fill="#FFFFFF" opacity="0.3" />
                <Sheet idp={idp} d={rrect(x, top, w, h, 0)} />
              </g>
            );
          })}
        </g>
      )}
    </Stage>
  );
}

export const GIFT_PLATES = {
  front: { key: 'gift-front', cap: 'Gift card, front', c: 3, r: 2, ar: 1.5, node: <GiftCard id="gift-front" title="Gift card front in a counter display" face="front" wall={C.beige} counter={C.sand40} edge={C.tribal} /> },
  back: { key: 'gift-back', cap: 'Gift card, back', c: 3, r: 2, ar: 1.5, node: <GiftCard id="gift-back" title="Gift card back in a counter display, quiet bars for the fields" face="back" wall={C.chocolate} counter={C.tribal} edge={C.sand} /> },
  carrier: { key: 'carrier', cap: 'Gift card carriers', c: 6, r: 2, ar: 3, node: <Carriers /> },
};
