// Dashboard data: structure only. Every value is a name for a control or a count taken from the state on screen.
import { seeded } from '@/lib/charts';

export const STATUSES = ['Draft', 'In review', 'Final'];
export const pad = (n) => String(n).padStart(2, '0');

// Twelve sheet slots. Their status is a working state the visitor can change; no sheet carries a project fact.
export function makeSheets(n = 12) {
  const r = seeded(11);
  return Array.from({ length: n }, (_, i) => ({ id: i + 1, name: `Sheet ${pad(i + 1)}`, status: STATUSES[Math.floor(r() * 3)] }));
}

export const LAYERS = [
  { id: 'grid', label: 'Grid' },
  { id: 'walls', label: 'Walls' },
  { id: 'doors', label: 'Doors' },
  { id: 'parking', label: 'Car park' },
];
export const ALL_LAYERS = { grid: true, walls: true, doors: true, parking: true };

export const OPTIONS = [
  { id: 'a', name: 'Top navigation', note: 'Navigation bar over one hero chart, small tiles below.' },
  { id: 'b', name: 'Left rail', note: 'A ruled list of sheets beside a sheet preview.' },
  { id: 'c', name: 'Bento', note: 'Six tiles of unequal size.' },
  { id: 'd', name: 'Ledger', note: 'A table first, with a summary strip.' },
  { id: 'e', name: 'Split view', note: 'Plan drawing left, ruled detail rows right.' },
];
export const SCREEN_TABS = [
  { id: 'overview', label: 'Options' },
  ...OPTIONS.map((o) => ({ id: o.id, label: `Option ${o.id.toUpperCase()}` })),
  { id: 'viewer', label: 'Sheet viewer' },
  { id: 'record', label: 'Sheet record' },
];
export const NAV = [
  { label: 'Plans', icon: 'plan', to: 'viewer' },
  { label: 'Sheets', icon: 'document', to: 'record' },
  { label: 'Layers', icon: 'grid', to: 'viewer' },
  { label: 'Search', icon: 'search', to: 'd' },
];

// Filter, sort and count the sheets. cum is the running count of Final sheets along the visible numbers.
export function derive({ sheets, q, filter, sort }) {
  const needle = q.trim().toLowerCase();
  const rows = sheets.filter((s) => (filter === 'All' || s.status === filter) && (!needle || `${s.name} ${s.status}`.toLowerCase().includes(needle)));
  const dir = sort.dir === 'asc' ? 1 : -1;
  const visible = [...rows].sort((a, b) => dir * (sort.key === 'status' ? STATUSES.indexOf(a.status) - STATUSES.indexOf(b.status) || a.id - b.id : a.id - b.id));
  const counts = Object.fromEntries(STATUSES.map((st) => [st, sheets.filter((x) => x.status === st).length]));
  let run = 0;
  const cum = rows.map((x) => (run += x.status === 'Final' ? 1 : 0));
  return { rows, visible, counts, total: sheets.length, cum };
}
