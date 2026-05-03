import { HomePage } from '@/components/khatib/HomePage';
import { publications } from '@/content/publications';
import { getDictionary } from '@/lib/i18n';
import {
  buildMetadata,
  personJsonLd,
  selectedPublicationsJsonLd,
  websiteJsonLd,
} from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('en');

// Same six anchor publications surfaced in HomePage. Kept in sync by num.
const SELECTED_NUMS = [29, 27, 14, 30, 39, 12];

export const metadata: Metadata = buildMetadata({
  title: 'Dr. Milad Khatib · Civil Engineering Consultancy',
  description:
    'Beirut-based civilian civil engineering consultancy. Structural, geotechnical, and forensic. Two registered patents, fifty-two peer-reviewed publications.',
  path: '/',
  locale: 'en',
  ogType: 'profile',
});

export default function HomeEn() {
  const selected = SELECTED_NUMS.map((n) => publications.find((p) => p.num === n)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const ld = [
    personJsonLd(),
    websiteJsonLd('en'),
    selectedPublicationsJsonLd(
      selected.map((p) => ({
        num: p.num,
        title: p.title,
        venue: p.venue,
        year: p.year,
        doi: p.doi,
      })),
    ),
  ];
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <HomePage locale="en" dict={dict} />
    </>
  );
}
