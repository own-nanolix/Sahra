import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import { CastRectG } from '@/components/art/Mockup';
import { LINES } from '@/lib/brand';
import { WallSkyG, BrickPosterG } from './ArtPosters';
import s from './lp-home.module.css';

// m11: two posters in a dark double frame on a ribbed concrete wall. One light from the upper left, hard shadows
// to the lower right. Each poster slides into place in turn and stops.
const RIBS = Array.from({ length: 62 }, (_, i) => i);

export function PosterPairArt() {
  return (
    <Art viewBox="0 0 1120 720" title="Two posters on a ribbed wall" exportName="lp-home-poster-pair">
      <rect width="1120" height="720" fill="#D9CDBC" />
      {RIBS.map((i) => (
        <rect key={i} x={i * 18.1} y="0" width="9" height="720" fill={i % 2 ? '#CBBDA9' : '#E4D9C9'} opacity="0.7" />
      ))}
      <rect y="676" width="1120" height="44" fill="#B8A892" />
      <g className="settle" style={{ '--i': 0 }}>
        <CastRectG x={70} y={40} w={480} h={640} len={30} />
        <g transform="translate(70 40)">
          <WallSkyG idp="lp-home-pw-a" />
        </g>
      </g>
      <g className="settle" style={{ '--i': 3 }}>
        <CastRectG x={600} y={40} w={480} h={640} len={30} />
        <g transform="translate(600 40)">
          <BrickPosterG idp="lp-home-pw-b" />
        </g>
      </g>
    </Art>
  );
}

export default function PosterPair() {
  return (
    <section className={`wrap ${s.pairBand}`} aria-labelledby="lp-home-pair-h">
      <div className={s.markHead}>
        <h2 id="lp-home-pair-h" className="t-h2 t-balance">{LINES.builtAround.text}</h2>
        <p className="t-label">{LINES.imagination.text}</p>
      </div>
      <Reveal>
        <PosterPairArt />
      </Reveal>
    </section>
  );
}
