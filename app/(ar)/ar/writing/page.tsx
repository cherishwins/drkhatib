import type { Metadata } from 'next';
import { WritingPage } from '@/components/khatib/WritingPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: 'الكتابة',
  description:
    'مقالات قيد الإعداد — ثلاثة نصوص للدكتور ميلاد الخطيب حول الصمود ممارسةً، براءة وعاء المجاري المائية اللبنانية، وكيفية انتقال المعرفة الهندسية فعلاً.',
  path: '/ar/writing',
  locale: 'ar',
});

export default function Page() {
  return <WritingPage locale="ar" dict={dict} />;
}
