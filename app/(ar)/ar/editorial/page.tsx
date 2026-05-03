import { EditorialPage } from '@/components/khatib/EditorialPage';
import { editorialGroups } from '@/content/editorial-roles';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata, editorialRolesJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.editorial.title,
  description: dict.editorial.lede,
  path: '/ar/editorial',
  locale: 'ar',
});

export default function Page() {
  // Schema.org is language-neutral; ship the EN-form names so crawler graphs
  // resolve consistently across both locales.
  const ld = editorialRolesJsonLd(
    editorialGroups.flatMap((g) =>
      g.roles.map((r) => ({
        role: r.role,
        name: r.name,
        publisher: r.publisher,
        region: g.region,
        link: r.link,
      })),
    ),
  );
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <EditorialPage locale="ar" dict={dict} />
    </>
  );
}
