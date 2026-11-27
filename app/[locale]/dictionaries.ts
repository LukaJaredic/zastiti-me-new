import {notFound} from 'next/navigation';
import {locale} from 'next/root-params';
import {hasLocale, type Locale} from '@/lib/i18n';
import type me from '@/content/messages/me.json';

/**
 * The shape every locale must match: Montenegrin is the source of truth.
 * A key missing from (or extra in) en.json fails `tsc` here.
 */
export type Messages = typeof me;

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  me: () => import('@/content/messages/me.json').then((m) => m.default),
  en: () =>
    import('@/content/messages/en.json').then(
      (m) => m.default satisfies Messages,
    ),
};

/** The current request's locale, read from the [locale] root segment. */
export async function getLocale(): Promise<Locale> {
  const value = await locale();
  if (!hasLocale(value)) notFound();
  return value;
}

/** Messages for the current locale. Server Components only. */
export async function getDictionary(): Promise<Messages> {
  return dictionaries[await getLocale()]();
}
