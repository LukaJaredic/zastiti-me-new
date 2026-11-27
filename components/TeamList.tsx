import {VStack} from '@astryxdesign/core/VStack';
import {HStack} from '@astryxdesign/core/HStack';
import {Text} from '@astryxdesign/core/Text';
import {listGrid} from './listGrid';

type Field = {
  label: string;
  members: {name: string; role: string}[];
};

/** "Marko Đurović" → "MĐ". */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2);
}

/**
 * The team, one group per field: the field's name in the accent, then its
 * members two to a row where they fit. Each member is a name and role with
 * an initials tile on paper (until portraits arrive); the tile is
 * decorative and comes after the name in the markup, drawn first by
 * `order`.
 */
export function TeamList({fields}: {fields: Field[]}) {
  return (
    <VStack gap={8}>
      {fields.map((field) => (
        <VStack as="section" key={field.label} gap={5} aria-label={field.label}>
          <Text type="supporting" color="accent">
            {field.label}
          </Text>
          <VStack
            as="ul"
            style={listGrid({
              minColumn: 'calc(60 * var(--spacing-1))',
              maxColumns: 2,
              columnGap: 'var(--spacing-5)',
            })}
          >
            {field.members.map((member) => (
              <HStack as="li" key={member.name} gap={5} vAlign="center">
                <VStack gap={0.5}>
                  <Text type="large">{member.name}</Text>
                  <Text color="secondary">{member.role}</Text>
                </VStack>
                <VStack
                  aria-hidden
                  hAlign="start"
                  vAlign="end"
                  padding={3}
                  style={{
                    order: -1,
                    flex: 'none',
                    width: 'calc(3 * var(--spacing-8))',
                    height: 'calc(3.5 * var(--spacing-8))',
                    boxSizing: 'border-box',
                    borderRadius: 'var(--radius-container)',
                    backgroundColor: 'var(--color-accent-muted)',
                    boxShadow: 'var(--shadow-cut)',
                  }}
                >
                  <Text size="3xl" weight="bold" color="accent">
                    {initials(member.name)}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
}
