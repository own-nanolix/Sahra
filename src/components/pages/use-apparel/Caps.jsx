// The three caps on a counter, three-quarter view, in a row of falling size (one SVG each; the scale falls
// from the first plate to the last).
import Art from '@/components/art/Art';
import { BackdropG, CounterG, SCENE } from '@/components/art/Mockup';
import { GDefs, WAYS } from './parts';
import Cap, { CAP_W } from './Cap';

const W = 900;
const H = 610;
const TOP = 392; // the counter top

export const CAPS = [
  { way: 'chocolate', ink: '#B58F6B', k: 2.0, wall: SCENE.beige, floor: SCENE.sand40, front: SCENE.tribal, slab: SCENE.beige, title: 'Dark Chocolate cap with the mark embroidered in Sand' },
  { way: 'beige', ink: '#875D41', k: 1.7, wall: SCENE.tribal, floor: SCENE.chocolate, front: SCENE.chocolate, slab: SCENE.sand40, title: 'Beige cap with the mark embroidered in Tribal Brown' },
  { way: 'tribal', ink: '#F5F0E3', k: 1.45, wall: SCENE.sand40, floor: SCENE.sand, front: SCENE.sand, slab: SCENE.white, title: 'Tribal Brown cap with the mark embroidered in Beige' },
];

export function CapPlate({ n }) {
  const cp = CAPS[n];
  const P = `use-apparel-cap-${cp.way}`;
  const k = cp.k;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={cp.title} exportName={`use-apparel-cap-${cp.way}`}>
      <GDefs idp={P} />
      <BackdropG idp={P} w={W} h={H} horizon={0.62} wall={cp.wall} floor={cp.floor} />
      <CounterG x={-20} y={TOP} w={W + 40} h={H - TOP + 30} top={cp.slab} front={cp.front} />
      <Cap idp={P} id={`${P}-cap`} x={W / 2 - (CAP_W * k) / 2 - 10 * k} y={TOP - 152 * k} k={k} c={WAYS[cp.way]} ink={cp.ink} lit />
    </Art>
  );
}
