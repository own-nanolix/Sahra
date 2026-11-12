// Key art in Sahra's own language: the quarter arch (the window that crops a photograph on the card, the header
// of the profile card, the rounded corner of the hoarding), the construction drawing of the word-mark (m03),
// brand gradients, paper grain, and "architecture" fills that stand in for the photographs: flat fields and
// gradients in the photo tones (a curved wall against the sky, a patch of sky seen from a court, timber, a stepped
// shadow). They are abstract shapes: never traced photographs, never people.
// Every component returns an SVG group (<g>) or <defs>; wrap in <Art> for a standalone graphic. Components that
// create gradients, clips, patterns or filters take an `idp` (id prefix): use a different one each time.
import { r2, bandPath, seeded } from '@/lib/charts';
import { WM, ANCHORS, WordmarkOutlineG } from './Mark';
import { GrainFilter } from './Mockup';

export { GrainFilter };

// Tones sampled from the photographs (not published): see SOURCE.md.
export const PHOTO = { sky: '#7FA6C4', skyPale: '#B9CCD8', wall: '#C9772E', wallDeep: '#8E4E22', timber: '#A8743F', timberLight: '#C99A63', timberDeep: '#6B4424', shade: '#2A1C15' };
// The construction drawing's own colours (m03): thin brown outlines, blue anchors, red angle lines, pink unit bars.
export const DRAWING = { line: '#8A6A55', guide: '#CDBFAE', anchor: '#1F6FE5', angle: '#E0352B', unit: '#F2B4AA', ink: '#35241C', paper: '#F5F0E3' };

// Brand gradients and textures as <defs>. Put once inside an SVG, then use:
//   fill="url(#<idp>-dusk)"     Dark Chocolate falling to near black (the folder, the poster ground)
//   fill="url(#<idp>-desert)"   pale Sand to Sand to Tribal Brown, top to bottom (desert light)
//   fill="url(#<idp>-hero)"     the profile card header: dark brown to Tribal Brown, left to right (m12)
//   fill="url(#<idp>-arch)"     the lighter brown of the quarter arch inside that header
//   fill="url(#<idp>-wall)"     a sunlit plaster wall in the photo tones
//   fill="url(#<idp>-sky)"      a clear sky, deeper at the top
//   fill="url(#<idp>-timber)"   timber in hard light
//   fill="url(#<idp>-paper)"    White to Beige paper
//   filter="url(#<idp>-grain)"  fine paper grain (apply to the coloured shape)
export function BrandDefs({ idp, grain = 0.07 }) {
  const lin = (id, x2, y2, stops) => (
    <linearGradient id={`${idp}-${id}`} x1="0" y1="0" x2={x2} y2={y2}>
      {stops.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
    </linearGradient>
  );
  return (
    <defs>
      {lin('dusk', 0.2, 1, [[0, '#4A3226'], [0.6, '#35241C'], [1, '#1E140F']])}
      {lin('desert', 0, 1, [[0, '#E1D2C4'], [0.55, '#B58F6B'], [1, '#875D41']])}
      {lin('hero', 1, 0, [[0, '#3D2A20'], [0.55, '#6B4A34'], [1, '#875D41']])}
      {lin('arch', 1, 0.3, [[0, '#5A3D2B'], [1, '#9A6B4B']])}
      {lin('wall', 0.3, 1, [[0, PHOTO.wall], [0.55, '#B0652A'], [1, PHOTO.wallDeep]])}
      {lin('sky', 0, 1, [[0, '#6F97B6'], [1, PHOTO.skyPale]])}
      {lin('timber', 1, 1, [[0, PHOTO.timberLight], [0.5, PHOTO.timber], [1, PHOTO.timberDeep]])}
      {lin('paper', 1, 1, [[0, '#FFFFFF'], [1, '#F5F0E3']])}
      <GrainFilter idp={idp} amount={grain} />
    </defs>
  );
}

// ---------- The quarter arch ----------

// A thick quarter ring. (cx, cy) is its centre; quadrant names where the band sits relative to the centre
// ('tl' = up and to the left, as on the card m10; 'tr', 'bl', 'br').
const QUAD = { tr: [0, 90], br: [90, 180], bl: [180, 270], tl: [270, 360] };
export function quarterArch(cx, cy, r, R, quadrant = 'tl') {
  const [a0, a1] = QUAD[quadrant] || QUAD.tl;
  return bandPath(cx, cy, r, R, a0, a1);
}
export function QuarterArchG({ cx = 0, cy = 0, r = 60, R = 140, quadrant = 'tl', fill = 'currentColor', ...rest }) {
  return <path d={quarterArch(cx, cy, r, R, quadrant)} fill={fill} {...rest} />;
}

// The quarter arch used as a window: whatever is drawn as children shows only through the arch (the card m10
// shows timber through it). Needs idp. Without children it shows timber in hard light.
export function ArchWindowG({ idp, cx, cy, r, R, quadrant = 'tl', children, ...rest }) {
  const id = `${idp}-arch-win`;
  const d = quarterArch(cx, cy, r, R, quadrant);
  return (
    <g {...rest}>
      <clipPath id={id}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        {children || <TimberG idp={`${idp}-tw`} x={cx - R} y={cy - R} w={R * 2} h={R * 2} />}
      </g>
    </g>
  );
}

// A rectangle with one large rounded corner: the hoarding's photograph (m16) is cut this way at bottom right.
export function cornerCut(x, y, w, h, rad, corner = 'br') {
  const R = Math.min(rad, w, h);
  if (corner === 'tr') return `M${x} ${y}H${r2(x + w - R)}A${R} ${R} 0 0 1 ${x + w} ${r2(y + R)}V${y + h}H${x}Z`;
  if (corner === 'tl') return `M${x} ${r2(y + R)}A${R} ${R} 0 0 1 ${r2(x + R)} ${y}H${x + w}V${y + h}H${x}Z`;
  if (corner === 'bl') return `M${x} ${y}H${x + w}V${y + h}H${r2(x + R)}A${R} ${R} 0 0 1 ${x} ${r2(y + h - R)}Z`;
  return `M${x} ${y}H${x + w}V${r2(y + h - R)}A${R} ${R} 0 0 1 ${r2(x + w - R)} ${y + h}H${x}Z`;
}
export function CornerCutG({ idp, x = 0, y = 0, w, h, rad, corner = 'br', children, fill, ...rest }) {
  const id = `${idp}-corner`;
  const d = cornerCut(x, y, w, h, rad, corner);
  if (!children) return <path d={d} fill={fill} {...rest} />;
  return (
    <g {...rest}>
      <clipPath id={id}>
        <path d={d} />
      </clipPath>
      <g clipPath={`url(#${id})`}>{children}</g>
    </g>
  );
}

// ---------- Architecture fills (abstract stand-ins for the photographs) ----------

// Timber in hard light: a warm field with fine vertical grain and a shaded lower right. Needs idp.
export function TimberG({ idp, x = 0, y = 0, w, h, lines = 60, ...rest }) {
  const rnd = seeded(7);
  return (
    <g {...rest}>
      <BrandDefs idp={idp} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-timber)`} />
      {Array.from({ length: lines }, (_, i) => {
        const gx = r2(x + (w * (i + rnd() * 0.6)) / lines);
        return <rect key={i} x={gx} y={y} width={r2(0.6 + rnd() * 1.4)} height={h} fill={i % 3 ? '#FFFFFF' : PHOTO.shade} opacity={r2(0.05 + rnd() * 0.08)} />;
      })}
    </g>
  );
}

// A curved wall against the sky (the left poster, m11): sky above, a plaster wall whose top edge is a long
// arc, its shaded return at the right, and the deep shadow of the court below. Needs idp.
export function CurvedWallG({ idp, x = 0, y = 0, w, h, skyline = 0.34, ...rest }) {
  const sy = y + h * skyline;
  const top = `M${x} ${r2(sy + h * 0.08)}Q${r2(x + w * 0.45)} ${r2(sy - h * 0.12)} ${r2(x + w * 0.78)} ${r2(sy - h * 0.06)}`;
  return (
    <g {...rest}>
      <BrandDefs idp={idp} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-sky)`} />
      <path d={`${top}L${r2(x + w * 0.78)} ${y + h}H${x}Z`} fill={`url(#${idp}-wall)`} filter={`url(#${idp}-grain)`} />
      <path d={`M${r2(x + w * 0.78)} ${y}H${x + w}V${y + h}H${r2(x + w * 0.78)}Z`} fill={PHOTO.shade} />
      <path d={`M${x} ${r2(y + h * 0.72)}L${r2(x + w * 0.78)} ${r2(y + h * 0.5)}V${y + h}H${x}Z`} fill={PHOTO.shade} opacity="0.82" />
    </g>
  );
}

// A patch of sky seen from inside a court (m14, m16): a dark field with a sky-coloured opening that has one
// large rounded corner, and timber walls lit along one side. Needs idp.
export function SkyPatchG({ idp, x = 0, y = 0, w, h, ...rest }) {
  const ox = x + w * 0.28, oy = y + h * 0.08, ow = w * 0.42, oh = h * 0.42;
  return (
    <g {...rest}>
      <BrandDefs idp={idp} />
      <rect x={x} y={y} width={w} height={h} fill={PHOTO.shade} />
      <path d={`M${x} ${y + h}L${r2(ox)} ${r2(oy + oh)}H${r2(ox + ow)}L${x + w} ${y + h}Z`} fill={`url(#${idp}-timber)`} />
      <path d={`M${x} ${y}L${r2(ox)} ${r2(oy)}V${r2(oy + oh)}L${x} ${y + h}Z`} fill={`url(#${idp}-timber)`} opacity="0.75" />
      <path d={cornerCut(r2(ox), r2(oy), r2(ow), r2(oh), r2(oh * 0.5), 'bl')} fill={`url(#${idp}-sky)`} />
    </g>
  );
}

// A stepped shadow (the stairs of m14 and m16): steps of light and shade falling diagonally. fill is the lit
// tone; the shadow is Dark Chocolate.
export function SteppedShadowG({ x = 0, y = 0, w, h, steps = 7, fill = PHOTO.timber, shade = '#35241C', ...rest }) {
  const sw = w / steps, sh = h / steps;
  let d = `M${x} ${y + h}`;
  for (let i = 0; i < steps; i++) d += `V${r2(y + h - sh * (i + 1))}H${r2(x + sw * (i + 1))}`;
  d += `V${y + h}Z`;
  return (
    <g {...rest}>
      <rect x={x} y={y} width={w} height={h} fill={shade} />
      <path d={d} fill={fill} />
    </g>
  );
}

// A curved brick wall (the right poster, m11): courses of brick bending with the wall. Needs idp.
export function BrickCurveG({ idp, x = 0, y = 0, w, h, courses = 34, ...rest }) {
  return (
    <g {...rest}>
      <BrandDefs idp={idp} />
      <rect x={x} y={y} width={w} height={h} fill={`url(#${idp}-timber)`} />
      {Array.from({ length: courses }, (_, i) => {
        const cy = y + (h * (i + 0.5)) / courses;
        const bend = h * 0.06 * (1 - i / courses);
        return <path key={i} d={`M${x} ${r2(cy)}Q${r2(x + w * 0.5)} ${r2(cy - bend)} ${x + w} ${r2(cy + bend * 0.4)}`} fill="none" stroke={PHOTO.shade} strokeOpacity="0.22" strokeWidth="1.2" />;
      })}
      <rect x={x} y={y} width={w} height={h} fill="#000000" opacity="0.1" />
    </g>
  );
}

// ---------- The construction drawing (m03) ----------

// The fine grid of guides behind the construction (vertical and horizontal hairlines every `step`).
export function GuideGridG({ x = 0, y = 0, w, h, step = 40, stroke = DRAWING.guide, ...rest }) {
  const nx = Math.floor(w / step), ny = Math.floor(h / step);
  return (
    <g stroke={stroke} strokeWidth="0.6" {...rest}>
      {Array.from({ length: nx + 1 }, (_, i) => <path key={`v${i}`} d={`M${r2(x + i * step)} ${y}V${y + h}`} />)}
      {Array.from({ length: ny + 1 }, (_, i) => <path key={`h${i}`} d={`M${x} ${r2(y + i * step)}H${x + w}`} />)}
    </g>
  );
}

// Where the construction diagram puts its unit bars and angle lines, in word-mark units.
export const CONSTRUCTION_MARKS = {
  guides: [WM.TOP, WM.BAR_Y, WM.XH, WM.XH + WM.X, WM.CY, WM.BAR, WM.BASE, WM.DESC],
  xBars: [[0, 32], [314, 346], [468, 500], [697, 729], [920, 955], [979, 1011], [1158, 1190], [1387, 1419.5]],
  yBars: [[304, 314, WM.BAR - 16]],
  // [x0, y0, x1, y1, label]: the construction still m03_2 prints "34°" on the Latin cuts, m03_3 "42°" on the Arabic cuts.
  angles: [[472 - 251, 251, 472 - 120, 120, '34°'], [1023 - 200, 200, 1023 - 60, 60, '42°'], [955 - 70, 70, 955 + 20, -20, '42°'], [1398 - 200, 200, 1398 - 90, 90, '42°']],
};

// The word-mark's construction: guides, the outline, anchor points, x / y unit bars and the 45° cut lines
// (labelled as printed: "34°" on the Latin cuts, "42°" on the Arabic cuts). Drawn in word-mark units and scaled to `width`. Each layer can be switched off;
// draw={true} animates it (CSS: guides draw on, anchors fade in one by one).
export function ConstructionG({ x = 0, y = 0, width = WM.W, guides = true, outline = true, anchors = true, units = true, angles = true, draw = false, ...rest }) {
  const k = width / WM.W;
  const sw = 1 / k; // one screen unit
  const M = CONSTRUCTION_MARKS;
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) scale(${r2(k * 10000) / 10000})`} {...rest}>
      {guides && (
        <g stroke={DRAWING.guide} strokeWidth={sw * 0.8}>
          {M.guides.map((gy, i) => (
            <path key={gy} d={`M-60 ${gy}H${WM.W + 60}`} className={draw ? 'draw' : undefined} style={draw ? { '--len': WM.W + 120, '--i': i } : undefined} />
          ))}
        </g>
      )}
      {units && (
        <g>
          {M.xBars.map(([a, b], i) => (
            <g key={a}>
              <rect x={a} y={WM.BASE + 12} width={b - a} height="10" fill={DRAWING.unit} />
              <text x={(a + b) / 2} y={WM.BASE + 48} fontSize="22" textAnchor="middle" fill={DRAWING.ink} className={draw ? 'fade-in' : undefined} style={draw ? { '--i': i + 8 } : undefined}>x</text>
            </g>
          ))}
          {M.yBars.map(([a, b, yy]) => (
            <g key={`y${a}`}>
              <rect x={a} y={yy} width={b - a} height="16" fill={DRAWING.unit} />
              <text x={b + 6} y={yy + 14} fontSize="22" fill={DRAWING.ink}>y</text>
            </g>
          ))}
        </g>
      )}
      {outline && <WordmarkOutlineG stroke={DRAWING.line} strokeWidth={1.2 * sw} />}
      {angles && (
        <g stroke={DRAWING.angle} strokeWidth={sw * 1.4}>
          {M.angles.map(([x0, y0, x1, y1, label], i) => (
            <g key={i}>
              <path d={`M${x0} ${y0}L${x1} ${y1}`} className={draw ? 'draw' : undefined} style={draw ? { '--len': 400, '--i': i + 4 } : undefined} />
              <text x={x0 + 14} y={y0 - 4} fontSize="20" stroke="none" fill={DRAWING.ink}>{label}</text>
            </g>
          ))}
        </g>
      )}
      {anchors && (
        <g fill={DRAWING.anchor}>
          {ANCHORS.map(([ax, ay], i) => (
            <rect key={i} x={ax - 3.5} y={ay - 3.5} width="7" height="7" className={draw ? 'fade-in' : undefined} style={draw ? { '--i': (i % 40) + 6 } : undefined} />
          ))}
        </g>
      )}
    </g>
  );
}
