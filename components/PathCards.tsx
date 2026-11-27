'use client';

import {
  BookOpenTextIcon,
  GameControllerIcon,
  WarningCircleIcon,
} from '@phosphor-icons/react';
import {VStack} from '@astryxdesign/core/Layout';
import {Grid} from '@astryxdesign/core/Grid';
import {Card} from '@astryxdesign/core/Card';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Button} from '@astryxdesign/core/Button';
import {Icon} from '@astryxdesign/core/Icon';

export type Audience = 'sos' | 'parents' | 'kids';

export type PathCardContent = {
  audience: Audience;
  title: string;
  description: string;
  action: string;
  href: string;
};

// Each audience keeps its accent and icon (see AGENTS.md, Design direction).
const look = {
  sos: {icon: WarningCircleIcon, color: 'error', button: 'sos'},
  parents: {icon: BookOpenTextIcon, color: 'teal', button: 'secondary'},
  kids: {icon: GameControllerIcon, color: 'yellow', button: 'secondary'},
} as const;

/** The three doors on the home page: SOS, parents, kids. */
export function PathCards({paths}: {paths: PathCardContent[]}) {
  return (
    <Grid columns={{minWidth: 260}} gap={8}>
      {paths.map((p) => {
        const {icon, color, button} = look[p.audience];
        return (
          <Card key={p.audience} elevation="low" padding={6}>
            <VStack gap={3}>
              <Icon icon={icon} size="lg" color={color} />
              <Heading level={2}>{p.title}</Heading>
              <Text type="body" color="secondary">
                {p.description}
              </Text>
              <Button label={p.action} variant={button} href={p.href} />
            </VStack>
          </Card>
        );
      })}
    </Grid>
  );
}
