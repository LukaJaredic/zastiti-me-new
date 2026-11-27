'use client';

import {usePathname} from 'next/navigation';
import {Link} from '@astryxdesign/core/Link';
import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {isCurrentPath, underlineSeed} from './siteNav';

/**
 * A footer list of page links with the nav's hand-drawn underline (design
 * system, Paper craft): the current page gets the line and aria-current,
 * hover shows it faintly, and the shapes are handed out in turn. A client
 * component only because the current page comes from the URL; SiteFooter
 * stays a server component.
 */
export function FooterLinks({
  links,
  layout,
}: {
  links: {label: string; href: string}[];
  /** `column`: the quick links, body text in ink. `row`: the legal row,
   * small and muted. */
  layout: 'column' | 'row';
}) {
  const pathname = usePathname();
  const items = links.map(({label, href}, i) => {
    const isCurrent = isCurrentPath(pathname, href);
    return (
      <Link
        key={href}
        href={href}
        type={layout === 'row' ? 'supporting' : 'body'}
        color={layout === 'row' && !isCurrent ? 'secondary' : 'primary'}
        weight={isCurrent ? 'semibold' : undefined}
        aria-current={isCurrent ? 'page' : undefined}
        data-underline-seed={underlineSeed(i)}
      >
        {label}
      </Link>
    );
  });

  return layout === 'row' ? (
    <HStack gap={6} wrap="wrap">
      {items}
    </HStack>
  ) : (
    <VStack gap={3} hAlign="start">
      {items}
    </VStack>
  );
}
