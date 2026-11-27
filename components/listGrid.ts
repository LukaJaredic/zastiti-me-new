import type {CSSProperties} from 'react';

/**
 * A list (`ul`/`ol`) laid out as a grid: as many columns as fit at
 * `minColumn` or wider, never more than `maxColumns`, and one on a narrow
 * screen. Astryx's Grid can't render as a list element, so list components
 * put this on a VStack `as="ul"`.
 */
export function listGrid({
  minColumn,
  maxColumns,
  columnGap,
  rowGap = columnGap,
}: {
  minColumn: string;
  maxColumns: number;
  columnGap: string;
  rowGap?: string;
}): CSSProperties {
  // A column is at least minColumn, and at least 1/maxColumns of the row
  // (so no more than maxColumns fit), but never wider than the row.
  const widest = `calc((100% - ${maxColumns - 1} * ${columnGap}) / ${maxColumns})`;
  return {
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, max(${minColumn}, ${widest})), 1fr))`,
    columnGap,
    rowGap,
    alignItems: 'start',
  };
}
