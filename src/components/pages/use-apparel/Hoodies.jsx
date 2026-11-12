// The three hoodie plates: the jacket back rebuilt from the case study (m07), then a Dark Chocolate and a
// Tribal Brown hoodie, each as a folded stack on a shelf with one hanging on a hook beside it.
import Art from '@/components/art/Art';
import { BackdropG, CastRectG, SCENE, ShelfG, WallRibsG } from '@/components/art/Mockup';
import { MarkG } from '@/components/art/Mark';
import { GDefs, HangerG, HookG, WAYS } from './parts';
import { FoldedStack, Hoodie, Jacket } from './Hoodie';

const W = 900;
const H = 620;

// The jacket: a dark collared jacket, back view, hung on a wall hook; the mark about a third of the back's
// width, tone on tone, centred between the shoulder blades (m07).
export function JacketPlate() {
  const P = 'use-apparel-jacket';
  const k = 1.05;
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title="Dark jacket, back view, with the mark printed large and faint, tone on tone" exportName="use-apparel-jacket-back">
      <GDefs idp={P} />
      <BackdropG idp={P} w={W} h={H} horizon={0.88} wall={SCENE.sand} floor={SCENE.tribal} />
      <WallRibsG x={590} y={0} w={310} h={Math.round(H * 0.88)} pitch={26} rib={11} fill={SCENE.sand} />
      <Jacket idp={P} id={`${P}-body`} x={152} y={97} k={k} c={WAYS.black} part="shadow" />
      <HookG idp={P} x={330} y={44} />
      <HangerG cx={330} y={68} w={150} drop={38} ink={SCENE.chocolate} />
      <Jacket idp={P} id={`${P}-body`} x={152} y={97} k={k} c={WAYS.black} part="body" lit />
    </Art>
  );
}

// Plate staging data: colourway of the hero hoodie, its mark, the field pair and the shelf colour.
const HOODIES = [
  { way: 'chocolate', ink: '#B58F6B', other: 'tribal', wall: SCENE.beige, floor: SCENE.sand40, shelf: SCENE.tribal, name: 'dark-chocolate', title: 'Dark Chocolate hoodie' },
  { way: 'tribal', ink: '#F5F0E3', other: 'chocolate', wall: SCENE.chocolate, floor: SCENE.tribal, shelf: SCENE.sand, name: 'tribal-brown', title: 'Tribal Brown hoodie' },
];

export function HoodiePlate({ n }) {
  const h = HOODIES[n];
  const P = `use-apparel-hoodie-${h.name}`;
  const c = WAYS[h.way];
  const hero = [WAYS[h.way], WAYS[h.other], WAYS[h.way]];
  const lower = { x: 125, y: 362, k: 1.3 };
  const upper = { x: 150, y: 196, k: 1.1 };
  const hang = { x: 520, y: 144, k: 1.12 };
  return (
    <Art viewBox={`0 0 ${W} ${H}`} title={`${h.title}: a folded stack on a shelf and one hanging on a hook`} exportName={`use-apparel-hoodie-${h.name}`}>
      <GDefs idp={P} />
      <BackdropG idp={P} w={W} h={H} horizon={0.9} wall={h.wall} floor={h.floor} />
      <CastRectG x={60} y={196} w={400} h={14} len={14} opacity={0.18} />
      <CastRectG x={60} y={362} w={400} h={14} len={14} opacity={0.18} />
      <Hoodie idp={P} id={`${P}-hang`} {...hang} c={c} part="shadow" shadow={22} />
      <FoldedStack idp={P} id={`${P}-low`} {...lower} ways={hero} part="shadow" />
      <FoldedStack idp={P} id={`${P}-up`} {...upper} ways={[WAYS[h.other], WAYS[h.way]]} part="shadow" />
      <ShelfG x={60} y={196} w={400} depth={18} edge={10} fill={h.shelf} />
      <ShelfG x={60} y={362} w={400} depth={18} edge={10} fill={h.shelf} />
      <FoldedStack idp={P} id={`${P}-up`} {...upper} ways={[WAYS[h.other], WAYS[h.way]]} part="body" i={1} />
      <FoldedStack idp={P} id={`${P}-low`} {...lower} ways={hero} mark={h.ink} part="body" i={2} />
      <HookG idp={P} x={hang.x + 160 * hang.k} y={122} />
      <Hoodie idp={P} id={`${P}-hang`} {...hang} c={c} part="body" lit>
        <MarkG idp={P} x={137} y={150} size={46} fill={h.ink} />
      </Hoodie>
    </Art>
  );
}

