'use client';

import {useState, useSyncExternalStore} from 'react';
import {MagnifyingGlassIcon} from '@phosphor-icons/react';
import {VStack} from '@astryxdesign/core/VStack';
import {Heading, Text} from '@astryxdesign/core/Text';
import {TextInput} from '@astryxdesign/core/TextInput';

export type GlossaryItem = {slug: string; term: string; definition: string};

/**
 * Folds text for matching, so a phone keyboard without š, č, ć, ž or đ
 * still finds the word: lower case, no accents, đ and dj as d.
 */
function fold(text: string) {
  return text
    .toLocaleLowerCase('sr-Latn')
    .replace(/đ/g, 'd')
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/dj/g, 'd');
}

/** "Blokiranje (block)" → ["Blokiranje", "(block)"]. */
function splitTerm(term: string): [string, string | null] {
  const match = term.match(/^(.*?)\s*(\(.+\))$/);
  return match ? [match[1], match[2]] : [term, null];
}

/**
 * The URL hash as an external store, read during render. Not CSS :target,
 * which client-side navigation doesn't update. The server and the static
 * HTML have no hash.
 */
function subscribeToHash(onChange: () => void) {
  window.addEventListener('hashchange', onChange);
  return () => window.removeEventListener('hashchange', onChange);
}

function readHash() {
  return decodeURIComponent(window.location.hash.slice(1)) || null;
}

function noHash() {
  return null;
}

/**
 * The glossary page's body, a split row: on the left the title, the search
 * field and the result count, on the right the terms under their first
 * letter. From tablets up the left side stays in view; on phones, where it
 * stacks above the list, only the search field does (app/globals.css). The
 * search narrows the list as you type, over terms and definitions alike;
 * terms whose name matches come first. Every term has its own anchor, so a
 * glossary popover can link straight to it.
 */
export function GlossaryBrowser({
  items,
  messages,
}: {
  items: GlossaryItem[];
  messages: {
    title: string;
    searchLabel: string;
    searchPlaceholder: string;
    found: string;
    empty: string;
  };
}) {
  const [query, setQuery] = useState('');

  // The term a link arrived at (#slug) glows once (app/globals.css).
  const arrived = useSyncExternalStore(subscribeToHash, readHash, noHash);

  // React Compiler memoises this; no useMemo.
  const indexed = items.map((item) => ({
    ...item,
    name: fold(item.term),
    text: fold(item.definition),
  }));

  const needle = fold(query.trim());
  const visible = needle
    ? [
        ...indexed.filter((item) => item.name.includes(needle)),
        ...indexed.filter((item) => !item.name.includes(needle) && item.text.includes(needle)),
      ]
    : indexed;

  // Letter groups in order of first appearance: A to Z when the list is
  // whole, name matches first while searching.
  const groups = new Map<string, typeof visible>();
  for (const item of visible) {
    const letter = item.term[0].toLocaleUpperCase('sr-Latn');
    groups.set(letter, [...(groups.get(letter) ?? []), item]);
  }

  return (
    <>
      <VStack gap={6} style={{gridArea: 'text'}} data-glossary-aside="">
        <Heading level={1}>{messages.title}</Heading>
        {/* On phones only this part sticks under the header (globals.css). */}
        <VStack gap={2} data-glossary-search="">
          <TextInput
            type="search"
            label={messages.searchLabel}
            placeholder={messages.searchPlaceholder}
            size="lg"
            value={query}
            onChange={setQuery}
            startIcon={MagnifyingGlassIcon}
            hasClear
            enterKeyHint="search"
            autoComplete="off"
            hasAutoCorrect={false}
            width="100%"
          />
          <Text color="secondary" role="status">
            {needle ? messages.found.replace('{count}', String(visible.length)) : ''}
          </Text>
        </VStack>
      </VStack>

      <VStack gap={10} style={{gridArea: 'art'}} data-glossary-list="">
        {visible.length === 0 ? (
          <Text type="large" color="secondary">
            {messages.empty.replace('{query}', query.trim())}
          </Text>
        ) : (
          [...groups].map(([letter, entries]) => (
            <VStack as="section" key={letter} gap={3} aria-labelledby={`slovo-${letter}`}>
              <Heading level={2} id={`slovo-${letter}`} color="accent">
                {letter}
              </Heading>
              <VStack gap={6}>
                {entries.map((item) => {
                  const [name, aside] = splitTerm(item.term);
                  return (
                    <VStack
                      key={item.slug}
                      id={item.slug}
                      gap={1}
                      data-glossary-entry=""
                      data-arrived={item.slug === arrived ? '' : undefined}
                    >
                      <Heading level={3}>
                        {name}
                        {aside && (
                          <Text as="span" color="secondary" weight="normal">
                            {' '}
                            {aside}
                          </Text>
                        )}
                      </Heading>
                      <Text type="large" color="secondary" as="p">
                        {item.definition}
                      </Text>
                    </VStack>
                  );
                })}
              </VStack>
            </VStack>
          ))
        )}
      </VStack>
    </>
  );
}
