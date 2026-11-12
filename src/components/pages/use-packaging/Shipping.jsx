import { ContactShadowG } from '@/components/art/Mockup';
import { Scene, Box3, WordmarkG, MarkG, PlainBars, UrlText, add, sc, C } from './kit';

// Shipping boxes: a stack of two on the floor against a wall, front-three-quarter. Sand board with the
// tribal-brown mark, tape and a label; Dark Chocolate board with the whole word-mark cropped very large round
// the corner, tone on tone (the same artwork runs across both faces, as one piece of print).

const BASE = { B: [520, 902], L: [-380, -58], R: [170, -40], H: 360, Wl: 640, Wr: 520 };
const T0 = [BASE.B[0], BASE.B[1] - BASE.H];
const UP = {
  B: add(T0, add(sc(BASE.L, 0.12), sc(BASE.R, 0.12))), L: sc(BASE.L, 0.62), R: sc(BASE.R, 0.7), H: 210, Wl: 397, Wr: 364,
};

function Tape({ w, len, ink = '#7B5239' }) {
  return (
    <g>
      <rect x={(w - 58) / 2} y="0" width="58" height={len} fill={ink} />
      <rect x={(w - 58) / 2} y="0" width="3" height={len} fill="#fff" opacity="0.3" />
      <rect x={(w + 58) / 2 - 3} y="0" width="3" height={len} fill="#000" opacity="0.18" />
      {[0.32, 0.66].map((t) => <rect key={t} x={(w - 58) / 2} y={len * t} width="58" height="1.6" fill="#000" opacity="0.2" />)}
    </g>
  );
}

function Label({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="5" y="5" width="214" height="136" fill="#35241C" opacity="0.25" />
      <rect width="214" height="136" fill="#FFFFFF" />
      <rect width="214" height="136" fill="#F5F0E3" opacity="0.5" />
      <WordmarkG x={16} y={16} width={120} fill={C.tribal} />
      <UrlText x={16} y={64} size={13} fill={C.tribal} />
      {[0, 1, 2].map((i) => <rect key={i} x="16" y={78 + i * 11} width={[150, 120, 90][i]} height="5" fill={C.tribal} opacity="0.2" />)}
      <PlainBars x={16} y={112} w={182} h={16} fill={C.choc} seed={5} opacity={0.4} />
    </g>
  );
}

function SandBox({ idp }) {
  return (
    <g>
      <ContactShadowG idp={`${idp}-s1`} cx={400} cy={900} rx={380} ry={22} opacity={0.36} />
      <Box3 idp={idp} k="a" {...BASE} tone="sand" len={80}
        left={<g><MarkG x={64} y={74} size={140} fill={C.tribal} /><Label x={380} y={190} /></g>}
        right={<Tape w={BASE.Wr} len={140} />}
        top={<Tape w={BASE.Wr} len={BASE.Wl} />} />
      <g className="mock-place" style={{ '--i': 1 }}>
        <Box3 idp={idp} k="b" {...UP} tone="sand" len={60}
          left={<MarkG x={44} y={46} size={84} fill={C.tribal} />}
          right={<Tape w={UP.Wr} len={80} />}
          top={<Tape w={UP.Wr} len={UP.Wl} />} />
      </g>
    </g>
  );
}

// The word-mark enlarged so it runs across the corner: x offset into the unfolded print, then each face shows its part.
function Wrap({ wl, width, x, y, fill }) {
  return <WordmarkG x={x - wl} y={y} width={width} fill={fill} />;
}

function ChocBox({ idp }) {
  const ink = '#4B362B';
  return (
    <g>
      <ContactShadowG idp={`${idp}-s1`} cx={400} cy={900} rx={380} ry={22} opacity={0.4} />
      <Box3 idp={idp} k="a" {...BASE} tone="chocolate" len={80}
        left={<WordmarkG x={-170} y={12} width={1960} fill={ink} />}
        right={<Wrap wl={BASE.Wl} width={1960} x={-170} y={12} fill={ink} />}
        top={<rect x={(BASE.Wr - 4) / 2} width="4" height={BASE.Wl} fill="#000" opacity="0.25" />} />
      <g className="mock-place" style={{ '--i': 1 }}>
        <Box3 idp={idp} k="b" {...UP} tone="chocolate" len={60}
          left={<WordmarkG x={-120} y={14} width={1120} fill={ink} />}
          right={<Wrap wl={UP.Wl} width={1120} x={-120} y={14} fill={ink} />}
          top={<rect x={(UP.Wr - 4) / 2} width="4" height={UP.Wl} fill="#000" opacity="0.25" />} />
      </g>
    </g>
  );
}

export function ShippingSand() {
  return (
    <Scene name="shipping-box-sand" title="Sand board shipping boxes stacked against a wall, with the tribal-brown mark, tape and a label" w={800} h={1000} horizon={0.62} wall={C.beige} floor={C.tribal40}>
      {(idp) => <SandBox idp={idp} />}
    </Scene>
  );
}

export function ShippingChocolate() {
  return (
    <Scene name="shipping-box-chocolate" title="Dark Chocolate printed shipping boxes with the word-mark cropped very large round the corner" w={800} h={1000} horizon={0.62} wall={C.tribal} floor={C.sand40}>
      {(idp) => <ChocBox idp={idp} />}
    </Scene>
  );
}
