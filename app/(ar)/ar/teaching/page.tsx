import { TeachingPage } from '@/components/khatib/TeachingPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.teaching.title,
  description: dict.teaching.lede,
  path: '/ar/teaching',
  locale: 'ar',
});

export default function Page() {
  return <TeachingPage locale="ar" dict={dict} />;
}
