import {NextResponse, type NextRequest} from 'next/server';
import {defaultLocale, hasLocale} from './lib/i18n';

/**
 * Every page lives under /me or /en. A path without a locale prefix always
 * goes to Montenegrin (the main language), whatever the browser prefers.
 * English is reached through the language switcher.
 */
export function proxy(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const first = pathname.split('/')[1] ?? '';
  if (hasLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and files with an extension (favicon, images).
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};
