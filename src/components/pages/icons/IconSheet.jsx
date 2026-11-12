'use client';

import { useEffect, useRef, useState } from 'react';
import Art from '@/components/art/Art';
import Toggle, { Segmented } from '@/components/ui/Toggle';
import { CORE_NAMES, ICON_LABELS, ICON_GRID } from '@/components/site/icons';
import { HEX } from '@/lib/brand';
import { still } from '@/lib/site';
import GlyphG from './GlyphG';
import s from './icons.module.css';

const SIZES = ['16', '24', '32', '48'];

// The 32 core icons as one sheet of square cells. Each icon is its own exportable SVG on the 24 px grid.
// The size switch changes the drawn size; the ground switch changes light / dark (and the exported fill).
export default function IconSheet() {
  const [size, setSize] = useState('32');
  const [dark, setDark] = useState(false);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);

  // The signature moment: when the sheet comes into view its icons are inked in, cell after cell, along the grid.
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (still()) {
      const t = setTimeout(() => setSeen(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        setSeen(true);
        io.disconnect();
      }
    }, { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fill = dark ? HEX.beige : HEX.chocolate;
  const px = Number(size);

  return (
    <div ref={ref} className={s.sheet} data-seen={seen ? 'on' : 'off'}>
      <div className={s.sheetBar}>
        <div className={s.sheetCtl}>
          <span className="t-label" id="icons-size-label">Size in px</span>
          <Segmented id="icons-size" label="Icon size in pixels" options={SIZES} value={size} onChange={setSize} />
        </div>
        <Toggle label="Dark ground" checked={dark} onChange={setDark} />
        <p className="t-label" aria-live="polite">
          {CORE_NAMES.length} icons, {ICON_GRID.size} px grid, {ICON_GRID.stroke} px stroke, shown at {size} px
        </p>
      </div>
      <ul className={`${s.cells} ${dark ? `${s.cellsDark} on-dark` : ''}`} id="icons-sheet-cells">
        {CORE_NAMES.map((name, i) => (
          <li key={name} className={s.cell} style={{ '--i': i % 8, '--row': Math.floor(i / 8) }}>
            <span className={s.cellArt}>
              <Art
                viewBox="0 0 24 24"
                title={`Icon: ${ICON_LABELS[name]}`}
                exportName={`icons-${name}`}
                width={px}
                height={px}
                style={{ width: px, height: px }}
              >
                <g className={s.ink} style={{ '--n': i }}>
                  <GlyphG name={name} fill={fill} />
                </g>
              </Art>
            </span>
            <span className={`t-label ${s.cellName}`}>{ICON_LABELS[name]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
