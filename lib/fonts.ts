import { Cormorant_Garamond, IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';

// Font weights are deliberately scoped to what the codebase actually uses.
// Each weight Next.js fetches gets preloaded on first paint at ~25-40 KB,
// so unused weights translate directly to wasted bandwidth on every visit.
//
// Audit (re-run if usage changes): grep -rh 'font-(medium|semibold|bold)' app/ components/

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  // Display headlines only — never used at regular weight.
  weight: ['500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  // 400 default body, 500 mono labels and pill text, 600 nav and emphasis.
  weight: ['400', '500', '600'],
  variable: '--font-plex-sans',
  display: 'swap',
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  // Same coverage as Latin sans — 400 body, 500/600 for headings.
  weight: ['400', '500', '600'],
  variable: '--font-plex-arabic',
  display: 'swap',
});

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  // Mono used for eyebrows, labels, technical metadata.
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const fontVariables = `${cormorant.variable} ${plexSans.variable} ${plexArabic.variable} ${plexMono.variable}`;
