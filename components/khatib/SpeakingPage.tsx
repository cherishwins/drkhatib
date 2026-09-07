import { talks } from '@/content/speaking';
import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/tokens';
import { speakingJsonLd } from '@/lib/speaking-jsonld';
import Image from 'next/image';
import { SectionHeading } from './SectionHeading';
import { Mono } from './atoms';

export function SpeakingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  return (
    <article className="bg-deep-navy">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingJsonLd()) }}
      />
      {/* Header with ambient conference photo — composition only, no specific
          event caption per brand-kit "real captions only" rule. The image is
          treated as ambient context (low opacity, gradient mask). */}
      <header className="relative overflow-hidden border-b border-warm-gray/15">
        <div className="absolute inset-0">
          <Image
            src="/images/dr-khatib-international.png"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-[0.18]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/30 via-deep-navy/70 to-deep-navy" />
        </div>
        <div className="relative mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-28">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'المحاضرات' : 'Speaking'}
            title={dict.speaking.title}
            lede={dict.speaking.lede}
          />
          <p className="mt-6 font-mono text-sm uppercase tracking-tracked text-gold">
            {talks.length} {isAr ? 'محاضرة منتقاة' : 'selected talks'}
          </p>
        </div>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          <ul className="flex flex-col">
            {talks.map((t) => (
              <li
                key={`${t.date}-${t.title_en}`}
                className="grid gap-3 border-b border-warm-gray/15 py-6 md:grid-cols-[110px_1fr_1fr] md:gap-6"
              >
                <Mono className="text-xs uppercase tracking-tracked text-gold">{t.date}</Mono>
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-lg font-semibold leading-snug text-cream md:text-xl">
                    {isAr ? t.title_ar : t.title_en}
                  </h3>
                  <p className="text-sm text-warm-gray">{t.venue}</p>
                  {t.highlight && (
                    <span className="self-start rounded-sm bg-gold/15 px-2 py-1 font-mono text-[10px] uppercase tracking-tracked text-gold">
                      {t.highlight}
                    </span>
                  )}
                  {t.link && (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[11px] uppercase tracking-tracked text-gold underline-offset-2 hover:underline"
                    >
                      {isAr ? 'تحقّق ←' : 'Verify →'}
                    </a>
                  )}
                </div>
                <Mono className="text-[11px] uppercase tracking-tracked text-warm-gray md:justify-self-end">
                  {t.country}
                </Mono>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
