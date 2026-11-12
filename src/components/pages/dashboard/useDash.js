'use client';

// One working state for sheets: status, search, filter, sort, layers, zoom and selection. Counts are derived live.
import { useState } from 'react';
import { ALL_LAYERS, LAYERS, STATUSES, derive, makeSheets } from './data';

export function useDash(go = () => {}) {
  const [sheets, setSheets] = useState(makeSheets);
  const [q, setQ] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState({ key: 'no', dir: 'asc' });
  const [layers, setLayers] = useState(ALL_LAYERS);
  const [zoom, setZoom] = useState(1);
  const [sel, setSel] = useState(3);
  const setStatus = (id, status) => setSheets((all) => all.map((x) => (x.id === id ? { ...x, status } : x)));
  return {
    sheets, q, setQ, filter, setFilter, sort, layers, zoom, setZoom, sel, setSel, go, setStatus,
    ...derive({ sheets, q, filter, sort }),
    cur: sheets.find((x) => x.id === sel) || sheets[0],
    layerList: LAYERS,
    layersOn: LAYERS.filter((l) => layers[l.id]).length,
    toggleSort: (key) => setSort((p) => (p.key === key ? { key, dir: p.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' })),
    toggleLayer: (id) => setLayers((p) => ({ ...p, [id]: !p[id] })),
    cycle: (id) => setSheets((all) => all.map((x) => (x.id === id ? { ...x, status: STATUSES[(STATUSES.indexOf(x.status) + 1) % STATUSES.length] } : x))),
  };
}
