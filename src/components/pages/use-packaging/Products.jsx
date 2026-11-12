import { WordmarkDebossG } from '@/components/art/Mark';
import { ShelfG, ContactShadowG, CastG } from '@/components/art/Mockup';
import { CONTACT_BLOCKS } from '@/lib/brand';
import { Scene, Box3, LineText, UrlText, ContactText, WordmarkG, C } from './kit';

// Product boxes, rebuilt from m10: the dark box (brand line top left, "→ sahra.sa" top right, the word-mark
// debossed along the bottom) and the tall Tribal Brown box (word-mark debossed vertically, the contact lines set
// vertically, "Sahra Developement" as printed), side by side on one shelf; and the cream tube of m01 on a desk.

function DarkArt({ idp }) {
  return (
    <g>
      <LineText x={44} y={84} size={35} fill="#CDBBA6" />
      <UrlText x={656} y={68} size={20} fill={C.sand} anchor="end" />
      <WordmarkDebossG idp={`${idp}-w`} x={58} y={396} width={584} tone="#9C7050" depth={6} />
    </g>
  );
}

function Vertical({ x, y, children }) {
  return <g transform={`translate(${x} ${y}) rotate(-90)`}>{children}</g>;
}

function TallArt({ idp }) {
  const ink = '#F0E2D2';
  return (
    <g>
      <Vertical x={42} y={236}><ContactText x={0} y={0} lines={CONTACT_BLOCKS.office} size={14} fill={ink} /></Vertical>
      <Vertical x={42} y={470}><ContactText x={0} y={0} lines={[CONTACT_BLOCKS.service[1], CONTACT_BLOCKS.service[2]]} size={14} fill={ink} /></Vertical>
      <Vertical x={42} y={610}><text className="sans" fontSize="14" fontWeight="500" fill={ink}>Sahra Developement</text></Vertical>
      <WordmarkDebossG idp={`${idp}-w`} x={238} y={56} width={540} vertical tone="#A07454" depth={6} />
    </g>
  );
}

// The two product boxes of m10 side by side on one wall shelf, front-three-quarter: the dark box lying long, the
// tall box standing beside it.
export function ProductPair() {
  const y = 560;
  return (
    <Scene name="product-boxes" title="The dark box and the tall Tribal Brown box of the case study, side by side on one shelf" w={1200} h={700} horizon={0.9} wall={C.sand40} floor={C.tribal}>
      {(idp) => (
        <g>
          <ShelfG x={0} y={y} w={1200} depth={44} edge={34} fill={C.beige} />
          <rect x="0" y={y + 34} width="1200" height="6" fill="#000" opacity="0.16" />
          <ContactShadowG idp={`${idp}-s1`} cx={310} cy={y - 2} rx={260} ry={8} opacity={0.4} />
          <ContactShadowG idp={`${idp}-s2`} cx={900} cy={y - 2} rx={180} ry={8} opacity={0.4} />
          <g className="mock-place" style={{ '--i': 1 }}>
            <Box3 idp={idp} k="a" B={[540, y - 2]} L={[-410, -16]} R={[74, -26]} H={336} Wl={420} Wr={74} tone="chocolate" len={70}
              left={<g transform="scale(0.6)"><DarkArt idp={`${idp}-a`} /></g>} />
          </g>
          <g className="mock-place" style={{ '--i': 2 }}>
            <Box3 idp={idp} k="b" B={[1010, y - 2]} L={[-262, -12]} R={[68, -24]} H={416} Wl={273} Wr={68} tone="tribal" len={80}
              left={<g transform="scale(0.65)"><TallArt idp={`${idp}-b`} /></g>} />
          </g>
        </g>
      )}
    </Scene>
  );
}

// The cream tube of m01, lying on its side on a desk with its open end to the left: a white label round the
// middle carrying the black word-mark along the tube and the printed contact blocks above it.
export function Tube() {
  const cy = 330, R = 96, x0 = 170, x1 = 640, ex = 30;
  const body = `M${x0} ${cy - R}H${x1}A${ex} ${R} 0 0 1 ${x1} ${cy + R}H${x0}Z`;
  const label = `M300 ${cy - R}H590V${cy + R}H300Z`;
  return (
    <Scene name="cream-tube" title="Cream tube of the case study lying on a desk, a white label with the black word-mark and the contact lines" w={800} h={600} horizon={0.34} wall={C.tribal} floor={C.tribal20}>
      {(idp) => (
        <g>
          <defs>
            <linearGradient id={`${idp}-tube`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
              <stop offset="0.28" stopColor="#fff" stopOpacity="0.4" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.8" stopColor="#000" stopOpacity="0.12" />
              <stop offset="1" stopColor="#000" stopOpacity="0.34" />
            </linearGradient>
            <clipPath id={`${idp}-tube-clip`}><path d={body} /></clipPath>
          </defs>
          <g className="sun-shadow"><CastG d={body} len={54} steps={16} opacity={0.2} /></g>
          <ContactShadowG idp={`${idp}-s1`} cx={400} cy={cy + R} rx={250} ry={9} opacity={0.45} />
          <g className="mock-place" style={{ '--i': 1 }}>
            <path d={body} fill="#E9E1CD" filter={`url(#${idp}-paper-grain)`} />
            <g clipPath={`url(#${idp}-tube-clip)`}>
              <path d={label} fill="#FFFFFF" />
              <ContactText x={312} y={cy - 58} lines={CONTACT_BLOCKS.office} size={9} fill={C.black} />
              <ContactText x={404} y={cy - 58} lines={CONTACT_BLOCKS.online} size={9} fill={C.black} />
              <ContactText x={478} y={cy - 58} lines={CONTACT_BLOCKS.service} size={9} fill={C.black} />
              <WordmarkG x={318} y={cy + 4} width={252} fill={C.black} />
              <path d={label} fill="none" stroke="#000" strokeOpacity="0.1" />
              <rect x={x0} y={cy - R} width={x1 - x0 + ex} height={2 * R} fill={`url(#${idp}-tube)`} />
            </g>
            {/* the open end: the rim, the dark inside and the lit inner wall */}
            <ellipse cx={x0} cy={cy} rx={ex} ry={R} fill="#DCD2BC" />
            <ellipse cx={x0 + 2} cy={cy} rx={ex - 7} ry={R - 9} fill="#1E140F" />
            <path d={`M${x0 + 2} ${cy - R + 9}A${ex - 7} ${R - 9} 0 0 0 ${x0 + 2} ${cy + R - 9}A${ex - 16} ${R - 14} 0 0 1 ${x0 + 2} ${cy - R + 9}Z`} fill="#6B5A4A" opacity="0.7" />
            <ellipse cx={x0} cy={cy} rx={ex} ry={R} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" />
            <path d={`M${x0} ${cy - R + 1}H${x1}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" />
          </g>
        </g>
      )}
    </Scene>
  );
}
