/**
 * Locale config shared by proxy.ts, layouts and dictionaries.
 * Plain constants only: safe to import from the proxy, server and client code.
 */

export const locales = ['me', 'en'] as const;
export type Locale = (typeof locales)[number];

/** Montenegrin first. */
export const defaultLocale: Locale = 'me';

/**
 * Value for <html lang>. Montenegrin's own code (`cnr`) is barely supported by
 * browsers and screen readers; `sr-Latn-ME` gets correct pronunciation and
 * hyphenation for Latin-script Montenegrin.
 */
export const htmlLang: Record<Locale, string> = {
  me: 'sr-Latn-ME',
  en: 'en',
};

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
