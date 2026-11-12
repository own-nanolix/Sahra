'use client';

// Home options D and E, the options overview and the two inner screens.
import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import RuledRows from '@/components/ui/RuledRows';
import { PLAN } from '@/lib/brand';
import { LayerDiagram, PlanDrawing, Thumb } from './art';
import { OPTIONS, STATUSES, LAYERS } from './data';
import { AccountChip, Brand, Filters, Kpi, LayerChips, Search, SheetTable, StatusMark } from './parts';
import { Board } from './screens-a';
import { DateRange } from './controls';
import s from './dashboard.module.css';

// D: a table-first ledger with a summary strip.
export function ScreenD({ d }) {
  return (
    <Board id="d">
      <div className={s.dPad}>
        <div className={s.bHead}><Brand h={20} /><span className={s.grow} /><AccountChip /></div>
        <h3 className={s.h2}>Sheets</h3>
        <div className={s.strip} role="group" aria-label="Summary">
          <Kpi tone="flat" label="All sheets" value={d.total} hint="in the list" active={d.filter === 'All'} onClick={() => d.setFilter('All')} />
          {STATUSES.map((st) => <Kpi key={st} tone="flat" label={st} value={d.counts[st]} hint="sheets" active={d.filter === st} onClick={() => d.setFilter(d.filter === st ? 'All' : st)} />)}
        </div>
        <div className={s.toolbar}><Search d={d} id="dashboard-d-search" /><Filters d={d} /><span className={s.grow} /><DateRange id="dashboard-d-range" /></div>
        <p className="t-small" aria-live="polite">{d.visible.length} of {d.total} sheets shown</p>
        <SheetTable d={d} dense />
      </div>
    </Board>
  );
}

// E: a split view, the plan drawing left and ruled detail rows right.
export function ScreenE({ d }) {
  return (
    <Board id="e">
      <div className={s.eShell}>
        <section className={s.eLeft} aria-label="Plan">
          <div className={s.bHead}><p className="t-label">Plan</p><span className={s.grow} /><label className={s.sel}>Sheet<select value={d.sel} onChange={(e) => d.setSel(Number(e.target.value))}>{d.sheets.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></label></div>
          <div className={`${s.ePlan} slide-up`}><PlanDrawing layers={d.layers} /></div>
          <LayerChips d={d} />
        </section>
        <section className={s.eRight} aria-label="Detail">
          <h3 className={s.h2}>{d.cur.name}</h3>
          <ul className="rows">
            <li className="slide-up"><div className="ruled-row"><span className="t-num">01</span><span className="ruled-row-label">Sheet</span><span>{d.cur.name}</span></div></li>
            <li className="slide-up" style={{ '--i': 1 }}><button type="button" className="ruled-row" onClick={() => d.cycle(d.cur.id)} aria-label={`Status ${d.cur.status}. Change status`}><span className="t-num">02</span><span className="ruled-row-label">Status</span><StatusMark status={d.cur.status} /></button></li>
            <li className="slide-up" style={{ '--i': 2 }}><button type="button" className="ruled-row" onClick={() => d.go('viewer')}><span className="t-num">03</span><span className="ruled-row-label">Layers</span><span>{d.layersOn} of {d.layerList.length} on</span></button></li>
            <li className="slide-up" style={{ '--i': 3 }}><div className="ruled-row"><span className="t-num">04</span><span className="ruled-row-label">Notes</span><span><span className="ph" style={{ width: '8em' }} /></span></div></li>
            <li className="slide-up" style={{ '--i': 4 }}><div className="ruled-row"><span className="t-num">05</span><span className="ruled-row-label">Updated</span><span><span className="ph" style={{ width: '5em' }} /></span></div></li>
          </ul>
          <div className={s.actions}><Button size="sm" onClick={() => d.go('record')}>Open record</Button><Button size="sm" variant="outline" onClick={() => d.go('viewer')}>Open viewer</Button></div>
        </section>
      </div>
    </Board>
  );
}

// The options overview: five structures as thumbnails, plus the two inner screens. Click opens.
export function Overview({ d }) {
  const cards = [
    ...OPTIONS.map((o) => ({ id: o.id, label: `Option ${o.id.toUpperCase()}`, name: o.name, note: o.note, thumb: <Thumb kind={o.id} /> })),
    { id: 'viewer', label: 'Inner screen', name: 'Sheet viewer', note: 'Layers and zoom on one plan.', thumb: <PlanDrawing paper="#F5F0E3" /> },
    { id: 'record', label: 'Inner screen', name: 'Sheet record', note: 'Ruled detail rows for one sheet.', thumb: <LayerDiagram /> },
  ];
  return (
    <Board id="overview">
      <div className={s.ovPad}>
        <div className={s.bHead}><div><p className="t-label">Five structures, one content</p><h3 className={s.h1}>Choose a home</h3></div></div>
        <ul className={s.ovGrid}>
          {cards.map((c, i) => (
            <li key={c.id} className="slide-up" style={{ '--i': i }}>
              <button type="button" className={s.ovCard} onClick={() => d.go(c.id)} aria-label={`Open ${c.label}: ${c.name}`}>
                <span className={s.ovThumb}>{c.thumb}</span>
                <span className="t-label">{c.label}</span>
                <span className={s.ovName}>{c.name}</span>
                <span className="t-small">{c.note}</span>
              </button>
            </li>
          ))}
          <li className={`${s.ovText} slide-up`} style={{ '--i': 7 }}>
            <table className={s.ovCompare}>
              <caption className="t-label">The five compared</caption>
              <thead><tr><th scope="col">Option</th><th scope="col">Navigation</th><th scope="col">Leads with</th></tr></thead>
              <tbody>
                {OPTIONS.map((o) => (
                  <tr key={o.id}><th scope="row"><button type="button" className={s.ovPick} onClick={() => d.go(o.id)} aria-label={`Open option ${o.id.toUpperCase()}`}>{o.id.toUpperCase()}</button></th><td>{o.nav}</td><td>{o.lead}</td></tr>
                ))}
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </Board>
  );
}

// Inner screen: the plan sheet viewer with layers and zoom.
export function Viewer({ d }) {
  const z = d.zoom;
  return (
    <Board id="viewer">
      <div className={s.vShell}>
        <aside className={s.vSide} aria-label="Layers">
          <button type="button" className={s.back} onClick={() => d.go('overview')}><Icon name="arrow-left" size={16} />Options</button>
          <h3 className={s.h3}>{d.cur.name}</h3>
          <StatusMark status={d.cur.status} />
          <p className="t-label">Layers</p>
          <ul className={s.layerList}>
            {LAYERS.map((l) => (
              <li key={l.id}><button type="button" className={s.layerBtn} aria-pressed={!!d.layers[l.id]} onClick={() => d.toggleLayer(l.id)}><span className={s.box}>{d.layers[l.id] && <Icon name="check" size={14} />}</span>{l.label}</button></li>
            ))}
          </ul>
          <p className="t-small" aria-live="polite">{d.layersOn} of {d.layerList.length} layers on</p>
          <div className={s.vDiagram}><LayerDiagram /></div>
        </aside>
        <main className={s.vMain}>
          <div className={s.vBar}>
            <Button variant="outline" size="sm" icon="minus" label="Zoom out" onClick={() => d.setZoom(Math.max(0.5, +(z - 0.25).toFixed(2)))} />
            <output className={s.zoomOut} aria-live="polite">{Math.round(z * 100)}%</output>
            <Button variant="outline" size="sm" icon="plus" label="Zoom in" onClick={() => d.setZoom(Math.min(2, +(z + 0.25).toFixed(2)))} />
            <Button variant="ghost" size="sm" onClick={() => d.setZoom(1)}>Reset</Button>
            <span className={s.grow} />
            <Button size="sm" onClick={() => d.go('record')}>Open record</Button>
          </div>
          <div className={s.canvas}><div className={s.canvasInner} style={{ transform: `scale(${z})` }}><PlanDrawing layers={d.layers} /></div></div>
        </main>
      </div>
    </Board>
  );
}

// Inner screen: the record of one sheet, with ruled detail rows.
export function Record({ d }) {
  const rows = [
    { no: '01', label: 'Sheet', body: <p className="t-body">{d.cur.name}, {d.cur.status}.</p> },
    { no: '02', label: 'Status', body: <div className={s.actions}>{STATUSES.map((st) => <Button key={st} size="sm" variant={d.cur.status === st ? 'dark' : 'outline'} onClick={() => d.setStatus(d.cur.id, st)}>{st}</Button>)}</div> },
    { no: '03', label: 'Layers', body: <p className="t-body">{d.layersOn} of {d.layerList.length} on: {d.layerList.filter((l) => d.layers[l.id]).map((l) => l.label).join(', ') || 'none'}.</p> },
    { no: '04', label: 'Plan', body: <p className="t-body">{PLAN.text}</p> },
    { no: '05', label: 'Notes', body: <p><span className="ph" style={{ width: '16em' }} /></p> },
  ];
  return (
    <Board id="record">
      <div className={s.rShell}>
        <section className={s.rLeft} aria-label="Preview">
          <button type="button" className={s.back} onClick={() => d.go('overview')}><Icon name="arrow-left" size={16} />Options</button>
          <div className={`${s.ePlan} slide-up`}><PlanDrawing layers={d.layers} /></div>
          <LayerChips d={d} />
        </section>
        <section className={s.rRight} aria-label="Record">
          <p className="t-label">Record</p>
          <h3 className={s.h1}>{d.cur.name}</h3>
          <RuledRows id="dashboard-record-rows" rows={rows} single={false} />
        </section>
      </div>
    </Board>
  );
}
