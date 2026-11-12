// The lanyard with the speaker badge: hanging from a hook on a ribbed wall, front view. A Tribal Brown woven
// lanyard with the beige word-mark repeated, a metal swivel clip, a Beige badge card with the printed name and
// role of the business card, the mark top right and a Dark Chocolate band at the foot.
import { WallRibsG, CastG, CastRectG, SheenG, ContactShadowG, SHADOW_INK } from '@/components/art/Mockup';
import { WordmarkVerticalG } from '@/components/art/Mark';
import { ArchWindowG } from '@/components/art/KeyArt';
import { PEOPLE, LINES } from '@/lib/brand';
import { Scene, Weave, Mark, C, INK, MUTED } from './kit';
import s from './use-event.module.css';

export const rr = (x, y, w, h, r) => `M${x + r} ${y}H${x + w - r}Q${x + w} ${y} ${x + w} ${y + r}V${y + h - r}Q${x + w} ${y + h} ${x + w - r} ${y + h}H${x + r}Q${x} ${y + h} ${x} ${y + h - r}V${y + r}Q${x} ${y} ${x + r} ${y}Z`;

function Strap({ p, m, x, rot, k }) {
  const w = 48;
  return (
    <g transform={`rotate(${rot} ${x} 130)`}>
      <CastRectG x={x - w / 2} y={100} w={w} h={540} len={16} opacity={0.16} />
      <clipPath id={`${p}-strap${k}`}>
        <rect x={x - w / 2} y={100} width={w} height={540} />
      </clipPath>
      <g clipPath={`url(#${p}-strap${k})`}>
        <Weave x={x - w / 2} y={100} w={w} h={540} m={m} color={C.tribal} />
        {[0, 1, 2].map((i) => <WordmarkVerticalG key={i} x={x - 13} y={150 + i * 185} scale={0.1} fill={C.beige} />)}
        <rect x={x - w / 2} y={100} width={w} height={540} fill={`url(#${m}-shade)`} />
        <path d={`M${x - 19} 100V640M${x + 19} 100V640`} stroke={C.beige} strokeOpacity="0.4" strokeWidth="1.4" strokeDasharray="5 4" />
        <rect x={x - w / 2} y={100} width={w} height={22} fill={INK} opacity="0.22" />
      </g>
    </g>
  );
}

export default function Lanyard() {
  const card = rr(190, 790, 380, 610, 30);
  return (
    <Scene name="lanyard" title="Lanyard with the speaker badge" w={760} h={1600} horizon={0.95} wall={C.sand} floor={C.chocolate}>
      {(p, m) => (
        <>
          <WallRibsG x={0} y={0} w={760} h={1520} pitch={38} rib={17} fill={C.sand} />
          <Strap p={p} m={m} x={345} rot={-2.6} k="a" />
          <Strap p={p} m={m} x={415} rot={2.6} k="b" />
          {/* hook on the wall */}
          <ellipse cx="392" cy="150" rx="34" ry="34" fill={SHADOW_INK} opacity="0.2" />
          <circle cx="380" cy="132" r="32" fill={`url(#${m}-metal)`} />
          <circle cx="380" cy="132" r="32" fill="none" stroke="#6C645C" strokeWidth="2" />
          <circle cx="380" cy="132" r="13" fill={`url(#${m}-metal-dark)`} />
          <ellipse cx="376" cy="128" rx="5" ry="3" fill="#FFFFFF" opacity="0.6" />
          <g className={s.turn}>
            {/* crimp, swivel and clip */}
            <rect x="344" y="636" width="72" height="50" rx="9" fill={`url(#${m}-metal)`} />
            <path d="M348 652H412M348 670H412" stroke="#6C645C" strokeWidth="1.6" opacity="0.7" />
            <ellipse cx="380" cy="708" rx="13" ry="22" fill="none" stroke={`url(#${m}-metal)`} strokeWidth="8" />
            <ellipse cx="380" cy="708" rx="13" ry="22" fill="none" stroke="#6C645C" strokeWidth="1.2" />
            <rect x="361" y="726" width="38" height="70" rx="10" fill={`url(#${m}-metal)`} />
            <rect x="372" y="738" width="16" height="30" rx="8" fill={`url(#${m}-metal-dark)`} />
            <ellipse cx="380" cy="806" rx="24" ry="13" fill="none" stroke={`url(#${m}-metal)`} strokeWidth="6" />
            {/* the badge */}
            <CastG d={card} len={36} opacity={0.2} />
            <path d={card} transform="translate(5 6)" fill="#C9BBA0" />
            <path d={card} fill={`url(#${m}-card)`} filter={`url(#${m}-paper-grain)`} />
            <clipPath id={`${p}-badge`}>
              <path d={card} />
            </clipPath>
            <g clipPath={`url(#${p}-badge)`}>
              <ArchWindowG idp={`${p}-win`} cx={570} cy={1290} r={64} R={196} quadrant="tl" />
              <rect x="190" y="1280" width="380" height="120" fill={C.chocolate} />
              <text className="serif" fontSize="29" fill={C.beige} letterSpacing="-0.4">
                {LINES.imagination.rows.map((row, i) => <tspan key={row} x="226" y={1325 + i * 36}>{row}</tspan>)}
              </text>
              <rect x="190" y="1280" width="380" height="3" fill="#FFFFFF" opacity="0.12" />
            </g>
            <rect x="344" y="816" width="72" height="20" rx="10" fill={SHADOW_INK} opacity="0.75" />
            <Mark x={494} y={852} size={50} fill={C.tribal} />
            <text className="serif" fontSize="41" fill={INK} letterSpacing="-0.8" x="226" y="1000">{PEOPLE.card.name}</text>
            <text className="sans" fontSize="23" fill={MUTED} x="227" y="1040">{PEOPLE.card.role}</text>
            <path d="M226 1066H400" stroke={C.tribal} strokeWidth="2" opacity="0.5" />
            <SheenG idp={m} d={card} opacity={0.32} />
          </g>
          <ContactShadowG idp={`${p}-skirt`} cx={380} cy={1522} rx={300} ry={4} opacity="0.3" blur={4} />
        </>
      )}
    </Scene>
  );
}
