<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Zaštiti.me

Read `ARCHITECTURE.md` before changing code. It covers the code map, the invariants and how content changes work. There is no CMS: content lives in `content/`.

## Design direction

The full brand book is the Zaštiti.me design system: https://claude.ai/artifact/75auidVZA9ptP9FnkiqcVh (private, ask the project owner for access). The short version:

- **Calm, warm, trustworthy.** Visitors may be scared and on a phone. Fewer things per page, more air, one clear action per view.
- **SOS is always one tap away.** The "Prijavi nasilje" button sits in the header on every page. Button `variant="sos"` is used for reporting only, never for delete or other errors.
- **Three doors, three colours.** SOS = coral (`error`), parents = teal (`teal` / `info`), kids = sun (`yellow` / `warning`). Shared UI uses brand green (`accent`). Don't mix two audience colours in one card.
- **Paper, not glass.** Warm off-white page, white cards with hairline borders, soft shadows only on things that float or respond to hover. No gradients, no full-bleed photos behind text, no glassmorphism, no emoji.
- **Paper craft.** The finish follows the cut-paper illustrations: a light grain on the page, the header strip and the cream footer band (never on cards or buttons); edges are crisp paper shadows, not hairlines; the homepage doors are cut paper; the SOS button presses on its own edge. It all lives in the theme (`localTokens` and overrides with `:hover`/`:active` keys), not in page CSS. Dark mode keeps the shape, without the cream.
- **Type:** Onest for everything; headings carry weight (display and h1 bold, the rest semibold). Sentence case for titles and buttons. Body text at least 16px, reading column max 38rem.
- **Icons:** Phosphor (`@phosphor-icons/react`), `regular` weight, through Astryx `<Icon icon={…Icon} />`. Fixed meanings: `WarningCircleIcon` = SOS, `BookOpenTextIcon` = parents, `GameControllerIcon` = kids, `ShieldCheckIcon` = privacy and safety.
- **Copy:** Montenegrin first. Use the approved text from `old-site-reference/zastiti-me/messages/*.json` verbatim, and address the reader as "ti". Ask before writing new copy.
- **Tokens:** all colours, radii, shadows and fonts live in `src/themes/zastiti/zastitiTheme.ts`. Change the design system first, then mirror the change there. While you work, keep `npx astryx theme build --watch src/themes/zastiti*/*Theme.ts` running. The built theme files (`src/themes/zastiti*/zastiti*.{css,js,d.ts}`) are generated and gitignored: `npm run themes` rebuilds them, and `npm run dev` and `npm run build` run it first. Never edit or commit them.
- **Accessibility:** WCAG 2.2 AA. Every theme colour pair is checked for contrast. Keep focus rings visible, label every field, and never show state by colour alone.

<!-- ASTRYX:START -->
Astryx v0.7.15 · 174 components
CLI: run every command as `npx astryx <cmd>` (shown below as `astryx ...`).

SETUP (once, in app entry e.g. main.tsx) — without these, components render unstyled:
  import "@astryxdesign/core/reset.css";
  import "@astryxdesign/core/astryx.css";

WORKFLOW — start every page from a template, never from scratch:
1. `astryx build "<idea>"` — names the template to scaffold from and the parts it lacks.
2. `astryx template <name> <path>` — scaffold it; keep its frame, gap and padding; replace the content.
3. `astryx template <Block>` for parts it lacks; `astryx component <Name>` to read props before using one.
Changing an existing page? Keep it: skip step 2 and add blocks/components inside its sections.
Before you deliver a build, run `astryx doctor --built <dir>`; don't deliver it if it fails.

RULES:
- No <div> — components handle all layout and spacing.
- Read `astryx docs layout` before changing a template's frame.
- Dense data = rows (Table, List/Item), not Card-wrapped lists. Badge = counts only.
- Style with component props first, then tokens (var(--color-*|--spacing-*|--radius-*)). No raw hex/px. No StyleX/Tailwind compiler here — don't use xstyle/utility classes directly. Some templates use StyleX and need a compiler plugin; see `astryx docs styling-overview`.
- Palettes and custom colors go through the theme, never :root overrides. Run `astryx theme add <slug>` to import; `theme eject <slug>` only forks source. See `astryx docs theme`.
- SELF-CHECK: re-read the file; replace any raw <div>/<span>, imported .css/@apply, or hardcoded #hex/px with the component or a token.

`astryx help` lists every command. Key ones beyond the workflow:
  search "<query>"   find any component / hook / doc / template
  discover <words>   integrations you could add
  docs <topic>       getting-started, principles, tokens, theme … (`astryx docs` lists all)
  docs cli           commands and API reference
  docs authoring     build an integration package, and every field it holds
  upgrade --from <old version> --apply   run after a dependency bump
<!-- ASTRYX:END -->
