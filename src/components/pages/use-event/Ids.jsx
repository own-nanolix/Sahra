// Two staff ID cards in clear holders standing on a counter, front view. One Beige with the printed name and
// role of the business card, one Dark Chocolate with quiet pale bars where a name would be. No photographs:
// the mark tile stands where a portrait would be.
import { CastG, CastRectG, SheenG, ContactShadowG, DeskEdgeG, PlaceG } from '@/components/art/Mockup';
import { MarkTileG, WordmarkG } from '@/components/art/Mark';
import { PEOPLE } from '@/lib/brand';
import { Scene, PaleBars, C, INK, MUTED } from './kit';
import { rr } from './Lanyard';

// Everything is drawn around the bottom centre of the holder (0, 0).
function Holder({ p, m, dark }) {
  const outer = rr(-156, -590, 312, 584, 22);
  const card = rr(-132, -566, 264, 536, 14);
  const fg = dark ? C.beige : INK;
  const ink = dark ? C.beige : MUTED;
  return (
    <>
      <CastG d={outer} len={42} opacity={0.16} />
      <CastRectG x={-170} y={-8} w={340} h={26} len={46} opacity="0.2" />
      <path d={outer} fill="#FFFFFF" opacity="0.2" />
      <path d={card} fill={dark ? `url(#${m}-board-dark)` : `url(#${m}-card)`} filter={`url(#${m}-paper-grain)`} />
      <clipPath id={`${p}-cc`}>
        <path d={card} />
      </clipPath>
      <g clipPath={`url(#${p}-cc)`}>
        <rect x="-26" y="-556" width="52" height="12" rx="6" fill="#000000" opacity="0.5" />
        <MarkTileG x={-72} y={-500} size={144} radius={26} tile={dark ? C.sand : C.tribal} fill={dark ? C.chocolate : C.beige} />
        {dark ? (
          <PaleBars x={-80} y={-312} widths={[160, 108]} h={12} gap={22} fill={C.beige} op={0.32} />
        ) : (
          <>
            <text className="serif" fontSize="30" fill={fg} textAnchor="middle" letterSpacing="-0.5" x="0" y="-298">{PEOPLE.card.name}</text>
            <text className="sans" fontSize="20" fill={ink} textAnchor="middle" x="0" y="-266">{PEOPLE.card.role}</text>
          </>
        )}
        <rect x="-132" y="-110" width="264" height="80" fill={dark ? C.tribal : C.chocolate} />
        <WordmarkG x={-76} y={-84} width={152} fill={dark ? C.beige : C.sand} />
      </g>
      <path d={outer} fill="none" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="3" />
      <path d={rr(-148, -582, 296, 568, 16)} fill="none" stroke={C.sand} strokeOpacity="0.35" strokeWidth="1.2" />
      <rect x="-30" y="-600" width="60" height="16" rx="8" fill="none" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="2" />
      <path d={outer} fill={`url(#${m}-glass)`} opacity="0.85" />
      <SheenG idp={m} d={outer} opacity={0.3} />
      {/* foot */}
      <rect x="-174" y="-4" width="348" height="24" rx="6" fill={`url(#${m}-metal-dark)`} />
      <rect x="-174" y="-4" width="348" height="4" rx="2" fill="#FFFFFF" opacity="0.35" />
    </>
  );
}

export function IdBeige() {
  return (
    <Scene name="id-beige" title="Staff ID card, Beige, in a holder" w={980} h={1000} horizon={0.72} wall={C.chocolate} floor={C.sand}>
      {(p, m) => (
        <>
          <DeskEdgeG y={880} w={980} thickness={34} edge={C.tribal} top={C.sand} />
          <ContactShadowG idp={`${p}-foot`} cx={490} cy={788} rx={190} ry={9} />
          <PlaceG i={1} x={490} y={780}>
            <g transform="scale(1.22)"><Holder p={p} m={m} dark={false} /></g>
          </PlaceG>
        </>
      )}
    </Scene>
  );
}

export function IdDark() {
  return (
    <Scene name="id-dark" title="Staff ID card, Dark Chocolate, in a holder" w={980} h={1000} horizon={0.62} wall={C.beige} floor={C.tribal}>
      {(p, m) => (
        <>
          <DeskEdgeG y={900} w={980} thickness={30} edge={C.chocolate} top={C.tribal} />
          <path d="M0 620H980" stroke="#FFFFFF" strokeOpacity="0.14" strokeWidth="2" />
          <ContactShadowG idp={`${p}-foot`} cx={620} cy={820} rx={190} ry={9} />
          <PlaceG i={1} x={620} y={812} rotate={-3}>
            <g transform="scale(1.22)"><Holder p={p} m={m} dark /></g>
          </PlaceG>
        </>
      )}
    </Scene>
  );
}
