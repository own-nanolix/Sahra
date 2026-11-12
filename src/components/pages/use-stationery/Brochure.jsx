// Tri-fold brochure: three panels built from the posters' lines and body text (m11, m14) over abstract architecture
// fields, standing open on a counter.
import { LINES, POSTER_BODY, CONTACT_BLOCKS } from '@/lib/brand';
import { BackdropG, CounterG, PlaceG, ContactShadowG, SCENE } from '@/components/art/Mockup';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { CurvedWallG, BrickCurveG, ArchWindowG } from '@/components/art/KeyArt';
import { wrap } from '@/components/art/Devices';
import { ID, URL_LINE, C, T, Sheet, Plate, Cast } from './kit';

export const PANEL = [300, 420];

export function PanelG({ n, m, idp }) {
  if (n === 0) {
    return (
      <g>
        <Sheet m={m} w={300} h={420} kind="paper" />
        <CurvedWallG idp={`${idp}-wall`} x={0} y={0} w={300} h={214} />
        <T x={28} y={262} size={22} serif fill={C.ink} text={LINES.elevate.rows} lh={1.1} ls="-0.3" />
        <T x={28} y={338} size={9.5} fill={C.tribal} text={LINES.refined.rows} lh={1.4} />
        <T x={28} y={396} size={10} fill={C.sandInk} text={URL_LINE} />
      </g>
    );
  }
  if (n === 1) {
    return (
      <g>
        <Sheet m={m} w={300} h={420} kind="card" />
        <T x={30} y={62} size={27} serif fill={C.ink} text={LINES.builtAround.rows} lh={1.08} ls="-0.4" />
        <T x={30} y={192} size={8.6} fill={C.text} text={wrap(POSTER_BODY, 42)} lh={1.55} />
        <ArchWindowG idp={`${idp}-arch`} cx={300} cy={420} r={44} R={118} quadrant="tl" />
        <T x={30} y={396} size={10} fill={C.sandInk} text={URL_LINE} />
        <MarkG x={30} y={338} size={26} fill={C.sand} />
      </g>
    );
  }
  return (
    <g>
      <Sheet m={m} w={300} h={420} kind="dark" />
      <BrickCurveG idp={`${idp}-brick`} x={0} y={0} w={300} h={168} />
      <WordmarkG x={28} y={204} width={226} fill={C.beige} />
      <T x={28} y={284} size={17} serif fill={C.beige} text={LINES.imagination.rows} lh={1.15} />
      <T x={28} y={344} size={8.4} fill={C.beige} text={CONTACT_BLOCKS.office} lh={1.5} />
      <T x={118} y={344} size={8.4} fill={C.beige} text={CONTACT_BLOCKS.online} lh={1.5} />
      <T x={196} y={344} size={8.4} fill={C.beige} text={CONTACT_BLOCKS.service} lh={1.5} />
      <T x={28} y={398} size={10} fill={C.sand} text={URL_LINE} />
    </g>
  );
}

function Shaded({ m, children }) {
  return (
    <g>
      {children}
      <rect width="300" height="420" fill={`url(#${m}-shade)`} opacity="0.75" />
    </g>
  );
}

export function BrochurePlate() {
  const m = `${ID}-brochure-m`;
  const s = 1.5, w = 300 * s, h = 420 * s, cx = 480, base = 716, side = 0.66 * w, rise = 0.08 * side;
  const L = { x: cx - side, y: base - rise }, R = { x: cx + w + side, y: base - rise };
  return (
    <Plate name="tri-fold-brochure" title="Tri-fold brochure standing open on a counter" w={1400} h={1000} m={m}>
      <BackdropG idp={`${ID}-brochure-bd`} w={1400} h={1000} horizon={0.72} wall={SCENE.sand} floor={SCENE.chocolate} />
      <CounterG x={90} y={base - 84} w={1220} h={330} slab={124} top={SCENE.beige} front={SCENE.tribal} />
      <Cast d={`M${L.x} ${L.y}L${cx} ${base}H${cx + w}L${R.x} ${R.y}V${R.y + 14}L${cx + w} ${base + 14}H${cx}L${L.x} ${L.y + 14}Z`} len={34} opacity={0.22} />
      <ContactShadowG idp={`${ID}-brochure-cs`} cx={cx + w / 2} cy={base + 3} rx={w * 0.9} opacity={0.3} />
      <PlaceG i={1} x={cx} y={base - h}>
        <g transform={`scale(${s})`}><Shaded m={m}><PanelG n={1} m={m} idp={`${ID}-bro-b`} /></Shaded></g>
      </PlaceG>
      <PlaceG i={2} x={L.x} y={L.y - h}>
        <g transform={`matrix(${(side / 300).toFixed(4)} ${(rise / 300).toFixed(4)} 0 ${s} 0 0)`}><Shaded m={m}><PanelG n={0} m={m} idp={`${ID}-bro-a`} /></Shaded></g>
      </PlaceG>
      <PlaceG i={3} x={cx + w} y={base - h}>
        <g transform={`matrix(${(side / 300).toFixed(4)} -${(rise / 300).toFixed(4)} 0 ${s} 0 0)`}><Shaded m={m}><PanelG n={2} m={m} idp={`${ID}-bro-c`} /></Shaded></g>
      </PlaceG>
    </Plate>
  );
}
