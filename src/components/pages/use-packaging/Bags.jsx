import { WordmarkDebossG } from '@/components/art/Mark';
import { CounterG, ContactShadowG } from '@/components/art/Mockup';
import { Scene, Box3, Handle, LineText, UrlText, WordmarkG, MarkG, add, sc, C } from './kit';

// Shopping bags on a counter, front view, rising height: the dark bag of m10 first (rebuilt: black ribbon
// handles, the brand line top left, "→ sahra.sa" top right, the large word-mark debossed at the foot), then a
// Tribal Brown bag with the beige mark and a Beige bag with the tribal-brown word-mark, both on rope handles.

const GUS = 76;

function Gusset({ H, lip = 28 }) {
  return (
    <g>
      <rect width={GUS} height={lip} fill="#fff" opacity="0.08" />
      <path d={`M0 0L${GUS / 2} ${lip + 74}L${GUS} 0Z`} fill="#000" opacity="0.3" />
      <path d={`M${GUS / 2} ${lip + 74}V${H}`} stroke="#000" strokeOpacity="0.22" strokeWidth="2" />
      <path d={`M${GUS / 2 + 2} ${lip + 74}V${H}`} stroke="#fff" strokeOpacity="0.08" strokeWidth="2" />
      <rect y={lip} width={GUS} height="2" fill="#000" opacity="0.3" />
    </g>
  );
}

function Opening({ wr, wl }) {
  return (
    <g>
      <rect x="5" y="5" width={wr - 10} height={wl - 10} fill="#120B08" />
      <rect x="5" y={wl - 20} width={wr - 10} height="15" fill="#fff" opacity="0.07" />
    </g>
  );
}

// Fold of the bag mouth across the front: a lip band with its crease and a lit upper edge.
function Lip({ w, lip = 28 }) {
  return (
    <g>
      <rect width={w} height={lip} fill="#fff" opacity="0.07" />
      <rect y={lip} width={w} height="2" fill="#000" opacity="0.32" />
      <rect y={lip + 2} width={w} height="2" fill="#fff" opacity="0.08" />
    </g>
  );
}

function Bag({ idp, k, wl, h, tone, art, rope, eyelet, counterY }) {
  const L = [-wl * 0.97, -24], R = [GUS * 0.92, -36];
  const B = [400 + (wl * 0.97 - GUS * 0.92) / 2, counterY + 4];
  const T0 = [B[0], B[1] - h];
  const TL = add(T0, L), TR = add(T0, R), F = add(TL, R);
  const at = (a, b, t) => add(a, sc([b[0] - a[0], b[1] - a[1]], t));
  const ts = [0.24, 0.76];
  const cord = rope ? { color: rope, light: 'rgba(255,255,255,0.35)', width: 9 } : { color: '#0B0705', light: 'rgba(255,255,255,0.3)', width: 15 };
  const back = ts.map((t) => at(F, TR, t));
  const front = ts.map((t) => at(TL, T0, t));
  const rise = Math.min(210, h * 0.46);
  return (
    <g>
      <ContactShadowG idp={`${idp}-s1`} cx={B[0] - wl * 0.45} cy={B[1] + 2} rx={wl * 0.62} ry={7} opacity={0.4} />
      <Handle x1={back[0][0]} x2={back[1][0]} y={back[0][1]} y2={back[1][1]} rise={rise} {...cord} lean={6} />
      <Box3 idp={idp} k={k} B={B} L={L} R={R} H={h} Wl={wl} Wr={GUS} tone={tone} len={74}
        left={<g><Lip w={wl} />{art}{ts.map((t) => <Eyelet key={t} x={wl * t} y={16} dark={eyelet} />)}</g>}
        right={<Gusset H={h} />}
        top={<Opening wr={GUS} wl={wl} />} />
      <Handle x1={front[0][0]} x2={front[1][0]} y={front[0][1] + 16} y2={front[1][1] + 16} rise={rise * 0.9} {...cord} lean={-4} />
    </g>
  );
}

function Eyelet({ x, y, dark }) {
  return (
    <g>
      <circle cx={x} cy={y} r="7" fill={dark ? '#B58F6B' : '#F5F0E3'} opacity="0.9" />
      <circle cx={x} cy={y} r="4" fill="#120B08" />
    </g>
  );
}

function BagScene({ name, title, wall, floor, children }) {
  return (
    <Scene name={name} title={title} w={800} h={1000} horizon={0.8} wall={wall} floor={floor}>
      {(idp) => (
        <g>
          {children(idp, 866)}
          <CounterG y={866} w={800} h={134} slab={20} top="#F5F0E3" front="#35241C" />
        </g>
      )}
    </Scene>
  );
}

export function BagDark() {
  const w = 440;
  return (
    <BagScene name="bag-dark" title="Dark Chocolate shopping bag with black ribbon handles and the debossed word-mark" wall={C.sand40} floor={C.tribal40}>
      {(idp, y) => (
        <g className="mock-place" style={{ '--i': 1 }}>
          <Bag idp={idp} k="a" wl={w} h={330} tone="chocolate" counterY={y} eyelet
            art={(
              <g>
                <LineText x={30} y={68} size={22} fill="#CDBBA6" />
                <UrlText x={w - 28} y={58} size={14} fill={C.sand} anchor="end" />
                <WordmarkDebossG idp={`${idp}-w`} x={32} y={214} width={w - 64} tone="#9C7050" depth={5} />
              </g>
            )} />
        </g>
      )}
    </BagScene>
  );
}

export function BagTribal() {
  const w = 360;
  return (
    <BagScene name="bag-tribal" title="Tribal Brown shopping bag with the beige mark and rope handles" wall={C.choc} floor={C.sand}>
      {(idp, y) => (
        <g className="mock-place" style={{ '--i': 1 }}>
          <Bag idp={idp} k="a" wl={w} h={470} tone="tribal" counterY={y} rope="#F5F0E3"
            art={(
              <g>
                <MarkG x={(w - 120) / 2} y={170} size={120} fill={C.beige} />
                <UrlText x={w / 2} y={430} size={14} fill={C.beige} anchor="middle" />
              </g>
            )} />
        </g>
      )}
    </BagScene>
  );
}

export function BagBeige() {
  const w = 300;
  return (
    <BagScene name="bag-beige" title="Beige shopping bag with the tribal-brown word-mark and rope handles" wall={C.sand40} floor={C.tribal40}>
      {(idp, y) => (
        <g className="mock-place" style={{ '--i': 1 }}>
          <Bag idp={idp} k="a" wl={w} h={590} tone="beige" counterY={y} rope="#35241C"
            art={<WordmarkG x={34} y={300} width={w - 68} fill={C.tribal} />} />
        </g>
      )}
    </BagScene>
  );
}
