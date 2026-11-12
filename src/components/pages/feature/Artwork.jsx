// The exportable artwork of the plan explorer, set as five unequal tiles (plan, layers, two sheets, box).
import Reveal from '@/components/site/Reveal';
import { PlanArt, LayersArt, SheetArt, BoxArt } from './plan-art';
import s from './feature.module.css';

function Tile({ className, tone = 'beige', title, note, children }) {
  const ground = tone === 'dark' ? 'field-chocolate on-dark' : tone === 'studio' ? 'field-studio' : 'field-beige';
  return (
    <Reveal className={`${s.tile} ${ground} ${className}`}>
      <div className={s.tileBody}>{children}</div>
      <div className={s.tileCap} style={{ paddingBottom: 14, paddingInline: 16 }}>
        <h3 className="t-h3">{title}</h3>
        <p className="t-label">{note}</p>
      </div>
    </Reveal>
  );
}

export default function Artwork() {
  return (
    <div className={s.art}>
      <Tile className={s.tPlan} title="Plan drawing" note="SVG">
        <PlanArt />
      </Tile>
      <Tile className={s.tLayers} tone="studio" title="Layers" note="SVG">
        <LayersArt />
      </Tile>
      <Tile className={s.tBeige} tone="studio" title="Sheet on Beige" note="SVG">
        <SheetArt tone="beige" />
      </Tile>
      <Tile className={s.tDark} tone="dark" title="Sheet on Dark Chocolate" note="SVG">
        <SheetArt tone="dark" />
      </Tile>
      <Tile className={s.tBox} tone="studio" title="Closed box" note="SVG">
        <BoxArt />
      </Tile>
    </div>
  );
}
