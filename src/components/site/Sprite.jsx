import { ICONS } from './icons';
import { MARK_D, WORDMARK_D, MARK_W, MARK_H, WM } from '@/components/art/Mark';

// Hidden SVG sprite: the mark (#site-mark, the S, viewBox 0 0 184 201), the word-mark (#site-wordmark,
// viewBox 0 0 1420 251) and every icon (#site-icon-<name>, viewBox 0 0 24 24, filled with currentColor).
export default function Sprite() {
  return (
    <svg id="site-sprite" width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
      <defs>
        <symbol id="site-mark" viewBox={`0 0 ${MARK_W} ${MARK_H}`}>
          <path d={MARK_D} fill="currentColor" />
        </symbol>
        <symbol id="site-wordmark" viewBox={`0 0 ${WM.W} ${WM.H}`}>
          <path d={WORDMARK_D} fill="currentColor" />
        </symbol>
        {Object.entries(ICONS).map(([name, d]) => (
          <symbol key={name} id={`site-icon-${name}`} viewBox="0 0 24 24">
            <path d={d} fill="currentColor" />
          </symbol>
        ))}
      </defs>
    </svg>
  );
}
