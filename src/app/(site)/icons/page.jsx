import { pageMeta } from '@/lib/pages';
import Art from '@/components/art/Art';
import Reveal from '@/components/site/Reveal';
import { ICON_GRID } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import IconSheet from '@/components/pages/icons/IconSheet';
import Construction, { PixelGrid } from '@/components/pages/icons/Construction';
import RuledRows from '@/components/ui/RuledRows';
import { Colourways, UtilSheet, USAGE } from '@/components/pages/icons/Extras';
import InUse from '@/components/pages/icons/InUse';
import Illustrations from '@/components/pages/icons/Illustrations';
import GlyphG from '@/components/pages/icons/GlyphG';
import s from '@/components/pages/icons/icons.module.css';

export const metadata = pageMeta('icons');

function HeroArt() {
  return (
    <Art viewBox="0 0 280 280" title="The arch icon on its 24 px grid" exportName="icons-hero-arch">
      <rect width="280" height="280" fill={HEX.chocolate} />
      <g className="fade-in">
        <PixelGrid stroke={HEX.sand} />
      </g>
      <g className="slide-up" style={{ '--i': 2 }}>
        <GlyphG name="arch" x={20} y={20} size={240} fill={HEX.sand} />
      </g>
    </Art>
  );
}

export default function Page() {
  return (
    <section className="page" id="p-icons" aria-label="Icons and illustration">
      <div className="wrap">
        <header className={s.hero}>
          <div className={s.heroGrid}>
            <div className="stack">
              <Reveal as="p" className="t-label">The icon set</Reveal>
              <Reveal delay={60}>
                <h1 className="t-display" tabIndex={-1}>Icons and illustration</h1>
              </Reveal>
              <Reveal delay={120} as="p" className={`t-lead ${s.heroLead}`}>
                Thirty-two icons drawn the way the word-mark is drawn: one equal stroke, quarter-circle corners and free ends cut on a single diagonal, all on one {ICON_GRID.size} px grid.
              </Reveal>
            </div>
            <Reveal delay={180} from="scale" className={s.heroMark}>
              <HeroArt />
            </Reveal>
          </div>
        </header>

        <section className={s.section} aria-labelledby="icons-h-sheet">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="icons-h-sheet">The sheet</h2>
            <p className="t-body muted">Every cell is a square, every icon its own exportable SVG with a plain name. Change the size and the ground to see how the stroke holds.</p>
          </div>
          <IconSheet />
          <div className={s.section}>
            <h3 className="t-h3">Interface extras</h3>
            <p className="t-small muted" style={{ margin: '8px 0 16px' }}>Chevrons, arrows, copy, play, sort, filter and the states: same grid, same stroke.</p>
            <UtilSheet />
          </div>
        </section>

        <section className={s.section} aria-labelledby="icons-h-construction">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="icons-h-construction">Construction</h2>
            <p className="t-body muted">The rules the icons share with the word-mark, drawn on the pixel grid: key lines, the equal stroke unit x, quarter-circle corners and the diagonal cut.</p>
          </div>
          <div className="bento bento-6">
            <Reveal className="tile span-3 rows-3"><Construction name="calendar" rules={[0, 1, 2, 3]} /></Reveal>
            <Reveal delay={80} className="tile span-3 rows-3"><Construction name="arch" rules={[0, 1, 2, 3]} /></Reveal>
          </div>
        </section>

        <section className={s.section} aria-labelledby="icons-h-use">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="icons-h-use">In use</h2>
            <p className="t-body muted">A button, a ruled row from the About page, a wayfinding plaque and a contact block, set in the brand&apos;s own components and words.</p>
          </div>
          <div className="bento bento-6">
            <InUse />
          </div>
        </section>

        <section className={s.section} aria-labelledby="icons-h-colour">
          <div className={s.split}>
            <div className="stack">
              <h2 className="t-h2" id="icons-h-colour">Colour and use</h2>
              <p className="t-body muted">The icon follows the four colour versions of the word-mark: Beige on Sand, Sand on Tribal Brown, Tribal Brown on Beige, Beige on Black.</p>
              <RuledRows id="icons-usage" rows={USAGE} />
            </div>
            <Colourways icon="key" />
          </div>
        </section>

        <section className={s.section} aria-labelledby="icons-h-illus">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="icons-h-illus">Illustration</h2>
            <p className="t-body muted">Three scenes built from the quarter arch and the grid, in the palette and nothing else. Each is drawn once for a light ground and once for a dark one.</p>
          </div>
          <div className={s.illusStack}>
            <Illustrations />
          </div>
        </section>
      </div>
    </section>
  );
}
