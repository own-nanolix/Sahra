import { WordmarkDebossG, WordmarkVerticalG } from '@/components/art/Mark';
import { ShelfG, ContactShadowG, CastG } from '@/components/art/Mockup';
import { CONTACT_BLOCKS } from '@/lib/brand';
import { Scene, Box3, LineText, UrlText, ContactText, poly, C } from './kit';

// Product boxes, rebuilt from m10: the dark box (brand line top left, "→ sahra.sa" top right, the word-mark
// debossed along the bottom) and the tall Tribal Brown box (word-mark debossed vertically, the contact lines set
// vertically, "Sahra Developement" as printed). Each stands upright on a shelf; the cream tube of m01 is an extra.

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

function Shelf({ w = 800, y = 480 }) {
  return (
    <g>
      <ShelfG x={0} y={y} w={w} depth={44} edge={34} fill={C.beige} />
      <rect x="0" y={y + 34} width={w} height="6" fill="#000" opacity="0.16" />
    </g>
  );
}

export function ProductDark() {
  const s = 0.6;
  return (
    <Scene name="product-box-dark" title="The dark product box of the case study, standing on a shelf" w={800} h={600} horizon={0.9} wall={C.sand40} floor={C.tribal}>
      {(idp) => (
        <g>
          <Shelf />
          <ContactShadowG idp={`${idp}-s1`} cx={330} cy={478} rx={260} ry={8} opacity={0.4} />
          <g className="mock-place" style={{ '--i': 1 }}>
            <Box3 idp={idp} k="a" B={[560, 478]} L={[-410, -16]} R={[74, -26]} H={336} Wl={420} Wr={74} tone="chocolate" len={70}
              left={<g transform={`scale(${s})`}><DarkArt idp={idp} /></g>} />
          </g>
        </g>
      )}
    </Scene>
  );
}

export function ProductTall() {
  const s = 0.65;
  return (
    <Scene name="product-box-tall" title="The tall Tribal Brown product box of the case study, standing on a shelf" w={800} h={600} horizon={0.9} wall={C.sand} floor={C.choc}>
      {(idp) => (
        <g>
          <Shelf />
          <ContactShadowG idp={`${idp}-s1`} cx={440} cy={478} rx={220} ry={8} opacity={0.4} />
          <g className="mock-place" style={{ '--i': 1 }}>
            <Box3 idp={idp} k="a" B={[520, 478]} L={[-262, -12]} R={[68, -24]} H={416} Wl={273} Wr={68} tone="tribal" len={80}
              left={<g transform={`scale(${s})`}><TallArt idp={idp} /></g>} />
          </g>
        </g>
      )}
    </Scene>
  );
}

// The cream tube of m01: a white label carrying the black word-mark and the contact lines.
export function Tube() {
  const body = 'M305 96V478A95 14 0 0 0 495 478V96Z';
  const label = 'M305 160A95 14 0 0 0 495 160V440A95 14 0 0 1 305 440Z';
  return (
    <Scene name="cream-tube" title="Cream tube with a white label, the black word-mark and the contact lines" w={800} h={600} horizon={0.9} wall={C.tribal20} floor={C.sand}>
      {(idp) => (
        <g>
          <Shelf />
          <defs>
            <linearGradient id={`${idp}-tube`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
              <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
              <stop offset="0.7" stopColor="#000" stopOpacity="0.08" />
              <stop offset="1" stopColor="#000" stopOpacity="0.34" />
            </linearGradient>
            <clipPath id={`${idp}-tube-clip`}><path d={label} /></clipPath>
          </defs>
          <ContactShadowG idp={`${idp}-s1`} cx={420} cy={480} rx={170} ry={8} opacity={0.4} />
          <g className="sun-shadow"><g opacity="0.22"><CastG d={body} len={60} steps={16} opacity={1} /></g></g>
          <g className="mock-place" style={{ '--i': 1 }}>
            <path d={body} fill="#EDE6D4" />
            <path d={body} fill={`url(#${idp}-tube)`} />
            <ellipse cx="400" cy="96" rx="95" ry="14" fill="#F5F0E3" />
            <ellipse cx="400" cy="96" rx="95" ry="14" fill="none" stroke="#000" strokeOpacity="0.18" />
            <ellipse cx="400" cy="98" rx="78" ry="9" fill="#EDE6D4" />
            <path d={label} fill="#FFFFFF" filter={`url(#${idp}-paper-grain)`} />
            <g clipPath={`url(#${idp}-tube-clip)`}>
              <WordmarkVerticalG x={322} y={186} scale={0.19} fill={C.black} />
              <Vertical x={398} y={420}><ContactText x={0} y={0} lines={CONTACT_BLOCKS.office} size={10} fill={C.black} /></Vertical>
              <Vertical x={438} y={420}><ContactText x={0} y={0} lines={CONTACT_BLOCKS.service} size={10} fill={C.black} /></Vertical>
              <path d={label} fill={`url(#${idp}-tube)`} />
            </g>
            <path d={poly([305, 96], [305, 478])} stroke="#fff" strokeOpacity="0.3" strokeWidth="1.4" />
          </g>
        </g>
      )}
    </Scene>
  );
}
