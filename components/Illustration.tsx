import Image from 'next/image';

/**
 * A cut-paper illustration, already cut into a jigsaw piece with
 * transparent edges. It fills its column at its own ratio, and the paper
 * drop-shadow follows the cut.
 */
export function Illustration({
  src,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  /** The file's own size, for its ratio. */
  width: number;
  height: number;
  /** The first picture on the page: load it early. */
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      // 7 of 12 columns on desktop, half the column on tablets, full width
      // on phones.
      sizes="(min-width: 1024px) 640px, (min-width: 600px) 50vw, 100vw"
      preload={priority}
      fetchPriority={priority ? 'high' : 'auto'}
      loading={priority ? 'eager' : 'lazy'}
      style={{width: '100%', height: 'auto', filter: 'var(--shadow-sheet)'}}
    />
  );
}
