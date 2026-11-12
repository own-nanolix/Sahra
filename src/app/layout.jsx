import { Source_Serif_4, Inter_Tight } from 'next/font/google';
import './globals.css';
import Providers from '@/components/site/Providers';
import ExportMode from '@/components/site/ExportMode';

// The brand serif is Test Tiempos Text. The closest free Google face is Source Serif 4: a
// sturdy text serif with a large x-height, wedge serifs and the same calm, slightly condensed rhythm; its optical
// size axis keeps headlines tight. "Test Tiempos Text" stays first in the CSS stack (globals.css).
// The sans is an unnamed light grotesque, set slightly tight: Inter Tight is the closest free match.
const serif = Source_Serif_4({ variable: '--font-source-serif', subsets: ['latin'], weight: 'variable', axes: ['opsz'], style: ['normal', 'italic'], display: 'swap' });
const sans = Inter_Tight({ variable: '--font-inter-tight', subsets: ['latin'], weight: ['300', '400', '500'], display: 'swap' });

export const metadata = {
  title: { template: '%s · Sahra', default: 'Sahra' },
  description: 'Sahra brand system: word-mark, colour, type, motion, product, landing pages and the physical brand.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <ExportMode />
      </body>
    </html>
  );
}
