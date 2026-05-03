import { PatentDetailPage } from '@/components/khatib/PatentsPage';
import { findPatent, patents } from '@/content/patents';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata, patentJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const dict = getDictionary('ar');

export function generateStaticParams() {
  return patents.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: { params: { slug: string } }): Promise<Metadata> {
  const patent = findPatent(params.slug);
  if (!patent) return {};
  return buildMetadata({
    title: patent.title_ar,
    description: patent.abstract_ar[0]?.slice(0, 160) ?? patent.title_ar,
    path: `/ar/patents/${patent.slug}`,
    locale: 'ar',
    ogType: 'article',
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const patent = findPatent(params.slug);
  if (!patent) notFound();
  // JSON-LD shipped in the EN form for crawler consistency — schema.org
  // properties are language-neutral but Google indexes the EN structure.
  const ld = patentJsonLd({
    slug: patent.slug,
    title: patent.title_en,
    abstract: patent.abstract_en.join(' '),
    year: patent.year,
    jurisdiction: patent.jurisdiction,
    inventors: patent.inventors,
    companion: patent.companion
      ? { citation: patent.companion.citation_en, doi: patent.companion.doi }
      : undefined,
  });
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <PatentDetailPage locale="ar" dict={dict} patent={patent} />
    </>
  );
}
