// The three t-shirts: flat on a table top, top view, front and back side by side. One SVG each.
import Art from '@/components/art/Art';
import { BackdropG, DeskEdgeG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { GDefs, WAYS } from './parts';
import Tee from './Tee';
import { TEES, TeeArt } from './art';

// Table tops: a flat colour field over a darker strip (the table edge), each plate a different pair.
const TABLES = [
  { wall: SCENE.tribal, floor: SCENE.chocolate, edge: SCENE.sand },
  { wall: SCENE.sand, floor: SCENE.tribal, edge: SCENE.chocolate },
  { wall: SCENE.tribal40, floor: SCENE.sand, edge: SCENE.tribal },
];

const W = 900;
const H = 620;
const K = 1.34;
// tee box 300 x 310; rotations about the garment's own centre
const turn = (x, y, k, a) => `translate(${x} ${y})${a ? ` rotate(${a} ${150 * k} ${155 * k})` : ''}`;
const LAYS = [
  { k: K, front: turn(34, 78, K, 0), back: turn(466, 78, K, 0) },
  { k: 1.24, front: turn(310, 108, 1.24, 4), back: turn(150, 52, 1.24, -7) },
  { k: 1.12, front: turn(56, 92, 1.12, -9), back: turn(500, 92, 1.12, 9) },
];

// The joints of the table boards, drawn with .map().
function Boards({ h, n = 4 }) {
  return Array.from({ length: n }, (_, i) => {
    const bx = Math.round(((i + 1) * W) / (n + 1) + (i % 2 ? 24 : -18));
    return <path key={i} d={`M${bx} 0V${h}`} stroke={SHADOW_INK} strokeOpacity="0.1" strokeWidth="2" />;
  });
}

export function TeePlate({ n }) {
  const t = TEES[n];
  const c = WAYS[t.way];
  const P = `use-apparel-tee-${t.way}`;
  const table = TABLES[n];
  const edgeY = Math.round(H * 0.93);
  const lay = LAYS[n];
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`${t.name}, front and back`} exportName={`use-apparel-tee-${t.way}`}>
      <GDefs idp={P} />
      <BackdropG idp={P} w={W} h={H} horizon={0.93} wall={table.wall} floor={table.floor} />
      <Boards h={edgeY} />
      <DeskEdgeG y={edgeY - 10} w={W} thickness={10} edge={table.edge} />
      {/* each plate lays the pair out differently: level side by side; the back half under the front at a
          turn; the two fanned apart. The back is drawn first so the front's shadow falls on it. */}
      <g transform={lay.back}>
        <Tee idp={P} id={`${P}-back`} x={0} y={0} k={lay.k} view="back" c={c} i={0} shadow={16}>
          {t.back && <TeeArt idp={P} kind={t.back} ink={t.ink} opacity={0.34} />}
        </Tee>
      </g>
      <g transform={lay.front}>
        <Tee idp={P} id={`${P}-front`} x={0} y={0} k={lay.k} view="front" c={c} lit i={1} shadow={16}>
          {t.front && <TeeArt idp={P} kind={t.front} ink={t.ink} />}
        </Tee>
      </g>
    </Art>
  );
}

