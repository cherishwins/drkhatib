'use client';

import type { Dictionary } from '@/lib/i18n';
import type { Locale } from '@/lib/tokens';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LanguageToggle } from './LanguageToggle';
import { MobileMenu } from './MobileMenu';
import { Monogram } from './Monogram';
import { Wordmark } from './Wordmark';

const NAV_KEYS = [
  'about',
  'services',
  'patents',
  'publications',
  'editorial',
  'speaking',
  'contact',
] as const;

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const home = locale === 'en' ? '/' : '/ar';
  const prefix = locale === 'en' ? '' : '/ar';
  const pathname = usePathname() ?? '/';

  // A nav item is "active" when the current pathname starts with the item's
  // base href (so /services/structural correctly highlights "Services").
  const isActive = (key: string) => {
    const base = `${prefix}/${key}`;
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-warm-gray/15 bg-deep-navy/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-4">
        <Link href={home} className="flex items-center gap-3" aria-label={dict.meta.shortName}>
          <Monogram size={36} ariaLabel={dict.meta.shortName} />
          <Wordmark lang={locale === 'en' ? 'en' : 'ar'} className="hidden md:inline-flex" />
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-tracked text-warm-gray">
            {NAV_KEYS.map((key) => {
              const active = isActive(key);
              return (
                <li key={key}>
                  <Link
                    href={`${prefix}/${key}`}
                    aria-current={active ? 'page' : undefined}
                    className={clsx(
                      'relative inline-block py-1 transition-colors hover:text-gold',
                      active && 'text-gold',
                    )}
                  >
                    {dict.nav[key]}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <LanguageToggle locale={locale} dict={dict} />
          <MobileMenu locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  );
}
