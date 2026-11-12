// The full collection: garments on a wall rail at one height, front view, and a counter at the right.
import Art from '@/components/art/Art';
import { BackdropG, BlockG, CastRectG, ContactShadowG, CounterG, SCENE } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { GDefs, HangerG, RailG, WAYS } from './parts';
import Tee from './Tee';
import { FoldedStack, Hoodie, Jacket } from './Hoodie';
import Cap from './Cap';
import { TeeArt } from './art';

const P = 'use-apparel-collection';
const NECK = 90; // every garment's top sits at this height under the rail
const PITCH = 158;
const X0 = 150;

// What hangs on the rail, left to right.
const ITEMS = [
  { kind: 'tee', way: 'beige', art: 'mark', ink: '#875D41', k: 0.66, top: 12 },
  { kind: 'hoodie', way: 'chocolate', ink: '#B58F6B', k: 0.6, top: 4, lit: true },
  { kind: 'tee', way: 'chocolate', art: 'wordmark', ink: '#B58F6B', k: 0.66, top: 12 },
  { kind: 'jacket', way: 'black', k: 0.54, top: 20 },
  { kind: 'hoodie', way: 'tribal', ink: '#F5F0E3', k: 0.6, top: 4 },
  { kind: 'tee', way: 'sand', art: 'mark', ink: '#875D41', k: 0.66, top: 12 },
];

const CAPS = [
  { way: 'chocolate', ink: '#B58F6B', k: 0.4, x: 1178 },
  { way: 'beige', ink: '#875D41', k: 0.35, x: 1262 },
  { way: 'tribal', ink: '#F5F0E3', k: 0.29, x: 1330 },
];

function Piece({ it, n, part }) {
  const c = WAYS[it.way];
  const cx = X0 + n * PITCH;
  const k = it.k;
  const w = it.kind === 'tee' ? 300 : it.kind === 'hoodie' ? 320 : 340;
  const x = cx - (w * k) / 2;
  const y = NECK - it.top * k;
  const id = `${P}-g${n}`;
  const common = { idp: P, id, x, y, k, c, part, i: n, shadow: 14 };
  if (it.kind === 'tee') {
    return (
      <Tee {...common} hang>
        <TeeArt idp={P} kind={it.art} ink={it.ink} />
      </Tee>
    );
  }
  if (it.kind === 'hoodie') {
    return (
      <Hoodie {...common} lit={it.lit}>
        <MarkG idp={P} x={137} y={150} size={46} fill={it.ink} />
      </Hoodie>
    );
  }
  return <Jacket {...common} />;
}

export default function Collection() {
  return (
    <Art viewBox="0 0 1440 640" title="The apparel collection on a wall rail, with a counter at the right" exportName="use-apparel-collection">
      <GDefs idp={P} />
      <BackdropG idp={P} w={1440} h={640} horizon={0.84} wall={SCENE.sand40} floor={SCENE.tribal} />
      {/* hard shadows on the wall first, so neighbours fall in them */}
      {ITEMS.map((it, n) => <Piece key={`s${n}`} it={it} n={n} part="shadow" />)}
      <RailG idp={P} x={70} y={72} w={960} brackets={[96, 544, 996]} />
      {ITEMS.map((it, n) => (
        <HangerG key={`h${n}`} cx={X0 + n * PITCH} y={58} w={it.kind === 'jacket' ? 104 : 112} drop={26} ink={SCENE.chocolate} />
      ))}
      {ITEMS.map((it, n) => <Piece key={n} it={it} n={n} part="body" />)}

      {/* a low bench under the rail with a folded stack */}
      <ContactShadowG idp={`${P}-bench`} cx={330} cy={552} rx={290} opacity={0.3} blur={6} />
      <BlockG x={70} y={486} w={520} h={64} d={26} front={SCENE.tribal} top={SCENE.beige} side={SCENE.chocolate} />
      <FoldedStack idp={P} id={`${P}-stack`} x={150} y={486} k={0.78} ways={[WAYS.chocolate, WAYS.tribal, WAYS.beige]} mark="#875D41" i={6} />

      {/* the counter at the right, with a folded stack and three caps of falling size */}
      <CastRectG x={1030} y={378} w={380} h={160} len={24} opacity={0.18} />
      <CounterG x={1030} y={360} w={380} h={212} top={SCENE.beige} front={SCENE.chocolate} />
      <ContactShadowG idp={`${P}-floor`} cx={1220} cy={574} rx={210} opacity={0.3} blur={6} />
      <FoldedStack idp={P} id={`${P}-cstack`} x={1050} y={360} k={0.5} ways={[WAYS.sand, WAYS.chocolate]} mark="#B58F6B" i={7} />
      {CAPS.map((cp, n) => (
        <Cap key={n} idp={P} id={`${P}-cap${n}`} x={cp.x - 20} y={360 - 156 * cp.k} k={cp.k} c={WAYS[cp.way]} ink={cp.ink} i={8 + n} />
      ))}
    </Art>
  );
}
