// The exportable artwork of the dashboard, server-rendered: the charts, drawings, tile art and the five structures.
import Reveal from '@/components/site/Reveal';
import { ArchChart, LayerDiagram, LineChart, PlanDrawing, Thumb, TileArt } from './art';
import { OPTIONS, makeSheets, derive } from './data';
import s from './dashboard.module.css';

export default function Gallery() {
  const sheets = makeSheets();
  const d = derive({ sheets, q: '', filter: 'All', sort: { key: 'no', dir: 'asc' } });
  const items = [
    { span: 4, cap: 'Quarter-arch progress chart: one segment per sheet', art: <ArchChart final={d.counts.Final} total={d.total} exportName="dashboard-arch-chart" /> },
    { span: 8, cap: 'Line of Final sheets counted along the sheet numbers', art: <LineChart cum={d.cum} rows={d.rows} max={d.total} exportName="dashboard-line-chart" /> },
    { span: 6, cap: 'Plan drawing in four layers', art: <PlanDrawing exportName="dashboard-plan-drawing" /> },
    { span: 6, cap: 'The layers stacked', art: <LayerDiagram exportName="dashboard-layer-diagram" /> },
    { span: 6, cap: 'Tile artwork: nested quarter arches', art: <TileArt kind="arch" exportName="dashboard-tile-arch" /> },
    { span: 6, cap: 'Tile artwork: the stepped shadow', art: <TileArt kind="steps" exportName="dashboard-tile-steps" /> },
    ...OPTIONS.map((o) => ({ span: 4, cap: `Option ${o.id.toUpperCase()}: ${o.name}`, art: <Thumb kind={o.id} exportName={`dashboard-structure-${o.id}`} /> })),
  ];
  return (
    <div className="bento">
      {items.map((it, i) => (
        <Reveal as="figure" key={i} delay={(i % 3) * 80} className={`tile tile-print span-${it.span} ${s.fig}`}>
          <div className={s.figArt}>{it.art}</div>
          <figcaption className="t-small">{it.cap}</figcaption>
        </Reveal>
      ))}
    </div>
  );
}
