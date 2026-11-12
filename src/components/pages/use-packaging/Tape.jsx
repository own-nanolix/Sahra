import { r2 } from '@/lib/charts';
import { DeskEdgeG, ContactShadowG, CastG } from '@/components/art/Mockup';
import { WordmarkVerticalG } from '@/components/art/Mark';
import { Scene, Roll, WordmarkRun, MarkG, poly, C } from './kit';

// Tape: two rolls on a desk (Dark Chocolate with the sand word-mark repeated; Sand kraft with the tribal-brown
// mark and "→ sahra.sa" repeated) and the strips pulled across the desk edge.

function DarkPrint() {
  return <WordmarkRun x={28} y={34} width={150} gap={34} cols={2} rows={3} rowGap={18} stagger={96} fill={C.sand} />;
}

function KraftPrint() {
  const rows = [0, 1, 2];
  return (
    <g fill={C.tribal}>
      {rows.map((i) => [0, 1].map((c) => {
        const x = 18 + c * 196 + (i % 2) * 70;
        return (
          <g key={`${i}-${c}`}>
            <MarkG x={x} y={32 + i * 62} size={24} fill={C.tribal} />
            <text className="sans" x={x + 36} y={52 + i * 62} fontSize="21" fill={C.tribal}>→ sahra.sa</text>
          </g>
        );
      }))}
    </g>
  );
}

function DeskFront({ y, w, h, top, front, idp }) {
  return (
    <g>
      <rect y={y} width={w} height={h - y} fill={front} />
      <rect y={y} width={w} height={h - y} fill={`url(#${idp}-shade-v)`} opacity="0.5" />
      <DeskEdgeG y={y} w={w} thickness={24} edge={top} />
    </g>
  );
}

export function TapeDark() {
  return (
    <Scene name="tape-dark" title="Dark Chocolate tape roll with the sand word-mark repeated, on a desk" w={800} h={1000} horizon={0.5} wall={C.sand40} floor={C.beige}>
      {(idp) => (
        <g>
          <ContactShadowG idp={`${idp}-s1`} cx={420} cy={832} rx={290} ry={20} opacity={0.3} />
          <g className="mock-place" style={{ '--i': 1 }}>
            <Roll idp={idp} k="a" cx={290} cy={610} r={210} d={[200, -62]} tape="#35241C" edge="#2B1D17" coreInk="#B58F6B" print={<DarkPrint />} len={44} />
          </g>
          <DeskFront y={912} w={800} h={1000} top="#946A4C" front="#875D41" idp={idp} />
        </g>
      )}
    </Scene>
  );
}

export function TapeKraft() {
  return (
    <Scene name="tape-kraft" title="Sand kraft tape roll with the tribal-brown mark and web address repeated, on a desk" w={800} h={600} horizon={0.46} wall={C.choc} floor={C.tribal}>
      {(idp) => (
        <g>
          <ContactShadowG idp={`${idp}-s1`} cx={420} cy={462} rx={230} ry={16} opacity={0.36} />
          <g className="mock-place" style={{ '--i': 1 }}>
            <Roll idp={idp} k="a" cx={300} cy={330} r={140} d={[146, -46]} tape="#B58F6B" edge="#A68261" coreInk="#E1D2C4" print={<KraftPrint />} len={34} />
          </g>
          <DeskFront y={520} w={800} h={600} top="#9A6E50" front="#2B1D17" idp={idp} />
        </g>
      )}
    </Scene>
  );
}

// One strip pulled from a roll, forward across the desk edge and down its front. Flat part is foreshortened.
function Strip({ idp, k, x, y0, edge, y1, wTop, wBot, tape, ink, kind, ang = 0 }) {
  const flat = poly([x - wTop / 2, y0], [x + wTop / 2, y0], [x + wBot / 2, edge], [x - wBot / 2, edge]);
  const teeth = Array.from({ length: 6 }, (_, i) => `L${r2(x + wBot / 2 - (i + 0.5) * (wBot / 6))} ${y1 + (i % 2 ? -8 : 6)}L${r2(x + wBot / 2 - (i + 1) * (wBot / 6))} ${y1}`).join('');
  const hang = `M${x - wBot / 2} ${edge}H${x + wBot / 2}V${y1}${teeth}Z`;
  const print = (h, s) => (kind === 'mark' ? (
    <g>
      <MarkG x={-12} y={12} size={24} fill={ink} />
      <text className="sans" transform="translate(6 190) rotate(-90)" fontSize="21" fill={ink}>→ sahra.sa</text>
    </g>
  ) : (
    <WordmarkVerticalG x={-14} y={h} scale={s} fill={ink} />
  ));
  return (
    <g transform={ang ? `rotate(${ang} ${x} ${edge})` : undefined}>
      <g opacity="0.22" fill="#35241C"><CastG d={flat} len={10} opacity={1} /><CastG d={hang} len={12} opacity={1} /></g>
      <clipPath id={`${idp}-${k}-f`}><path d={flat} /></clipPath>
      <clipPath id={`${idp}-${k}-h`}><path d={hang} /></clipPath>
      <path d={flat} fill={tape} />
      <g clipPath={`url(#${idp}-${k}-f)`}>
        <g transform={`translate(${x} ${y0 + 6}) scale(1 0.6)`}>{print(0, 0.1127)}</g>
        <path d={flat} fill={`url(#${idp}-shade)`} opacity="0.6" />
      </g>
      <path d={hang} fill={tape} />
      <g clipPath={`url(#${idp}-${k}-h)`}>
        <g transform={`translate(${x} ${edge + 8})`}>{print(0, 0.1127)}</g>
        <path d={hang} fill={`url(#${idp}-shade)`} opacity="0.6" />
        <rect x={x - wBot / 2} y={edge} width={wBot} height="16" fill="#000" opacity="0.2" />
      </g>
      <path d={`M${x - wBot / 2} ${edge}H${x + wBot / 2}`} stroke="#fff" strokeOpacity="0.45" strokeWidth="1.4" />
    </g>
  );
}

export function TapeStrips() {
  const edge = 436;
  return (
    <Scene name="tape-strips" title="Two printed tape strips pulled from rolls across the desk edge" w={800} h={600} horizon={0.3} wall={C.tribal20} floor={C.sand40}>
      {(idp) => (
        <g>
          <ContactShadowG idp={`${idp}-s1`} cx={210} cy={292} rx={90} opacity={0.3} />
          <ContactShadowG idp={`${idp}-s2`} cx={560} cy={292} rx={90} opacity={0.3} />
          <Roll idp={idp} k="a" cx={200} cy={236} r={62} d={[56, -18]} tape="#35241C" edge="#2B1D17" coreInk="#B58F6B" print={<WordmarkRun x={8} y={18} width={52} gap={10} cols={2} rows={2} rowGap={8} fill={C.sand} />} len={14} />
          <Roll idp={idp} k="b" cx={552} cy={236} r={62} d={[56, -18]} tape="#B58F6B" edge="#A68261" coreInk="#E1D2C4" print={<MarkGridSmall />} len={14} />
          <DeskFront y={edge} w={800} h={600} top="#946A4C" front="#875D41" idp={idp} />
          <g className="mock-place" style={{ '--i': 2 }}>
            <Strip idp={idp} k="s1" x={206} y0={296} edge={edge} y1={560} wTop={40} wBot={58} tape="#35241C" ink={C.sand} kind="wordmark" />
          </g>
          <g className="mock-place" style={{ '--i': 3 }}>
            <Strip idp={idp} k="s2" x={556} y0={296} edge={edge} y1={540} wTop={40} wBot={58} tape="#B58F6B" ink={C.tribal} kind="mark" ang={-2} />
          </g>
        </g>
      )}
    </Scene>
  );
}

function MarkGridSmall() {
  return (
    <g>
      {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <MarkG key={`${r}-${c}`} x={10 + c * 38 + (r % 2) * 18} y={6 + r * 18} size={12} fill={C.tribal} />))}
    </g>
  );
}
