import type { Metadata } from 'next';
import type { Locale } from './tokens';
import { brand, profiles } from './tokens';

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
  locale?: Locale;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: 'website' | 'profile' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`;

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const locale = input.locale ?? 'en';
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';
  const enPath = stripLocale(input.path);
  const arPath = enPath === '/' ? '/ar' : `/ar${enPath}`;
  const canonical = locale === 'en' ? enPath : arPath;
  const ogLocale = locale === 'en' ? 'en_US' : 'ar_LB';
  const altLocale = otherLocale === 'en' ? 'en_US' : 'ar_LB';

  // OG image strategy:
  // - The /patents/[slug] routes have a co-located opengraph-image.tsx that
  //   takes precedence automatically — those pages skip this default.
  // - Every other route gets the site-default render at the route-group root
  //   (app/(en)/opengraph-image.tsx). The file convention only applies at
  //   the same segment, so we set the URL explicitly here for nested pages.
  // - When a future page wants a custom OG, pass `ogImage` to override.
  const isPatentDetail = /^\/(?:ar\/)?patents\/[^/]+$/.test(input.path);
  const ogImage =
    input.ogImage ?? (isPatentDetail ? undefined : `${SITE}/opengraph-image`);
  const ogImageAlt =
    input.ogImageAlt ?? 'Dr. Milad Khatib · Civil Engineering Consultancy.';

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical,
      languages: {
        en: enPath,
        ar: arPath,
        'x-default': enPath,
      },
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url: `${SITE}${canonical}`,
      siteName: 'Dr. Milad Khatib · Civil Engineering Consultancy',
      type: input.ogType ?? 'website',
      locale: ogLocale,
      alternateLocale: [altLocale],
      ...(ogImage
        ? {
            images: [
              { url: ogImage, width: 1200, height: 630, alt: ogImageAlt, type: 'image/png' },
            ],
          }
        : {}),
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: {
      index: process.env.VERCEL_ENV !== 'preview',
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

function stripLocale(path: string): string {
  const stripped = path.replace(/^\/ar(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

// Civilian-only Person JSON-LD. Used on home and About.
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: brand.shortNameEn,
    alternateName: brand.shortNameAr,
    jobTitle: 'Civil Engineering Consultant',
    worksFor: [
      { '@type': 'EducationalOrganization', name: 'Lebanese International University' },
      { '@type': 'EducationalOrganization', name: 'University of Balamand' },
      { '@type': 'EducationalOrganization', name: 'ISSAE-Cnam Liban' },
    ],
    affiliation: [
      { '@type': 'Organization', name: 'Order of Engineers and Architects of Beirut (OEA)' },
      { '@type': 'Organization', name: 'SPSC Sustainability Programme' },
      { '@type': 'Organization', name: 'ACSE' },
    ],
    alumniOf: [
      { '@type': 'EducationalOrganization', name: 'Beirut Arab University' },
    ],
    knowsLanguage: ['en', 'fr', 'it', 'ar'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: brand.city,
      addressCountry: 'LB',
    },
    sameAs: [
      `https://orcid.org/${profiles.orcid}`,
      `https://www.scopus.com/authid/detail.uri?authorId=${profiles.scopus}`,
      `https://scholar.google.com/citations?user=${profiles.googleScholar}`,
      `https://www.researchgate.net/profile/${profiles.researchgate}`,
      `https://publons.com/researcher/${profiles.publons}`,
      `https://sciprofiles.com/profile/${profiles.sciprofiles}`,
    ],
    url: SITE,
    image: `${SITE}/opengraph-image`,
    description:
      'Beirut-based civilian civil engineering consultant. Structural, geotechnical, and forensic. Two registered Lebanese patents, fifty-two peer-reviewed publications, twenty-one editorial positions.',
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE,
    name: locale === 'en' ? brand.nameEn : brand.nameAr,
    inLanguage: locale === 'en' ? 'en' : 'ar',
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.href}`,
    })),
  };
}

interface PatentJsonLdInput {
  slug: string;
  title: string;
  abstract: string;
  year: number;
  jurisdiction: string;
  inventors: string;
  companion?: { citation: string; doi?: string };
}

// Schema.org doesn't have a first-class Patent type with full coverage, so we
// emit CreativeWork with additionalType per Google's structured-data guidance.
export function patentJsonLd(input: PatentJsonLdInput) {
  const url = `${SITE}/patents/${input.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    additionalType: 'https://schema.org/Patent',
    name: input.title,
    headline: input.title,
    description: input.abstract,
    url,
    inLanguage: 'en',
    datePublished: String(input.year),
    creator: input.inventors
      .split('·')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((name) => ({ '@type': 'Person', name })),
    locationCreated: {
      '@type': 'Country',
      name: input.jurisdiction,
    },
    ...(input.companion
      ? {
          isBasedOn: {
            '@type': 'ScholarlyArticle',
            name: input.companion.citation,
            ...(input.companion.doi
              ? {
                  identifier: {
                    '@type': 'PropertyValue',
                    propertyID: 'DOI',
                    value: input.companion.doi,
                  },
                  url: `https://doi.org/${input.companion.doi}`,
                }
              : {}),
          },
        }
      : {}),
  };
}

interface PublicationItem {
  num: number;
  title: string;
  venue: string;
  year: number;
  doi?: string;
}

interface EditorialRoleEntry {
  role: string;
  name: string;
  publisher: string;
  region: string;
  link?: string;
}

// Editorial board memberships rendered as ItemList of OrganizationRole.
// Helps Google understand the cross-border editorial network as a connected
// graph rather than a flat list — useful for "Khatib + journal" queries.
export function editorialRolesJsonLd(roles: EditorialRoleEntry[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Editorial board and reviewer positions held by Dr. Milad Khatib',
    itemListElement: roles.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'OrganizationRole',
        roleName: r.role,
        member: { '@type': 'Person', name: brand.shortNameEn },
        memberOf: {
          '@type': 'Organization',
          name: r.name,
          ...(r.publisher ? { parentOrganization: { '@type': 'Organization', name: r.publisher } } : {}),
          ...(r.link ? { url: r.link } : {}),
          areaServed: r.region,
        },
      },
    })),
  };
}

interface SpeakingEvent {
  date: string;
  title: string;
  venue: string;
  country: string;
  link?: string;
}

// Speaking engagements rendered as Event schema items inside an ItemList.
// Date is left in the source format (e.g. "Jul 2024") — Google's structured
// data validator accepts free-form when an exact ISO date isn't available.
export function speakingEventsJsonLd(events: SpeakingEvent[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected speaking engagements by Dr. Milad Khatib',
    itemListElement: events.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Event',
        name: e.title,
        startDate: e.date,
        location: {
          '@type': 'Place',
          name: e.venue,
          address: { '@type': 'PostalAddress', addressCountry: e.country },
        },
        performer: { '@type': 'Person', name: brand.shortNameEn },
        ...(e.link ? { url: e.link } : {}),
      },
    })),
  };
}

// Selected publications rendered as an ItemList of ScholarlyArticle so the
// home page surfaces structured author-publication evidence to crawlers.
export function selectedPublicationsJsonLd(items: PublicationItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Selected publications by Dr. Milad Khatib',
    itemListElement: items.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'ScholarlyArticle',
        headline: p.title,
        name: p.title,
        author: { '@type': 'Person', name: brand.shortNameEn },
        isPartOf: { '@type': 'Periodical', name: p.venue },
        datePublished: String(p.year),
        ...(p.doi
          ? {
              identifier: {
                '@type': 'PropertyValue',
                propertyID: 'DOI',
                value: p.doi,
              },
              url: `https://doi.org/${p.doi}`,
            }
          : {}),
      },
    })),
  };
}
