'use client';

// The campaign board: posts as a 2 x 2 bento at the left, three tall posters at the right, a row of four 9:16
// stories, the profile on Dark Chocolate, then the two mockup plates. Every piece enters on its wrapper
// (framer-motion, the shared tokens); the artwork inside only plays CSS keyframes towards its finished state.
// "Replay" re-mounts the board with a new key and always lands finished.
import { useState } from 'react';
import { motion } from 'framer-motion';
import { tEnter, tMove } from '@/lib/motion';
import { LINES } from '@/lib/brand';
import { PostStatement, PostCard, PostHoardLeft, PostHoardRight, HoardingWide } from './Posts';
import { PosterA, PosterB, PosterC } from './Posters';
import { StoryCrop, StoryArch, StoryGrid, StoryDeboss } from './Stories';
import { ProfileCard, ProfileGrid } from './Profile';
import { MockFrames, MockFins, MockHoarding } from './Mockups';
import s from './campaign.module.css';

function Cell({ i = 0, className = '', caption, children }) {
  return (
    <motion.figure
      className={`${s.cell} ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ ...tEnter, delay: (i % 4) * 0.08 }}
      whileHover={{ y: -6, transition: tMove }}
    >
      {children}
      {caption && <figcaption className={s.cap}>{caption}</figcaption>}
    </motion.figure>
  );
}

const SIZES = [
  ['Posts', '1080 x 1080'],
  ['Posters', '1080 x 1350'],
  ['Stories', '1080 x 1920'],
  ['Hoarding', '2160 x 1080'],
  ['Profile grid', '3 x 3'],
];

function Sizes() {
  return (
    <ul className={s.sizes} aria-label="Formats">
      {SIZES.map(([name, size]) => (
        <li key={name} className="chip chip-sm">
          <span>{name}</span>
          <span className="muted">{size}</span>
        </li>
      ))}
    </ul>
  );
}

function Head({ id, title, note }) {
  return (
    <div className={s.head}>
      <h2 className="t-h2" id={id}>{title}</h2>
      <p className="t-small">{note}</p>
    </div>
  );
}

export default function Board() {
  const [run, setRun] = useState(0);
  return (
    <div className={s.board}>
      <header className={`wrap ${s.intro}`}>
        <div>
          <h1 className="t-display" tabIndex={-1}>Campaign</h1>
          <p className="t-lead muted">{LINES.refined.text}</p>
        </div>
        <button type="button" className="btn btn-outline" onClick={() => setRun((r) => r + 1)}>Replay</button>
      </header>

      <div className="wrap">
        <Sizes />
      </div>

      <div key={run}>
        <section className="wrap" aria-labelledby="campaign-h-feed">
          <Head id="campaign-h-feed" title="Posts and posters" note="Four posts, 1080 x 1080. Three posters, 1080 x 1350." />
          <div className={s.stage}>
            <div className={s.posts}>
              <Cell i={0} caption="Statement"><PostStatement /></Cell>
              <Cell i={1} caption="Card"><PostCard /></Cell>
              <Cell i={2} caption="Hoarding, photograph"><PostHoardLeft /></Cell>
              <Cell i={3} caption="Hoarding, line"><PostHoardRight /></Cell>
            </div>
            <div className={s.posters}>
              <Cell i={1} className={s.pa} caption="Poster, dark"><PosterA /></Cell>
              <Cell i={2} className={s.pb} caption="Poster, beige"><PosterB /></Cell>
              <Cell i={3} className={s.pc} caption="Poster, panel"><PosterC /></Cell>
            </div>
          </div>
          <div className={s.wide}>
            <Cell i={0} caption="The hoarding as one wide piece, 2160 x 1080"><HoardingWide /></Cell>
          </div>
        </section>

        <section className={`wrap ${s.band}`} aria-labelledby="campaign-h-stories">
          <Head id="campaign-h-stories" title="Stories" note="Four stories, 1080 x 1920." />
          <div className={s.stories}>
            <Cell i={0}><StoryCrop /></Cell>
            <Cell i={1}><StoryArch /></Cell>
            <Cell i={2}><StoryGrid /></Cell>
            <Cell i={3}><StoryDeboss /></Cell>
          </div>
        </section>

        <section className={`${s.profile} on-dark`} aria-labelledby="campaign-h-profile">
          <div className="wrap">
            <Head id="campaign-h-profile" title="Profile" note="The profile card and a grid of nine square tiles." />
            <div className={s.profileGrid}>
              <Cell i={0}><ProfileCard /></Cell>
              <Cell i={1}><ProfileGrid /></Cell>
            </div>
          </div>
        </section>

        <section className={`wrap ${s.band}`} aria-labelledby="campaign-h-mock">
          <Head id="campaign-h-mock" title="In place" note="Posters framed on a ribbed wall and on a wall of fins, and the hoarding on a street." />
          <div className={s.mocks}>
            <Cell i={0} className={s.mock} caption="Two posters in a double frame"><MockFrames /></Cell>
            <Cell i={1} className={s.mock} caption="One poster on fins"><MockFins /></Cell>
            <Cell i={2} className={s.mock} caption="The hoarding on a street"><MockHoarding /></Cell>
          </div>
        </section>
      </div>
    </div>
  );
}
