// Two bottles standing on a shelf, front view; the second is shorter.
import { ContactShadowG } from '@/components/art/Mockup';
import { WordmarkVerticalG } from '@/components/art/Mark';
import Stage, { C, Cyl, Ledge, Mk, SHADOW_INK } from './kit';

const CX = 300;
const BASE = 772;

const BOTTLES = [
  { id: 'bottle-tribal', title: 'Tribal Brown bottle with the word-mark running up the body', H: 560, bw: 170, body: C.tribal, grad: 'board', cap: 'metal-dark', wall: C.beige, shelf: C.sand40, edge: C.chocolate, art: 'wordmark', ink: C.beige },
  { id: 'bottle-beige', title: 'Beige bottle with the mark', H: 400, bw: 170, body: C.beige, grad: 'card', cap: 'metal', wall: C.tribal, shelf: C.chocolate, edge: C.sand, art: 'mark', ink: C.tribal },
];

function profile(H, bw) {
  const top = BASE - H, capH = H * 0.1, neckTop = top + capH, nw = bw * 0.38, ns = neckTop + H * 0.1, sh = bw * 0.55;
  const l = CX - bw / 2, r = CX + bw / 2, nl = CX - nw / 2, nr = CX + nw / 2;
  const d = `M${nl} ${neckTop}V${ns}C${nl} ${ns + sh * 0.7} ${l} ${ns + sh * 0.35} ${l} ${ns + sh}V${BASE - 16}Q${l} ${BASE} ${l + 18} ${BASE}H${r - 18}Q${r} ${BASE} ${r} ${BASE - 16}V${ns + sh}C${r} ${ns + sh * 0.35} ${nr} ${ns + sh * 0.7} ${nr} ${ns}V${neckTop}Z`;
  return { d, top, capH, neckTop, nw, ns, sh, l, r };
}

function Bottle({ cw }) {
  const p = profile(cw.H, cw.bw);
  const scale = (cw.H * 0.64) / 1420;
  return (
    <Stage id={cw.id} title={cw.title} w={600} h={900} horizon={0.82} wall={cw.wall} floor={cw.shelf} order={cw.H > 450 ? 1 : 2}>
      {(idp) => (
        <g>
          <Ledge y={792} w={600} h={900} thick={44} edge={cw.edge} apron={cw.edge} />
          <path d={`M${p.l + 10} ${BASE - 4}H${p.r}L${p.r + 150} ${BASE + 16}H${p.l + 160}Z`} fill={SHADOW_INK} opacity="0.24" />
          <ContactShadowG idp={idp} cx={CX} cy={BASE + 6} rx={cw.bw / 2 + 6} opacity={0.42} />
          <path d={p.d} fill={cw.body} />
          <clipPath id={`${idp}-body`}>
            <path d={p.d} />
          </clipPath>
          <g clipPath={`url(#${idp}-body)`}>
            <path d={p.d} fill={`url(#${idp}-${cw.grad})`} opacity="0.5" />
            {cw.art === 'wordmark' ? (
              <WordmarkVerticalG x={CX - (251 * scale) / 2} y={BASE - 46 - 1420 * scale} scale={scale} fill={cw.ink} />
            ) : (
              <Mk cx={CX} cy={BASE - cw.H * 0.34} s={64} fill={cw.ink} sx={0.94} />
            )}
          </g>
          <Cyl idp={idp} d={p.d} />
          <rect x={CX - p.nw / 2 - 6} y={p.neckTop} width={p.nw + 12} height="10" fill="#000000" opacity="0.18" />
          <path d={`M${CX - p.nw / 2 - 12} ${p.top + p.capH}V${p.top + 8}Q${CX - p.nw / 2 - 12} ${p.top} ${CX - p.nw / 2 - 4} ${p.top}H${CX + p.nw / 2 + 4}Q${CX + p.nw / 2 + 12} ${p.top} ${CX + p.nw / 2 + 12} ${p.top + 8}V${p.top + p.capH}Z`} fill={`url(#${idp}-${cw.cap})`} />
          {Array.from({ length: 6 }, (_, i) => (
            <path key={i} d={`M${CX - p.nw / 2 - 12} ${p.top + 12 + i * 7}H${CX + p.nw / 2 + 12}`} stroke="#000000" strokeOpacity="0.16" strokeWidth="1.5" />
          ))}
          <path d={`M${CX - p.nw / 2 - 8} ${p.top + 3}H${CX + p.nw / 2 + 8}`} stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" />
        </g>
      )}
    </Stage>
  );
}

export const BOTTLE_PLATES = BOTTLES.map((cw, i) => ({ key: cw.id, cap: i ? 'Bottle, Beige, short' : 'Bottle, Tribal Brown', c: 2, r: 3, ar: 2 / 3, node: <Bottle cw={cw} /> }));
