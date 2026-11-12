import Art from '@/components/art/Art';
import { quarterArch } from '@/components/art/KeyArt';
import { HEX } from '@/lib/brand';
import { r2 } from '@/lib/charts';
import Reveal from '@/components/site/Reveal';
import GlyphG from './GlyphG';
import InView from './InView';
import s from './icons.module.css';

// Three illustrations in the brand's shapes and palette: the quarter arch, the grid, the hard light of the desert.
// Abstract and geometric, no people. Each is drawn twice from one function: on light and on dark.
const THEMES = {
  light: { ground: HEX.beige, deep: HEX.chocolate, mid: HEX.tribal, soft: HEX.sand, line: HEX.chocolate, sun: HEX.sand },
  dark: { ground: HEX.chocolate, deep: HEX.black, mid: HEX.tribal, soft: HEX.sand, line: HEX.beige, sun: HEX.beige },
};

const W = 600;
const H = 440;
const range = (n) => Array.from({ length: n }, (_, i) => i);

// 1. An arch and a courtyard: the quarter arch twice, a wall, a floor, a hard shadow falling to the lower right.
function ArchCourtyard({ t }) {
  return (
    <>
      <rect width={W} height={H} fill={t.ground} />
      <circle className="fade-in" style={{ '--i': 6 }} cx="468" cy="96" r="34" fill={t.sun} />
      <rect x="90" y="120" width="420" height="250" fill={t.mid} />
      <path d="M230 370V250A70 70 0 0 1 370 250V370Z" fill={t.deep} />
      <g className="slide-up" style={{ '--i': 1 }}>
        <path d={quarterArch(300, 250, 70, 112, 'tl')} fill={t.soft} />
      </g>
      <g className="slide-up" style={{ '--i': 2 }}>
        <path d={quarterArch(300, 250, 70, 112, 'tr')} fill={t.soft} />
      </g>
      <rect x="0" y="370" width={W} height="70" fill={t.soft} fillOpacity="0.45" />
      {range(8).map((i) => (
        <path key={i} className="draw" style={{ '--len': 600, '--i': i }} d={`M0 ${r2(380 + i * 8.6)}H${W}`} stroke={t.line} strokeOpacity="0.16" strokeWidth="1" fill="none" />
      ))}
      <path className="fade-in" style={{ '--i': 5 }} d="M230 370H370L486 424H346Z" fill={t.deep} fillOpacity="0.4" />
    </>
  );
}

// 2. A plan fragment: equal walls, one quarter-circle corner, a door swing, parking bays, on a grid of fine lines.
function PlanFragment({ t }) {
  const wall = { fill: 'none', stroke: t.deep, strokeWidth: 10, strokeLinejoin: 'miter' };
  const dk = t.deep === HEX.black ? t.soft : t.deep;
  return (
    <>
      <rect width={W} height={H} fill={t.ground} />
      <g stroke={t.line} strokeOpacity="0.12" strokeWidth="1" fill="none">
        {range(16).map((i) => <path key={`v${i}`} d={`M${i * 40} 0V${H}`} />)}
        {range(12).map((i) => <path key={`h${i}`} d={`M0 ${i * 40}H${W}`} />)}
      </g>
      <rect x="65" y="65" width="230" height="160" fill={t.soft} fillOpacity="0.4" />
      <rect x="305" y="65" width="230" height="160" fill={t.mid} fillOpacity="0.28" />
      <rect x="65" y="235" width="145" height="140" fill={t.soft} fillOpacity="0.22" />
      <g {...wall} stroke={dk}>
        <path className="draw" style={{ '--len': 1500, '--i': 0 }} d="M60 380V110A50 50 0 0 1 110 60H540V380Z" />
        <path className="draw" style={{ '--len': 400, '--i': 3 }} d="M300 60V230H420V380" />
        <path className="draw" style={{ '--len': 200, '--i': 4 }} d="M60 230H210" />
      </g>
      <path className="draw" style={{ '--len': 300, '--i': 6 }} d="M210 230V320A90 90 0 0 0 300 230" fill="none" stroke={t.mid} strokeWidth="3" />
      <g stroke={dk} strokeWidth="3" fill="none">
        {range(5).map((i) => <path key={i} className="draw" style={{ '--len': 120, '--i': i + 7 }} d={`M420 ${250 + i * 26}H540`} />)}
      </g>
      <g className="fade-in" style={{ '--i': 12 }}>
        <GlyphG name="car" x={456} y={282} size={44} fill={t.mid} />
      </g>
      <g className="fade-in" style={{ '--i': 13 }} fill={t.sun}>
        {[[60, 60], [540, 60], [60, 380], [540, 380], [300, 60], [300, 230]].map(([x, y]) => <rect key={`${x}-${y}`} x={x - 5} y={y - 5} width="10" height="10" />)}
      </g>
    </>
  );
}

// 3. A dune line with the sun: three ridges, a sun with a ring, the nearest ridge drawn on as a line.
function DuneSun({ t }) {
  return (
    <>
      <rect width={W} height={H} fill={t.ground} />
      <path d={quarterArch(430, 190, 90, 130, 'tl')} fill={t.soft} fillOpacity="0.35" />
      <path d={quarterArch(430, 190, 90, 130, 'tr')} fill={t.soft} fillOpacity="0.2" />
      <circle className="fade-in" style={{ '--i': 2 }} cx="430" cy="190" r="48" fill={t.sun} />
      <circle className="draw" style={{ '--len': 460, '--i': 4 }} cx="430" cy="190" r="72" fill="none" stroke={t.sun} strokeWidth="2" />
      <path d="M0 300C100 220 200 200 300 260S500 290 600 230V440H0Z" fill={t.soft} fillOpacity="0.55" />
      <path d="M0 340C120 270 260 300 360 330S520 330 600 300V440H0Z" fill={t.mid} />
      <path d="M0 395C150 355 300 385 420 402S560 385 600 372V440H0Z" fill={t.deep} />
      <path className="draw" style={{ '--len': 900, '--i': 1 }} d="M0 300C100 220 200 200 300 260S500 290 600 230" fill="none" stroke={t.line} strokeWidth="3" />
      <path className="draw" style={{ '--len': 900, '--i': 3 }} d="M0 340C120 270 260 300 360 330S520 330 600 300" fill="none" stroke={t.ground} strokeOpacity="0.7" strokeWidth="2" />
      {range(4).map((i) => (
        <path key={i} className="grow-x" style={{ '--i': i + 5 }} d={`M${360 + i * 24} ${416 + i * 6}H${600 - i * 10}`} stroke={t.soft} strokeOpacity="0.5" strokeWidth="2" fill="none" />
      ))}
    </>
  );
}

export const ILLUSTRATIONS = [
  { key: 'arch', title: 'An arch and a courtyard', note: 'Two quarter arches over one opening; the shadow falls to the lower right.', Draw: ArchCourtyard },
  { key: 'plan', title: 'A plan fragment', note: 'Equal walls, one quarter-circle corner, a door swing and bays on a fine grid.', Draw: PlanFragment },
  { key: 'dune', title: 'A dune line with the sun', note: 'Three ridges, a sun in a ring and a quarter arch of light.', Draw: DuneSun },
];

export default function Illustrations() {
  return (
    <>
      {ILLUSTRATIONS.map(({ key, title, note, Draw }) => (
        <InView key={key} className="bento bento-6">
          <div className={`span-6 ${s.illusHead}`}>
            <h3 className="t-h3">{title}</h3>
            <p className="t-small muted">{note}</p>
          </div>
          {['light', 'dark'].map((mode, m) => (
            <Reveal key={mode} delay={m * 80} className={`tile tile-flush span-3 ${mode === 'dark' ? 'tile-dark' : 'tile-beige'} ${s.illusTile}`}>
              <Art
                viewBox={`0 0 ${W} ${H}`}
                title={`${title}, on ${mode}`}
                exportName={`icons-illus-${key}-${mode}`}
                className={s.illus}
              >
                <Draw t={THEMES[mode]} />
              </Art>
              <span className={`t-label ${s.illusTag} ${mode === 'dark' ? s.darkLabel : ''}`}>{mode === 'light' ? 'On light' : 'On dark'}</span>
            </Reveal>
          ))}
        </InView>
      ))}
    </>
  );
}
