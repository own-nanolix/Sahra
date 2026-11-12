// Business cards (m08): fronts and back as flat artwork, and the two isometric stacks with painted Tribal Brown edges.
import { PEOPLE, CONTACT_BLOCKS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { BackdropG, SCENE } from '@/components/art/Mockup';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { ID, C, T, Sheet, Plate, Cast, EdgeFace } from './kit';

export const CARD = [660, 400];

// kind: front (off-white) | dark (Dark Chocolate, beige type) | back (Tribal Brown, word-mark debossed)
export function CardG({ m, kind = 'front', idp }) {
  if (kind === 'back') {
    return (
      <g>
        <Sheet m={m} w={660} h={400} kind="board" />
        <WordmarkDebossG idp={`${idp}-wm`} x={288} y={300} width={328} tone={C.debossDark} depth={3} />
      </g>
    );
  }
  const dark = kind === 'dark';
  const ink = dark ? C.beige : C.ink, soft = dark ? C.beigeMuted : C.muted;
  return (
    <g>
      <Sheet m={m} w={660} h={400} kind={dark ? 'dark' : 'card'} />
      <T x={44} y={72} size={30} serif fill={ink} text={PEOPLE.card.name} ls="-0.4" />
      <T x={44} y={98} size={13} fill={soft} text={PEOPLE.card.role} />
      <MarkG x={568} y={38} size={48} fill={C.sand} />
      <T x={44} y={318} size={11.5} fill={ink} text={CONTACT_BLOCKS.office} lh={1.5} />
      <T x={254} y={318} size={11.5} fill={ink} text={CONTACT_BLOCKS.online} lh={1.5} />
      <T x={456} y={318} size={11.5} fill={ink} text={CONTACT_BLOCKS.service} lh={1.5} />
    </g>
  );
}

function CardArt({ name, title, kind }) {
  const m = `${ID}-card-${name}-m`;
  return (
    <Plate name={name} title={title} w={660} h={400} m={m}>
      <CardG m={m} kind={kind} idp={`${ID}-card-${name}`} />
    </Plate>
  );
}
export const CardFrontArt = () => <CardArt name="card-front" title="Business card, front, off-white" kind="front" />;
export const CardDarkArt = () => <CardArt name="card-front-dark" title="Business card, front, Dark Chocolate" kind="dark" />;
export const CardBackArt = () => <CardArt name="card-back" title="Business card, back, Tribal Brown with the word-mark debossed" kind="back" />;

// The isometric map of a card face: u along the width goes right and up, v along the height goes right and down.
const U = [0.9, -0.28], V = [0.5, 0.4];
const P = (ox, oy, u, v) => [r2(ox + U[0] * u + V[0] * v), r2(oy + U[1] * u + V[1] * v)];

function StackG({ m, idp, ox, oy, th, n, kind }) {
  const a = P(ox, oy, 0, 0), c = P(ox, oy, 660, 400), d = P(ox, oy, 0, 400);
  return (
    <g>
      <EdgeFace p0={a} p1={d} th={th} n={n} fill="#7C5439" />
      <EdgeFace p0={d} p1={c} th={th} n={n} fill="#6A452D" op={0.4} />
      <g transform={`matrix(${U[0]} ${U[1]} ${V[0]} ${V[1]} ${ox} ${oy})`}>
        <CardG m={m} kind={kind} idp={idp} />
      </g>
      <path d={`M${a}L${d}L${c}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.2" />
    </g>
  );
}

export function CardsPlate() {
  const m = `${ID}-cards-m`;
  const th = 62, n = 26;
  const A = [130, 480], B = [500, 650];
  const base = ([ox, oy]) => [P(ox, oy, 0, 0), P(ox, oy, 660, 0), P(ox, oy, 660, 400), P(ox, oy, 0, 400)].map(([x, y]) => [x, y + th]);
  return (
    <Plate name="business-cards" title="Two stacks of business cards with painted Tribal Brown edges" w={1400} h={1000} m={m}>
      <BackdropG idp={`${ID}-cards-bd`} w={1400} h={1000} horizon={0.07} wall={SCENE.sand40} floor={SCENE.beige} />
      <Cast pts={base(A)} len={170} />
      <Cast pts={base(B)} len={170} />
      <StackG m={m} idp={`${ID}-cards-a`} ox={A[0]} oy={A[1]} th={th} n={n} kind="front" />
      <StackG m={m} idp={`${ID}-cards-b`} ox={B[0]} oy={B[1]} th={th} n={n} kind="back" />
    </Plate>
  );
}
