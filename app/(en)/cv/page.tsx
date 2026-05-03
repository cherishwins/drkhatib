import type { Metadata } from 'next';
import { CvPage } from '@/components/khatib/CvPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: 'CV',
  description:
    'Single-page civilian curriculum vitae for Dr. Milad Khatib — civil engineering consultant, Beirut. Print-friendly.',
  path: '/cv',
  locale: 'en',
});

export default function Page() {
  return <CvPage locale="en" dict={dict} />;
}
