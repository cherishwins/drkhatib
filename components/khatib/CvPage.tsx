import type { Locale } from '@/lib/tokens';
import { brand, profiles } from '@/lib/tokens';
import type { Dictionary } from '@/lib/i18n';
import { Mono } from './atoms';
import { PrintButton } from './PrintButton';
import { timeline } from '@/content/timeline';
import { teaching } from '@/content/teaching';
import { editorialGroups, editorialTotal } from '@/content/editorial-roles';
import { totalCount as pubCount } from '@/content/publications';
import { patents } from '@/content/patents';

// Single-page printable CV. Cream background; navy text; no images; no JS.
// Print-friendly: print:bg-white, print:hidden controls below.

export function CvPage({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isAr = locale === 'ar';

  return (
    <article className="bg-stone/10 px-4 py-12 print:bg-white print:p-0 md:px-8 md:py-16">
      {/* Print bar — hidden on print itself */}
      <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between text-warm-gray print:hidden">
        <Mono className="text-[11px] uppercase tracking-tracked text-warm-gray">
          {isAr ? 'سيرة ذاتية مدنية' : 'Civilian curriculum vitae'}
        </Mono>
        <PrintButton label={isAr ? 'طباعة ←' : 'Print →'} />
      </div>

      {/* Sheet */}
      <div className="mx-auto max-w-4xl bg-cream px-8 py-12 text-deep-navy shadow-2xl shadow-deep-navy/40 print:max-w-full print:shadow-none md:px-16 md:py-16">
        {/* Header */}
        <header className="border-b-2 border-gold pb-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold leading-tight md:text-4xl">
                {isAr ? brand.shortNameAr : brand.shortNameEn}
              </h1>
              <p className="mt-1 font-mono text-xs uppercase tracking-tracked text-stone md:text-sm">
                {isAr ? 'مهندس مدني · بيروت · لبنان' : 'Civil Engineer · Beirut · Lebanon'}
              </p>
            </div>
            <div className="flex flex-col gap-1 text-xs text-stone md:items-end md:text-right">
              <span>{brand.emailPlaceholder}</span>
              {brand.phoneConfirmed && <span>{brand.phoneCandidate}</span>}
              <span>ORCID {profiles.orcid}</span>
            </div>
          </div>
        </header>

        {/* Bio */}
        <section className="mt-8">
          <p className="text-base leading-relaxed text-stone">{dict.about.bio[0]}</p>
        </section>

        {/* Career timeline */}
        <Section label={dict.about.section2Title}>
          <ul className="flex flex-col gap-3">
            {timeline.map((entry) => (
              <li
                key={`${entry.year}-${entry.institution}`}
                className="grid grid-cols-[80px_1fr] items-baseline gap-3 md:grid-cols-[110px_1fr]"
              >
                <Mono className="text-xs text-gold-dark">{entry.year}</Mono>
                <div>
                  <span className="font-medium text-deep-navy">
                    {isAr ? entry.role_ar : entry.role_en}
                  </span>
                  <span className="text-stone"> · {entry.institution}</span>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* Teaching */}
        <Section label={dict.teaching.title}>
          <ul className="flex flex-col gap-3">
            {teaching.map((p) => (
              <li
                key={p.institution}
                className="grid grid-cols-[140px_1fr] items-baseline gap-3 md:grid-cols-[200px_1fr]"
              >
                <span className="text-sm font-medium text-deep-navy">{p.institution}</span>
                <div className="text-sm text-stone">
                  <Mono className="text-[11px] text-gold-dark">{p.period}</Mono>
                  <ul className="mt-1 list-inside list-disc">
                    {(isAr ? p.courses_ar : p.courses_en).map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* Patents */}
        <Section label={dict.patents.title}>
          <ul className="flex flex-col gap-4">
            {patents.map((p) => (
              <li key={p.slug}>
                <Mono className="text-[11px] text-gold-dark">
                  {p.year} · {p.jurisdiction}
                </Mono>
                <p className="mt-1 font-medium text-deep-navy">
                  {isAr ? p.title_ar : p.title_en}
                </p>
                <p className="mt-1 text-sm text-stone">
                  {isAr ? 'المخترعون' : 'Inventors'}: {p.inventors}
                </p>
                {p.companion?.doi && (
                  <p className="mt-1 text-sm text-stone">
                    {isAr ? 'منشور مرافق' : 'Companion'}: DOI {p.companion.doi}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </Section>

        {/* Publications counter */}
        <Section
          label={`${dict.nav.publications} (${pubCount})`}
        >
          <p className="text-sm text-stone">
            {isAr
              ? `قائمة كاملة بـ ${pubCount} منشوراً متاحة على ${brand.domain}/ar/publications`
              : `Full list of ${pubCount} publications available at ${brand.domain}/publications`}
          </p>
        </Section>

        {/* Editorial counter */}
        <Section label={`${dict.editorial.title} (${editorialTotal})`}>
          <ul className="flex flex-col gap-2">
            {editorialGroups.map((g) => (
              <li key={g.region} className="text-sm text-stone">
                <span className="font-medium text-deep-navy">{g.region}</span> · {g.roles.length}{' '}
                {isAr ? 'دوراً' : 'roles'}
              </li>
            ))}
          </ul>
        </Section>

        {/* Languages + Software + Memberships */}
        <div className="mt-8 grid gap-8 border-t border-gold/40 pt-8 md:grid-cols-3">
          <CompactBlock label={dict.about.languagesLabel}>
            <ul className="text-sm text-stone">
              {dict.about.languages.map((l) => (
                <li key={l.name}>
                  <span className="text-deep-navy">{l.name}</span> · {l.level}
                </li>
              ))}
            </ul>
          </CompactBlock>
          <CompactBlock label={dict.about.softwareLabel}>
            <p className="font-mono text-xs text-stone">{dict.about.software.join(' · ')}</p>
          </CompactBlock>
          <CompactBlock label={dict.about.membershipsLabel}>
            <ul className="text-sm text-stone">
              {dict.about.memberships.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </CompactBlock>
        </div>

        {/* Footer rule */}
        <footer className="mt-12 border-t-2 border-gold pt-4 text-center font-mono text-[10px] uppercase tracking-tracked-wide text-stone">
          {brand.domain} · ORCID {profiles.orcid} · Scopus {profiles.scopus}
        </footer>
      </div>
    </article>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mt-8 border-t border-gold/40 pt-6">
      <Mono className="mb-4 block text-[11px] uppercase tracking-tracked-wide text-gold-dark">
        {label}
      </Mono>
      {children}
    </section>
  );
}

function CompactBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Mono className="mb-2 block text-[10px] uppercase tracking-tracked-wide text-gold-dark">
        {label}
      </Mono>
      {children}
    </div>
  );
}
