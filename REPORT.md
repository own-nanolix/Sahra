# REPORT: Sahra brand site

A 30-page brand site built from the Behance case study "Sahra Development | Branding" by FAST Studio and Ninety Three (Hessein Yousef, Mohamed Sanad), Cairo, Egypt (https://www.behance.net/gallery/246574901/Sahra). Sahra is a real estate company in Riyadh, Saudi Arabia that turns desert land into places to live. The case study is branding only: it shows print, signs, a photographed phone, a presentation box and a few slides. It shows no website, no app, no prices, no statistics and no project names.

## Where the site is

- **Routes:** `/` shows the overview. Every page is `/<id>/`: overview, logo, color, gradients, typography, icons, dataviz, motion, strategy, web-system, lp-home, lp-philosophy, lp-process, lp-vision, lp-spaces, lp-plans, lp-contact, dashboard, mobile-a, mobile-b, feature, showcase, campaign, use-apparel, use-accessories, use-stationery, use-packaging, use-event, use-world, use-product.
- **Static export:** `npm run build` writes the site to `out/`. It needs no server features.
- **Local dev server:** http://localhost:3104 (`npx next dev -p 3104`).
- **GitHub:** https://github.com/own-nanolix/Sahra (branch `main`). Pushed once, after the final review, because the owner's repositories are connected to Vercel and every push goes live (the owner's standing orders).
- **Live link:** needs a Vercel import by the owner (no Vercel project is known for this repo yet).

## Deliverables: minimum and delivered

Exportable SVGs per page, as counted by `node tools/check.mjs` on the built site (30 of 30 pages `ok`). The export count is the only deliverable count that a tool re-checked.

| # | Page | Minimum | Delivered |
|---|---|---|---|
| 1 | overview | 2 | 7 |
| 2 | logo | 18 | 32 |
| 3 | color | 5 | 15 |
| 4 | gradients | 20 | 24 |
| 5 | typography | 6 | 13 |
| 6 | icons | 40 | 70 |
| 7 | dataviz | 20 | 24 |
| 8 | motion | 6 | 15 |
| 9 | strategy | 3 | 7 |
| 10 | web-system | 3 | 7 |
| 11 | lp-home | 2 | 13 |
| 12 | lp-philosophy | 2 | 7 |
| 13 | lp-process | 2 | 6 |
| 14 | lp-vision | 2 | 7 |
| 15 | lp-spaces | 2 | 8 |
| 16 | lp-plans | 2 | 13 |
| 17 | lp-contact | 2 | 8 |
| 18 | dashboard | 8 | 11 |
| 19 | mobile-a | 2 | 8 |
| 20 | mobile-b | 2 | 8 |
| 21 | feature | 2 | 6 |
| 22 | showcase | 4 | 5 |
| 23 | campaign | 7 | 17 |
| 24 | use-apparel | 12 | 13 |
| 25 | use-accessories | 20 | 22 |
| 26 | use-stationery | 14 | 20 |
| 27 | use-packaging | 12 | 12 |
| 28 | use-event | 19 | 20 |
| 29 | use-world | 6 | 7 |
| 30 | use-product | 12 | 16 |

The delivered column adds up to 441, the same as the number of files in `export/svg/`.

The other items each row of section 9 asks for were counted from the page code after the review round:

| Page | Item | Minimum | Delivered |
|---|---|---|---|
| overview | Cover / principle cards / chapter index / mockup-and-product index | 1 / 4 / 1 / 1 | 1 / 4 / 1 (30 pages, 4 groups) / 1 (47 items, 9 groups) |
| overview | About this brand with a contents list | present | present (6 contents entries) |
| logo | Primary lockup / construction diagram / clear space diagram | 1 / 1 / 1 | 1 / 3 (word-mark, close-up, mark) / 1 |
| logo | Minimum sizes / colour versions / lockup family / misuse examples | 4 / 4 / 4 / 6 | 4 / 4 / 4 / 6 |
| logo | Secondary graphic built from the mark / animated draw-on | 1 / 1 | 4 (arch window, arch header, crop, deboss) / 1 |
| color | Spec tables (primary, neutral) / proportion bar / accessible pairings / semantic tokens | 2 / 1 / 6 / light and dark | 2 (plus 3 tint tables) / 1 / 6 / light and dark |
| gradients | Named gradients / anatomy / grain levels with comparison / key art / motion studies | 6 / 2 / 4 + 1 / 6 / 4 | 6 / 2 / 4 + 1 / 6 / 4 |
| typography | Primary weights / secondary weights / scale rows / character set / hierarchy layouts / metrics study | all / all / full / 1 / 1 / 1 | 4 / 3 / 10 / 1 (4 rows) / 3 (two posters and the numbered one) / 1 |
| icons | Icons / constructions with 4 sizes / in-use examples / illustrations on light and dark | 32 / 2 / 4 / 3 | 32 (plus 16 interface icons) / 2 / 4 / 3 (6 exports) |
| dataviz | Chart types / stat cards / KPI tiles / table rows / live counters / chart rules / states | 16 / 4 / 3 / 6 / 2 / 6 / 3 | 16 / 4 / 3 / 6 / 2 / 6 / 3 |
| dataviz | Sparklines; legend, tooltip and tab components | present | 1 sparkline figure with 4 series; all present |
| motion | Easing demos / logo animations / transition demos / micro-interaction groups / do and don't | present | 4 / 2 (plus a 4-frame storyboard) / 6 / 8 / 4 pairs |
| strategy | Story sections | present | 6 (one per intro paragraph, each with an animated diagram) |
| web-system | Button variants with states / navigation bar / mega menu / footer | 6 / 1 / 1 / 1 | 6 (5 states each) / 1 (shown light and dark) / 1 / 1 |
| web-system | Links, tags, feature cards, content block, list rows | present | present: 3 feature-card structures, 1 content block, 3 list rows (links and tags not counted one by one); 3 anatomy drawings |
| lp-home | Sections | 8 | 8 |
| lp-philosophy / lp-process / lp-vision | Sections | 7 each | 8 / 7 / 10 |
| lp-spaces / lp-plans / lp-contact | Sections | 7 each | 9 / 8 / 8 |
| dashboard | Home options / options overview / inner screens / components | 5 / 1 / 2 / 9 | 5 / 1 / 2 / 9 |
| mobile-a | Screens / row of all nine | 9 / 1 | 9 / 1 |
| mobile-b | Screens / components / interaction patterns | 9 / 10 / 7 | 9 / 10 / 7 |
| feature | Working demo | 1 | 1 (plan explorer, 3 scripted steps) |
| showcase | Hero scenes / phones in the line-up | 4 / 8 | 4 (and 1 extra, the tablet at a counter) / 8 |
| campaign | Social posts / posters / stories / profile grid | 4 / 3 / present / 1 | 4 / 3 / 4 / 1 (9 tiles) |
| use-apparel | Collection scene / t-shirts front and back / hoodies / caps / print-spec sheet | 1 / 3 / 3 / 3 / 1 | 1 / 3 / 3 colourways on 2 plates, plus the jacket plate / 3 / 1 |
| use-accessories | Totes / mugs / bottles / sticker sheet / pin card / patches / keychain | 2 / 2 / 2 / 1 / 1 / 4 / 1 | 2 / 2 / 2 / 1 / 1 / 4 / 1 |
| use-accessories | Cup with sleeve / coasters / desk mat / mouse pad / umbrella / socks / gift card front, back and carrier | 1 each / 3 | 1 each / 3 |
| use-stationery | Letterhead / envelope / card fronts / card back / pen / notebooks / brochure / report cover / slides | 1 / 1 / 2 / 1 / 1 / 2 / 1 / 1 / 5 | 1 / 1 / 2 / 1 / 1 / 2 (plus a single-notebook plate) / 1 / 1 / 5 |
| use-packaging | Tape rolls / strips / shipping boxes / product boxes / shopping bags / tissue / seal / label | 2 / 1 / 2 / 2 / 3 / 1 / 1 / 1 | 2 / 1 / 2 / 2 (plus the cream tube) / 3 / 1 / 1 / 1 |
| use-event | Lanyard with badge / staff IDs / fabric wristbands / silicone wristbands / tickets / VIP pass / booth / feather flags / banner | 1 / 2 / 4 / 3 / 3 / 1 / 1 / 3 / 1 | 1 / 2 / 4 / 3 / 3 / 1 / 1 / 3 / 1 |
| use-world | Billboard / citylight with roll-ups / reception signage with wayfinding and room plaque / vehicle wrap | 1 / 1 / 1 / 1 | 1 / 1 (2 roll-ups) / 2 (reception with 1 directional plaque of 4 rows and 3 facility plaques; room plaque) / 1 |
| use-product | Product object views / card colourways front and back / tablet, phone and watch / app icon sizes | present / 3 / 3 / 5 | 3 (open, front, side; plus 2 close-ups, the slipcase and the kit) / 3 / 3 (one scene) / 5 |

Notes on the counts. Section counts on the landing pages count the navigation bar and the footer as sections when the page draws them, and count a pinned story as one section (lp-home's story has 8 pinned steps). The ruled-row web-system parts "links" and "tags" are present but were not counted member by member. Two things differ from a plain reading of the rule: the "hoodies" are three colourways (Dark Chocolate, Tribal Brown, Sand) because the case study shows a dark jacket, which is drawn as its own plate; and the dashboard components were counted as nine (sidebar item, rail item, KPI tile, table header and row, filter chip, status row, search field, date range, account chip).

## SVG export

`node tools/export-svg.mjs` wrote **441 SVGs** to `export/svg/` with **0 warnings**. The files were checked by the exporter's warnings only; they were not opened one by one. Text in exported files is live SVG text in the brand font stack, so a computer without Source Serif 4 or Inter Tight shows a system font until the text is outlined in a design tool.

## Faithful rebuilds, and what we added

Faithful to the case study:
- **logo:** the word-mark (traced from the reference and rebuilt on the construction's own rules), the mark, the construction (m03), the four colour versions (m09), the crop and deboss.
- **color:** the six swatches with names, HEX, RGB, HSB and CMYK as printed, and the strips of four tints (m05).
- **typography:** the type slide (m06) with its character set, two paragraphs, weights list and "Aa123%!".
- **overview, strategy:** the intro slide (m02): its six paragraphs and the project sheet.
- **use-stationery, use-packaging, use-product:** the flat lay (m01, m10), business cards (m08), slipcase books (m15), the dark folder, envelope, letter, notebook, tall box, shopping bag, cream tube, and the presentation box with its plan sheet (m13).
- **campaign, use-world:** the two posters in a double frame (m11), the framed poster on fins (m14) and the hoarding (m16).
- **lp-home, mobile-a screen 1:** the About web page on the phone (m12), and the profile card (m12).
- **use-apparel:** the dark jacket with the mark on its back (m07), drawn as an empty garment.

Added by us, as partners, in the designers' language: logo clear space, minimum sizes, lockup family, misuse and draw-on; colour scales, pairings and semantic tokens; the gradient library, anatomy, grain studies, key-art pieces and motion studies; the type scale, hierarchy and metrics studies; all interface icons, the constructions and the three illustrations; the charts (drawn from the case study's own text, palette and word-mark, and the site's page list); the whole motion system; the web component bench and mega menu; all seven landing pages beyond the About spine; the dashboard (options A to E and two inner screens) and its components; the 18 mobile screens, the component set and the interaction patterns; the plan explorer; the showcase scenes; social posts, stories and the profile grid; the rest of the apparel, accessories, packaging and event items; the world scenes beyond the hoarding; and the kit contents, access cards, devices and app icon.

## Wording and values that did not come from the case study

- **Site words are English.** Brand copy is quoted exactly as the designers wrote it, with their spellings ("Sahra Developement" on the letter and the plan sheet, "behavior", "Abdelazez Faysal"). Page headings, control labels and captions that name deliverables are ours. The Arabic half of the word-mark is artwork, never typed text.
- **Names we gave things:** the six gradients, the key-art plates and the scale token names.
- **Recommendations:** minimum logo sizes, clear space, chart rules, motion do / don't pairs, and print-spec dimensions.
- **Computed values:** colour scale steps are mixed in code from the published colours; contrast ratios are calculated. Sampled, not published: the warm off-white studio ground (about #F7F3EA) and the photo tones (desert orange, sky blue, timber).
- **Product pages** (dashboard, mobile, feature, landing pages) use only the case study's labels ("Philosophy", "Our Process", "Our Vision", "About Sahra"), its contacts, its brand lines and the palette. Everything else is a quiet placeholder. No prices, statistics, unit counts or testimonials were invented. Chart figures are counts of the case study's own words, colour values and the site's own page list.
- **Illegible values left as placeholders:** the floor plan's dimension figures and room labels (m13) are not drawn; the plan is shown without them. The portrait badges on the intro slide are people and are not reproduced.
- **Source oddities kept as printed:** "Sahra Developement", "behavior", the Dark Chocolate Brown HSB line "0, 0%, 0" printed that way, and the construction labels "34°" (Latin cuts) and "42°" (Arabic cuts), although the cuts measure 45° on the artwork.
- **Source text left out or replaced:** the printed contact line that names a social network is left out everywhere; the profile card is drawn without a platform's verified tick or logo; the publishing platform and design tools are not named; the substitute fonts are not named on pages (only "Test Tiempos Text", which the case study prints); device frames and the van are neutral; phone status bars carry no clock time.
- **Reviewers corrected:** a wrong count on dataviz (a contact block shown as 2 lines, printed as 3) and invented zone labels; invented menu rows, headings and labels on the mobile and contact pages; a phone screen on lp-home rebuilt because its type sizes and spacing were wrong; campaign posters rebuilt from full-size crops; a clip-path bug that hid the card's arch; sections repeated between landing pages rebuilt; the van redrawn as a true side view; product boxes and bags re-laid as the layout plan asks; seven icons that read badly, and seven more that drew outside their live area.

## Accessibility changes that altered the look

- The page ground is Beige. Sand on Beige is 2.6:1 and fails for small text, so small sand text uses a deeper sand ink (`#7A5A3F`). Tribal Brown on Beige passes (5.0:1); Sand on Dark Chocolate passes (5.0:1).
- On the rebuilt palette slide, Sand's four value lines are set in Dark Chocolate (5.0:1; the name stays white) and the tint labels are darkened per tint. On the rebuilt type slide the greyed weights are `#767676` (4.5:1 on white) instead of the case study's paler grey (about 2.1:1).
- Two buttons had a pressed state that turned beige on beige or chocolate on chocolate; both now have a visible pressed colour.
- Contrast problems left in place to keep the design: none were recorded in STATE.md or found by the audit. The logo misuse example "Do not set Sand on Beige" shows a failing pair on purpose.

## Font, and what could not be reproduced in code

- **Font:** the case study names the serif ("Test Tiempos Text", a commercial face by Klim) and not the sans. The site uses **Source Serif 4** (variable, optical sizes) with "Test Tiempos Text" first in the stack, and **Inter Tight** (300, 400, 500) for the sans, both through `next/font/google`. Why: Source Serif 4 was the closest free match to Tiempos Text (sturdy text serif, large x-height, wedge serifs, compact width), compared on the slide's "Aa123%!"; Newsreader is too delicate and STIX Two Text too Times-like. Inter Tight matches the tight, light grotesque of the stationery and intro slide better than Instrument Sans or Hanken Grotesk. The word-mark is not set in a font: it is drawn from the traced shapes. It was traced from m04 at full size and rebuilt from the construction's rules (stroke 32, cut stems 35, radii 72.5 / 40.5 and 54 / 22, cuts at 45° as measured); a pixel diff against m04 left 2.5 % of the inked pixels differing, all edge pixels.
- **Not reproduced:** photographs and people. They are never reproduced or drawn: abstract fields in the photo tones and the quarter arch stand in, and the dark jacket is drawn empty, as a garment. The looping background video on the case study page was not downloaded. Mockups are drawn objects, not photographic renders. Poster body text is set ragged where the case study justifies it.

## What was verified in the browser, and what was not

Verified by the lead on the built site (`out/`, served locally), at the end of the review round:
- eslint is clean; `npm run build` passes; `node tools/check.mjs --strict` reports 30 of 30 `ok`.
- `node tools/audit.mjs`: 30 of 30 pages clean at 1440 and 390 px (overflow, low contrast, unnamed controls, bad links, missing SVG roles, duplicate ids), with no console errors.
- `node tools/export-svg.mjs` wrote 441 SVGs with 0 warnings.

Verified by the reviewers on the dev server: the interactive parts of their own pages.

Not verified:
- Touch input, Safari and Firefox.
- Reduced motion was checked by running on some pages and by reading the code on others.
- Exported SVGs were checked by the exporter's warnings, not opened one by one.
- Poster body text is ragged where the case study justifies it (known difference, not fixed).

## Agents

- **Lead:** read the case study and wrote SOURCE.md.
- **Shared system (step 4):** one agent, on Opus.
- **Builders:** 24, on Sonnet. Wave 1: 12 builders, 17 pages. Wave 2: 12 builders, 13 pages. None failed, and no page came back under 600 lines, so none was sent back and no agent was relaunched.
- **Reviewers:** 8, on Opus. Each reviewed and fixed its own pages.
- **Fixer:** 1, on Sonnet, applied the shared fixes the reviewers recommended: 14 icons corrected, the construction diagram labels "34°" and "42°", the About phone screen re-measured, pressed states of two buttons, neutral device frames, a shared error colour, no cross-page imports, and LAYOUTS.md brought in step with what is built.
- **Final reviewer:** 1, on Opus, independent, checks the code and every page against both rule files before the push.
- **Problems found along the way:** `cacheComponents` and `partialPrefetching` were removed because they cannot be combined with a static export; the Tailwind loader is limited to non-module CSS so CSS Modules keep their class names; the static export's prefetch files gave 404s on a plain static host and `scripts/flatten-prefetch.mjs` runs as `postbuild`. These fixes came from the two earlier projects and were applied from the start.

## Decisions made under the standing orders

1. The two rule files disagree on technology: `rule/09-sahra.md` describes a single HTML file, `rule/Brand-site.md` describes this Next.js site and says it gives everything beyond the link, site name and layout direction. `Brand-site.md` is followed; from `09-sahra.md` only the Behance link, the site name and section 2b apply.
2. Commits are local after every builder and fix. One push, after the final review.
3. No other company's name, address, product name, logo or copyright on any page: the printed contact line that names a social network is left out everywhere; the profile card is drawn without a platform's verified tick or logo; the publishing platform and design tools are not named; the free substitute fonts are not named on pages (only "Test Tiempos Text", which the case study prints); device frames and the van are neutral; no status-bar clock times.
4. The designers are credited on the overview by the names the case study page shows; the "©" in one agency's styled name is not printed.
5. Photographs and people are never reproduced or drawn: abstract fields in the photo tones and the quarter arch stand in; the dark jacket of m07 is drawn empty, as a garment.
6. The word-mark is traced from the reference on the construction's own rules; its cuts measure 45° on the artwork; construction diagrams print the labels the case study prints ("34°" on the Latin cuts, "42°" on the Arabic cuts).
7. The About phone screen was re-measured once after two reviewers disagreed (margins 24, word-mark 160 wide, headline 34/35, rows 99 apart); its vertical scale is uncertain by a few pixels.
8. Unused files left by reviewers are kept: files are never deleted (for example `src/components/pages/strategy/ScopeMap.jsx`).
9. HERO_FEATURE is the plan presentation (a plan explorer); PRODUCT_OBJECT is the ring-bound presentation box; the floor plan is drawn without dimension figures or room labels because they are illegible in the source.

## Final review

Findings and fixes: to be completed
