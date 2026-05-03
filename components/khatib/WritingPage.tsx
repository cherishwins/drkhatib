import Link from 'next/link';
import type { Locale } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { SectionHeading } from './SectionHeading';

interface ForthcomingEssay {
  numeral: string;
  title_en: string;
  title_ar: string;
  blurb_en: string;
  blurb_ar: string;
}

// Three working titles drawn from Site-Plan §3H. These render as
// "Forthcoming" cards until Dr. Khatib drafts the actual essays.
const FORTHCOMING: ForthcomingEssay[] = [
  {
    numeral: '01',
    title_en: 'Resilience as a Discipline',
    title_ar: 'الصمود ممارسةً منهجية',
    blurb_en:
      'Why structural resilience is not a feature added at the end — and what twenty-seven years of post-tensioned slabs, dam grouting envelopes, and forensic re-analysis teach about treating it as a discipline of its own.',
    blurb_ar:
      'لماذا لا يكون الصمود الإنشائي خاصيّةً تُضاف في النهاية — وما الذي تعلّمنا إيّاه سبعة وعشرون عاماً من البلاطات سابقة الإجهاد، وحدود حقن السدود، وإعادة التحليل الفنية حول معاملته منهجيةً قائمةً بذاتها.',
  },
  {
    numeral: '02',
    title_en: 'A Vessel for Lebanese Waterways',
    title_ar: 'وعاء للمجاري المائية اللبنانية',
    blurb_en:
      'The 2023 patent, told problem-first: why imported industrial trash-skimmers do not fit Lebanese hydrology, and what a single-operator vessel made of locally-sourced HDPE actually changes for a municipality.',
    blurb_ar:
      'البراءة المسجَّلة عام 2023، تُروى من المشكلة أوّلاً: لماذا لا تتلاءم أجهزة كَشط القمامة الصناعية المستوردة مع الهيدرولوجيا اللبنانية، وما الذي يتغيّر فعلاً للبلدية حين يتوفّر وعاء يديره مشغّل واحد، ويُصنَّع من HDPE محلّي.',
  },
  {
    numeral: '03',
    title_en: 'How Engineering Knowledge Actually Moves',
    title_ar: 'كيف تتحرّك المعرفة الهندسية فعلاً',
    blurb_en:
      'What twenty-one editorial board memberships across the United States, the United Kingdom, India, China, and Singapore reveal about how reviewer-grade research crosses borders — and where Lebanese authorship still has under-served leverage.',
    blurb_ar:
      'ما الذي تكشفه إحدى وعشرون عضوية تحريرية بين الولايات المتحدة والمملكة المتحدة والهند والصين وسنغافورة عن كيفية انتقال البحث المحكَّم بين الحدود — وأين لا يزال للتأليف اللبناني نقاط رفع غير مستثمَرة.',
  },
];

export function WritingPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';
  const prefix = isAr ? '/ar' : '';
  return (
    <article className="bg-deep-navy">
      <header className="border-b border-warm-gray/15 px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            number="00"
            eyebrow={isAr ? 'الكتابة' : 'Writing'}
            title={isAr ? 'مقالات قيد الإعداد' : 'Essays in editing'}
            lede={
              isAr
                ? 'تتطلّب الكتابة بصوت السنوات السبع والعشرين وقتاً. ثلاثة عناوين قيد التحضير الآن. هذه الصفحة موجودة كي يكون السطح جاهزاً عندما تُنشَر.'
                : 'Writing in the voice of twenty-seven years takes time. Three pieces are in editing. This page exists so the surface is ready the moment they ship.'
            }
          />
        </div>
      </header>

      <section className="px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col gap-10">
          {FORTHCOMING.map((essay) => (
            <article
              key={essay.numeral}
              className="grid gap-4 border-l-2 border-gold/40 pl-6 md:grid-cols-[80px_1fr] md:gap-8 md:pl-8"
            >
              <div className="flex flex-col gap-2">
                <Mono className="text-xs uppercase tracking-tracked text-gold">{essay.numeral}</Mono>
                <Mono className="text-[10px] uppercase tracking-tracked text-warm-gray">
                  {isAr ? 'قيد التحرير' : 'In editing'}
                </Mono>
              </div>
              <div className="flex flex-col gap-3">
                <h2 className="font-display text-2xl font-semibold leading-snug text-cream md:text-3xl">
                  {isAr ? essay.title_ar : essay.title_en}
                </h2>
                <p className="text-base leading-relaxed text-warm-gray md:text-lg">
                  {isAr ? essay.blurb_ar : essay.blurb_en}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-gold/30 bg-deep-navy px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-6">
          <Mono className="text-[11px] uppercase tracking-tracked text-gold">
            {isAr ? 'تنبيه عند النشر' : 'Notify me when published'}
          </Mono>
          <p className="text-base leading-relaxed text-warm-gray md:text-lg">
            {isAr
              ? 'إذا أردتَ أن نراسلك حين ينزل أوّل مقال، أرسل لنا سطراً عبر صفحة التواصل — لا قائمة بريدية، فقط ردّ مباشر.'
              : 'If you want a note when the first essay drops, send a single line via the contact page. No mailing list — a direct reply.'}
          </p>
          <Link
            href={`${prefix}/contact`}
            className="border border-gold px-6 py-3 font-mono text-[11px] uppercase tracking-tracked text-gold transition-colors hover:bg-gold hover:text-deep-navy"
          >
            {isAr ? 'صفحة التواصل ←' : 'Contact page →'}
          </Link>
        </div>
      </section>
    </article>
  );
}
