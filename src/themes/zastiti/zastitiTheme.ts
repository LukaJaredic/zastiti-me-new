import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';
import {zastitiIcons} from './icons';

/**
 * Zaštiti.me theme: the design system's tokens mapped onto Astryx roles.
 * Source of truth: the "Zaštiti.me" design system (tokens.json). Each tuple is
 * [light, dark]. Rebuild after editing: `npx astryx theme build src/themes/zastiti/zastitiTheme.ts`.
 */
export const c = {
  paper: ['#f7f5f0', '#101713'],
  surface: ['#ffffff', '#17201b'],
  sunken: ['#efebe2', '#0b100d'],
  ink: ['#16211b', '#ebf0ec'],
  inkMuted: ['#4d5a52', '#a6b2aa'],
  line: ['#dfdacf', '#2a362f'],
  lineControl: ['#8b8678', '#6c7a71'],
  brand: ['#1e5a3c', '#86c9a1'],
  onBrand: ['#ffffff', '#0c1a12'],
  brandTint: ['#e2ede4', '#1b3125'],
  parents: ['#1b6478', '#7fc2d4'],
  onParents: ['#ffffff', '#0b1f26'],
  parentsTint: ['#e0eef2', '#16303a'],
  kids: '#f2c14e',
  onKids: '#16211b',
  kidsText: ['#7a5600', '#f2c14e'],
  kidsTint: ['#fcf1d4', '#352d16'],
  sos: ['#b33a1e', '#ff8f70'],
  onSos: ['#ffffff', '#2a0c04'],
  sosTint: ['#fbe7e0', '#3a1a11'],
} as const;

type Pair = readonly [string, string];
export const t = (v: Pair | string): [string, string] | string =>
  typeof v === 'string' ? v : [v[0], v[1]];

// The home illustrations' own background colours, sampled from the files.
// The doors are painted in them in both modes: the art is always light, so
// the door around it must match it exactly, and the text on it stays dark.
const doorArt = {kids: '#f3ba4a', parents: '#d6eaee'} as const;

// A door is a grid. On wide screens it is one cell: the art fills it and the
// text sits over the art's empty left side. HomeDoors places its two items
// with these custom properties.
const doorLayout = {
  borderRadius: 'var(--radius-container)',
  overflow: 'hidden',
  minHeight: '0',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'minmax(0, 1fr)',
  '--door-text-col': '1',
  '--door-text-align': 'start',
  '--door-text-max': '42%',
  '--door-art-width': '100%',
  '--door-art-side': 'stretch',
  '--door-art-position': 'right 35%',
  '--door-art-mask': 'none',
  '--door-art-flip': 'none',
} as const;

// Below lg the door splits into two columns, text beside the art, so the
// text never lands on the drawing whatever the phone's shape. The art is
// wider than its half and fades out under the edge of the text column, so
// there is no hard line where the picture stops.
const doorSideBySide = {
  borderRadius: '0',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  '--door-text-align': 'center',
  '--door-text-max': '100%',
} as const;

export const zastitiTheme = defineTheme({
  name: 'zastiti',
  extends: neutralTheme,
  icons: zastitiIcons,

  typography: {
    scale: {base: 16, ratio: 1.25},
    body: {
      family: 'var(--font-onest)',
      fallbacks: '"Segoe UI", system-ui, sans-serif',
    },
    // One family: headings are Onest too, carried by weight. Display and
    // h1 are bold, the rest semibold (design system, Typography). The
    // weights are set as tokens below: `heading.weights` would add a
    // per-level rule that overrides a Heading's `display-*` type.
    heading: {
      family: 'var(--font-onest)',
      fallbacks: '"Segoe UI", system-ui, sans-serif',
    },
    code: {
      family: 'ui-monospace',
      fallbacks: '"SF Mono", Consolas, monospace',
    },
  },

  tokens: {
    // Display sizes default to normal weight, which only suited a serif.
    '--text-heading-1-weight': 'var(--font-weight-bold)',
    '--text-display-1-weight': 'var(--font-weight-bold)',
    '--text-display-2-weight': 'var(--font-weight-bold)',
    '--text-display-3-weight': 'var(--font-weight-bold)',

    // Surfaces
    '--color-background-body': t(c.paper),
    '--color-background-surface': t(c.surface),
    '--color-background-card': t(c.surface),
    '--color-background-popover': t(c.surface),
    '--color-background-muted': t(c.sunken),

    // Brand (forest green from the logo)
    '--color-accent': t(c.brand),
    '--color-accent-muted': t(c.brandTint),
    '--color-text-accent': t(c.brand),
    '--color-icon-accent': t(c.brand),
    '--color-on-accent': t(c.onBrand),

    // Text and icons
    '--color-text-primary': t(c.ink),
    '--color-text-secondary': t(c.inkMuted),
    '--color-text-disabled': t(c.lineControl),
    '--color-icon-primary': t(c.ink),
    '--color-icon-secondary': t(c.inkMuted),
    '--color-icon-disabled': t(c.lineControl),

    // Borders
    '--color-border': t(c.line),
    '--color-border-emphasized': t(c.lineControl),

    // Status: success = brand, info = parents teal, warning = kids sun, error = SOS coral
    '--color-success': t(c.brand),
    '--color-on-success': t(c.onBrand),
    '--color-success-muted': t(c.brandTint),
    '--color-text-success': t(c.brand),
    '--color-on-success-muted': t(c.brand),

    '--color-info': t(c.parents),
    '--color-on-info': t(c.onParents),
    '--color-info-muted': t(c.parentsTint),
    '--color-text-info': t(c.parents),
    '--color-on-info-muted': t(c.parents),

    '--color-warning': t(c.kids),
    '--color-on-warning': t(c.onKids),
    '--color-warning-muted': t(c.kidsTint),
    '--color-text-warning': t(c.kidsText),
    '--color-on-warning-muted': t(c.ink),

    '--color-error': t(c.sos),
    '--color-on-error': t(c.onSos),
    '--color-error-muted': t(c.sosTint),
    '--color-text-error': t(c.sos),
    '--color-on-error-muted': t(c.sos),

    // Audience hues (Badge colours): teal = parents, yellow = kids, red = SOS, green = brand
    '--color-background-teal': t(c.parentsTint),
    '--color-text-teal': t(c.ink),
    '--color-icon-teal': t(c.parents),
    '--color-border-teal': t(c.parents),
    '--color-background-yellow': t(c.kidsTint),
    '--color-text-yellow': t(c.ink),
    '--color-icon-yellow': t(c.kidsText),
    '--color-border-yellow': t(c.kids),
    '--color-background-red': t(c.sosTint),
    '--color-text-red': t(c.ink),
    '--color-icon-red': t(c.sos),
    '--color-border-red': t(c.sos),
    '--color-background-green': t(c.brandTint),
    '--color-text-green': t(c.ink),
    '--color-icon-green': t(c.brand),
    '--color-border-green': t(c.brand),

    // Focus: 2px solid parents teal, 2px offset (6:1+ on paper and surface)
    '--focus-outline-color': t(c.parents),
    '--focus-outline-offset': '2px',

    // Large controls (header buttons, lg inputs) meet the 44px tap target.
    '--size-element-lg': '44px',

    // Shape
    '--radius-inner': '8px',
    '--radius-element': '12px',
    '--radius-container': '24px',
    '--radius-page': '32px',

    // Elevation: borders do most of the work
    '--shadow-low':
      '0 1px 2px light-dark(rgba(22, 33, 27, 0.06), rgba(0, 0, 0, 0.4))',
    '--shadow-med':
      '0 8px 24px light-dark(rgba(22, 33, 27, 0.10), rgba(0, 0, 0, 0.5))',
  },

  components: {
    // Home: the two doors. Two framed cards side by side, filling the screen
    // under the 72px header, on the same 1120px column as the header.
    section: {
      'variant:doors': {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-8)',
        paddingInlineStart: 'max(var(--spacing-6), calc((100% - 1120px) / 2))',
        paddingInlineEnd: 'max(var(--spacing-6), calc((100% - 1120px) / 2))',
        minHeight: 'calc(100dvh - 73px)',
        boxSizing: 'border-box',
      },
    },
    // ClickableCard takes its variant names from Card's variant map, and the
    // theme build only augments that map from `card` (Astryx 0.7.15). Enrol
    // the door variants here so the type exists; ClickableCard paints them.
    card: {
      'variant:door-kids': {backgroundColor: doorArt.kids},
      'variant:door-parents': {backgroundColor: doorArt.parents},
    },
    'clickable-card': {
      'variant:door-kids': {...doorLayout, backgroundColor: doorArt.kids},
      'variant:door-parents': {...doorLayout, backgroundColor: doorArt.parents},
    },
    // The header bar sits on the same 1120px column as the footer and pages,
    // 72px tall, the logo and the SOS button on the column's edges.
    'top-nav': {
      base: {
        maxWidth: 'calc(1120px + 2 * var(--spacing-6))',
        marginInline: 'auto',
        paddingInline: 'var(--spacing-6)',
        minHeight: '72px',
      },
    },
    // Nav words: 44px tap targets.
    'top-nav-item': {
      base: {
        minHeight: '44px',
      },
      // Current page: a soft tint pill in the accent of the door you are in.
      // The fill carries the state alongside aria-current, not colour alone.
      selected: {
        backgroundColor: 'var(--color-accent-muted)',
        color: 'var(--color-text-accent)',
        borderRadius: 'var(--radius-element)',
      },
    },
    button: {
      // Secondary: white surface with a 3:1 control border, not a grey fill.
      'variant:secondary': {
        backgroundColor: 'var(--color-background-surface)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-border-emphasized)',
      },
      // The SOS button: reporting violence only.
      'variant:sos': {
        backgroundColor: 'var(--color-error)',
        color: 'var(--color-on-error)',
      },
    },
  },

  adaptations: {
    rules: [
      // Phones and tablets: the doors stack, edge to edge, each half of the
      // screen under the header, so both are visible at once.
      {
        when: {width: {below: 'lg'}},
        value: {
          // Astryx's touch type scale resets display weights to normal
          // below lg; keep them bold like the rest of the headings.
          tokens: {
            '--text-display-1-weight': 'var(--font-weight-bold)',
            '--text-display-2-weight': 'var(--font-weight-bold)',
            '--text-display-3-weight': 'var(--font-weight-bold)',
            // Door titles share half the door with the art: one step smaller.
            '--text-display-2-size': 'var(--font-size-2xl)',
          },
          components: {
            section: {
              'variant:doors': {
                gridTemplateColumns: 'minmax(0, 1fr)',
                gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
                gap: '0',
                paddingBlock: '0',
                paddingInlineStart: '0',
                paddingInlineEnd: '0',
              },
            },
            // Text and art side by side; the parents' door mirrors the kids'
            // so the two read as a pair down the screen.
            'clickable-card': {
              'variant:door-kids': {
                ...doorSideBySide,
                '--door-text-col': '1',
                '--door-art-width': '68%',
                '--door-art-side': 'end',
                '--door-art-position': '70% 60%',
                '--door-art-mask': 'linear-gradient(to right, transparent, #000 45%)',
              },
              'variant:door-parents': {
                ...doorSideBySide,
                '--door-text-col': '2',
                // Mirrored, so mother and son sit against the screen edge
                // and the art's empty side faces the text. The image is
                // flipped, so position and mask are in its own (unflipped)
                // coordinates: 100% keeps the figures, "to right" fades the
                // edge that ends up beside the text. Two figures, so a little
                // narrower than the kids' art.
                '--door-art-flip': 'scaleX(-1)',
                '--door-art-width': '60%',
                '--door-art-side': 'start',
                '--door-art-position': '100% 60%',
                '--door-art-mask': 'linear-gradient(to right, transparent, #000 26%)',
              },
            },
          },
        },
      },
    ],
  },
});
