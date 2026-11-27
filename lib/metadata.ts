import type {Metadata} from 'next';
import {defaultLocale, htmlLang, locales, type Locale} from './i18n';

/**
 * The live origin: https://zastiti.me in production. Set NEXT_PUBLIC_SITE_URL
 * for a staging or preview deploy. Next builds every absolute URL below
 * (canonical, hreflang, og:url, og:image) from this.
 */
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zastiti.me',
);

/** og:locale wants language_TERRITORY. */
const ogLocale: Record<Locale, string> = {me: 'sr_ME', en: 'en_US'};

/** The 1200×630 share image: the logo on the paper ground. */
const shareImage = {
  url: '/images/og.png',
  width: 1200,
  height: 630,
};

/**
 * Per-page metadata: title, description, the canonical URL, an hreflang link
 * to the same page in every locale (x-default is Montenegrin), and the Open
 * Graph and Twitter tags.
 *
 * Next merges metadata shallowly, so a page that set `openGraph` itself would
 * drop the layout's. Every page calls this instead, so the shared fields stay
 * in one place. `path` is the route after the locale: '' for home, '/djeca'.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  siteName,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  siteName: string;
}): Metadata {
  const url = (l: Locale) => `/${l}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url(locale),
      languages: {
        ...Object.fromEntries(locales.map((l) => [htmlLang[l], url(l)])),
        'x-default': url(defaultLocale),
      },
    },
    openGraph: {
      type: 'website',
      url: url(locale),
      siteName,
      title,
      description,
      locale: ogLocale[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocale[l]),
      images: [{...shareImage, alt: siteName}],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [shareImage.url],
    },
  };
}
