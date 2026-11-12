// Wristbands laid on a desk, top view, in a fan. Four woven fabric colourways (Dark Chocolate with the Sand
// word-mark, Tribal Brown with the beige mark, Sand with "→ sahra.sa", Beige with a quarter-arch repeat) and
// three silicone ones (Dark Chocolate, Tribal Brown, Sand) with a debossed word-mark. Every plate has its own
// arrangement: the fan pivots from a different corner and the silicone rings are stacked differently.
import { CastG, ContactShadowG, DeskEdgeG, PlaceG, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkDebossG } from '@/components/art/Mark';
import { quarterArch } from '@/components/art/KeyArt';
import { URL_LINE } from '@/lib/brand';
import { Scene, Weave, WmGrid, Mark, C } from './kit';

const L = 720;
const W = 112;
const STRIP = `M14 ${-W / 2}H${L - 14}L${L} ${-W / 2 + 14}V${W / 2 - 14}L${L - 14} ${W / 2}H14L0 ${W / 2 - 14}V${-W / 2 + 14}Z`;

const FABRIC = {
  dark: { color: C.chocolate, name: 'Dark Chocolate' },
  tribal: { color: C.tribal, name: 'Tribal Brown' },
  sand: { color: C.sand, name: 'Sand' },
  beige: { color: C.beige, name: 'Beige' },
};

function Pattern({ kind }) {
  if (kind === 'dark') return <WmGrid x={-30} y={-46} w={L + 40} h={W} width={176} gapX={50} gapY={18} fill={C.sand} />;
  if (kind === 'tribal') {
    return (
      <g fill={C.beige}>
        {Array.from({ length: 7 }, (_, c) => <Mark key={c} x={26 + c * 74} y={-19} size={38} fill={C.beige} />)}
      </g>
    );
  }
  if (kind === 'sand') {
    return (
      <text className="sans" fontSize="40" fill={C.chocolate} y="14" letterSpacing="-0.3">
        {[0, 1].map((c) => <tspan key={c} x={40 + c * 270}>{URL_LINE}</tspan>)}
      </text>
    );
  }
  return (
    <g fill={C.tribal}>
      {Array.from({ length: 9 }, (_, c) => <path key={c} d={quarterArch(50 + c * 84, c % 2 ? -20 : 20, 12, 34, c % 2 ? "br" : "tl")} />)}
    </g>
  );
}

function Strip({ p, m, kind, i }) {
  const f = FABRIC[kind];
  const dark = kind === 'dark' || kind === 'tribal';
  return (
    <g>
      <CastG d={STRIP} len={16} opacity={0.2} />
      <clipPath id={`${p}-sb${i}`}>
        <path d={STRIP} />
      </clipPath>
      <g clipPath={`url(#${p}-sb${i})`}>
        <Weave x={0} y={-W / 2} w={L} h={W} m={m} color={f.color} thread={dark ? '#FFFFFF' : '#FFFFFF'} />
        <Pattern kind={kind} />
        <rect x="0" y={-W / 2} width={L} height={W} fill={`url(#${m}-shade-v)`} />
        <path d={`M12 ${-W / 2 + 8}H${L - 12}M12 ${W / 2 - 8}H${L - 12}`} stroke={dark ? C.beige : C.chocolate} strokeOpacity="0.32" strokeWidth="1.3" strokeDasharray="6 4" />
      </g>
      <path d={STRIP} fill="none" stroke={SHADOW_INK} strokeOpacity="0.25" strokeWidth="1.2" />
      {/* metal slider */}
      <rect x="580" y={-W / 2 - 4} width="44" height={W + 8} rx="6" fill={`url(#${m}-metal)`} />
      <rect x="580" y={-W / 2 - 4} width="44" height="3" fill="#FFFFFF" opacity="0.6" />
      <circle cx="602" cy={-W / 2 + 12} r="3" fill="#6C645C" />
      <circle cx="602" cy={W / 2 - 12} r="3" fill="#6C645C" />
    </g>
  );
}

// Dark and Beige fan out from a rivet (from different corners, three and four bands); Tribal lies as three
// parallel bands sliding off one another; Sand has two bands crossed and one lying apart.
const FANS = {
  dark: { px: 150, py: 790, angles: [-64, -40, -16] },
  beige: { px: 110, py: 500, angles: [-34, -12, 10, 32] },
  tribal: { free: [[90, 250, -9], [60, 440, -9], [120, 630, -9]] },
  sand: { free: [[130, 250, 27], [150, 640, -27], [200, 800, 2]] },
};
const DESKS = {
  dark: [C.sand40, C.tribal],
  tribal: [C.beige, C.chocolate],
  sand: [C.tribal40, C.chocolate],
  beige: [C.sand, C.tribal],
};

export function FabricBand({ kind }) {
  const fan = FANS[kind];
  const [desk, edge] = DESKS[kind];
  return (
    <Scene name={`wristband-${kind}`} title={`Fabric wristbands, ${FABRIC[kind].name}`} w={980} h={1000} horizon={0.9} wall={desk} floor={edge}>
      {(p, m) => (
        <>
          <DeskEdgeG y={900} w={980} thickness={26} edge={edge} top={desk} />
          {fan.free && fan.free.map(([x, y, a], i) => (
            <PlaceG key={i} i={i} x={x} y={y} rotate={a}>
              <Strip p={p} m={m} kind={kind} i={i} />
            </PlaceG>
          ))}
          {fan.angles && fan.angles.map((a, i) => (
            <PlaceG key={a} i={i} x={fan.px} y={fan.py} rotate={a}>
              <Strip p={p} m={m} kind={kind} i={i} />
            </PlaceG>
          ))}
          {fan.angles && (
            <g>
              <circle cx={fan.px + 5} cy={fan.py + 6} r="22" fill={SHADOW_INK} opacity="0.25" />
              <circle cx={fan.px} cy={fan.py} r="20" fill={`url(#${m}-metal)`} />
              <circle cx={fan.px} cy={fan.py} r="9" fill={`url(#${m}-metal-dark)`} />
            </g>
          )}
        </>
      )}
    </Scene>
  );
}

const SIL = {
  dark: { fill: 'board-dark', tone: '#4A3428', name: 'Dark Chocolate', desk: [C.sand40, C.tribal], rings: [[470, 480, 0]] },
  tribal: { fill: 'board', tone: '#9A6E50', name: 'Tribal Brown', desk: [C.beige, C.chocolate], rings: [[380, 380, -10], [560, 560, 8]] },
  sand: { fill: 'board-sand', tone: '#C9A682', name: 'Sand', desk: [C.tribal40, C.sand], rings: [[330, 330, 12], [440, 460, -6], [560, 590, 4]] },
};

// A silicone band lying flat, seen from above at an angle: a thin top rim, the outer wall facing the viewer
// (where the word-mark is debossed), the inner wall seen through the opening at the far side, and the desk
// showing through the hole (cut out with a mask, so a band below shows through it).
const RX = 290, RY = 190, BAND = 74, RIM = 22;
const ell = (cx, cy, rx, ry) => `M${cx - rx} ${cy}A${rx} ${ry} 0 1 0 ${cx + rx} ${cy}A${rx} ${ry} 0 1 0 ${cx - rx} ${cy}Z`;

function Ring({ p, m, kind, cx, cy, rot, i, top }) {
  const s = SIL[kind];
  const irx = RX - RIM, iry = RY - RIM * (RY / RX);
  const id = `${p}-ring${i}`;
  const silhouette = `M${cx - RX} ${cy}A${RX} ${RY} 0 0 1 ${cx + RX} ${cy}V${cy + BAND}A${RX} ${RY} 0 0 1 ${cx - RX} ${cy + BAND}Z`;
  return (
    <PlaceG i={i} x={0} y={0}>
      <g transform={`rotate(${rot} ${cx} ${cy})`}>
        <defs>
          <clipPath id={`${id}-open`}><path d={ell(cx, cy, irx, iry)} /></clipPath>
          <mask id={`${id}-hole`} maskUnits="userSpaceOnUse" x={cx - RX - 60} y={cy - RY - 60} width={2 * RX + 120} height={2 * RY + BAND + 120}>
            <rect x={cx - RX - 60} y={cy - RY - 60} width={2 * RX + 120} height={2 * RY + BAND + 120} fill="#FFFFFF" />
            <path d={ell(cx, cy + BAND, irx, iry)} fill="#000000" clipPath={`url(#${id}-open)`} />
          </mask>
        </defs>
        <ContactShadowG idp={id} cx={cx + 10} cy={cy + RY + BAND - 6} rx={RX * 0.86} ry={12} opacity="0.3" />
        <g mask={`url(#${id}-hole)`}>
          <CastG d={silhouette} len={22} opacity={0.2} />
          {/* outer wall and top, one solid */}
          <path d={silhouette} fill={`url(#${m}-${s.fill})`} />
          <path d={silhouette} fill="#000000" opacity="0.26" />
          <path d={`M${cx - RX} ${cy}A${RX} ${RY} 0 0 0 ${cx + RX} ${cy}V${cy + BAND}A${RX} ${RY} 0 0 1 ${cx - RX} ${cy + BAND}Z`} fill={`url(#${m}-shade)`} opacity="0.55" />
          {/* the inner wall seen across the opening, darker */}
          <path d={ell(cx, cy, irx, iry)} fill={`url(#${m}-${s.fill})`} />
          <path d={ell(cx, cy, irx, iry)} fill="#000000" opacity="0.42" />
          {/* the rim on top, lit from the upper left */}
          <path d={`${ell(cx, cy, RX, RY)}${ell(cx, cy, irx, iry)}`} fill={`url(#${m}-${s.fill})`} fillRule="evenodd" />
          <path d={`${ell(cx, cy, RX, RY)}${ell(cx, cy, irx, iry)}`} fill={`url(#${m}-shade)`} fillRule="evenodd" opacity="0.4" />
          <path d={`M${cx - RX + 2} ${cy}A${RX - 2} ${RY - 2} 0 0 1 ${cx} ${cy - RY + 2}`} fill="none" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2.5" />
          {top && <WordmarkDebossG idp={`${id}-d`} x={cx - 110} y={cy + RY + BAND / 2 - 26} width={220} tone={s.tone} depth={2.5} />}
        </g>
      </g>
    </PlaceG>
  );
}

export function SiliconeBand({ kind }) {
  const s = SIL[kind];
  const [desk, edge] = s.desk;
  return (
    <Scene name={`wristband-silicone-${kind}`} title={`Silicone wristband, ${s.name}`} w={980} h={1000} horizon={0.92} wall={desk} floor={edge}>
      {(p, m) => (
        <>
          <DeskEdgeG y={920} w={980} thickness={24} edge={edge} top={desk} />
          {s.rings.map(([cx, cy, rot], i) => <Ring key={cx} p={p} m={m} kind={kind} cx={cx} cy={cy} rot={rot} i={i} top={i === s.rings.length - 1} />)}
        </>
      )}
    </Scene>
  );
}
