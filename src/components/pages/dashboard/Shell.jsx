'use client';

// The working shell: a tablist of seven screens (and the overview), each a 1600 x 1000 artboard scaled to fit.
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Tabs from '@/components/ui/Tabs';
import { tEnter } from '@/lib/motion';
import { SCREEN_TABS } from './data';
import { useDash } from './useDash';
import { ScreenA, ScreenB, ScreenC } from './screens-a';
import { Overview, Record, ScreenD, ScreenE, Viewer } from './screens-b';
import s from './dashboard.module.css';

const SCREENS = { overview: Overview, a: ScreenA, b: ScreenB, c: ScreenC, d: ScreenD, e: ScreenE, viewer: Viewer, record: Record };
const W = 1600, H = 1000;

// Scales the fixed artboard to the container's width. The scale is set inside the observer callback.
function Stage({ id, d }) {
  const box = useRef(null);
  const [k, setK] = useState(0.5);
  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([e]) => setK(e.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const Screen = SCREENS[id];
  return (
    <div ref={box} className={s.stage} style={{ height: H * k }}>
      <div className={s.artboard} style={{ transform: `scale(${k})` }}>
        <motion.div className={s.fill} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={tEnter}>
          <Screen d={d} />
        </motion.div>
      </div>
    </div>
  );
}

export default function Shell() {
  const [screen, setScreen] = useState('overview');
  // Buttons inside a screen switch screens; focus then moves to the new screen so keyboard users keep their place.
  const go = (id) => {
    setScreen(id);
    requestAnimationFrame(() => { const el = document.getElementById('dashboard-screens-panel'); if (el) el.focus({ preventScroll: true }); });
  };
  const d = useDash(go);
  const tabs = SCREEN_TABS.map((t) => ({ ...t, content: t.id === screen ? <Stage id={t.id} d={d} /> : null }));
  return <Tabs id="dashboard-screens" label="Dashboard screens" tabs={tabs} value={screen} onChange={setScreen} panelClassName={s.panel} />;
}
