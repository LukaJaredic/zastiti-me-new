'use client';

import {
  BookOpenTextIcon,
  GameControllerIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import {Layout, LayoutContent, VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';

// The three doors from the approved home page copy. Each audience keeps its
// accent: SOS = error (coral), parents = teal, kids = yellow.
const paths = [
  {
    title: 'SOS - prijavi nasilje',
    description: 'Hitna pomoć i podrška u slučaju digitalnog nasilja',
    cta: 'Prijavi odmah',
    href: '/sos',
    icon: WarningCircleIcon,
    color: 'error',
    variant: 'sos',
  },
  {
    title: 'Za roditelje',
    description: 'Vodiči i savjeti za zaštitu djece na internetu',
    cta: 'Saznaj više',
    href: '/roditelji',
    icon: BookOpenTextIcon,
    color: 'teal',
    variant: 'secondary',
  },
  {
    title: 'Za djecu',
    description: 'Sigurnost na internetu za najmlađe',
    cta: 'Saznaj više',
    href: '/djeca',
    icon: GameControllerIcon,
    color: 'yellow',
    variant: 'secondary',
  },
] as const;

export default function Home() {
  return (
    <Layout
      content={
        <LayoutContent padding={8}>
          <VStack gap={10}>
            <Heading level={1} type="display-2">
              Zaštiti.me
            </Heading>
            <Grid columns={{minWidth: 260}} gap={8}>
              {paths.map((p) => (
                <Card key={p.href} elevation="low" padding={6}>
                  <VStack gap={3}>
                    <Icon icon={p.icon} size="lg" color={p.color} />
                    <Heading level={2}>{p.title}</Heading>
                    <Text type="body" color="secondary">
                      {p.description}
                    </Text>
                    <Button label={p.cta} variant={p.variant} href={p.href} />
                  </VStack>
                </Card>
              ))}
            </Grid>
          </VStack>
        </LayoutContent>
      }
    />
  );
}
