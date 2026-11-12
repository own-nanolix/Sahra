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
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`${t.name}, front and back`} exportName={`use-apparel-tee-${t.way}`}>
      <GDefs idp={P} />
      <BackdropG idp={P} w={W} h={H} horizon={0.93} wall={table.wall} floor={table.floor} />
      <Boards h={edgeY} />
      <DeskEdgeG y={edgeY - 10} w={W} thickness={10} edge={table.edge} />
      <Tee idp={P} id={`${P}-front`} x={34} y={78} k={K} view="front" c={c} lit i={0} shadow={16}>
        {t.front && <TeeArt idp={P} kind={t.front} ink={t.ink} />}
      </Tee>
      <Tee idp={P} id={`${P}-back`} x={466} y={78} k={K} view="back" c={c} i={1} shadow={16}>
        {t.back && <TeeArt idp={P} kind={t.back} ink={t.ink} opacity={0.34} />}
      </Tee>
    </Art>
  );
}

