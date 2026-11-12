import { pageMeta } from '@/lib/pages';
import Reveal from '@/components/site/Reveal';
import CountUp from '@/components/site/CountUp';
import RuledRows from '@/components/ui/RuledRows';
import Explorer from '@/components/pages/dataviz/Explorer';
import DataTable from '@/components/pages/dataviz/DataTable';
import { Loading, Empty, ErrorState } from '@/components/pages/dataviz/States';
import { Fig, Legend } from '@/components/pages/dataviz/kit';
import { StepArea, PairedBars, ChannelBars, ArchShare, RingShare, Heat } from '@/components/pages/dataviz/ChartsA';
import { Histogram, Strip, Timeline, Sankey, Place, Rank, Anchors, Angle, Scatter } from '@/components/pages/dataviz/ChartsB';
import { StatNumeral, StatWeights, StatCut, StatLedger, KpiPages, KpiYear, KpiColours, Sparklines } from '@/components/pages/dataviz/Tiles';
import { groupCounts, pageCount, blockTotal, RING_COLORS } from '@/components/pages/dataviz/data';
import s from '@/components/pages/dataviz/dataviz.module.css';

export const metadata = pageMeta('dataviz');

const RULES = [
  { no: '01', label: 'One stroke weight', body: 'Lines, rules and outlines share one weight, as every stroke of the word-mark does.' },
  { no: '02', label: 'Quarter-circle corners', body: 'Bars and arches round only with a quarter circle. The quarter arch is the share chart.' },
  { no: '03', label: 'Cut ends', body: "Where a bar is cut, it is cut on the word-mark's diagonal, never at another angle." },
  { no: '04', label: 'Thin rules, serif numerals', body: 'Axes are thin rules. Numerals are set in the serif; labels in the light grotesque.' },
  { no: '05', label: 'Say what is counted', body: 'Every chart carries a plain caption that names what it counts and where the figures come from.' },
  { no: '06', label: 'No invented figures', body: 'Where the brand publishes no figure, the marks stay quiet and carry no numbers.' },
];

const STRIP = [
  [StatNumeral, 'Counts the paragraphs of the intro slide.'],
  [StatWeights, 'Counts the four type weights printed on the type slide.'],
  [StatCut, 'The cut angle as labelled and as measured.'],
  [StatLedger, 'Counts the lines in each contact block.'],
  [KpiPages, 'Counts the pages of the site, by group.'],
  [KpiYear, 'The one printed date.'],
  [KpiColours, 'Counts the published colours.'],
];

export default function Page() {
  return (
    <section className="page" id="p-dataviz" aria-label="Data visualisation">
      <div className={`wrap ${s.hero}`}>
        <div className={s.heroGrid}>
          <h1 className={`t-display ${s.heroIn}`} tabIndex={-1}>Data visualisation</h1>
          <p className={`t-lead muted ${s.heroIn}`} style={{ '--i': 2 }}>
            Every figure here is counted in code from the case study: its text, its palette, the traced word-mark and the site&apos;s own page list. Where the brand publishes no figure, none is invented.
          </p>
        </div>
        <div className={`${s.heroLine} hair`} style={{ marginTop: 'clamp(24px, 3vw, 48px)' }} />
      </div>

      <div className="wrap">
        <section className={s.section} aria-labelledby="dataviz-charts-h">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="dataviz-charts-h">Charts</h2>
            <p className="t-small">Hover, tap or tab to a mark for its value.</p>
          </div>
          <div className="bento">
            <Fig span={7} title="Words per paragraph" caption="Counts the words of each paragraph on the intro slide and the letter. The tabs choose the series.">
              <Explorer />
            </Fig>
            <Fig span={5} title="Characters per line" caption="Counts the characters in each line of the type slide's character set. Each ring is one line, against the longest.">
              <ArchShare />
            </Fig>

            <Fig span={4} title="Running total" caption="Counts the intro slide's words added paragraph by paragraph, drawn as a stepped shadow.">
              <StepArea />
            </Fig>
            <Fig span={4} title="Intro and letter" caption="Counts words in matching paragraph positions of the intro slide and the letter. The letter has five paragraphs.">
              <PairedBars />
            </Fig>
            <Fig span={4} title="Pages by group" caption="Counts the pages of this site in each group, taken from its page list.">
              <RingShare />
              <Legend label="Groups" items={groupCounts.map((g, i) => ({ name: `${g.name}: ${g.n}`, color: RING_COLORS[i] }))} />
            </Fig>

            <Fig span={8} title="Colour channels" caption="Shows the red, green and blue values printed for each of the six palette colours.">
              <ChannelBars />
            </Fig>
            <Fig span={4} title="Red against blue" caption="Places each palette colour by its printed red and blue values, in its own colour.">
              <Scatter />
            </Fig>

            <Fig span={3} title="Export targets" caption="Counts how many pages share each minimum-export band in the site's page list.">
              <Histogram />
            </Fig>
            <Fig span={5} title="Paragraph lengths" caption="Places every paragraph of three text blocks on one words scale.">
              <Strip />
            </Fig>
            <Fig span={4} title="The cut" caption="Draws the 42 degrees printed on the construction drawing against the 45 degrees measured on the artwork.">
              <Angle />
            </Fig>

            <Fig span={5} title="Plan zones" caption="Draws the plan sheet's zones as shapes. The case study prints no areas, so there are no figures.">
              <Place />
            </Fig>
            <Fig span={7} title="Where the words sit" caption="Counts the words of each copy block of the case study, flowing into the total.">
              <Sankey />
            </Fig>

            <Fig span={5} title="Largest export targets" caption="Ranks the eight pages with the highest minimum-export count in the site's page list.">
              <Rank />
            </Fig>
            <Fig span={4} title="Anchor points" caption="Counts the anchor points in each letter of the traced word-mark.">
              <Anchors />
            </Fig>
            <Fig span={3} title="Sparklines" caption="Four counted series, each drawn small with its last value.">
              <Sparklines />
            </Fig>

            <Fig span={6} title="Scope of work, 2026" caption="Places the one printed date and the four scope-of-work steps in the order printed.">
              <Timeline />
            </Fig>
            <Fig span={6} title="Palette print values" caption="Shows the printed cyan, magenta, yellow and black values of the six colours, shaded in the palette's own tones.">
              <Heat />
            </Fig>
          </div>
        </section>

        <section className={s.section} aria-labelledby="dataviz-tiles-h">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="dataviz-tiles-h">Stat cards, KPI tiles and counters</h2>
            <p className="t-small">Four stat cards, then three KPI tiles.</p>
          </div>
          <div className={s.strip}>
            {STRIP.map(([Tile, cap], i) => (
              <Reveal key={cap} as="figure" delay={i * 60} className={s.stripItem}>
                <Tile />
                <figcaption className="t-small" style={{ padding: '10px 12px 12px' }}>{cap}</figcaption>
              </Reveal>
            ))}
          </div>
          <div className={s.counters}>
            <Reveal className={`${s.counter} tile-print`}>
              <CountUp value={String(pageCount)} className="t-figure" />
              <p className="t-small">Pages in this site, counted from its page list.</p>
            </Reveal>
            <Reveal className={`${s.counter} tile-print`} delay={80}>
              <CountUp value={String(blockTotal)} className="t-figure" />
              <p className="t-small">Words across the six copy blocks of the case study.</p>
            </Reveal>
          </div>
        </section>

        <section className={s.section} aria-labelledby="dataviz-table-h">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="dataviz-table-h">Table and chart rules</h2>
          </div>
          <div className="bento">
            <Reveal className="tile tile-print span-8">
              <h3 className="t-h3" style={{ marginBottom: 12 }}>Palette values</h3>
              <DataTable />
            </Reveal>
            <Reveal className="tile tile-print span-4" delay={80}>
              <h3 className={`t-h3 ${s.rulesHead}`}>Chart rules</h3>
              <RuledRows id="dataviz-rules" rows={RULES} />
            </Reveal>
          </div>
        </section>

        <section className={s.section} aria-labelledby="dataviz-states-h">
          <div className={s.sectionHead}>
            <h2 className="t-h2" id="dataviz-states-h">States</h2>
            <p className="t-small">Loading, empty and error, in the same tile.</p>
          </div>
          <div className="bento">
            <Loading />
            <Empty />
            <ErrorState />
          </div>
        </section>
      </div>
    </section>
  );
}
