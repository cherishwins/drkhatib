import { CvPage } from '@/components/khatib/CvPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: 'السيرة الذاتية',
  description:
    'سيرة ذاتية مدنية من صفحة واحدة للدكتور ميلاد الخطيب — مهندس استشاري في بيروت. متوافقة مع الطباعة.',
  path: '/ar/cv',
  locale: 'ar',
});

export default function Page() {
  return <CvPage locale="ar" dict={dict} />;
}
