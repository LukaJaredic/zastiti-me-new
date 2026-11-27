import {defineTheme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral';
import {zastitiIcons} from './icons';

/**
 * Zaštiti.me theme: the design system's tokens mapped onto Astryx roles.
 * Source of truth: the "Zaštiti.me" design system (tokens.json). Each tuple is
 * [light, dark]. Rebuild after editing: `npx astryx theme build src/themes/zastiti/zastitiTheme.ts`.
 */
export const c = {
  paper: ['#f6efe1', '#101713'],
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
  // Paper craft (design system, Paper craft): the header strip, the cream
  // footer band taken from the illustrations' highlights, and the darker
  // edge under the SOS button. In dark mode the strip and band fall back to
  // surface and sunken: no cream at night.
  strip: ['#fffaf0', '#17201b'],
  cream: ['#f3e6cb', '#0b100d'],
  // The mobile menu sheet: cream; at night a step lighter than the page so
  // it reads as lying on top.
  sheet: ['#f3e6cb', '#1b231e'],
  sosEdge: ['#7a2410', '#a8442a'],
} as const;

type Pair = readonly [string, string];
export const t = (v: Pair | string): [string, string] | string =>
  typeof v === 'string' ? v : [v[0], v[1]];

// The home illustrations' own background colours, sampled from the files.
// The doors are painted in them in both modes: the art is always light, so
// the door around it must match it exactly, and the text on it stays dark.
const doorArt = {kids: '#f9b52e', parents: '#c7e8eb'} as const;

// A door is a grid. On wide screens it is one cell: the art fills it and the
// text sits over the art's empty corner (top-left for kids, top-right for
// parents). HomeDoors places its two items with these custom properties.
const doorLayout = {
  // Cut paper: 32px corners, a crisp edge under a soft lift, a 2px rise on
  // hover and a 2px press when tapped or clicked (design system, Paper
  // craft). The press is quicker than the rise so it feels immediate.
  // The rise is in app/globals.css: it only applies on devices that can
  // hover (@media (hover: hover)), which a theme override can't express.
  borderRadius: 'var(--radius-page)',
  boxShadow: 'var(--shadow-cut)',
  transition: 'transform 160ms ease-out, box-shadow 160ms ease-out',
  ':active': {
    transform: 'translateY(2px)',
    boxShadow: 'var(--shadow-cut-pressed)',
    transitionDuration: '80ms',
  },
  overflow: 'hidden',
  minHeight: '0',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gridTemplateRows: 'minmax(0, 1fr)',
  '--door-text-col': '1',
  '--door-text-align': 'start',
  '--door-text-side': 'start',
  '--door-text-width': '100%',
  '--door-text-items': 'flex-start',
  '--door-text-anchor': 'start',
  '--door-text-max': '42%',
  '--door-art-width': '100%',
  '--door-art-side': 'stretch',
  '--door-art-position': 'right 35%',
  '--door-art-mask': 'none',
} as const;

// Below lg the door splits into two columns, text beside the art, so the
// text never lands on the drawing whatever the phone's shape. The art is
// wider than its half and fades out under the edge of the text column, so
// there is no hard line where the picture stops.
const doorSideBySide = {
  borderRadius: '0',
  gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
  '--door-text-align': 'center',
  '--door-text-side': 'start',
  '--door-text-width': '100%',
  '--door-text-items': 'flex-start',
  '--door-text-anchor': 'start',
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

  // Paper craft. The grain is one transparent mid-grey tile: it darkens the
  // light paper and lightens the dark one by a few units, so the same file
  // works in both modes without a blend mode. Shadows are a crisp 2-3px edge
  // (the paper's thickness) under a soft lift; dark mode swaps the green-ink
  // shadow for black.
  localTokens: {
    '--paper-grain': 'url(/images/paper-grain.webp)',
    '--paper-strip': t(c.strip),
    '--paper-cream': t(c.cream),
    '--sos-edge': t(c.sosEdge),
    '--paper-sheet': t(c.sheet),
    // A torn paper edge, a 160px tile repeated along a sheet's bottom (used
    // as a mask, so it is the shape, not a colour).
    '--paper-torn-edge': 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22160%22%20height%3D%2214%22%20viewBox%3D%220%200%20160%2014%22%3E%3Cpath%20d%3D%22M0%200H160V6L154%209%20147%207%20141%2011%20133%208%20126%2010%20118%206%20111%209%20104%208%2097%2012%2090%209%2083%2010%2076%207%2069%2010%2061%208%2054%2011%2047%208%2040%209%2033%206%2026%2010%2019%208%2012%2011%206%208%200%209Z%22%2F%3E%3C%2Fsvg%3E")',
    // The current page in the nav: a hand-drawn pen line under the word (a
    // mask, drawn in the accent by the rule in app/globals.css). Four shapes;
    // links take them in turn with data-underline-seed (siteNav.ts).
    // 1: a gentle wave, lifting at the end.
    '--paper-pen-line-1': 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%2020%27%20preserveAspectRatio%3D%27none%27%3E%3Cpath%20d%3D%27M1.5%2011.5C12%209.6%2022%2010.4%2033%2010.1S55%208.4%2067%209.6%2088%2010.9%2098.5%208.6%27%20fill%3D%27none%27%20stroke%3D%27%23000%27%20stroke-width%3D%273%27%20stroke-linecap%3D%27round%27%20vector-effect%3D%27non-scaling-stroke%27%2F%3E%3C%2Fsvg%3E")',
    // 2: a dip in the middle.
    '--paper-pen-line-2': 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%2020%27%20preserveAspectRatio%3D%27none%27%3E%3Cpath%20d%3D%27M1.5%208.8C14%2010.4%2027%2012.6%2044%2012.2S76%2010.1%2098.5%209.4%27%20fill%3D%27none%27%20stroke%3D%27%23000%27%20stroke-width%3D%273%27%20stroke-linecap%3D%27round%27%20vector-effect%3D%27non-scaling-stroke%27%2F%3E%3C%2Fsvg%3E")',
    // 3: rising, then falling away.
    '--paper-pen-line-3': 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%2020%27%20preserveAspectRatio%3D%27none%27%3E%3Cpath%20d%3D%27M1.5%2012.2C16%209.4%2033%207.8%2052%208.6S82%2011.6%2098.5%2012%27%20fill%3D%27none%27%20stroke%3D%27%23000%27%20stroke-width%3D%273%27%20stroke-linecap%3D%27round%27%20vector-effect%3D%27non-scaling-stroke%27%2F%3E%3C%2Fsvg%3E")',
    // 4: a second pass at the end.
    '--paper-pen-line-4': 'url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%20100%2020%27%20preserveAspectRatio%3D%27none%27%3E%3Cpath%20d%3D%27M1.5%2010.9C21%209.8%2042%209.4%2064%2010.1S88%2011.2%2097.5%209.6%27%20fill%3D%27none%27%20stroke%3D%27%23000%27%20stroke-width%3D%273%27%20stroke-linecap%3D%27round%27%20vector-effect%3D%27non-scaling-stroke%27%2F%3E%3Cpath%20d%3D%27M66%2013.2C76%2012.6%2086%2012.9%2095%2012.2%27%20fill%3D%27none%27%20stroke%3D%27%23000%27%20stroke-width%3D%272.2%27%20stroke-linecap%3D%27round%27%20vector-effect%3D%27non-scaling-stroke%27%2F%3E%3C%2Fsvg%3E")',
    // A fold: a crease line, dark then light, like a folded sheet.
    '--paper-fold':
      'linear-gradient(light-dark(rgba(26, 67, 41, 0.1), rgba(0, 0, 0, 0.5)) 0 1px, light-dark(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.05)) 1px 2px)',
    // A filter, so the shadow follows the torn edge.
    '--shadow-sheet':
      'drop-shadow(0 3px 0 light-dark(rgba(26, 67, 41, 0.12), rgba(0, 0, 0, 0.45))) drop-shadow(0 14px 14px light-dark(rgba(26, 67, 41, 0.22), rgba(0, 0, 0, 0.6)))',
    '--shadow-cut':
      '0 3px 0 light-dark(rgba(26, 67, 41, 0.13), rgba(0, 0, 0, 0.45)), 0 16px 30px -14px light-dark(rgba(26, 67, 41, 0.35), rgba(0, 0, 0, 0.7))',
    '--shadow-cut-hover':
      '0 5px 0 light-dark(rgba(26, 67, 41, 0.13), rgba(0, 0, 0, 0.45)), 0 22px 34px -14px light-dark(rgba(26, 67, 41, 0.38), rgba(0, 0, 0, 0.75))',
    // Pressed: pushed down onto the page, so the edge and the lift shrink.
    '--shadow-cut-pressed':
      '0 1px 0 light-dark(rgba(26, 67, 41, 0.13), rgba(0, 0, 0, 0.45)), 0 6px 12px -8px light-dark(rgba(26, 67, 41, 0.3), rgba(0, 0, 0, 0.6))',
    // One sheet lying on the next: the kids' door over the parents' on phones.
    '--shadow-cut-stack':
      '0 3px 0 light-dark(rgba(26, 67, 41, 0.14), rgba(0, 0, 0, 0.5)), 0 10px 18px -8px light-dark(rgba(26, 67, 41, 0.3), rgba(0, 0, 0, 0.6))',
    '--shadow-strip':
      '0 2px 0 light-dark(rgba(26, 67, 41, 0.07), rgba(0, 0, 0, 0.35)), 0 8px 16px -8px light-dark(rgba(26, 67, 41, 0.22), rgba(0, 0, 0, 0.6))',
    '--shadow-fold':
      '0 -2px 0 light-dark(rgba(26, 67, 41, 0.06), rgba(0, 0, 0, 0.35)), inset 0 1px 0 light-dark(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.04))',
  },

  components: {
    // The page is grained paper. AppShell's `section` variant paints the
    // surface colour by default; the page ground is paper.
    'app-shell': {
      'variant:section': {
        backgroundColor: 'var(--color-background-body)',
        backgroundImage: 'var(--paper-grain)',
        // AppShell with height="auto" is at least 100dvh tall, so it grew and
        // shrank (and moved the footer) as a phone browser's toolbars came
        // and went. svh never changes, like the homepage doors inside it.
        minHeight: '100svh',
      },
    },
    // The header is a cream paper strip lying on the page.
    'app-shell-header': {
      base: {
        backgroundColor: 'var(--paper-strip)',
        backgroundImage: 'var(--paper-grain)',
        boxShadow: 'var(--shadow-strip)',
        // Above the stacked doors (z-index 1 on phones), so its shadow falls
        // on them and they scroll under it.
        zIndex: '3',
      },
    },
    // The strip's shadow is its edge: no hairline under it. Only the site
    // header is a Layout header (AppShell's).
    'layout-header': {
      base: {borderBottomColor: 'transparent'},
    },
    // Quiet bands (the footer) are cream paper with a folded top edge
    // instead of a hairline.
    section: {
      'variant:muted': {
        backgroundColor: 'var(--paper-cream)',
        backgroundImage: 'var(--paper-grain)',
        boxShadow: 'var(--shadow-fold)',
        borderTopColor: 'transparent',
      },
      // The menu sheet's paper: cream with grain, and a torn bottom edge cut
      // by a mask (the paper above it, the torn tile along the bottom).
      'variant:menu-sheet': {
        backgroundColor: 'var(--paper-sheet)',
        backgroundImage: 'var(--paper-grain)',
        maskImage: 'linear-gradient(#000 0 0), var(--paper-torn-edge)',
        maskSize: '100% calc(100% - 13px), 160px 14px',
        maskPosition: 'top, bottom left',
        maskRepeat: 'no-repeat, repeat-x',
      },
      // Home: the two doors. Two framed cards side by side, filling the
      // screen under the 72px header, on the same 1120px column as the header.
      // svh, not dvh: the small viewport (browser toolbars shown) never
      // changes, so the doors and their art don't resize and shift the page
      // when a phone browser hides its toolbars on scroll.
      'variant:doors': {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 'var(--spacing-8)',
        paddingBlock: 'var(--spacing-8)',
        paddingInlineStart: 'max(var(--spacing-6), calc((100% - 1120px) / 2))',
        paddingInlineEnd: 'max(var(--spacing-6), calc((100% - 1120px) / 2))',
        minHeight: 'calc(100svh - 73px)',
        boxSizing: 'border-box',
      },
    },
    // The mobile menu (MobileMenu): a full-width sheet pinned to the top.
    // The dialog itself is only the frame and casts the shadow; the paper
    // and its torn edge are the Section inside.
    dialog: {
      'variant:menu-sheet': {
        backgroundColor: 'transparent',
        borderRadius: '0',
        boxShadow: 'none',
        padding: '0',
        filter: 'var(--shadow-sheet)',
        // Edge to edge: no viewport gutters.
        maxWidth: '100%',
        // Unfolds down from the top instead of Dialog's zoom from the
        // button (keyframes in app/globals.css).
        animation: 'menu-sheet-down 280ms cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
    divider: {
      'variant:fold': {
        height: '2px',
        backgroundColor: 'transparent',
        backgroundImage: 'var(--paper-fold)',
        borderWidth: '0',
      },
    },
    // Menu links: 20px semibold rows, 52px tall.
    'side-nav-item': {
      // No fills: the drawn line marks the current page (app/globals.css).
      // As wide as the word, so the line matches it.
      base: {
        width: 'fit-content',
        backgroundColor: 'transparent',
        ':hover': {backgroundColor: 'transparent'},
      },
      'size:lg': {
        minHeight: '52px',
        fontSize: 'var(--font-size-xl)',
        fontWeight: 'var(--font-weight-semibold)',
        letterSpacing: '-0.01em',
      },
      // The current page: ink with the drawn line, as in the desktop bar.
      selected: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
      },
    },
    // Headings balance their lines so a title breaks evenly ("Za /
    // roditelje", not one long line and one word). Running text avoids a
    // lone last word. Both are progressive: browsers without support wrap
    // as usual.
    heading: {
      base: {textWrap: 'balance'},
    },
    text: {
      base: {textWrap: 'pretty'},
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
      // The parents' art has mother and son on the left and open sky top
      // right: the text goes there, right-aligned against the edge so its
      // short lines stay clear of the speech bubbles, the art anchored left.
      'variant:door-parents': {
        ...doorLayout,
        backgroundColor: doorArt.parents,
        '--door-text-side': 'end',
        '--door-text-width': '64%',
        '--door-text-items': 'flex-end',
        '--door-text-anchor': 'end',
        '--door-text-max': '62%',
        '--door-art-position': 'left 35%',
      },
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
      // No fills on hover or when current: a hand-drawn line under the word
      // marks both (app/globals.css). The line is a shape, so the state
      // doesn't rest on colour alone.
      base: {
        minHeight: '44px',
        backgroundColor: 'transparent',
        ':hover': {backgroundColor: 'transparent'},
      },
      selected: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
        fontWeight: 'var(--font-weight-semibold)',
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
      // The menu's language and theme buttons: icons only, 64px targets.
      'variant:menu-setting': {
        width: '64px',
        height: '64px',
        borderRadius: 'var(--radius-element)',
        backgroundColor: 'transparent',
        color: 'var(--color-text-primary)',
      },
      // Paper craft: a darker paper edge underneath that presses flat when
      // tapped. Still a solid fill: no texture on the one urgent action.
      'variant:sos': {
        backgroundColor: 'var(--color-error)',
        color: 'var(--color-on-error)',
        boxShadow: '0 3px 0 var(--sos-edge)',
        transition: 'transform 100ms ease-out, box-shadow 100ms ease-out',
        ':active': {transform: 'translateY(2px)', boxShadow: '0 1px 0 var(--sos-edge)'},
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
              // The kids' door lies on the parents' like a stacked sheet.
              'variant:door-kids': {
                ...doorSideBySide,
                zIndex: '1',
                boxShadow: 'var(--shadow-cut-stack)',
                // Pressed: 1px down, flattening onto the parents' door.
                ':active': {transform: 'translateY(1px)', boxShadow: 'none'},
                '--door-text-col': '1',
                '--door-art-width': '68%',
                '--door-art-side': 'end',
                '--door-art-position': '70% 60%',
                '--door-art-mask': 'linear-gradient(to right, transparent, #000 45%)',
              },
              'variant:door-parents': {
                ...doorSideBySide,
                boxShadow: 'none',
                ':active': {transform: 'translateY(1px)', boxShadow: 'none'},
                '--door-text-col': '2',
                // Mother and son sit on the art's left, against the screen
                // edge; its right side (the plant) fades out under the text.
                // Two figures, so a little narrower than the kids' art.
                '--door-art-width': '60%',
                '--door-art-side': 'start',
                '--door-art-position': '0% 60%',
                '--door-art-mask': 'linear-gradient(to left, transparent, #000 26%)',
              },
            },
          },
        },
      },
      // Reduced motion: the doors and the SOS button keep their shadows and
      // colour changes but no longer move.
      {
        when: {motion: 'reduce'},
        value: {
          components: {
            'clickable-card': {
              'variant:door-kids': {':active': {transform: 'none'}},
              'variant:door-parents': {':active': {transform: 'none'}},
            },
            button: {
              'variant:sos': {':active': {transform: 'none'}},
            },
            // The menu appears in place without sliding.
            dialog: {
              'variant:menu-sheet': {animation: 'none'},
            },
          },
        },
      },
    ],
  },
});
