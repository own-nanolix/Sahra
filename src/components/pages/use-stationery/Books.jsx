// Notebook (m10), slipcase book (m15 / m01) and the matte pen, with the shelf plate.
import { LINES, CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import { BackdropG, ShelfG, BlockG, ContactShadowG, PlaceG, SCENE, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkDebossG } from '@/components/art/Mark';
import { ID, URL_LINE, C, T, Sheet, Plate, Piece, Cast, boxPts } from './kit';

export const NOTE = [434, 606];
export const SLIP = [420, 590];
const SPINE_W = 76;

export function NotebookG({ m, idp }) {
  return (
    <g>
      <Sheet m={m} w={434} h={606} kind="board" />
      <path d="M12 0V606" stroke={SHADOW_INK} strokeOpacity="0.22" strokeWidth="2" strokeDasharray="3 5" />
      <rect x="376" y="0" width="14" height="606" fill="#000000" opacity="0.16" />
      <path d="M376 0V606M390 0V606" stroke="#FFFFFF" strokeOpacity="0.14" />
      <T x={30} y={54} size={27} serif fill={C.beige} text={LINES.imagination.rows} lh={1.12} ls="-0.3" />
      <T x={30} y={138} size={13} fill="#D9BFA4" text={URL_LINE} />
      <WordmarkDebossG idp={`${idp}-wm`} x={30} y={520} width={372} tone={C.deboss} depth={3.5} />
    </g>
  );
}

export function SlipcaseG({ m, idp }) {
  return (
    <g>
      <Sheet m={m} w={420} h={590} kind="board" />
      <WordmarkDebossG idp={`${idp}-wm`} x={150} y={512} width={240} tone={C.deboss} depth={3.5} />
    </g>
  );
}

// The spine, flat: the five printed lines read bottom to top along its length.
export function SpineG({ m }) {
  return (
    <g>
      <Sheet m={m} w={SPINE_W} h={590} kind="board" />
      <rect width={SPINE_W} height="590" fill="#000000" opacity="0.12" />
      <T x={44} y={572} size={10.5} fill={C.beige} text={URL_LINE} rotate={-90} />
      <T x={34} y={498} size={10.5} fill={C.beige} text={LINES.imagination.rows} lh={1.3} rotate={-90} serif />
      <T x={44} y={394} size={10.5} fill={C.beige} text={CONTACT.phone2} rotate={-90} />
      <T x={44} y={288} size={10.5} fill={C.beige} text={CONTACT.support} rotate={-90} />
      <T x={44} y={182} size={10.5} fill={C.beige} text={CONTACT.partnerships} rotate={-90} />
    </g>
  );
}

// A matte dark pen with a sand clip, lying along x; length 340, thickness 16.
export function PenG({ m }) {
  return (
    <g>
      <path d="M52 0H322a8 8 0 0 1 0 16H52Z" fill={`url(#${m}-rubber)`} />
      <path d="M52 0L24 5L6 8L24 11L52 16Z" fill={`url(#${m}-metal-dark)`} />
      <rect x="52" y="0" width="7" height="16" fill={`url(#${m}-metal-dark)`} />
      <path d="M190 -2.5H300a2.5 2.5 0 0 1 0 4.5H190Z" fill={C.sand} />
      <path d="M190 -2.5H300" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1" />
      <rect x="170" y="-0.5" width="6" height="17" fill={C.sand} />
      <rect x="140" y="-0.5" width="3" height="17" fill={C.sand} opacity="0.7" />
      <rect x="302" y="0" width="2" height="16" fill="#000000" opacity="0.25" />
      <circle cx="9" cy="8" r="1.6" fill="#E1D2C4" />
      <rect x="56" y="2.2" width="262" height="2.2" fill="#FFFFFF" opacity="0.16" />
      <rect x="56" y="11.5" width="262" height="3.5" fill="#000000" opacity="0.22" />
    </g>
  );
}

export function NotebookArt() {
  const m = `${ID}-notebook-m`;
  return <Plate name="notebook" title="Notebook, Tribal Brown with the word-mark debossed" w={434} h={606} m={m}><NotebookG m={m} idp={`${ID}-notebook`} /></Plate>;
}

export function SlipcaseArt() {
  const m = `${ID}-slipcase-m`;
  return (
    <Plate name="slipcase-book" title="Slipcase book, cover with the word-mark debossed beside its spine" w={520} h={590} m={m}>
      <SlipcaseG m={m} idp={`${ID}-slipcase`} />
      <g transform="translate(444 0)"><SpineG m={m} /></g>
    </Plate>
  );
}

export function PenArt() {
  const m = `${ID}-pen-m`;
  return (
    <Plate name="pen" title="Matte dark pen with a sand clip" w={340} h={40} m={m}>
      <g transform="translate(0 12)"><PenG m={m} /></g>
    </Plate>
  );
}

// A notebook standing on its foot, seen from the front and a little from the right: cover, top and fore-edge.
function StandingNotebook({ m, idp, x, base, k, i }) {
  const w = NOTE[0] * k, h = NOTE[1] * k, d = 28 * (k / 0.6);
  return (
    <PlaceG i={i} x={x} y={base - h}>
      <BlockG x={0} y={0} w={w} h={h} d={d} front={C.tribal} top="#A97A58" side="#E4D8C2" />
      {Array.from({ length: 9 }, (_, n) => <path key={n} d={`M${r2(w + (n + 1) * d * 0.065)} ${r2(-n * d * 0.04)}v${h}`} stroke={SHADOW_INK} strokeOpacity="0.16" />)}
      <path d={`M${w} 0l${d * 0.6} ${-d}V${h - d}l${-d * 0.6} ${d}Z`} fill="#000000" opacity="0.06" />
      <g transform={`scale(${k})`}><NotebookG m={m} idp={idp} /></g>
    </PlaceG>
  );
}

export function ShelfPlate() {
  const m = `${ID}-shelf-m`;
  const base = 770;
  const a = { x: 120, k: 0.6 }, b = { x: 440, k: 0.54 };
  const sk = 0.64, sw = SLIP[0] * sk, sh = SLIP[1] * sk, sx = 1050, st = base - sh;
  return (
    <Plate name="pen-and-notebooks" title="Two notebooks standing on a shelf with a pen lying on its edge" w={1400} h={1000} m={m}>
      <BackdropG idp={`${ID}-shelf-bd`} w={1400} h={1000} horizon={0.9} wall={SCENE.sand40} floor={SCENE.tribal40} />
      {[a, b].map((n) => <Cast key={n.x} pts={boxPts(n.x, base - NOTE[1] * n.k, NOTE[0] * n.k + 20, NOTE[1] * n.k)} len={70} opacity={0.22} />)}
      <Cast pts={boxPts(sx - 30, st - 8, sw + 30, sh + 8)} len={70} opacity={0.22} />
      <ShelfG x={60} y={base + 16} w={1280} depth={80} edge={26} fill={SCENE.beige} />
      {[a.x + NOTE[0] * a.k / 2, b.x + NOTE[0] * b.k / 2, sx + sw / 2].map((cx, i) => (
        <ContactShadowG key={cx} idp={`${ID}-shelf-c${i}`} cx={cx} cy={base + 3} rx={i === 2 ? sw * 0.62 : NOTE[0] * 0.33} opacity={0.4} />
      ))}
      <StandingNotebook m={m} idp={`${ID}-shelf-na`} x={a.x} base={base} k={a.k} i={1} />
      <StandingNotebook m={m} idp={`${ID}-shelf-nb`} x={b.x} base={base} k={b.k} i={2} />
      <g className="mock-lit">
        <PlaceG i={4} x={sx} y={st}>
          <path d={`M-30.4 -8.4H${sw - 30.4}L${sw} 0H0Z`} fill="#A97A58" />
          <g transform={`matrix(0.4 0.11 0 ${sk} -30.4 -8.4)`}><SpineG m={m} /></g>
          <g transform={`scale(${sk})`}><SlipcaseG m={m} idp={`${ID}-shelf-sc`} /></g>
          <path d={`M0 0V${sh}`} stroke="#FFFFFF" strokeOpacity="0.3" />
        </PlaceG>
      </g>
      <Piece i={3} x={720} y={base - 1} w={340} h={16} rot={-2} k={0.88} len={12}>
        <PenG m={m} />
      </Piece>
    </Plate>
  );
}
