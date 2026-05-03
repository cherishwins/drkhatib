import { PublicationsPage } from '@/components/khatib/PublicationsPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.publications.title,
  description: dict.publications.lede,
  path: '/ar/publications',
  locale: 'ar',
});

export default function Page() {
  return <PublicationsPage locale="ar" dict={dict} />;
}
