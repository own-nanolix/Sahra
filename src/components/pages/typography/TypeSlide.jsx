import Art from '@/components/art/Art';
import { wrap } from '@/components/art/Devices';
import { CHARSET, FAMILY, GREY, PARAGRAPHS, SPECIMEN, WEIGHT_LINES } from './data';

// The type slide rebuilt as m06 (1600 x 1143, white): the family name top left, the character set top right,
// the two paragraphs and the four weights in the middle, the giant "Aa123%!" across the bottom.
// The three lighter weights are set in a darker grey than the print so that they reach 4.5:1.
export default function TypeSlide({ exportName = 'typography-slide' }) {
  return (
    <Art viewBox="0 0 1600 1143" title="Type slide: Test Tiempos Text, the character set, two paragraphs, four weights and Aa123%!" exportName={exportName}>
      <rect width="1600" height="1143" fill="#FFFFFF" />
      <g className="fade-in">
        <text className="sans" x="56" y="74" fontSize="15" fill="#000">{FAMILY}</text>
      </g>
      <g className="slide-up" style={{ '--i': 1 }}>
        {CHARSET.map((row, i) => (
          <text key={row} className="serif" x="1150" y={[77, 111, 143, 176][i]} fontSize="21" fill="#000">{row}</text>
        ))}
      </g>
      {PARAGRAPHS.map((p, k) => (
        <g key={k} className="slide-up" style={{ '--i': 3 + k }}>
          {wrap(p, 54).map((line, i) => (
            <text key={i} className="serif" x={k ? 626 : 56} y={532 + i * 16.5} fontSize="13.4" fill="#000">{line}</text>
          ))}
        </g>
      ))}
      <g className="slide-up" style={{ '--i': 5 }}>
        {WEIGHT_LINES.map((w, i) => (
          <text key={w} className="serif" x="1324" y={534 + i * 22} fontSize="17.5" fill={i ? GREY : '#000'}>{w}</text>
        ))}
      </g>
      <g className="slide-up" style={{ '--i': 7 }}>
        <text className="serif" x="40" y="1095" fontSize="404" fontWeight="500" fill="#000" textLength="1512" lengthAdjust="spacingAndGlyphs">{SPECIMEN}</text>
      </g>
    </Art>
  );
}
