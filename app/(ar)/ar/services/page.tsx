import { ServicesPage } from '@/components/khatib/ServicesPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.services.title,
  description: dict.services.lede,
  path: '/ar/services',
  locale: 'ar',
});

export default function Page() {
  return <ServicesPage locale="ar" dict={dict} />;
}
