import {c, t} from './zastitiTheme';

/**
 * The three doors as accent overrides. An audience theme extends `zastiti`
 * and swaps only the accent family, so a page inside a door paints its links,
 * selected nav item and header mark in that door's colour (AGENTS.md: SOS =
 * coral, parents = teal, kids = sun). Everything else stays the brand theme.
 */
type Accent = {
  fill: readonly [string, string] | string;
  onFill: readonly [string, string] | string;
  text: readonly [string, string] | string;
  tint: readonly [string, string] | string;
};

export function accentTokens(a: Accent) {
  return {
    '--color-accent': t(a.fill),
    '--color-on-accent': t(a.onFill),
    '--color-text-accent': t(a.text),
    '--color-icon-accent': t(a.text),
    '--color-accent-muted': t(a.tint),
  };
}

/** The door's colour as a 4px mark along the top of the header. */
export const headerMark = {
  'app-shell-header': {
    base: {
      borderTopWidth: '4px',
      borderTopStyle: 'solid',
      borderTopColor: 'var(--color-accent)',
    },
  },
} as const;

export const accents = {
  parents: {
    fill: c.parents,
    onFill: c.onParents,
    text: c.parents,
    tint: c.parentsTint,
  },
  // Sun is a fill only: text on light grounds uses the darker kidsText.
  kids: {fill: c.kids, onFill: c.onKids, text: c.kidsText, tint: c.kidsTint},
  sos: {fill: c.sos, onFill: c.onSos, text: c.sos, tint: c.sosTint},
} satisfies Record<string, Accent>;
