'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Art from '@/components/art/Art';
import { Contact } from '@/components/ui/Card';
import { LINES, POSTER_BODY, CONTACT_BLOCKS } from '@/lib/brand';
import { ease, dur, stagger } from '@/lib/motion';
import { HeroWallG, HeroBrickG } from './art';
import s from './lp-spaces.module.css';

// The opening: the two posters of m11 as two tall panels side by side. Left, dark: "We Build Spaces of
// Imagination", the body, the three contact blocks, the mark bottom left. Right, beige: "Built around how people
// live today", the same body, the same contacts, a tall strip of curved brick at the right.
// The printed line that names a social network is left out of the contact blocks (CONTACT_BLOCKS.online).
const BLOCKS = [CONTACT_BLOCKS.online, CONTACT_BLOCKS.service, CONTACT_BLOCKS.office];

function Poster({ dark, index, title, headingTag: H, children }) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      className={`${s.poster} ${dark ? s.posterDark : s.posterLight}`}
      initial={reduce ? false : { opacity: 0, y: 72 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.d5, ease: ease.out, delay: 0.1 + index * 0.18 }}
    >
      {children}
      <div className={s.posterBody}>
        <H className={`t-serif ${s.posterTitle}`} {...(dark ? { id: 'lp-spaces-hero-title', tabIndex: -1 } : {})}>
          {title.map((row, i) => (
            <span key={row} className={s.mask}>
              <motion.span
                style={{ display: 'block' }}
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: dur.d4, ease: ease.out, delay: 0.55 + index * 0.18 + i * stagger * 2 }}
              >
                {row}
              </motion.span>
            </span>
          ))}
        </H>
        <p className={s.posterText}>{POSTER_BODY}</p>
        <div className={s.posterContacts}>
          {BLOCKS.map((b) => <Contact key={b[0]} lines={b} />)}
        </div>
        {dark && (
          <svg className={s.posterMark} viewBox="0 0 184 201" role="img" aria-label="Sahra mark">
            <use href="#site-mark" />
          </svg>
        )}
      </div>
    </motion.article>
  );
}

export default function Hero() {
  return (
    <section className={s.hero} aria-labelledby="lp-spaces-hero-title">
      <div className={s.pair}>
        <Poster dark index={0} title={LINES.imagination.rows} headingTag="h1">
          <Art viewBox="0 0 600 840" title="A curved wall against the sky, deep shade below" exportName="lp-spaces-poster-wall" className={s.posterArt} preserveAspectRatio="xMidYMid slice">
            <HeroWallG idp="lp-spaces-pw" />
          </Art>
        </Poster>
        <Poster index={1} title={LINES.builtAround.rows} headingTag="h2">
          <Art viewBox="0 0 300 800" title="A tall strip of curved brick" exportName="lp-spaces-poster-brick" className={s.posterStrip} preserveAspectRatio="xMidYMid slice">
            <HeroBrickG idp="lp-spaces-pb" />
          </Art>
        </Poster>
      </div>
    </section>
  );
}
