// Two canvas totes hanging by their handles from a peg on a wall, front view.
import { CastG, ContactShadowG } from '@/components/art/Mockup';
import Stage, { C, Cyl, Mk, Wm, Stitch, SHADOW_INK } from './kit';

const BODY = 'M232 340H668L676 790Q450 812 224 790Z';
const STRAPS = ['M318 344C318 250 418 205 450 160', 'M582 344C582 250 482 205 450 160'];

const TOTES = [
  { id: 'tote-beige', title: 'Beige canvas tote bag on a peg', canvas: C.beige, web: '#E4DAC4', thread: C.tribal, wall: C.tribal, floor: C.chocolate, mark: false },
  { id: 'tote-chocolate', title: 'Dark Chocolate canvas tote bag on a peg', canvas: C.chocolate, web: '#4B352A', thread: C.sand, wall: C.sand, floor: C.tribal20, mark: true },
];

function Peg({ idp }) {
  return (
    <g>
      <circle cx="462" cy="172" r="30" fill={SHADOW_INK} opacity="0.2" />
      <circle cx="450" cy="160" r="36" fill={`url(#${idp}-metal-dark)`} />
      <circle cx="450" cy="160" r="36" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
      <circle cx="450" cy="160" r="20" fill={`url(#${idp}-metal)`} />
      <ellipse cx="443" cy="152" rx="8" ry="5" fill="#FFFFFF" opacity="0.7" />
    </g>
  );
}

function Tote({ cw, lit }) {
  return (
    <Stage id={cw.id} title={cw.title} w={900} h={900} horizon={0.9} wall={cw.wall} floor={cw.floor} lit={lit} order={1}>
      {(idp) => (
        <g>
          <CastG d={BODY} len={26} opacity={0.2} />
          {STRAPS.map((d) => (
            <path key={d} d={d} fill="none" stroke={SHADOW_INK} strokeOpacity="0.22" strokeWidth="30" transform="translate(12 10)" />
          ))}
          <Peg idp={idp} />
          {STRAPS.map((d) => (
            <g key={d}>
              <path d={d} fill="none" stroke={cw.web} strokeWidth="28" filter={`url(#${idp}-fabric)`} />
              <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity="0.2" strokeWidth="6" transform="translate(-7 -3)" />
              <Stitch d={d} color={cw.thread} opacity={0.6} width={1.6} dash="5 4" />
            </g>
          ))}
          <ContactShadowG idp={idp} cx={450} cy={810} rx={190} opacity={0.22} />
          <g>
            <clipPath id={`${idp}-body`}>
              <path d={BODY} />
            </clipPath>
            <path d={BODY} fill={cw.canvas} filter={`url(#${idp}-fabric)`} />
            <g clipPath={`url(#${idp}-body)`}>
              <rect x="224" y="340" width="460" height="38" fill="#1E140F" opacity="0.1" />
              <rect x="224" y="376" width="460" height="3" fill="#FFFFFF" opacity="0.22" />
              <path d="M300 380Q290 560 310 800M520 380Q540 600 512 800" stroke="#1E140F" strokeOpacity="0.07" strokeWidth="22" fill="none" />
              {cw.mark ? (
                <g>
                  <Mk cx={450} cy={520} s={92} fill={C.sand} sx={0.97} />
                  <text className="serif" x="450" y="650" textAnchor="middle" fontSize="31" fill={C.sand} letterSpacing="-0.5">We Build Spaces</text>
                  <text className="serif" x="450" y="690" textAnchor="middle" fontSize="31" fill={C.sand} letterSpacing="-0.5">of Imagination</text>
                </g>
              ) : (
                <Wm cx={450} cy={580} w={290} fill={cw.thread} sx={0.98} />
              )}
              <Stitch d="M232 378H668" color={cw.thread} opacity={0.45} />
              <Stitch d="M240 770Q450 790 662 770" color={cw.thread} opacity={0.35} />
            </g>
            <Cyl idp={idp} d={BODY} edge hi shade />
            <path d="M232 340H668" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
          </g>
        </g>
      )}
    </Stage>
  );
}

export const TOTE_PLATES = TOTES.map((cw, i) => ({ key: cw.id, cap: i ? 'Tote bag, Dark Chocolate' : 'Tote bag, Beige canvas', c: 3, r: 3, ar: 1, node: <Tote cw={cw} lit={i === 0} /> }));
