// The access card in three colourways (Dark Chocolate, Tribal Brown, Beige), front over back, each standing in
// its own counter display. Front: the mark, the word-mark, a contactless symbol drawn as arcs, a quarter arch.
// Back: a dark strip, the small word-mark, "www.sahra.sa", "+966 55 123 4567", quiet bars where a name or a
// number would be. No names, numbers, dates or codes are invented.
import Art from '@/components/art/Art';
import { MarkG, WordmarkG } from '@/components/art/Mark';
import { QuarterArchG } from '@/components/art/KeyArt';
import { MaterialDefs, BackdropG, CounterG, CastG, ContactShadowG, SCENE } from '@/components/art/Mockup';
import { CONTACT } from '@/lib/brand';
import { r2 } from '@/lib/charts';

const W = 300, H = 190, R = 22;

export const COLOURWAYS = [
  { key: 'chocolate', name: 'Dark Chocolate', fill: '#35241C', edge: '#1F140F', ink: '#B58F6B', text: '#F5F0E3', arch: '#875D41', strip: '#000000', wall: SCENE.sand40, floor: SCENE.tribal40, top: SCENE.beige, front: SCENE.tribal, ledge: 'glass', dx: [0, 0] },
  { key: 'tribal', name: 'Tribal Brown', fill: '#875D41', edge: '#5E3F2B', ink: '#F5F0E3', text: '#F5F0E3', arch: '#B58F6B', strip: '#35241C', wall: SCENE.chocolate, floor: '#4A3429', top: SCENE.sand20, front: SCENE.beige60, ledge: 'metal', dx: [-34, 34] },
  { key: 'beige', name: 'Beige', fill: '#F5F0E3', edge: '#C9BDA6', ink: '#875D41', text: '#35241C', arch: '#E1D2C4', strip: '#35241C', wall: SCENE.tribal, floor: '#6E4A34', top: SCENE.sand40, front: SCENE.chocolate, ledge: 'wood', dx: [24, -24] },
];

// Contactless symbol: three arcs opening to the right, one stroke weight, round ends.
function Contactless({ x, y, ink }) {
  const arcs = [11, 20, 29].map((r) => {
    const a = (Math.PI / 180) * 48;
    return `M${r2(x + r * Math.cos(a))} ${r2(y - r * Math.sin(a))}A${r} ${r} 0 0 1 ${r2(x + r * Math.cos(a))} ${r2(y + r * Math.sin(a))}`;
  });
  return (
    <g fill="none" stroke={ink} strokeWidth="3.2" strokeLinecap="round">
      {arcs.map((d) => <path key={d} d={d} />)}
    </g>
  );
}

function CardBody({ id, c, children }) {
  return (
    <g>
      <rect x="3" y="3" width={W} height={H} rx={R} fill={c.edge} />
      <rect width={W} height={H} rx={R} fill={c.fill} filter={`url(#${id}-paper-grain)`} />
      {children}
      <rect width={W} height={H} rx={R} fill={`url(#${id}-shade)`} opacity="0.35" />
      <rect x="0.5" y="0.5" width={W - 1} height={H - 1} rx={R} fill="none" stroke="#FFFFFF" strokeOpacity="0.25" />
    </g>
  );
}

function Front({ id, c }) {
  return (
    <CardBody id={id} c={c}>
      <clipPath id={`${id}-clip-f`}>
        <rect width={W} height={H} rx={R} />
      </clipPath>
      <g clipPath={`url(#${id}-clip-f)`}>
        <QuarterArchG cx={W} cy={0} r={52} R={112} quadrant="bl" fill={c.arch} />
      </g>
      <MarkG x={26} y={26} size={30} fill={c.ink} />
      <WordmarkG x={26} y={H - 48} width={128} fill={c.ink} />
      <Contactless x={W - 66} y={H - 40} ink={c.ink} />
    </CardBody>
  );
}

function Back({ id, c }) {
  return (
    <CardBody id={id} c={c}>
      <rect y="28" width={W} height="42" fill={c.strip} />
      <rect y="28" width={W} height="2" fill="#FFFFFF" opacity="0.14" />
      <WordmarkG x={24} y={92} width={84} fill={c.ink} />
      <text x="24" y="146" fontSize="10.5" className="sans" fill={c.text}>{CONTACT.web}</text>
      <text x="24" y="162" fontSize="10.5" className="sans" fill={c.text}>{CONTACT.phone}</text>
      <rect x="176" y="96" width="98" height="8" rx="4" fill={c.text} opacity="0.22" />
      <rect x="176" y="114" width="64" height="8" rx="4" fill={c.text} opacity="0.16" />
      <rect x="176" y="148" width="98" height="8" rx="4" fill={c.text} opacity="0.12" />
    </CardBody>
  );
}

function Ledge({ id, y, kind }) {
  const x = 112, w = 376;
  const fill = kind === 'metal' ? `url(#${id}-metal)` : kind === 'wood' ? `url(#${id}-board-dark)` : '#FFFFFF';
  const op = kind === 'glass' ? 0.55 : 1;
  return (
    <g>
      <rect x={x} y={y - 8} width={w} height="26" fill={fill} opacity={op} filter={kind === 'wood' ? `url(#${id}-fibre)` : undefined} />
      <rect x={x} y={y - 8} width={w} height="2" fill="#FFFFFF" opacity="0.7" />
      <rect x={x} y={y + 14} width={w} height="4" fill="#35241C" opacity="0.28" />
    </g>
  );
}

const outline = (x, y) => `M${x + R} ${y}H${x + W - R}a${R} ${R} 0 0 1 ${R} ${R}V${y + H - R}a${R} ${R} 0 0 1 ${-R} ${R}H${x + R}a${R} ${R} 0 0 1 ${-R} ${-R}V${y + R}a${R} ${R} 0 0 1 ${R} ${-R}z`;

// Tribal Brown: one low ledge in a short glass stand; the back stands upright, the front leans across it.
function Lean({ id, c }) {
  const by = 300, bx = 222, fx = 96, fy = 330;
  return (
    <>
      <rect x="80" y="250" width="440" height="304" fill="#FFFFFF" opacity="0.12" />
      <rect x="80" y="250" width="440" height="304" fill={`url(#${id}-glass)`} opacity="0.6" />
      <path d="M80 250V554M520 250V554M80 250H520" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2" />
      <CastG d={outline(bx, by)} len={20} steps={6} opacity={0.2} className="sun-shadow" />
      <g className="mock-place" style={{ '--i': 1 }}>
        <g transform={`translate(${bx} ${by})`}><Back id={id} c={c} /></g>
      </g>
      <g className="mock-place" style={{ '--i': 2 }}>
        <g transform={`translate(${fx} ${fy}) rotate(-6 0 ${H})`}>
          <CastG d={outline(0, 0)} len={18} steps={6} opacity={0.22} />
          <Front id={id} c={c} />
        </g>
      </g>
      <rect x="70" y="510" width="460" height="44" fill={`url(#${id}-metal)`} />
      <rect x="70" y="510" width="460" height="3" fill="#FFFFFF" opacity="0.7" />
      <rect x="70" y="548" width="460" height="6" fill="#35241C" opacity="0.3" />
      <ContactShadowG idp={id} cx={300} cy={566} rx={240} opacity={0.35} blur={5} />
    </>
  );
}

// Beige: no panel; a dark wooden block with one slot holds the two cards fanned, back to the left, front to the
// right and over it.
function Fan({ id, c }) {
  const px = 300, py = 520;
  return (
    <>
      <g className="mock-place" style={{ '--i': 1 }}>
        <g transform={`rotate(-11 ${px} ${py}) translate(${px - W / 2 - 40} ${py - H + 2})`}>
          <CastG d={outline(0, 0)} len={22} steps={6} opacity={0.2} className="sun-shadow" />
          <Back id={id} c={c} />
        </g>
      </g>
      <g className="mock-place" style={{ '--i': 2 }}>
        <g transform={`rotate(9 ${px} ${py}) translate(${px - W / 2 + 34} ${py - H - 4})`}>
          <CastG d={outline(0, 0)} len={22} steps={6} opacity={0.24} />
          <Front id={id} c={c} />
        </g>
      </g>
      <rect x="196" y="500" width="208" height="66" fill={`url(#${id}-board-dark)`} filter={`url(#${id}-fibre)`} />
      <rect x="196" y="500" width="208" height="4" fill="#FFFFFF" opacity="0.28" />
      <rect x="196" y="500" width="208" height="66" fill={`url(#${id}-shade)`} opacity="0.5" />
      <rect x="226" y="500" width="148" height="5" fill="#000000" opacity="0.6" />
      <ContactShadowG idp={id} cx={304} cy={566} rx={130} opacity={0.4} blur={4} />
    </>
  );
}

function Cards({ c }) {
  const id = `use-product-card-${c.key}`;
  const fx = 150 + c.dx[0], bx = 150 + c.dx[1];
  const fy = 126, by = 340;
  const kind = c.key === 'tribal' ? 'stood behind a leaning front' : c.key === 'beige' ? 'fanned in a wooden block' : 'front over back, in a two-tier display';
  return (
    <Art viewBox="0 0 600 700" title={`Access card, ${c.name}, ${kind}`} exportName={`use-product-card-${c.key}`}>
      <MaterialDefs idp={id} />
      <BackdropG idp={id} w={600} h={700} horizon={0.8} wall={c.wall} floor={c.floor} />
      {c.key === 'tribal' && <Lean id={id} c={c} />}
      {c.key === 'beige' && <Fan id={id} c={c} />}
      {c.key === 'chocolate' && <Tiers id={id} c={c} fx={fx} fy={fy} bx={bx} by={by} />}
      <CounterG x={0} y={566} w={600} h={134} slab={22} top={c.top} front={c.front} plinth={12} />
    </Art>
  );
}

// Dark Chocolate: a tall glass display with two ledges, the front above the back.
function Tiers({ id, c, fx, fy, bx, by }) {
  return (
    <>
      {/* display: back panel, ledges */}
      <rect x="112" y="84" width="376" height="470" fill="#FFFFFF" opacity="0.16" />
      <rect x="112" y="84" width="376" height="470" fill={`url(#${id}-glass)`} opacity="0.7" />
      <path d="M112 84V554M488 84V554" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
      {/* hard shadows of the cards on the panel */}
      <CastG d={outline(fx, fy)} len={20} steps={6} opacity={0.2} className="sun-shadow" />
      <CastG d={outline(bx, by)} len={20} steps={6} opacity={0.2} className="sun-shadow" />
      <g className="mock-place" style={{ '--i': 1 }}>
        <g transform={`translate(${fx} ${fy})`}><Front id={id} c={c} /></g>
      </g>
      <Ledge id={id} y={fy + H - 6} kind={c.ledge} />
      <g className="mock-place" style={{ '--i': 2 }}>
        <g transform={`translate(${bx} ${by})`}><Back id={id} c={c} /></g>
      </g>
      <Ledge id={id} y={by + H - 6} kind={c.ledge} />
      <rect x="100" y="534" width="400" height="28" fill={`url(#${id}-${c.ledge === 'wood' ? 'board-dark' : 'metal-dark'})`} />
      <rect x="100" y="534" width="400" height="2" fill="#FFFFFF" opacity="0.3" />
      <ContactShadowG idp={id} cx={300} cy={566} rx={210} opacity={0.35} blur={5} />
    </>
  );
}

export default Cards;
