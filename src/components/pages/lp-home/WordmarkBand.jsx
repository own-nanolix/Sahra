import Art from '@/components/art/Art';
import { WordmarkG, WM } from '@/components/art/Mark';
import { CONSTRUCTION_MARKS, DRAWING } from '@/components/art/KeyArt';
import { LINES } from '@/lib/brand';
import InView from './InView';
import s from './lp-home.module.css';

// The word-mark on its grid: the guides draw on along the page, then each letter slides into place and stops.
export function WordmarkArt() {
  return (
    <Art viewBox="-40 -30 1500 330" title="Word-mark set on its guides" exportName="lp-home-wordmark-grid">
      <g stroke="#B58F6B" strokeWidth="0.8" fill="none">
        {CONSTRUCTION_MARKS.guides.map((gy, i) => (
          <path key={gy} d={`M-40 ${gy}H1460`} className="draw" style={{ '--len': 1500, '--i': i }} />
        ))}
      </g>
      <g stroke="#B58F6B" strokeWidth="0.8" fill="none">
        {[0, 710, 1420].map((gx, i) => (
          <path key={gx} d={`M${gx} -30V300`} className="draw" style={{ '--len': 330, '--i': i + 2 }} />
        ))}
      </g>
      <WordmarkG x={0} y={0} width={WM.W} fill="#875D41" pieceClass="settle" />
      <g className="fade-in" style={{ "--i": 9 }}>
        <rect x="0" y="236" width={WM.X} height="10" fill={DRAWING.unit} />
        <text x="0" y="276" fontSize="22" fill="#7A5A3F" className="sans">x</text>
      </g>
    </Art>
  );
}

export default function WordmarkBand() {
  return (
    <section className={`wrap ${s.markBand}`} aria-labelledby="lp-home-mark-h">
      <div className={s.markHead}>
        <h2 id="lp-home-mark-h" className="t-line t-balance">{LINES.imagination.text}</h2>
        <p className="t-label">Word-mark construction</p>
      </div>
      <InView>
        <WordmarkArt />
      </InView>
    </section>
  );
}
