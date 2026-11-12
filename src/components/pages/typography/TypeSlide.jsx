import Art from '@/components/art/Art';
import { HEX } from '@/lib/brand';
import { CHARSET, FAMILY, GREY, PARAGRAPH_LINES, SPECIMEN, WEIGHT_LINES } from './data';

// The type slide rebuilt as m06 (1600 x 1143, white): the family name top left, the character set top right,
// the two paragraphs (with their printed line breaks) and the four weights in the middle, the giant "Aa123%!"
// across the bottom. Positions are measured on the slide; sizes are matched to the printed line widths.
// The three lighter weights are set in a darker grey than the print so that they reach 4.5:1 (data.js).
export default function TypeSlide({ exportName = 'typography-slide' }) {
  return (
    <Art viewBox="0 0 1600 1143" title="Type slide: Test Tiempos Text, the character set, two paragraphs, four weights and Aa123%!" exportName={exportName}>
      <rect width="1600" height="1143" fill={HEX.white} />
      <g className="fade-in">
        <text className="sans" x="56" y="74" fontSize="15" fill={HEX.black}>{FAMILY}</text>
      </g>
      <g className="slide-up" style={{ '--i': 1 }}>
        {CHARSET.map((row, i) => (
          <text key={row} className="serif" x="1150" y={[78, 111, 143, 176][i]} fontSize="22.8" fill={HEX.black}>{row}</text>
        ))}
      </g>
      {PARAGRAPH_LINES.map((lines, k) => (
        <g key={k} className="slide-up" style={{ '--i': 3 + k }}>
          {lines.map((line, i) => (
            <text key={i} className="serif" x={k ? 626 : 56} y={532 + i * 16.5} fontSize="14.1" fill={HEX.black}>{line}</text>
          ))}
        </g>
      ))}
      <g className="slide-up" style={{ '--i': 5 }}>
        {WEIGHT_LINES.map((w, i) => (
          <text key={w} className="serif" x="1324" y={534 + i * 22} fontSize="17.5" fill={i ? GREY : HEX.black}>{w}</text>
        ))}
      </g>
      <g className="slide-up" style={{ '--i': 7 }}>
        <text className="serif" x="40" y="1095" fontSize="404" fontWeight="500" fill={HEX.black} textLength="1512" lengthAdjust="spacingAndGlyphs">{SPECIMEN}</text>
      </g>
    </Art>
  );
}
