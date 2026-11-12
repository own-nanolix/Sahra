import { ICONS } from '@/components/site/icons';

// An icon as a plain filled path inside a larger SVG, so every export is standalone (no <use> of the sprite).
// Put an animation class on a wrapping <g>, never on this path: it carries a transform attribute.
export default function GlyphG({ name, x = 0, y = 0, size = 24, fill = 'currentColor', ...rest }) {
  const k = size / 24;
  return <path d={ICONS[name]} transform={`translate(${x} ${y}) scale(${k})`} fill={fill} {...rest} />;
}
