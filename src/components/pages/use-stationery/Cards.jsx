// Business cards (m08): fronts and back as flat artwork, and the two isometric stacks with painted Tribal Brown edges.
import { PEOPLE, CONTACT_BLOCKS } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { BackdropG, SCENE } from '@/components/art/Mockup';
import { MarkG, WordmarkDebossG } from '@/components/art/Mark';
import { ID, C, T, Sheet, Plate, Cast } from './kit';

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
      {/* as m08: office and online blocks stacked in the left column, the service block at the right */}
      <T x={44} y={244} size={11.5} fill={ink} text={CONTACT_BLOCKS.office} lh={1.5} />
      <T x={44} y={312} size={11.5} fill={ink} text={CONTACT_BLOCKS.online} lh={1.5} />
      <T x={456} y={196} size={11.5} fill={ink} text={CONTACT_BLOCKS.service} lh={1.5} />
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

// The isometric map of a card face, measured on m08: the width runs right and up (a long edge of about 347 by -180 px
// on the 1400 px plate), the height runs right and down (about 172 by 142 px).
const U = [0.526, -0.273], V = [0.43, 0.355];
const P = (ox, oy, u, v) => [r2(ox + U[0] * u + V[0] * v), r2(oy + U[1] * u + V[1] * v)];

// One face of a stack of n cards: each card is its own painted Tribal Brown strip with a dark gap line under it.
const EDGE_TONES = ['#875D41', '#7F563A', '#8C6244', '#80583C', '#885F42'];
function Edges({ p0, p1, th, n, shade = 0 }) {
  const [x0, y0] = p0, [x1, y1] = p1;
  const h = th / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const o = r2(h * i), o2 = r2(h * (i + 1));
        return (
          <g key={i}>
            <path d={`M${x0} ${r2(y0 + o)}L${x1} ${r2(y1 + o)}V${r2(y1 + o2)}L${x0} ${r2(y0 + o2)}Z`} fill={EDGE_TONES[(i * 3) % EDGE_TONES.length]} />
            <path d={`M${x0} ${r2(y0 + o2 - 0.6)}L${x1} ${r2(y1 + o2 - 0.6)}`} stroke="#2A1B14" strokeOpacity="0.62" strokeWidth="1.3" />
            <path d={`M${x0} ${r2(y0 + o + 0.5)}L${x1} ${r2(y1 + o + 0.5)}`} stroke="#FFFFFF" strokeOpacity="0.09" strokeWidth="0.8" />
          </g>
        );
      })}
      {shade > 0 && <path d={`M${x0} ${y0}L${x1} ${y1}V${r2(y1 + th)}L${x0} ${r2(y0 + th)}Z`} fill="#2A1B14" opacity={shade} />}
    </g>
  );
}

function StackG({ m, idp, ox, oy, th, n, kind }) {
  const a = P(ox, oy, 0, 0), c = P(ox, oy, 660, 400), d = P(ox, oy, 0, 400);
  return (
    <g>
      <Edges p0={a} p1={d} th={th} n={n} />
      <Edges p0={d} p1={c} th={th} n={n} shade={0.28} />
      <g transform={`matrix(${U[0]} ${U[1]} ${V[0]} ${V[1]} ${ox} ${oy})`}>
        <CardG m={m} kind={kind} idp={idp} />
      </g>
      <path d={`M${a}L${d}L${c}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.2" />
    </g>
  );
}

// m08: two stacks of about 20 cards, the off-white one behind-left and the Tribal Brown one pushed against it
// (its origin sits one card height plus a hair down the short axis and a little along the long axis).
export function CardsPlate() {
  const m = `${ID}-cards-m`;
  const th = 120, n = 20;
  const A = [257, 382], B = [522, 499];
  const hull = ([ox, oy]) => {
    const top = [P(ox, oy, 0, 0), P(ox, oy, 660, 0), P(ox, oy, 660, 400), P(ox, oy, 0, 400)];
    return [...top, ...top.map(([x, y]) => [x, y + th])];
  };
  return (
    <Plate name="business-cards" title="Two stacks of business cards with painted Tribal Brown edges" w={1400} h={1000} m={m}>
      <BackdropG idp={`${ID}-cards-bd`} w={1400} h={1000} horizon={0.07} wall={SCENE.sand40} floor={SCENE.beige} />
      <Cast pts={hull(A)} len={250} />
      <Cast pts={hull(B)} len={330} />
      <StackG m={m} idp={`${ID}-cards-a`} ox={A[0]} oy={A[1]} th={th} n={n} kind="front" />
      <StackG m={m} idp={`${ID}-cards-b`} ox={B[0]} oy={B[1]} th={th} n={n} kind="back" />
    </Plate>
  );
}
