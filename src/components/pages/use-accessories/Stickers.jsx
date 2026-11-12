// Sticker sheet and pin card, on a desk, top view. The card lies slightly over the sheet.
import { CastRectG, CastG } from '@/components/art/Mockup';
import { QuarterArchG, quarterArch } from '@/components/art/KeyArt';
import Stage, { C, PAIRS, Ledge, Mk, Wm, Sheet, rrect, SHADOW_INK } from './kit';

const CUT = { fill: 'none', stroke: SHADOW_INK, strokeOpacity: 0.28, strokeWidth: 1.4, strokeDasharray: '4 3' };

// Disc sticker with the mark in one colour pair (m09), a kiss-cut line round it and a soft gloss.
function Disc({ idp, cx, cy, r, pair }) {
  return (
    <g>
      <circle cx={cx + 2} cy={cy + 3} r={r} fill={SHADOW_INK} opacity="0.22" />
      <circle cx={cx} cy={cy} r={r + 7} {...CUT} />
      <circle cx={cx} cy={cy} r={r} fill={pair.bg} />
      <Mk cx={cx} cy={cy} s={r * 0.9} fill={pair.fg} />
      <circle cx={cx} cy={cy} r={r} fill={`url(#${idp}-glass)`} opacity="0.55" />
    </g>
  );
}

function Pill({ idp, x, y, w, h, fill, children }) {
  const d = rrect(x, y, w, h, h / 2);
  return (
    <g>
      <path d={d} fill={SHADOW_INK} opacity="0.22" transform="translate(2 3)" />
      <path d={rrect(x - 7, y - 7, w + 14, h + 14, h / 2 + 7)} {...CUT} />
      <path d={d} fill={fill} />
      {children}
      <path d={d} fill={`url(#${idp}-glass)`} opacity="0.5" />
    </g>
  );
}

function StickerSheet() {
  const row2 = 300;
  return (
    <Stage id="sticker-sheet" title="Sticker sheet with the mark in four colour pairs" w={1000} h={500} horizon={0.9} wall={C.sand40} floor={C.tribal} order={1}>
      {(idp) => (
        <g>
          <Ledge y={452} w={1000} h={500} thick={20} edge={C.chocolate} />
          <g transform="rotate(-2.2 500 240)">
            <CastRectG x={90} y={42} w={820} h={384} len={20} opacity={0.24} />
            <rect x="90" y="42" width="820" height="384" rx="6" fill={`url(#${idp}-paper)`} filter={`url(#${idp}-paper-grain)`} />
            <rect x="90" y="42" width="820" height="384" rx="6" fill="none" stroke={SHADOW_INK} strokeOpacity="0.12" />
            <Sheet idp={idp} d={rrect(90, 42, 820, 384, 6)} />
            {PAIRS.map((p, i) => <Disc key={p.id} idp={idp} cx={190 + i * 150} cy={140} r={56} pair={p} />)}
            <g>
              <rect x="752" y="86" width="112" height="112" rx="26" fill={SHADOW_INK} opacity="0.22" transform="translate(2 3)" />
              <rect x="745" y="79" width="126" height="126" rx="32" {...CUT} />
              <g transform="translate(752 86)">
                <rect width="112" height="112" rx="26" fill={C.beige} />
                <Mk cx={56} cy={56} s={52} fill={C.tribal} />
              </g>
            </g>
            <Pill idp={idp} x={125} y={row2 - 40} w={310} h={80} fill={C.beige}>
              <Wm cx={280} cy={row2} w={230} fill={C.chocolate} />
            </Pill>
            <g>
              <path d={quarterArch(590, 360, 44, 124, 'tl')} fill={SHADOW_INK} opacity="0.22" transform="translate(2 3)" />
              <path d={quarterArch(590, 360, 44, 124, 'tl')} fill="none" stroke={SHADOW_INK} strokeOpacity="0.28" strokeWidth="2" strokeLinejoin="round" strokeDasharray="4 3" />
              <QuarterArchG cx={590} cy={360} r={44} R={124} quadrant="tl" fill={C.tribal} />
              <QuarterArchG cx={590} cy={360} r={44} R={124} quadrant="tl" fill={`url(#${idp}-glass)`} opacity="0.5" />
            </g>
            <g>
              <Pill idp={idp} x={690} y={row2 - 32} w={190} h={64} fill={C.chocolate}>
                <text x="785" y={row2 + 9} textAnchor="middle" className="sans" fontSize="28" fill={C.sand} letterSpacing="-0.5">→ sahra.sa</text>
              </Pill>
              <path d={`M852 ${row2 + 32}L880 ${row2 + 4}L880 ${row2 + 32}Z`} fill="#ECE6DA" />
              <path d={`M852 ${row2 + 32}L880 ${row2 + 4}L852 ${row2 + 4}Z`} fill="#FBF8F0" />
              <path d={`M852 ${row2 + 32}L880 ${row2 + 4}`} stroke={SHADOW_INK} strokeOpacity="0.25" />
            </g>
          </g>
        </g>
      )}
    </Stage>
  );
}

// A round enamel pin: metal rim, enamel field, the artwork on top.
function PinBase({ idp, d, children }) {
  return (
    <g>
      <CastG d={d} len={9} opacity={0.3} steps={4} />
      <path d={d} fill={`url(#${idp}-metal)`} stroke="#8F887E" strokeWidth="1" />
      {children}
      <path d={d} fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="1.4" />
    </g>
  );
}

function PinCard() {
  const dRound = 'M-40 0A40 40 0 1 0 40 0A40 40 0 1 0 -40 0Z';
  const dTile = rrect(-38, -38, 76, 76, 16);
  const dArch = quarterArch(34, 34, 10, 72, 'tl');
  return (
    <Stage id="pin-card" title="Pin card with three enamel pins" w={800} h={400} horizon={0.9} wall={C.beige} floor={C.sand} order={1}>
      {(idp) => (
        <g>
          <Ledge y={366} w={800} h={400} thick={18} edge={C.tribal} />
          <g transform="translate(205 190) rotate(-7)">
            <CastRectG x={-170} y={-120} w={340} h={240} len={16} opacity={0.22} />
            <rect x="-170" y="-120" width="340" height="240" fill={`url(#${idp}-paper)`} filter={`url(#${idp}-paper-grain)`} />
            <circle cx="-120" cy="-60" r="20" fill={C.sand} opacity="0.8" />
            <circle cx="-30" cy="38" r="44" fill={C.sand} opacity="0.7" />
            <rect x="60" y="-10" width="64" height="64" rx="12" fill={C.tribal} opacity="0.75" />
          </g>
          <g transform="translate(450 205) rotate(3)">
            <CastRectG x={-200} y={-136} w={400} h={272} len={20} opacity={0.26} />
            <rect x="-200" y="-136" width="400" height="272" fill={`url(#${idp}-board-dark)`} filter={`url(#${idp}-fibre)`} />
            <rect x="-200" y="-136" width="400" height="5" fill="#FFFFFF" opacity="0.18" />
            <Sheet idp={idp} d="M-200 -136H200V136H-200Z" />
            <circle cx="0" cy="-114" r="8" fill={C.sand40} stroke={SHADOW_INK} strokeOpacity="0.4" />
            <g transform="translate(-110 -26)">
              <PinBase idp={idp} d={dRound}>
                <circle r="33" fill={C.tribal} />
                <Mk cx={0} cy={0} s={34} fill={C.beige} />
              </PinBase>
            </g>
            <g transform="translate(0 -26)">
              <PinBase idp={idp} d={dTile}>
                <rect x="-31" y="-31" width="62" height="62" rx="11" fill={C.beige} />
                <Mk cx={0} cy={0} s={30} fill={C.tribal} />
              </PinBase>
            </g>
            <g transform="translate(110 -26)">
              <PinBase idp={idp} d={dArch}>
                <path d={quarterArch(34, 34, 18, 64, 'tl')} fill={C.sand} />
              </PinBase>
            </g>
            <Wm cx={0} cy={82} w={190} fill={C.sand} />
          </g>
        </g>
      )}
    </Stage>
  );
}

export const STICKER_PLATES = [
  { key: 'sticker-sheet', cap: 'Sticker sheet', c: 4, r: 2, ar: 2, node: <StickerSheet /> },
  { key: 'pin-card', cap: 'Pin card', c: 2, r: 1, ar: 2, node: <PinCard /> },
];
