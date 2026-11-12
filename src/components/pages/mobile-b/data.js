import { PROFILE } from '@/lib/brand';

// Tab bar entries: the screens the bar really opens.
export const TABS = [
  { icon: 'mail', label: 'Notifications', to: 12 },
  { icon: 'document', label: 'Reader', to: 13 },
  { icon: 'plan', label: 'Files', to: 16 },
  { icon: 'grid', label: 'Settings', to: 15 },
  { icon: 'user', label: 'Profile', to: 18 },
];

// The profile card of m12, measured on the full-size crop (896 x 716 px) and set at 334 x 267.
// The arch band: outer radius 101.4, inner 44.7 around (144.6, 127.5), its arm cut at 45°; the header is 111.1 tall.
export const PC = { w: 334, h: 267, head: 111.1, r: 37.3 };
export const PC_ARCH = 'M308.7 26.1H144.6A101.4 101.4 0 0 0 43.2 127.5H99.9A44.7 44.7 0 0 1 144.6 82.8H252Z';
// The bio broken where m12 breaks it.
const b = PROFILE.bio;
const i = b.indexOf('inspire and');
const j = b.indexOf('identity, we');
export const PC_BIO = [b.slice(0, i).trim(), b.slice(i, j).trim(), b.slice(j).trim()];
