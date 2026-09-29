/**
 * Image with responsive srcset for Unsplash placeholders; plain <img> for anything else,
 * so real artwork paths (e.g. /artwork/mural.jpg) work unchanged.
 */
const WIDTHS = [480, 800, 1200, 1600]

function buildSrcSet(src) {
  if (!src.includes('images.unsplash.com')) return undefined
  return WIDTHS.map((w) => `${src.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ')
}

export default function ArtImage({ src, alt, sizes = '100vw', eager = false, className = '', ...props }) {
  return (
    <img
      src={src}
      srcSet={buildSrcSet(src)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      className={className}
      {...props}
    />
  )
}
