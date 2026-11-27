/**
 * The approved copy title-cases some headings ("Naša Misija"); the design
 * system sets titles and buttons in sentence case ("Naša misija"). This is
 * the one edit allowed to approved copy (ARCHITECTURE.md, invariant 4).
 */
export function sentenceCase(text: string): string {
  return text.charAt(0) + text.slice(1).toLowerCase();
}
