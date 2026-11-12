// Brand facts read from the case study. Every name, line and value on the site comes from here or from
// SOURCE.md, verbatim (spellings such as "Developement" are kept as printed). The case study contains no
// prices, statistics, testimonials, project names, unit counts or dates other than those below: never add any.
// Left out on purpose (STATE.md): the printed "linkedin.com/company/sahra" line, platform and tool names, and
// the verified tick of the profile card.

export const BRAND = 'Sahra';
export const CLIENT = 'Sahra Development';
export const PROJECT_TITLE = 'Sahra Development | Branding';
// The other names the artwork prints for the sender, each exactly as printed.
export const SENDER = { brand: 'Sahra Brand', developement: 'Sahra Developement', realEstate: 'Sahra Real Estate' };

// The designers, as credited on the case study page.
export const DESIGNER = 'FAST Studio and Ninety Three';
// The credit lines exactly as printed under the case study.
export const CREDITS = [
  'Visual Direction & Project management',
  'Agency: Fast Studio',
  'Agency Director: Hussein Youssif',
  'In Collaboration with:',
  'Agency: NinetyThree',
  'Agency Director: Mohamed Sanad',
];
export const OWNERS = ['FAST Studio', 'Ninety Three', 'Hessein Yousef', 'Mohamed Sanad'];
export const OWNERS_CITY = 'Cairo, Egypt';
export const FIELDS = ['Branding', 'Graphic Design', 'Logo Design'];
export const TAGS = ['branding', 'brand identity', 'Logo Design', 'logo', 'visual identity', 'Saudi Arabia', 'realestate', 'logos', 'Brand Design', 'typography'];

// The case study page's own description.
export const DESCRIPTION = 'Sahra is a real estate company specializing in transforming desert landscapes into vibrant, livable destinations. Blending natural desert tones with clean, contemporary design, Sahra creates spaces where people can live, connect, and enjoy a unique balance between nature, comfort, and modern lifestyle.';

// ---------- Palette (m05), names and printed values exactly as published ----------
// The HSB line of Dark Chocolate Brown is printed "0, 0%, 0"; it is kept as printed.
export const PALETTE = [
  { name: 'Black', token: 'black', hex: '#000000', rgb: '0, 0, 0', hsb: '0, 0%, 0', cmyk: '100, 0, 0, 0', tints: false },
  { name: 'Dark Chocolate Brown', token: 'chocolate', hex: '#35241c', rgb: '53, 36, 28', hsb: '0, 0%, 0', cmyk: '56, 68, 73, 70', tints: false },
  { name: 'Tribal Brown', token: 'tribal', hex: '#875D41', rgb: '135, 93, 65', hsb: '24, 52%, 53%', cmyk: '38, 60, 76, 25', tints: true },
  { name: 'Sand', token: 'sand', hex: '#B58F6B', rgb: '181, 143, 107', hsb: '29, 41%, 71%', cmyk: '28, 42, 62, 3', tints: true },
  { name: 'Beige', token: 'beige', hex: '#F5F0E3', rgb: '245, 240, 227', hsb: '43, 7%, 96%', cmyk: '3, 4, 10, 0', tints: true },
  { name: 'White', token: 'white', hex: '#FFFFFF', rgb: '255, 255, 255', hsb: '0, 0%, 100%', cmyk: '0, 0, 0, 0', tints: false },
];
export const TINT_STEPS = ['80%', '60%', '40%', '20%'];
// The tints as hex (each colour mixed with white at 80, 60, 40, 20 %), in the same order as TINT_STEPS.
export const TINTS = {
  tribal: ['#9F7D67', '#B79E8D', '#CFBEB3', '#E7DFD9'],
  sand: ['#C4A589', '#D3BCA6', '#E1D2C4', '#F0E9E1'],
  beige: ['#F7F3E9', '#F9F6EE', '#FBF9F4', '#FDFCF9'],
};
export const HEX = {
  black: '#000000', chocolate: '#35241C', tribal: '#875D41', sand: '#B58F6B', beige: '#F5F0E3', white: '#FFFFFF',
  // accessibility inks (not published; see globals.css)
  ink: '#1E140F', muted: '#5C4A3E', sandInk: '#7A5A3F', beigeMuted: '#CDBBA6', error: '#A3301E', // error ink: 6.1:1 on Beige, 7.0:1 on White
  // sampled, not published
  studio: '#F7F3EA', wall: '#C9772E', sky: '#7FA6C4', timber: '#A8743F',
};

// ---------- Type (m06) ----------
export const TYPE = {
  family: 'Test Tiempos Text',
  weights: ['Test Tiempos Text Regular', 'Test Tiempos Text Medium', 'Test Tiempos Text SemiBold', 'Test Tiempos Text Bold'],
  charset: ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '0123456789', "~`/?<>.,':;|{}[]=-+_()*&^%$#@!"],
  specimen: 'Aa123%!',
  text: [
    'Typography at Sahra is treated as a structural element rather than decoration. It defines hierarchy, guides attention and reinforces clarity across every touchpoint. The balance between serif and sans-serif creates a dialogue between elegance and precision, reflecting the architectural language of the brand.',
    'Each typographic decision is intentional, from spacing to weight and proportion. The system is designed to remain consistent yet flexible, allowing it to adapt seamlessly across digital and physical applications while maintaining a refined and cohesive presence.',
  ],
};

// ---------- The brand's lines, with their line breaks as printed ----------
export const LINES = {
  imagination: { text: 'We Build Spaces of Imagination', rows: ['We Build Spaces', 'of Imagination'] },
  elevate: { text: 'Spaces that elevate everyday living with intention', rows: ['Spaces that elevate', 'everyday living', 'with intention'] },
  refined: { text: 'A refined approach to real estate, where design meets functionality.', rows: ['A refined approach to real estate,', 'where design meets functionality.'] },
  builtAround: { text: 'Built around how people live today', rows: ['Built around', 'how people', 'live today'] },
  // m14: four lines, "design" and "and" pushed to opposite ends of the third line
  designing: { text: 'Designing spaces that connect purpose, design and modern living', rows: ['Designing spaces', 'that connect purpose,', ['design', 'and'], 'modern living'] },
  refinedLiving: { text: 'Refined living spaces designed for comfort and simplicity', rows: ['Refined living spaces', 'designed for comfort', 'and simplicity'] },
  cleanArchitecture: { text: 'Clean architecture inspired by nature and built for everyday life.', rows: ['Clean architecture inspired by nature', 'and built for everyday life.'] },
  intention: { text: 'Built with intention, designed for life beyond structure.', rows: ['Built with intention,', 'designed for life', 'beyond structure.'] },
};
export const URL_LINE = '→ sahra.sa';

// ---------- Contacts, as printed (three blocks) ----------
export const CONTACT = {
  city: 'Riyadh, Saudi Arabia',
  phone: '+966 55 123 4567',
  info: 'info@sahra.sa',
  phone2: '+966 55 987 6543',
  support: 'support@sahra.sa',
  partnerships: 'partnerships@sahra.sa',
  web: 'www.sahra.sa',
  webShort: 'sahra.sa',
  handle: '@sahra.official',
  profileHandle: '@sahrarealestate',
};
export const CONTACT_BLOCKS = {
  office: [CONTACT.city, CONTACT.phone, CONTACT.info],
  service: [CONTACT.phone2, CONTACT.support, CONTACT.partnerships],
  online: [CONTACT.web, CONTACT.handle],
};

// People as printed (the business card). Portraits are never drawn.
export const PEOPLE = { card: { name: 'Abdelazez Faysal', role: 'Interior Designer' } };

// ---------- Intro slide (m02) ----------
export const INTRO = {
  title: LINES.imagination,
  paragraphs: [
    'When it comes to real estate, the first impression is often one of complexity, rigidity and overwhelming choices. However, in contrast to the conventional approach of the market, Sahra introduces a refined, human-centered and seamless experience, redefining how people connect with spaces.',
    "This positioning reflects a vision where real estate is not just transactional, but emotional and intentional. Every detail of Sahra's identity and communication is crafted to embody clarity, trust and elegance, reinforcing its commitment to shaping meaningful living experiences across Saudi Arabia.",
    'We exist where vision meets reality, connecting people to places that inspire life and purpose. We see beyond structures, uncovering potential, creating opportunities and transforming empty spaces into living stories. We are builders of experiences, driven by precision, creativity and a deep understanding of what makes a place truly valuable.',
    'With a clear purpose: to redefine real estate as a journey of discovery, belonging and aspiration. We believe that property is more than an asset—it is a foundation for life, growth and future possibilities. Through every project, we aim to create environments that empower individuals, elevate lifestyles and contribute to lasting impact.',
    'More than offering properties, we create connections. We value the trust of those who choose Sahra and strive to build relationships rooted in transparency, care and long-term vision. We stand beside our clients at every step, understanding their ambitions and guiding them toward the right opportunities with confidence and ease.',
    "It is in every fulfilled vision, every space brought to life and every story that begins within our developments that we find our purpose. We remain committed to shaping environments that reflect ambition, inspire progress and redefine the meaning of modern living. Because at Sahra, we don't just develop real estate—we create places where life unfolds.",
  ],
};

// Project sheet (m02), label / value as printed.
export const SHEET = [
  ['Scope of work', 'Positioning / Visual Identity / Art Direction / Brand Communication'],
  ['Client', 'Sahra Development'],
  ['Industry', 'Real Estate'],
  ['Location', 'Riyadh, Saudi Arabia'],
  ['Date', '2026'],
];
export const SCOPE = ['Positioning', 'Visual Identity', 'Art Direction', 'Brand Communication'];

// ---------- The About page on the phone (m12) ----------
export const ABOUT = {
  label: 'About Sahra',
  headline: LINES.intention,
  text: 'Sahra approaches real estate as a long-term vision, where architecture is shaped by how people live, not just how spaces look. Every development reflects a balance between clarity, function and refined design.',
  rows: [
    { no: '01', label: 'Philosophy' },
    { no: '02', label: 'Our Process' },
    { no: '03', label: 'Our Vision' },
  ],
};

// The profile card (m12). The platform, its button style and its verified tick are not reproduced.
export const PROFILE = {
  name: 'Sahra Real Estate',
  handle: '@sahrarealestate',
  bio: 'Sahra is where creativity meets purpose, crafting refined brand experiences that inspire and resonate. Through thoughtful design and a deep understanding of identity, we transform ideas into meaningful visual narratives.',
  action: 'Follow',
  header: LINES.imagination,
};

// ---------- Posters (m11, m14), hoarding (m16) ----------
export const POSTER_BODY = 'Sahra develops spaces that go beyond structure, focusing on how environments shape everyday life. Through a careful approach to design, proportion and materiality, each project is crafted to offer comfort, continuity and a sense of belonging. Rather than following trends, Sahra prioritizes timeless principles—creating spaces that remain relevant, adaptable and connected to the people who inhabit them.';
export const POSTERS = [
  { id: 'imagination', line: LINES.imagination, body: POSTER_BODY, ground: 'photo' },
  { id: 'built-around', line: LINES.builtAround, body: POSTER_BODY, ground: 'beige' },
  { id: 'elevate', line: LINES.elevate, sub: LINES.refined, ground: 'photo-beige' },
  { id: 'designing', line: LINES.designing, ground: 'black' },
];
export const HOARDING = { line: LINES.refinedLiving, sub: LINES.cleanArchitecture, button: URL_LINE, photoLine: LINES.imagination };

// ---------- The plan sheet in the presentation box (m13) ----------
export const PLAN = {
  sender: SENDER.developement,
  text: 'Floor planning at Sahra is approached as a balance between functionality, flow and spatial clarity, where each layout is designed to support natural movement and everyday living. The organization of spaces prioritizes openness, proportion and seamless transitions between areas, ensuring both comfort and efficiency. Every plan is carefully structured to maximize usability while maintaining a refined architectural rhythm that enhances the overall living experience.',
  // the plan's dimensions and room labels are illegible (SOURCE.md): plans are drawn without them
};

// ---------- The letter (m10, m01), read at full size ----------
export const LETTER = {
  sender: SENDER.developement,
  from: ['From:', SENDER.brand, CONTACT.city, CONTACT.phone, CONTACT.info],
  to: ['To:', '[Recipient Name]', '[Company Name]', '[Street Address]', '[City, Country]'],
  paragraphs: [
    'At Sahra, we approach real estate as more than construction—it is the art of shaping environments that support the way people live, interact and grow. Every project is guided by clarity, intention and a deep understanding of how space influences everyday experience.',
    'Through refined architectural thinking and thoughtful planning, we create spaces that balance function, comfort and timeless design. From proportions to materials, each detail is carefully considered to ensure a cohesive and lasting result.',
    'Our work is defined by simplicity and purpose, delivering developments that are not only visually refined but also meaningful in how they are experienced. At Sahra, we build spaces that endure, adapt and elevate modern living.',
    'We believe that well-designed spaces have the power to influence behavior, enhance well-being and create a sense of belonging. For this reason, our approach goes beyond aesthetics, focusing on how each environment performs in daily life. Circulation, light, scale and flow are carefully studied to ensure that every space feels intuitive, comfortable and naturally integrated into its surroundings.',
    'We also place strong emphasis on material selection and detail execution. Every surface, texture and finish is chosen to contribute to a cohesive atmosphere, where visual harmony meets durability. The result is a refined environment that feels effortless, yet is carefully crafted in every aspect.',
  ],
  close: 'Thanks',
};
// The folder and envelope sender block (m01, m10).
export const FROM_BLOCK = ['From:', SENDER.brand, CONTACT.city, CONTACT.phone, CONTACT.info];

// ---------- Construction (m03): the stills print "34°" on the Latin cuts (m03_2) and "42°" on the Arabic cuts (m03_3) ----------
export const CONSTRUCTION = { labels: { x: 'x', y: 'y', angle: '42°', angleLatin: '34°' } };

// ---------- Landing navigation: only the case study's own words ----------
export const NAV_LINKS = [
  { id: 'lp-home', label: 'About Sahra' },
  { id: 'lp-philosophy', label: 'Philosophy' },
  { id: 'lp-process', label: 'Our Process' },
  { id: 'lp-vision', label: 'Our Vision' },
];

// What the case study does NOT contain (never invent these): prices, statistics, project or development names,
// unit counts, areas, testimonials, dates other than 2026, people other than the card above.
export const NOT_PUBLISHED = ['prices', 'statistics', 'project names', 'unit counts', 'areas and sizes', 'testimonials', 'dates', 'people'];
