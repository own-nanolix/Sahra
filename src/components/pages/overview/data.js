// Data for the overview page. Every sentence quoted here is the case study's own (src/lib/brand.js, SOURCE.md).
// The only words that are ours are short labels that name a section or a deliverable.
import { INTRO } from '@/lib/brand';

// The contents of this page: label, and the id of the section it scrolls to (ids start with the page id).
export const CONTENTS = [
  { no: '01', label: 'Opening', target: 'overview-opening' },
  { no: '02', label: 'About the brand', target: 'overview-about' },
  { no: '03', label: 'Principles', target: 'overview-principles' },
  { no: '04', label: 'Credits', target: 'overview-credits' },
  { no: '05', label: 'Every chapter', target: 'overview-chapters' },
  { no: '06', label: 'Mockups and products', target: 'overview-mockups' },
];

// The four principles, each quoted from the six paragraphs of the intro slide (m02).
// `quote` is a verbatim fragment; `from` names the paragraph it comes from.
const P = INTRO.paragraphs;
export const PRINCIPLES = [
  {
    id: 'clarity',
    title: 'Clarity, trust and elegance',
    quote: "Every detail of Sahra's identity and communication is crafted to embody clarity, trust and elegance",
    sentence: P[1],
    from: 'Paragraph 2',
  },
  {
    id: 'intention',
    title: 'Emotional and intentional',
    quote: 'real estate is not just transactional, but emotional and intentional',
    sentence: P[1],
    from: 'Paragraph 2',
  },
  {
    id: 'transparency',
    title: 'Transparency, care and long-term vision',
    quote: 'relationships rooted in transparency, care and long-term vision',
    sentence: P[4],
    from: 'Paragraph 5',
  },
  {
    id: 'precision',
    title: 'Precision, creativity',
    quote: 'driven by precision, creativity and a deep understanding of what makes a place truly valuable',
    sentence: P[2],
    from: 'Paragraph 3',
  },
];

// The mockups and products, grouped by the page that shows them. Names only: they come from the deliverable list.
export const MOCKUPS = [
  {
    page: 'showcase',
    items: ['Phone with data cards', 'Line-up of 8 phones', 'Laptop on a plinth', 'Event stage'],
  },
  {
    page: 'campaign',
    items: ['Posters in frames', 'Poster on fins'],
  },
  {
    page: 'use-apparel',
    items: ['Collection', 'T-shirts', 'Hoodies', 'Caps', 'Print-spec sheet'],
  },
  {
    page: 'use-accessories',
    items: ['Tote bags', 'Mugs', 'Bottles', 'Sticker sheet, pin card', 'Patches and keychain', 'Cup, sleeve, coasters', 'Desk mat and mouse pad', 'Umbrella and socks', 'Gift card and carrier'],
  },
  {
    page: 'use-stationery',
    items: ['Flat lay', 'Letterhead and envelope', 'Business cards', 'Pen and notebooks', 'Tri-fold brochure', 'Report and slides'],
  },
  {
    page: 'use-packaging',
    items: ['Tape', 'Shipping boxes', 'Product boxes', 'Shopping bags', 'Tissue, seal, label'],
  },
  {
    page: 'use-event',
    items: ['Booth', 'Lanyard and badge', 'Staff IDs', 'Wristbands', 'Tickets and pass', 'Flags and banner'],
  },
  {
    page: 'use-world',
    items: ['Hoarding', 'Citylight and roll-ups', 'Reception and wayfinding', 'Room plaque', 'Vehicle wrap'],
  },
  {
    page: 'use-product',
    items: ['Presentation box', 'Box front and side', 'Card colourways', 'Tablet, phone and watch', 'App icon sizes'],
  },
];
