import { PatentsIndexPage } from '@/components/khatib/PatentsPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.patents.title,
  description: dict.patents.lede,
  path: '/ar/patents',
  locale: 'ar',
});

export default function Page() {
  return <PatentsIndexPage locale="ar" dict={dict} />;
}
