// Small scene parts shared by the four showcase scenes. Each scene is ONE <Art> SVG; these are groups inside it.
// Light comes from the upper left; hard shadows fall to the lower right, as in the designers' flat lays.
import { r2 } from '@/lib/charts';
import { CastG, SHADOW_INK } from '@/components/art/Mockup';

// a rounded rectangle as a path (for shadows and clips)
export function rr(x, y, w, h, r) {
  return `M${r2(x + r)} ${y}H${r2(x + w - r)}A${r} ${r} 0 0 1 ${r2(x + w)} ${r2(y + r)}V${r2(y + h - r)}A${r} ${r} 0 0 1 ${r2(x + w - r)} ${r2(y + h)}H${r2(x + r)}A${r} ${r} 0 0 1 ${x} ${r2(y + h - r)}V${r2(y + r)}A${r} ${r} 0 0 1 ${r2(x + r)} ${y}Z`;
}

// the wall region (above the horizon): shadows and light patches are clipped to it. id = `${idp}-wallclip`
export function WallClip({ idp, w, wallH }) {
  return (
    <clipPath id={`${idp}-wallclip`}>
      <rect width={w} height={wallH} />
    </clipPath>
  );
}

// a hard cast shadow on the wall behind an object whose outline is `d`; it lengthens like sun on a wall
export function WallCast({ idp, d, len = 26, opacity = 0.2 }) {
  return (
    <g clipPath={`url(#${idp}-wallclip)`}>
      <g className="sun-shadow">
        <CastG d={d} len={len} steps={Math.max(8, Math.ceil(len / 3))} opacity={opacity} />
      </g>
    </g>
  );
}

// the shadow a standing object throws on the surface it stands on: from its base line to the lower right
export function FloorCast({ x, y, w, len = 60, k = 0.4, opacity = 0.22 }) {
  const dx = r2(len);
  const dy = r2(len * k);
  return <path className="sun-shadow" d={`M${x} ${y}H${r2(x + w)}L${r2(x + w + dx)} ${r2(y + dy)}H${r2(x + dx)}Z`} fill={SHADOW_INK} opacity={opacity} />;
}

// window light on the wall: two hard-edged panes slanting to the lower right, clipped to the wall
export function LightPatch({ idp, x = 0, wallH, color = '#FFFFFF', opacity = 0.3, pane = 120, gap = 22, run = 0.5 }) {
  const sl = r2(wallH * run);
  const one = (x0) => `M${r2(x0)} 0h${pane}l${sl} ${wallH}h${-pane}z`;
  return (
    <g clipPath={`url(#${idp}-wallclip)`} fill={color} opacity={opacity}>
      {[0, 1, 2].map((i) => <path key={i} d={one(x + i * (pane + gap))} />)}
    </g>
  );
}

// a gloss sheen over a rounded screen; it breathes slowly (the shared mock-sheen)
export function Glass({ idp, x, y, w, h, r, opacity = 0.35 }) {
  return <path className="mock-sheen" d={rr(x, y, w, h, r)} fill={`url(#${idp}-glass)`} opacity={opacity} />;
}
