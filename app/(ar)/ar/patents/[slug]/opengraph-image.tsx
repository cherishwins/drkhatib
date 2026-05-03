// AR mirror of the patent OG. We keep the Latin script in the OG image for
// crawler legibility (LinkedIn, X, WhatsApp) — Arabic font rendering in
// satori is unreliable. Schema.org and human-facing AR pages handle Arabic
// natively; the share card is intentionally script-stable.

export { default, generateImageMetadata } from '@/app/(en)/patents/[slug]/opengraph-image';
export const alt = 'دراسة حالة براءة اختراع — د. ميلاد الخطيب';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
