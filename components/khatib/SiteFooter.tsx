import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/tokens';
import { brand, profiles } from '@/lib/tokens';
import Link from 'next/link';
import { Monogram } from './Monogram';
import { Wordmark } from './Wordmark';
import { Mono, Tagline } from './atoms';

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const prefix = locale === 'en' ? '' : '/ar';
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gold/30 bg-deep-navy">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        {/* Identity row */}
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Monogram size={44} ariaLabel={dict.meta.shortName} />
              <Wordmark lang="both" />
            </div>
            <Tagline lang={locale === 'en' ? 'en' : 'ar'} />
            <p className="max-w-xs text-sm leading-relaxed text-warm-gray">{dict.footer.oeaLine}</p>
            <p className="max-w-xs text-sm text-warm-gray">
              <a
                href={`mailto:${brand.emailPlaceholder}`}
                className="text-cream transition-colors hover:text-gold"
              >
                {brand.emailPlaceholder}
              </a>
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 md:grid-cols-3 md:gap-12">
            <FooterColumn label={dict.footer.practice}>
              <FooterLink href={`${prefix}/services/structural`}>
                {dict.services.structural?.title ?? 'Structural'}
              </FooterLink>
              <FooterLink href={`${prefix}/services/geotechnical`}>
                {dict.services.geotechnical?.title ?? 'Geotechnical'}
              </FooterLink>
              <FooterLink href={`${prefix}/services/forensic`}>
                {dict.services.forensic?.title ?? 'Forensic'}
              </FooterLink>
              <FooterLink href={`${prefix}/teaching`}>{dict.nav.teaching}</FooterLink>
            </FooterColumn>

            <FooterColumn label={dict.footer.registration}>
              <FooterLink href={`${prefix}/about`}>{dict.nav.about}</FooterLink>
              <FooterLink href={`${prefix}/cv`}>
                {locale === 'en' ? 'CV' : 'السيرة الذاتية'}
              </FooterLink>
              <FooterLink href={`${prefix}/editorial`}>{dict.nav.editorial}</FooterLink>
              <FooterLink href={`${prefix}/speaking`}>{dict.nav.speaking}</FooterLink>
              <FooterLink href={`${prefix}/legal/imprint`}>{dict.footer.imprint}</FooterLink>
            </FooterColumn>

            <FooterColumn label={dict.footer.innovation}>
              <FooterLink href={`${prefix}/patents`}>{dict.nav.patents}</FooterLink>
              <FooterLink href={`${prefix}/publications`}>{dict.nav.publications}</FooterLink>
              <FooterExternal href={`https://orcid.org/${profiles.orcid}`}>ORCID</FooterExternal>
              <FooterExternal
                href={`https://www.scopus.com/authid/detail.uri?authorId=${profiles.scopus}`}
              >
                Scopus
              </FooterExternal>
              <FooterExternal
                href={`https://scholar.google.com/citations?user=${profiles.googleScholar}`}
              >
                Google Scholar
              </FooterExternal>
            </FooterColumn>
          </nav>
        </div>

        {/* Gold rule with mark — separator + signature in one element */}
        <div className="mt-16 flex items-center gap-4" aria-hidden="true">
          <div className="h-px flex-1 bg-gold/40" />
          <Mono className="text-[10px] uppercase tracking-tracked-wide text-gold/70">ENG · LB</Mono>
          <div className="h-px flex-1 bg-gold/40" />
        </div>

        {/* Legal row */}
        <div className="mt-10 flex flex-col gap-4 text-xs text-warm-gray md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {brand.shortNameEn}. {dict.footer.rights}
          </span>
          <Mono className="text-[10px] uppercase tracking-tracked text-warm-gray/80">
            ORCID {profiles.orcid}
          </Mono>
          <ul className="flex gap-5">
            <li>
              <Link className="transition-colors hover:text-cream" href={`${prefix}/legal/privacy`}>
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link className="transition-colors hover:text-cream" href={`${prefix}/legal/terms`}>
                {dict.footer.terms}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <Mono className="text-[10px] uppercase tracking-tracked-wide text-gold">{label}</Mono>
      <ul className="flex flex-col gap-2.5 text-sm text-warm-gray">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link className="transition-colors hover:text-cream" href={href}>
        {children}
      </Link>
    </li>
  );
}

function FooterExternal({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a
        className="transition-colors hover:text-cream"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    </li>
  );
}
