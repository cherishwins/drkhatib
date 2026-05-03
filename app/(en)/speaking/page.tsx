import { SpeakingPage } from '@/components/khatib/SpeakingPage';
import { talks } from '@/content/speaking';
import { getDictionary } from '@/lib/i18n';
import { buildMetadata, speakingEventsJsonLd } from '@/lib/metadata';
import type { Metadata } from 'next';

const dict = getDictionary('en');
export const metadata: Metadata = buildMetadata({
  title: dict.speaking.title,
  description: dict.speaking.lede,
  path: '/speaking',
  locale: 'en',
});

export default function Page() {
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
      <SpeakingPage locale="en" dict={dict} />
    </>
  );
}
