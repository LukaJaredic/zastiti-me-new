import {Link} from '@astryxdesign/core/Link';
import {Text} from '@astryxdesign/core/Text';

/**
 * "Zaštiti.me" set in the display face, the dot in the accent (brand green,
 * or the door's colour inside a door). Stands in until the shield logo SVG is
 * in the design system.
 */
export function Wordmark({
  name,
  href,
  size = 'xl',
}: {
  name: string;
  href: string;
  size?: 'xl' | '3xl';
}) {
  const dot = name.lastIndexOf('.');
  return (
    <Link href={href} color="primary" isStandalone>
      <Text type="display-3" size={size} weight="semibold">
        {dot > 0 ? (
          <>
            {name.slice(0, dot)}
            <Text type="inherit" color="accent">
              .
            </Text>
            {name.slice(dot + 1)}
          </>
        ) : (
          name
        )}
      </Text>
    </Link>
  );
}
