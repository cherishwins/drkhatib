import { SpeakingPage } from '@/components/khatib/SpeakingPage';
import { talks } from '@/content/speaking';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata, speakingEventsJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('ar');
export const metadata: Metadata = buildMetadata({
  title: dict.speaking.title,
  description: dict.speaking.lede,
  path: '/ar/speaking',
  locale: 'ar',
});

export default function Page() {
  // Schema.org properties are language-neutral; we ship EN-form titles for
  // crawler consistency on the AR mirror too.
  const ld = speakingEventsJsonLd(
    talks.map((t) => ({
      date: t.date,
      title: t.title_en,
      venue: t.venue,
      country: t.country,
      link: t.link,
    })),
  );
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <SpeakingPage locale="ar" dict={dict} />
    </>
  );
}
