'use client';

// Home options A, B and C. Each is a 1600 x 1000 artboard; the shell scales it to fit.
import Icon from '@/components/site/Icon';
import Button from '@/components/ui/Button';
import { ABOUT, LINES } from '@/lib/brand';
import { PlanDrawing, TileArt } from './art';
import { NAV, STATUSES, pad } from './data';
import { AccountChip, ArchLive, Brand, Filters, Kpi, LayerChips, LineLive, Search, StatusMark } from './parts';
import s from './dashboard.module.css';

export const Board = ({ id, tone = '', children }) => <div className={`${s.board} ${tone}`} data-screen={`dashboard-${id}`}>{children}</div>;

// A: top navigation over one hero chart that fills the screen, small tiles below.
export function ScreenA({ d }) {
  return (
    <Board id="a">
      <header className={`${s.topnav} on-dark`}>
        <Brand h={22} />
        <nav aria-label="Dashboard">
          {NAV.map((n) => <button key={n.label} type="button" className={s.navBtn} onClick={() => d.go(n.to)}><Icon name={n.icon} size={18} />{n.label}</button>)}
        </nav>
        <span className={s.grow} />
        <Search d={d} id="dashboard-a-search" />
        <AccountChip dark />
      </header>
      <section className={s.hero} aria-label="Progress">
        <div className={`${s.heroArch} slide-up`}><ArchLive d={d} /></div>
        <div className={s.heroSide}>
          <p className="t-label">Sheets</p>
          <h3 className={s.heroTitle}>{d.counts.Final} of {d.total} sheets are Final</h3>
          <div className={`${s.heroLine} slide-up`} style={{ '--i': 2 }}><LineLive d={d} /></div>
          <Filters d={d} />
        </div>
      </section>
      <div className={s.tiles4}>
        {STATUSES.map((st, i) => <div key={st} className="slide-up" style={{ '--i': i + 3 }}><Kpi label={st} value={d.counts[st]} hint="sheets" active={d.filter === st} onClick={() => d.setFilter(d.filter === st ? 'All' : st)} /></div>)}
        <div className="slide-up" style={{ '--i': 6 }}><Kpi label="Layers on" value={d.layersOn} hint={`of ${d.layerList.length}`} onClick={() => d.go('viewer')} /></div>
      </div>
    </Board>
  );
}

// B: left rail with a ruled list of sheets and a sheet preview.
export function ScreenB({ d }) {
  return (
    <Board id="b">
      <div className={s.bShell}>
        <aside className={`${s.rail} on-dark`} aria-label="Sheets">
          <Brand h={20} />
          <Search d={d} id="dashboard-b-search" />
          <ul className="rows">
            {d.visible.map((r, i) => (
              <li key={r.id} className="slide-up" style={{ '--i': Math.min(i, 14) }}>
                <button type="button" className={s.railRow} aria-current={d.sel === r.id ? 'true' : undefined} onClick={() => d.setSel(r.id)}>
                  <span className="t-num">{pad(r.id)}</span><span className="ruled-row-label">{r.name}</span><span className={s.railSt}>{r.status}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="t-small">{d.visible.length} of {d.total} sheets shown</p>
        </aside>
        <main className={s.bMain}>
          <div className={s.bHead}>
            <div><p className="t-label">Preview</p><h3 className={s.h2}>{d.cur.name}</h3></div>
            <StatusMark status={d.cur.status} />
            <span className={s.grow} />
            <Button variant="outline" size="sm" onClick={() => d.go('viewer')}>Open viewer</Button>
            <Button size="sm" onClick={() => d.go('record')}>Open record</Button>
          </div>
          <LayerChips d={d} />
          <div className={`${s.bPreview} slide-up`} style={{ '--i': 3 }}><PlanDrawing layers={d.layers} /></div>
        </main>
      </div>
    </Board>
  );
}

// C: a bento of six unequal tiles.
export function ScreenC({ d }) {
  return (
    <Board id="c">
      <div className={s.bento6}>
        <section className={`${s.t} ${s.c1} slide-up`} aria-label="Progress"><p className="t-label">Progress</p><ArchLive d={d} /></section>
        <section className={`${s.t} ${s.c2} slide-up`} style={{ '--i': 1 }} aria-label="Line"><p className="t-label">Final sheets along the numbers</p><LineLive d={d} /></section>
        <section className={`${s.t} ${s.c3} ${s.tBeige} slide-up`} style={{ '--i': 2 }} aria-label="Counts">
          {STATUSES.map((st) => <Kpi key={st} label={st} value={d.counts[st]} hint="sheets" active={d.filter === st} onClick={() => d.setFilter(d.filter === st ? 'All' : st)} />)}
        </section>
        <section className={`${s.t} ${s.c4} slide-up`} style={{ '--i': 3 }} aria-label="Plan"><p className="t-label">{d.cur.name}</p><PlanDrawing layers={d.layers} /></section>
        <section className={`${s.t} ${s.c5} slide-up`} style={{ '--i': 4 }} aria-label="Sections">
          <ul className="rows">
            {ABOUT.rows.map((r) => <li key={r.no}><button type="button" className={`ruled-row ${s.compact}`} onClick={() => d.go(r.no === '01' ? 'overview' : r.no === '02' ? 'viewer' : 'record')}><span className="t-num">{r.no}</span><span className="ruled-row-label">{r.label}</span><span className="ruled-row-plus" aria-hidden="true" /></button></li>)}
          </ul>
        </section>
        <section className={`${s.t} ${s.c6} ${s.tFlush} slide-up`} style={{ '--i': 5 }} aria-label="Artwork"><TileArt kind="arch" /><p className={s.tileLine}>{LINES.imagination.text}</p></section>
      </div>
    </Board>
  );
}
