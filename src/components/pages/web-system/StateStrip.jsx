import Link from 'next/link';
import Chip from '@/components/ui/Chip';
import s from './web-system.module.css';

// Link, tag and pressed tag held in rest, hover, focus-visible and active so the states read side by side.
const COLS = [
  { key: 'rest', label: 'Rest', cls: '' },
  { key: 'hover', label: 'Hover', cls: s.pHover },
  { key: 'focus', label: 'Focus-visible', cls: s.pFocus },
  { key: 'active', label: 'Active', cls: s.pActive },
];

export default function StateStrip() {
  return (
    <div className={s.strip}>
      {COLS.map((c) => (
        <div key={c.key} className={`${s.stripCol} ${c.cls}`}>
          <span className={s.colHead}>{c.label}</span>
          <Link href="/lp-contact/" className="site-url" tabIndex={c.key === 'rest' ? undefined : -1}>sahra.sa</Link>
          <Link href="/lp-process/" className="link" tabIndex={c.key === 'rest' ? undefined : -1}>Our Process</Link>
          <Chip tone="brown">Philosophy</Chip>
          <Chip pressed={c.key === 'active'} tabIndex={c.key === 'rest' ? undefined : -1}>branding</Chip>
        </div>
      ))}
    </div>
  );
}
