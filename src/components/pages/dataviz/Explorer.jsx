'use client';

import { useState } from 'react';
import Tabs from '@/components/ui/Tabs';
import { TrendChart } from './ChartsA';
import { Legend, C } from './kit';
import { introWords, letterWords } from './data';
import s from './dataviz.module.css';

const SER = {
  intro: { name: 'Intro slide', color: C.chocolate, values: introWords },
  letter: { name: 'Letter', color: C.tribal, values: letterWords },
};
const CAPTION = {
  intro: 'Counts the words in each of the six intro-slide paragraphs.',
  letter: 'Counts the words in each of the five letter paragraphs.',
  both: 'Counts the words per paragraph of the intro slide and the letter, side by side.',
};

// The hero trend: tabs pick the series; the legend names them; marks answer to hover and keyboard focus.
export default function Explorer() {
  const [tab, setTab] = useState('intro');
  const chart = (ids, name) => (
    <TrendChart series={ids.map((k) => SER[k])} exportName={`dataviz-trend-${name}`} title={`Words per paragraph: ${ids.map((k) => SER[k].name).join(' and ')}`} />
  );
  return (
    <div className={s.explorer}>
      <Tabs
        id="dataviz-trend"
        label="Series"
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'intro', label: 'Intro slide', content: chart(['intro'], 'intro') },
          { id: 'letter', label: 'Letter', content: chart(['letter'], 'letter') },
          { id: 'both', label: 'Both', content: chart(['intro', 'letter'], 'both') },
        ]}
      />
      <Legend label="Series" items={tab === 'both' ? Object.values(SER) : [SER[tab]]} />
      <p className="t-small">{CAPTION[tab]}</p>
    </div>
  );
}
