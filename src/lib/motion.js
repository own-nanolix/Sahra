// Easing and duration tokens. The same values are CSS variables in app/globals.css (--ease-*, --dur-*).
// Use these with framer-motion; never use default easings.
// Personality (SOURCE.md): slow, architectural and exact. Lines draw on along the grid, shapes slide into place
// and stop without bounce, shadows lengthen like sun on a wall. No overshoot anywhere.
export const ease = {
  out: [0.22, 1, 0.36, 1],       // entering: an out-quart that settles and stops
  inOut: [0.65, 0, 0.35, 1],     // moves between states
  draw: [0.5, 0, 0.2, 1],        // lines drawing along the grid
  sun: [0.45, 0, 0.55, 1],       // slow even changes: shadows lengthening, light turning
};

export const dur = { d1: 0.14, d2: 0.24, d3: 0.48, d4: 0.9, d5: 1.6 };
export const stagger = 0.06;

// Shared transitions
export const tEnter = { duration: dur.d3, ease: ease.out };
export const tMove = { duration: dur.d2, ease: ease.inOut };
export const tChart = { duration: dur.d4, ease: ease.out };
export const tDraw = { duration: dur.d4, ease: ease.draw };
export const tSun = { duration: dur.d5, ease: ease.sun };

// Variants for a list that enters one by one: <motion.ul variants={listV} initial="hidden" animate="show">
export const listV = { hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: 0.08 } } };
export const itemV = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: tEnter } };
export const fadeV = { hidden: { opacity: 0 }, show: { opacity: 1, transition: tEnter } };
