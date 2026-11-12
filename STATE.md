# STATE: Sahra brand site

Spec: `rule/Brand-site.md` (master spec) and `rule/09-sahra.md` (this project's link and layout direction).
Owner's later instructions: `STANDING-ORDERS.md` (they override the rule files where they conflict).
The same pipeline was run first on two earlier projects (`../project-2`, `../project-3`); their fixes are applied
here from the start.

## Project facts

- Next.js 16.4.6 (App Router, Turbopack), React 19.3.0, JavaScript only. App lives in `src/app`.
- Tailwind CSS 4.3.3 through the `@tailwindcss/turbopack` loader (plain CSS only; CSS Modules keep the default
  handling) and `@import "tailwindcss"` in `src/app/globals.css`. Import alias: `@/*` -> `./src/*`.
- framer-motion ^14.12.0. playwright (dev) added for the checks. Node v22.18.0.
- Remote: `origin` = https://github.com/own-nanolix/Sahra.git, branch `main`.
- BEHANCE_URL: https://www.behance.net/gallery/246574901/Sahra
- SITE_NAME: sahra-brand-site

## Layout direction (from `rule/09-sahra.md`, section 2b)

- Mockup staging: in context: each object in a simple drawn scene (desk, wall, street, counter).
- Mockup backdrop: a flat field of one brand colour with a hard horizon line.
- Brand pages lean on: a bento grid of unequal tiles (still a different grid on every page).
- Dashboard option A is: top navigation over one hero chart; B to E are four other structures.
- Landing pages lean on: a long story scroll with visuals that stay pinned beside the text.

## Steps

- [x] 1. Check the project and the PC, tool files, `next.config` keys, `.gitignore` lines
- [x] 2. Extract the case study
- [x] 3. Study it and write `SOURCE.md`
- [x] 4. `LAYOUTS.md`, `pages.json`, shared system, 30 stub routes, `BRIEF.md`; dev server started
- [x] 5. Build team, two waves; check reports 30 of 30 `ok`
- [ ] 6. Review team; shared fixes applied
- [ ] 7. Verify in the browser; SVG export
- [ ] 8. `REPORT.md` and `README.md`
- [ ] 9. Final independent review, then one push (standing orders, points 5 and 6)

## Decisions

- The two rule files disagree on technology: `rule/09-sahra.md` describes a single HTML file; `rule/Brand-site.md`
  describes this Next.js site and says it gives everything beyond the link, site name and layout direction.
  `Brand-site.md` is followed; from `09-sahra.md` only the Behance link, the site name and section 2b apply.
- `next.config.mjs`: `cacheComponents` and `partialPrefetching` removed (they cannot be combined with
  `output: 'export'`); the Tailwind loader is limited to non-module CSS. `scripts/flatten-prefetch.mjs` runs as
  `postbuild`.
- Commits are local after every builder and fix; one push after the final review (standing orders).
- HERO_FEATURE = the plan presentation (a plan explorer). PRODUCT_OBJECT = the ring-bound presentation box with
  a plan sheet (m13).
- Fonts (step 4): serif = Source Serif 4 (variable, optical sizes) with "Test Tiempos Text" first in the stack:
  closest free match to Tiempos Text (sturdy text serif, large x-height, wedge serifs, compact width; compared on
  m06's "Aa123%!"); Newsreader is too delicate, STIX Two Text too Times-like. Sans = Inter Tight (300/400/500):
  matches the tight, light grotesque of m02, m05, m12 better than Instrument Sans or Hanken Grotesk.
- No other company's name on any page (standing orders, point 4): the printed contact line
  "linkedin.com/company/sahra" is left out everywhere, the profile card (m12) is drawn without a platform's
  verified tick or logo, and the tools and publishing platform are not named. The designers are credited by the
  names shown on the case study page.
- The case study has one phone screen, no prices, statistics, project names or testimonials. Product pages are
  extensions: they use the case study's own lines, labels ("Philosophy", "Our Process", "Our Vision"), contacts
  and palette; everything else is a quiet placeholder.

## Decisions made in step 4

- Landing ids: lp-home, lp-philosophy, lp-process, lp-vision, lp-spaces, lp-plans, lp-contact (the About page's
  three rows, the posters' spaces, the plan presentation, the contacts). Feature page title: "Plan explorer".
- The word-mark is traced from m04 at full size and rebuilt from m03's rules (`src/components/art/Mark.jsx`):
  stroke 32, tall cut stems 35, radii 72.5 / 40.5 and 54 / 22, cuts at 45° as measured (m03 labels them "42°";
  construction diagrams keep the printed label). Pixel diff against m04: 2.5 % of inked pixels, all edge pixels.
- The sand folder (m01) shows the whole word-mark cropped, not the Arabic half: `WordmarkCropG` reproduces it;
  `ArabicG` / `LatinG` still give each half alone. SOURCE.md corrected.
- Page ground Beige. Sand on Beige fails for small text (2.6:1): small sand text uses --sand-ink #7A5A3F.
  Tribal Brown passes on Beige (5.0:1); Sand passes on Dark Chocolate (5.0:1).
- Icons are filled outlines (not strokes) so free ends can be cut on the word-mark's diagonal.
- The starter `src/app/layout.js` and `src/app/page.js` were removed (layout.jsx replaces the first; "/" lives in
  `(site)/page.jsx`); the starter `favicon.ico` was overwritten with the mark tile.

## Dev server

http://localhost:3104 (start with `npx next dev -p 3104`; stop it before `npm run build`)

## Log

- Step 1 done: baseline build passed; tools from spec section 16, config, gitignore, playwright.
- Steps 2 and 3 done: 16 images in reference/ (headed Chrome), stills cut from the animation, SOURCE.md written.
- Step 4 done: LAYOUTS.md, pages.json, shared system, 30 stub routes, BRIEF.md. Lint clean, build passes, check
  lists 30 stubs and "/". The dev server is not left running (the lead starts it for the build team).
- Step 5 started: wave 1 launched (B1 to B12, Sonnet). If a session ends here, trust only `npm run build` and `node tools/check.mjs`.
- Wave 1 done: 12 builders, 17 pages, each committed locally; lint clean, build passes, check 17 of 30 ok; every page is over 700 lines. Shared fix: the landing nav fits at phone width (brand shrinks, links wrap). Wave 2 launched (B13 to B24, Sonnet).
- Wave 2 done: 12 builders, 13 pages, each committed locally. Lint clean, build passes, check --strict 30 of 30 ok; no page under 650 lines, so no page was sent back. Step 6 started: 8 reviewers launched (Opus).

## Pending shared fixes from the review round (lead applies once all 8 reviewers are back)

- R2, `src/components/site/icons.js`: replace these seven icon lines:
  - `key: ring(8, 12, 4) + line([[12, 12], [21, 12]], C) + line([[15, 12], [15, 16.5]], C) + line([[19, 12], [19, 15]], C),`
  - `wall: rect(3, 5, 18, 14) + line([[3, 12], [21, 12]]) + line([[12, 5], [12, 12]]) + line([[8, 12], [8, 19]]) + line([[16, 12], [16, 19]]),`
  - `ruler: rect(3, 7, 18, 10) + [7, 12, 17].map((x, i) => line([[x, 7], [x, i % 2 ? 13 : 11]], C)).join(''),`
  - `download: line([[12, 3], [12, 15]], CS) + line([[6.5, 9.5], [12, 15], [17.5, 9.5]]) + line([[4, 21], [20, 21]], CB),`
  - `house: line([[3, 11.5], [12, 3.5], [21, 11.5]]) + line([[5, 9.7], [5, 21], [19, 21], [19, 9.7]]) + line([[10, 21], [10, 15], [14, 15], [14, 21]]),`
  - `car: line([[4.5, 16], [3, 16], [3, 11.5], [6.5, 10.5], [8.5, 6], [15.5, 6], [17.5, 10.5], [21, 11.5], [21, 16], [19.5, 16]]) + line([[10.5, 16], [13.5, 16]]) + ring(7.5, 17, 2) + ring(16.5, 17, 2),`
  - `grid: rect(4, 4, 6, 6) + rect(14, 4, 6, 6) + rect(4, 14, 6, 6) + rect(14, 14, 6, 6),`
- R2, `ConstructionG` (art/KeyArt.jsx): m03_2 prints "34°" on the Latin cuts; only the Arabic cuts are labelled "42°". It currently prints "42°" on all. Check the frame and correct.
- R5, `src/components/art/Devices.jsx` `ScreenAboutG`: take the measured values now in `src/components/pages/lp-home/ArtHeader.jsx` (`SCREEN`: word-mark 152 wide, headline 31/35, five-line paragraph, rows 99 apart).
- R5, `globals.css`: `.btn:active` turns `.btn-beige` chocolate on chocolate; add `.btn-beige:active { background: var(--sand-20) }`.
- R4 also asks to update `ScreenAboutG`, but its measurements of the same screen (m12) differ from R5's: R4 has 24 px margins, word-mark 160 wide, 34 px headline, rows 99 px apart from 488 px, no status bar; R5 has word-mark 152 wide, headline 31/35. The lead must re-measure m12 once and make ScreenAboutG, mobile-a screen 1 and the lp-home phone screen agree.
