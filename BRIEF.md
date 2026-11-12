# BRIEF: how to build a page of the Sahra brand site

You are building pages of a 30-page brand site for **Sahra** (client: Sahra Development), a real estate company
in Riyadh, Saudi Arabia, from a Behance case study by **FAST Studio and Ninety Three©** (owners as shown:
FAST Studio, Ninety Three©, Hessein Yousef, Mohamed Sanad). The designers are the audience: they must recognise
their own work on every page and see what a partner adds. **Reproduce what they made; do not redesign it. Then
extend it generously, in their language.**

Read first, in this order: this file, `SOURCE.md` (all copy, palette, shapes, the image index), your lines in
`LAYOUTS.md`, then `src/app/globals.css`, `src/lib/*.js` and the files in `src/components/site`,
`src/components/ui`, `src/components/art`. Do not read `out/`, `.next/` or `node_modules/`.

The project is Next.js 16 (App Router), React 19, **JavaScript only** (`.jsx`, no TypeScript), Tailwind v4 plus
plain CSS and CSS Modules, framer-motion 14. The app lives in `src/`. Import alias: `@/` = `src/`.

## Language

**The site's own words (headings that name deliverables, labels, captions, controls) are English. Brand copy is
quoted exactly as the designers wrote it** (it is English too), with its spellings: "Sahra Developement" on the
letter and the plan sheet, "Abdelazez Faysal", "behavior". **The Arabic half of the word-mark is artwork, never
typed text**: never write Arabic characters in the site; use `WordmarkG` / `ArabicG`.

## The brand in two sentences (our words, from this case study only)

Sahra treats real estate as careful architecture for living, not a transaction: every space is drawn with
intention, the way its word-mark is drawn on a grid of equal strokes and exact cuts. It turns the desert's own
tones and hard light into calm, refined places, joining Arabic and Latin, heritage and modern life, in one line.

Look and feel: quiet, warm and architectural. Grounds of Beige, Dark Chocolate and Tribal Brown; Sand for the
mark and small accents; Black for the strongest statements (m14). Headlines in a text serif, sentence case,
tight leading, broken into two or three short lines; small text in a light grotesque; contacts set very small in
stacked blocks of three lines; "→ sahra.sa" as the sign-off. Lots of empty space. Print pieces are square, with
the word-mark blind-debossed into brown board; digital cards have a large radius. The secondary graphic is **the
quarter arch** (a thick quarter ring: the window on the card, the header of the profile card, the rounded corner
of the hoarding). Photographs are warm architecture in hard light; we never reproduce them: we draw flat fields
and gradients in their tones. Motion is slow and exact: lines draw on along the grid, shapes slide into place and
stop, shadows lengthen like sun on a wall. No bounce anywhere.

## Rules that cannot be broken

1. **Do not redesign.** Where the case study shows something, reproduce it exactly: copy verbatim, colours,
   layout, proportions and shapes. Measure from the reference images.
2. **Extend generously, only in the designers' language.** Same palette, the two type voices, the word-mark's
   geometry (one stroke, quarter-circle corners, cut ends on the same diagonal), the quarter arch, the ruled
   rows, the contact blocks. Mark nothing as "new" in the interface.
3. **Invent no facts.** The case study contains **no prices, statistics, project or development names, unit
   counts, areas, testimonials, dates (other than 2026) or people (other than the card's "Abdelazez Faysal,
   Interior Designer")**. Never invent any. Where a deliverable needs such facts, use the brand's own words
   (`LINES`, `ABOUT`, `INTRO`, `POSTER_BODY`, `PLAN`, `LETTER`, `SCOPE`, `SHEET`, the palette, the contacts) or a
   **quiet placeholder** (`<Placeholder />`, class `ph`, or a pale bar in SVG). Product UI is therefore mostly
   structure: labelled areas, placeholder rows, and controls that work. Plain English labels that only name a
   deliverable or a control are allowed ("Clear space", "Front", "Back", "Search", "Sort"). Report every word or
   value that is your own.
4. **No other company's name, address, product names or copyright on any page**: use neutral placeholders. Do
   not print "linkedin.com/company/sahra", any social platform or tool name, or a platform's verified tick.
   Keep "@sahra.official", "@sahrarealestate" and "www.sahra.sa".
5. **The deliverable list is a checklist, not a design.** How things look and are named comes from this brand's
   case study only. Do not borrow concepts, compositions, headings or copy from other brand systems.
6. **All assets are code.** Inline SVG (JSX) and CSS only. No `<img>`, no `next/image`, no raster files, no
   base64, no external URLs, no icon or chart libraries, no new packages. The case study's photographs and the
   people in them (the jacket, the hand holding the phone, the portrait badges) are **never reproduced and never
   drawn**: use the architecture fills (`CurvedWallG`, `SkyPatchG`, `TimberG`, `BrickCurveG`, `SteppedShadowG`),
   a brand gradient or a flat field. There are no portraits anywhere: show a person only by name in text.
7. **One site, 30 routes.** Your page is `/<id>/`. Links to other pages are `<Link href="/<id>/">` from
   `next/link` (always with the trailing slash). Never use plain `#anchor` links; scroll with JS instead. No
   server features.
8. **One system.** Use the shared tokens, classes and components listed below. Never redefine or edit them.
   Anything missing is built inside your own folder and reported.
9. **Motion is a headline feature.** framer-motion and CSS with the shared tokens from `@/lib/motion` (JS) or
   `--ease-*` / `--dur-*` (CSS). Never default easings, never overshoot. Every page has a designed entrance,
   scroll reveals (the shared `Reveal`: opacity and transform only) and at least one signature animated moment
   (the word-mark drawing on along its guides, the S assembling from its two halves, a shadow lengthening, the
   quarter arch filling, a box lid opening). Every interactive element has hover, focus-visible and active
   states. Animate `transform` and `opacity` where possible. Animations always land on their final value, also
   when interrupted or when the page is left and re-entered. `prefers-reduced-motion` is honoured (the shared CSS
   shortens CSS animations; in JS use `still()`).
10. **Minor accessibility fixes only.** Small text (under 24 px) must reach 4.5:1. **Sand on Beige is 2.6:1 and
    fails**: small sand-coloured text on Beige or White uses `var(--sand-ink)`; large type and artwork keep Sand.
    Tribal Brown on Beige passes (5.0:1). Small secondary text is `var(--muted)` on light grounds and
    `var(--beige-muted)` on Dark Chocolate and Black; Sand on Dark Chocolate passes (5.0:1). Real `<button>` and
    `<a>`; keyboard support for every interactive module (use the shared `Tabs`, `Toggle`, `Segmented`,
    `RuledRows`); meaningful SVG gets `role="img"` and `aria-label`, decorative SVG gets `aria-hidden="true"`
    (the `Art` wrapper does this); screen-reader labels use real names. No horizontal page scroll from 1920 px
    down to 390 px: grid columns are `minmax(0, 1fr)`, wide SVGs scale with `width: 100%`, wide tables sit in an
    `overflow-x: auto` wrapper.
11. **Everything graphic exports as SVG.** Every logo variant, swatch sheet, gradient, texture, icon,
    illustration, chart, social post, poster, device frame, product and mockup is its own inline `<svg>`:
    - Use `<Art viewBox title exportName>`: it adds `viewBox`, `<title>` first, the role and `data-export`.
      `exportName` is `<page id>-<name>`: lower-case letters, digits and hyphens, unique across the site.
    - Geometry lives in attributes (`d`, `x`, `width`, `transform`, ...), never in CSS. An SVG `transform`
      attribute and a CSS transform animation must not sit on the same element: put the animated class on an
      inner `<g>`. Paint may come from CSS classes and tokens. In JSX use camelCase SVG attributes and `href`.
    - Inside an exportable SVG animate with **CSS keyframes only**, playing *from* a start state *towards* the
      base style (`animation-fill-mode: both`), so that with animation off the SVG is complete. The shared classes
      `draw`, `rise`, `grow-x`, `fade-in`, `slide-up`, `settle`, `mark-top`, `mark-bottom`, `mock-place`,
      `mock-lit`, `mock-sheen`, `sun-shadow` are built this way. framer-motion may move a wrapper *around* an SVG,
      never the artwork inside it.
    - No `<foreignObject>`, no HTML inside the SVG, no CSS `background` or pseudo-element standing in for
      artwork. Gradients, clips, masks, filters and textures are SVG `<defs>`.
    - Text inside artwork is SVG `<text>`: add `className="serif"` for the headline voice (it maps to the brand
      serif stack) or `className="sans"` for the text voice.
    - A mockup is one SVG: backdrop, scene, shadows, object, materials, shading and the brand artwork.
    - Interactive UI (dashboards, mobile screens, landing pages) is built as React components. Inside it every
      icon, chart, illustration and device frame still follows this rule, and each full screen has a fixed-size
      artboard root marked `data-screen="<name>"`.
    - An exportable SVG must not be nested inside another SVG, and must not be inside a `<button>` or `<a>`.

## Page format

You own `src/app/(site)/<id>/` and `src/components/pages/<id>/` for your page ids, and nothing else.

```jsx
// src/app/(site)/<id>/page.jsx  (server component: no 'use client' here, so it can export metadata)
import { pageMeta } from '@/lib/pages';
import Demo from '@/components/pages/<id>/Demo'; // interactive parts are client components
import s from '@/components/pages/<id>/<id>.module.css';

export const metadata = pageMeta('<id>');

export default function Page() {
  return (
    <section className="page" id="p-<id>" aria-label="<Page title>">
      <h1 tabIndex={-1}>…</h1>
      …
    </section>
  );
}
```

- The page root is that `<section>`. **Remove `data-stub`.** Keep `id="p-<id>"` and the `aria-label`.
- Page-only styles live in `src/components/pages/<id>/<id>.module.css` (`import s from './<id>.module.css'`, then
  `s.name`; keyframes named `<id>-xxx`) or in Tailwind classes that use the shared tokens (`bg-beige`,
  `text-tribal`, `bg-chocolate`, `text-muted`, `font-serif`, ...). No global CSS from pages. In CSS Modules
  never write a bare element or `:root` selector; start from a class.
- **Every id**, including SVG gradient, filter, clip-path, mask and pattern ids, starts with `<id>-` and is
  unique within the page. Shared art that takes `idp` gets a different `idp` each time, starting with `<id>-`.
  The shared `Tabs`, `Field`, `Segmented` and `RuledRows` take an `id` prop: it must start with `<id>-` too.
- Exactly one `<h1>` per page, then ordered `h2` / `h3`.
- Repetitive SVG (bars, rows, ribs, grids, colourways, repeated objects) is generated with `.map()` and small
  functions, never hand-typed.
- Server and browser must render the same markup: no `Math.random()` or `Date.now()` in render. Use
  `seeded(n)` from `@/lib/charts`. Round computed coordinates (`r2()`).
- 600 to 1,600 lines per page in total across its files. Split big pages into several component files.
- Create files with the Write tool, not shell heredocs (they break on backslashes and apostrophes here).
- Do not edit anything outside your folders. Never run `npm run build` / `next build`. Never start a server.
- Check with `npx eslint "src/app/(site)/<id>" "src/components/pages/<id>"` and fix every error. The lint rules
  are strict (React Compiler): do not call `setState` synchronously inside `useEffect` (set it in an event
  handler, a timer, an observer callback or `requestAnimationFrame`); do not read or write `ref.current` during
  render; do not wrap callbacks in `useCallback` / `useMemo` by hand; write `{'//'}` for a literal `//` in JSX
  text and `&apos;` or `{"…"}` for apostrophes and quotes in JSX text.
- Look at your page on the shared dev server **http://localhost:3104** (also in `STATE.md`): run
  `node tools/audit.mjs --base=http://localhost:3104 <id>` (fix overflow at 390 px, low contrast, unnamed
  controls, SVGs without role, duplicate ids, console errors) and
  `node tools/export-svg.mjs --dry --base=http://localhost:3104 <id>` (zero warnings wanted). Screenshots: open
  the page, **wait 1.5 s** after load (so scroll reveals are armed), then **scroll slowly** to the bottom in
  steps of about 600 px with a short pause each, then back to the top, before a full-page capture.

## Tokens (CSS variables in `globals.css`; the same names work as Tailwind colours: `bg-chocolate`, `text-sand`)

| Token | Value | Use |
|---|---|---|
| `--black` | `#000000` | Black: the strongest grounds (m14, colour version 4) |
| `--chocolate` | `#35241c` | Dark Chocolate Brown: folders, envelopes, bags, the word-mark ground (m04), footers |
| `--tribal` | `#875D41` | Tribal Brown: board (book, notebook, box), the primary button, small accent text on Beige |
| `--sand` | `#B58F6B` | Sand: the mark and word-mark on dark grounds; large type only on light grounds |
| `--beige` | `#F5F0E3` | Beige: the page ground; type on dark grounds |
| `--white` | `#FFFFFF` | White: letterhead, cards, the plan sheet |
| `--tribal-80/60/40/20`, `--sand-80/…`, `--beige-80/…` | see `globals.css` | The published tints (m05) |
| `--studio` `--photo-wall` `--photo-sky` `--photo-timber` | `#F7F3EA` `#C9772E` `#7FA6C4` `#A8743F` | Sampled: flat-lay ground, photo tones |
| `--ink` `--muted` `--sand-ink` `--beige-muted` `--error-ink` | `#1E140F` `#5C4A3E` `#7A5A3F` `#CDBBA6` `#A3301E` | Small-text inks (rule 10); red for errors only |
| `--r-print` `--r-btn` `--r-card` `--r-card-sm` | 0, 8 px, 32 px, 18 px | Print square; buttons; digital cards |
| `--ease-out` `--ease-in-out` `--ease-draw` `--ease-sun` | see `globals.css` | Entering; moves; lines drawing; slow light |
| `--dur-1` … `--dur-5` | 140, 240, 480, 900, 1600 ms | Hover; small; standard; draws and charts; sun and the mark |

Hex values for SVG attributes are in `HEX`, `PALETTE` and `TINTS` from `@/lib/brand`, and `SCENE` from
`@/components/art/Mockup`.

## Fonts

- **Serif (headlines, brand lines, labels of rows):** the brand face is *Test Tiempos Text* (commercial). We load
  **Source Serif 4** (variable, with optical sizes) through `next/font/google`; the stack is `"Test Tiempos Text",
  Source Serif 4, Georgia, serif` (`var(--font-serif)`, Tailwind `font-serif`). Chosen because it matches
  Tiempos Text's sturdy text-serif build: large x-height, firm wedge serifs, compact width and calm contrast
  (compare the "Aa123%!" of m06); Newsreader is more delicate and STIX Two Text more Times-like.
- **Sans (body, contacts, small labels):** the case study's grotesque is unnamed; we load **Inter Tight** (300,
  400, 500), whose tight spacing matches the slightly tight, light body text of m02, m05 and m12
  (`var(--font-sans)`, the default).

## Classes (`globals.css`)

- Headline voice (serif, sentence case, tight leading): `t-display`, `t-h1`, `t-h2`, `t-h3`, `t-line` (a brand
  line), `t-figure`, `t-specimen` (the giant "Aa123%!"), `t-serif`.
- Text voice: `t-lead`, `t-body`, `t-justify` (the intro slide's justified body), `t-small`, `t-label`
  ("About Sahra", "HEX"), `t-num` ("01" in the rows), `muted`, `sand-ink`, `tribal`, `t-center`, `t-right`,
  `t-balance`.
- Contacts and address: `contact` (an `<address>` of stacked short lines), `contact-group` (blocks side by
  side), `site-url` ("→ sahra.sa": the arrow is drawn by CSS; on dark grounds it turns Sand).
- Grounds: `on-dark` (Beige type, muted inks switch), `on-brown`; fields `field-beige|white|studio|sand|tribal|
  chocolate|black`; photo stand-ins `field-dusk`, `field-wall`, `field-timber`, `field-desert`; `grain`.
- Layout: `page`, `wrap`, `wrap-narrow`, `band`, `stack`, `stack-lg`, `row`, `grid` with `cols-2|3|4|6|12`,
  `hair` (thin rule), `title-rule` (the intro slide's vertical rule left of a title), `sr-only`.
- **Bento (brand pages):** `bento` (12 columns), `bento-8`, `bento-6`; tiles `tile` with `tile-print` (square),
  `tile-flush` (no padding), `tile-dark|brown|sand|black|beige|line`; spans `span-1` … `span-12`, `rows-1` …
  `rows-4`; at 900 px tiles go full width unless `span-m-2|3|4`, at 600 px unless `span-s-1`.
- **Story scroll (landing pages):** `story` (two columns; set `--story` for the ratio, e.g.
  `style={{ '--story': '5fr 7fr' }}`), `story-right` (pinned visual on the right), `story-pin` (sticky visual),
  `story-steps` (the scrolling text), `story-step`.
- Surfaces: `card` (white, large radius), `card-beige`, `card-dark`, `card-print` (square, hard shadow),
  `card-board` (Tribal Brown board), `card-line`, `card-head`, `card-hero` (the profile header gradient).
- Chips: `chip`, `chip-sm`, `chip-brown|dark|sand|beige`; placeholder: `ph`.
- Buttons: `btn` (Tribal Brown with Beige text), `btn-black` (white text, as "Follow"), `btn-dark`, `btn-beige`,
  `btn-outline`, `btn-ghost`, `btn-url` (adds "→" before the label), `btn-sm`, `btn-lg`, `btn-block`, `btn-icon`;
  links: `link`.
- Ruled rows (m12): `rows` (a `<ul>`), `ruled-row` (number, serif label, "+"), `ruled-row-label`,
  `ruled-row-plus`, `ruled-row-body`.
- Controls: `tabs` / `tab` / `tabpanel` (`tabs-dark`), `toggle`, `fieldset`, `input`.
- Devices (HTML): `device device-phone|tablet|laptop|monitor|watch`, `device-screen`, `screen-fit`.
- Landing: `lp-nav`, `lp-brand`, `lp-links`, `lp-actions`, `lp-footer`, `lp-footer-grid`, `lp-foot-head`.
- Mockups: `mock` (the plate), `mock-cap` (caption row), `mock-place` (an object set down, set `--i`), `mock-lit`
  (slow turn to the light), `mock-sheen`, `sun-shadow` (a shadow lengthening).
- Motion: `draw` (set `--len`, `--i`), `rise`, `grow-x`, `fade-in`, `slide-up`, `settle`, `mark-top` /
  `mark-bottom` (the S assembling), `tick-cursor`, `skeleton`. Set order with `style={{ '--i': n }}`.

## Components

`@/components/site`
- `Icon` : `<Icon name="plan" size={24} />`; add `label="..."` when it carries meaning. `IconUse` (named export)
  places an icon inside a larger SVG: `<IconUse name="pin" x={10} y={10} size={24} color="#875D41" />` (icons
  are filled with `currentColor`, so set `color` or `fill`).
- `icons.js` : `CORE` (the 32 icons: plan, key, door, arch, sun, dune, wall, compass, ruler, calendar, document,
  mail, phone, pin, arrow-right, plus, menu, search, user, heart, share, download, house, window, stairs, car,
  area, floors, globe, grid, close, check), `UTIL` (chevron-left|right|down|up, arrow-left, arrow-down,
  arrow-up-right, minus, copy, play, pause, sort, filter, alert, info, more), `ICONS`, `CORE_NAMES`,
  `ICON_LABELS`, `ICON_GRID` (24 px, 2 px stroke, live area 2 to 22, corner radius 3, cut 45°). One filled path
  per icon: equal 2 px strokes, true circles and quarter-circle corners, free ends cut on the word-mark's diagonal.
- `Sprite` holds `#site-mark` (viewBox `0 0 184 201`), `#site-wordmark` (viewBox `0 0 1420 251`) and
  `#site-icon-<name>`; it is already in the shell. Use `<svg viewBox="0 0 1420 251"><use href="#site-wordmark"/></svg>`
  for a quick non-exportable word-mark in HTML UI (exportable art must use `WordmarkG` inside `Art`).
- `Reveal` : `<Reveal delay={120} from="left">…</Reveal>` (`from`: `left` | `right` | `scale`; `as` for the tag).
- `CountUp` (`<CountUp value="2026" />`), `Typewriter` (`<Typewriter text={LINES.imagination.text} />`),
  `CopyValue` (`<CopyValue value="#875D41" label="Tribal Brown hex" />`), and `toast('…')` from
  `@/components/site/Toast` (client only).

`@/components/ui`
- `Button` : `<Button variant="black">Follow</Button>`, `<Button url href="/lp-contact/">sahra.sa</Button>`,
  `<Button variant="outline" icon="plan" iconRight="arrow-right" size="sm" block>`. Variants: tribal (default),
  black, dark, beige, outline, ghost. Icon-only buttons need `label`.
- `Chip` : `<Chip>Real Estate</Chip>`, `<Chip tone="brown" size="sm">`, `<Chip pressed={on} onClick={fn}>`.
- `Card` (default) : `<Card title="Philosophy" variant="white|beige|dark|print|board|line" arrow>`.
  Named exports in `Card.jsx`: `Lines` (`<Lines rows={LINES.elevate.rows} as="h2" className="t-h1" />` sets a
  brand line with its printed breaks; an array row spreads to both ends as on m14), `Contact`
  (`<Contact lines={CONTACT_BLOCKS.office} />`), `SiteUrl`, `Placeholder` (`<Placeholder width={8} />`).
- `RuledRows` : `<RuledRows id="<id>-about" rows={ABOUT.rows} />`; rows with `body` open and close
  (accordion, `aria-expanded`), rows with `href` are links.
- `Tabs` : `<Tabs id="<id>-x" label="…" tabs={[{ id, label, content }]} tone="dark" />` (client component).
- `Toggle` (default) and `Segmented` : `<Toggle label="Dark ground" checked={v} onChange={setV} />`;
  `<Segmented id="<id>-view" label="View" options={['Plan', 'Sheet']} />`.
- `Field` : `<Field id="<id>-email" label="Email" type="email" />` (`as="textarea"` or `as="select"`).
- `LandingNav` : `<LandingNav current="lp-process" tone="light|dark" />`. `LandingFooter` : `<LandingFooter />`.
  Their entries are the case study's own words only: About Sahra, Philosophy, Our Process, Our Vision, the
  contacts, "→ sahra.sa".
- Devices: `Phone`, `Tablet`, `Laptop`, `Monitor`, `Watch` (one file each, all from `Devices.jsx`): live HTML
  screens in SVG-drawn frames. `<Phone screen="<id>-home" exportName="<id>-phone-frame">…</Phone>`. Screen sizes:
  phone 390 x 844, monitor 1600 x 1000, laptop 1440 x 900, tablet 1180 x 820, watch 184 x 224 (scale a fixed
  artboard with CSS `transform`).

`@/components/art` (all return SVG groups; wrap in `Art`)
- `Art` : `<Art viewBox="0 0 800 600" title="Primary word-mark" exportName="<id>-primary">…</Art>`;
  `decorative` hides it from screen readers.
- `Mark.jsx` (the traced word-mark): `WordmarkG` (`x y width fill latin arabic pieceClass`; box 1420 x 251 at
  width 1420), `LatinG` ("Sahra" alone, 730 x 201), `ArabicG` (the Arabic half alone, 668 x 251), `MarkG` (the S;
  `size` = width; box 184 x 201; `topClass` / `bottomClass` animate the halves, e.g. `mark-top` / `mark-bottom`),
  `MarkTileG` (the mark in its rounded tile, m12; `size radius tile fill`), `AppIconG`, `LockupLineG` (with "We
  Build Spaces of Imagination"; `layout="row"` 2440 x 251 as m14, `layout="stack"` 1420 x 560 as m16),
  `WordmarkVerticalG` (reading bottom to top as on the box lid, box 251 x 1420 at scale 1), `LockupUrlG` (with
  "→ sahra.sa", 1420 x 400), `WordmarkDebossG` (`idp x y width tone depth vertical`: blind deboss),
  `MarkDebossG`, `WordmarkCropG` (`idp w h zoom dx dy`: enlarged and cropped, as on the sand folder m01),
  `WordmarkOutlineG` (outlines only). Data: `WM` (all construction values), `GLYPHS` (every letter with its
  contour), `WORDMARK_D`, `LATIN_D`, `ARABIC_D`, `MARK_D`, `ANCHORS` (every anchor point), `pen()` (the path pen
  the trace is built with), `MARK_W`, `MARK_H`, `LOCKUP_LINE`, `LOCKUP_VERTICAL`, `LOCKUP_URL`.
- `KeyArt.jsx` : `BrandDefs` (`idp`; then `url(#<idp>-dusk|-desert|-hero|-arch|-wall|-sky|-timber|-paper)` and
  `filter="url(#<idp>-grain)"`), `QuarterArchG` / `quarterArch()` (`cx cy r R quadrant`), `ArchWindowG` (the arch
  as a window onto its children), `CornerCutG` / `cornerCut()` (a rectangle with one large rounded corner, as the
  hoarding), architecture fills `TimberG`, `CurvedWallG`, `SkyPatchG`, `SteppedShadowG`, `BrickCurveG`, the
  construction drawing `ConstructionG` (`x y width guides outline anchors units angles draw`) and `GuideGridG`,
  `GrainFilter`, constants `PHOTO`, `DRAWING` (m03's own colours), `CONSTRUCTION_MARKS`.
- `Mockup.jsx` : `BackdropG` (`idp w h horizon wall floor line grain`; the flat field with the hard horizon: put it
  first), scene parts `DeskEdgeG`, `WallRibsG`, `StreetG`, `CounterG`, `ShelfG`, `BlockG`; shadows `CastG`
  (`d len`: a hard shadow swept to the lower right), `castRect()` / `CastRectG` (exact box shadow),
  `ContactShadowG` (`idp cx cy rx`); `MaterialDefs` (`idp`; then `url(#<idp>-board|-board-dark|-board-sand|
  -paper|-card|-metal|-metal-dark|-glass|-ceramic|-rubber|-shade|-shade-v)` and filters `-fibre`,
  `-paper-grain`, `-fabric`, `-soft`), `DebossDefs` (`idp depth`; filter `<idp>-deboss`), `PlaceG` (an object set
  down, `i x y rotate`), `SheenG`, `LIGHT`, `SHADOW`, `SHADOW_INK`, `SCENE` (scene colours).
- `Devices.jsx` : SVG frames `PhoneG`, `TabletG`, `LaptopG`, `MonitorG`, `WatchG` (`idp x y w`, children in the
  screen's own space, see `SCREEN`); screens `ScreenAboutG` (the About page of m12, 390 x 844), `ScreenPlanG`
  (the plan sheet, 1180 x 820), `ScreenWatchG` (184 x 224); `FloorPlanG` (a plan without labels, `w h seed bays`);
  `wrap(text, max)` (line-wrap for SVG text).

`@/lib`
- `pages.js` : `pageMeta(id)`, `pages`, `groups`, `pageById`, `pageIndex`, `previous`, `next`, `href(id)`.
- `motion.js` : `ease` (`out`, `inOut`, `draw`, `sun`), `dur` (`d1`…`d5`, seconds), `stagger`, transitions
  `tEnter`, `tMove`, `tChart`, `tDraw`, `tSun`, variants `listV`, `itemV`, `fadeV`.
- `charts.js` : `scale`, `r2`, `linePath`, `stepPath` (the stepped shadow), `smoothPath` (dunes, curved walls),
  `areaPath`, `polar`, `arcPath`, `bandPath`, `arcLength`, `barPath` (bars with a quarter-circle corner or a 45°
  cut top, as the stems), `hbarPath` (a bar with the sad's rounded end), `archShares` (nested quarter arches),
  `ticks`, `shares`, `segments`, `seeded`.
- `site.js` : `copy()`, `fmt()`, `uid()`, `clamp`, `lerp`, `range`, `hexToRgb`, `contrast`, `still()`.
- `brand.js` : everything the case study prints: `BRAND`, `CLIENT`, `PROJECT_TITLE`, `SENDER`, `DESIGNER`,
  `CREDITS`, `OWNERS`, `FIELDS`, `TAGS`, `DESCRIPTION`, `PALETTE` (all printed values), `TINT_STEPS`, `TINTS`,
  `HEX`, `TYPE` (family, weights, character set, specimen, the two paragraphs), `LINES` (every brand line with its
  printed breaks), `URL_LINE`, `CONTACT`, `CONTACT_BLOCKS`, `PEOPLE`, `INTRO` (six paragraphs), `SHEET`, `SCOPE`,
  `ABOUT` (label, headline, text, the three rows), `PROFILE`, `POSTER_BODY`, `POSTERS`, `HOARDING`, `PLAN`,
  `LETTER`, `FROM_BLOCK`, `CONSTRUCTION`, `NAV_LINKS`, `NOT_PUBLISHED`. Import from here instead of retyping.

## The word-mark (read before drawing anything with it)

It is traced, not typeset: never imitate it with a font. Construction (`WM`): one stroke x = 32 units; the tall
cut stems (h, alif) 35; bowls and corners outer radius 72.5, inner 40.5; the hah's small corners 54 / 22; every
cut end on the same diagonal. **The construction drawing (m03) labels the cuts "42°"; on the artwork they
measure 45°**: the trace follows the artwork, and construction diagrams print the label "42°" as the designers
did. Guides: top 0, x-height 56, centre 128.5, bar 169, baseline 201, descender 250.5. The trace matches m04
within 2.5 % of its inked pixels. Colour versions are only the four of m09 plus the mark in Sand on Dark
Chocolate (m04), black on white paper (the tube label, m01), and the blind deboss on board.

## Mockups: this project's direction

- **Staging: in context.** Each object stands in a simple drawn scene: a desk edge, a wall (plain or ribbed), a
  street with a kerb, a counter, a shelf. Each mockup's arrangement and camera are given in `LAYOUTS.md` and
  differ every time. Where the case study shows the arrangement (the flat lays m01 / m10, the box m13, the cards
  m08, the posters m11 / m14, the hoarding m16), follow it.
- **Backdrop: a flat field of one brand colour with a hard horizon line** (`BackdropG`: wall field over floor
  field, both brand colours or published tints).
- **One light, from the upper left.** Hard shadows fall to the lower right (`CastG`, `CastRectG`, colour
  `SHADOW_INK`); standing objects also sit on a soft contact shadow (`ContactShadowG`). Highlights upper left,
  shade lower right. Use `MaterialDefs`; board gets `-fibre`, paper `-paper-grain`.
- Believable proportions and materials (board with painted edges, paper with thickness, fabric, metal, glass);
  artwork follows the surface; the word-mark on board is blind-debossed (`WordmarkDebossG`), on paper printed.
- Text on mockups is only the word-mark, "Sahra", or lines and details that appear in the case study (`LINES`,
  `CONTACT_BLOCKS`, `PEOPLE`, `LETTER`, `PLAN`, `SENDER`).
- Signature motion: objects are set down one after another (`mock-place` via `PlaceG`); the hero object turns
  slowly to the light (`mock-lit`, `SheenG`); shadows lengthen (`sun-shadow`).

## Reference images

`reference/mNN_1.png` are readable copies of the 16 case-study images (index in `SOURCE.md`); `mNN.jpg` are the
full-size originals (read small copy from these); `m03_1.png` to `m03_4.png` are stills of the construction
animation. Open **only** the ones listed in your task. They are for reading and measuring; they are never used in
the site.

## Page ids

overview, logo, color, gradients, typography, icons, dataviz, motion, strategy, web-system, lp-home,
lp-philosophy, lp-process, lp-vision, lp-spaces, lp-plans, lp-contact, dashboard, mobile-a, mobile-b, feature,
showcase, campaign, use-apparel, use-accessories, use-stationery, use-packaging, use-event, use-world,
use-product.

## Hand-back (under 150 words)

Files written; a count of each deliverable against its minimum and the number of `data-export` SVGs against
`minExports`; which parts are faithful rebuilds; which are extensions; every word or value that is your own;
what you looked at on screen and what you did not check.
