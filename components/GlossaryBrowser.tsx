"use client";

import { useEffect, useMemo, useState } from "react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { VStack } from "@astryxdesign/core/VStack";
import { Heading, Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";

export type GlossaryItem = { slug: string; term: string; definition: string };

/**
 * Folds text for matching, so a phone keyboard without š, č, ć, ž or đ
 * still finds the word: lower case, no accents, đ and dj as d.
 */
function fold(text: string) {
  return text
    .toLocaleLowerCase("sr-Latn")
    .replace(/đ/g, "d")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/dj/g, "d");
}

/** "Blokiranje (block)" → ["Blokiranje", "(block)"]. */
function splitTerm(term: string): [string, string | null] {
  const match = term.match(/^(.*?)\s*(\(.+\))$/);
  return match ? [match[1], match[2]] : [term, null];
}

/**
 * The glossary page's body, a split row: on the left the title, the search
 * field and the result count (it stays in view on desktop, from
 * app/globals.css); on the right the terms under their first letter. The
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
    found: string;
    empty: string;
  };
}) {
  const [query, setQuery] = useState("");

  // The term a link arrived at (#slug) glows once (app/globals.css). Read
  // from the hash rather than CSS :target, which client-side navigation
  // doesn't update.
  const [arrived, setArrived] = useState<string | null>(null);
  useEffect(() => {
    const read = () =>
      setArrived(decodeURIComponent(window.location.hash.slice(1)) || null);
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const indexed = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        name: fold(item.term),
        text: fold(item.definition),
      })),
    [items],
  );

  const needle = fold(query.trim());
  const visible = needle
    ? [
        ...indexed.filter((item) => item.name.includes(needle)),
        ...indexed.filter(
          (item) => !item.name.includes(needle) && item.text.includes(needle),
        ),
      ]
    : indexed;

  // Letter groups in order of first appearance: A to Z when the list is
  // whole, name matches first while searching.
  const groups = new Map<string, typeof visible>();
  for (const item of visible) {
    const letter = item.term[0].toLocaleUpperCase("sr-Latn");
    groups.set(letter, [...(groups.get(letter) ?? []), item]);
  }

  return (
    <>
      <VStack gap={6} style={{ gridArea: "text" }} data-glossary-aside="">
        <Heading level={1}>{messages.title}</Heading>
        <TextInput
          type="search"
          label={messages.searchLabel}
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
          {needle
            ? messages.found.replace("{count}", String(visible.length))
            : ""}
        </Text>
      </VStack>

      <VStack gap={10} style={{ gridArea: "art" }}>
        {visible.length === 0 ? (
          <Text type="large" color="secondary">
            {messages.empty.replace("{query}", query.trim())}
          </Text>
        ) : (
          [...groups].map(([letter, entries]) => (
            <VStack
              as="section"
              key={letter}
              gap={3}
              aria-labelledby={`slovo-${letter}`}
            >
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
                      data-arrived={item.slug === arrived ? "" : undefined}
                    >
                      <Heading level={3}>
                        {name}
                        {aside && (
                          <Text as="span" color="secondary" weight="normal">
                            {" "}
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
