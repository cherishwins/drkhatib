import { WritingPage } from '@/components/khatib/WritingPage';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: 'Writing',
  description:
    'Essays in editing — three pieces from Dr. Milad Khatib on resilience as a discipline, the Lebanese waterway-vessel patent, and how engineering knowledge actually moves.',
  path: '/writing',
  locale: 'en',
});

export default function Page() {
  return <WritingPage locale="en" dict={dict} />;
}
