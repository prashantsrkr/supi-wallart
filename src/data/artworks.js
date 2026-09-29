/**
 * Artwork library, built from Supi's Instagram (@supi_wallart).
 *
 * Images live in /public/artwork/. To add a piece, drop the photo there and add an entry below.
 * `aspect` controls the tile shape in the masonry gallery:
 *   'tall' (3:4) · 'portrait' (4:5) · 'square' (1:1) · 'landscape' (4:3) · 'wide' (16:10)
 *
 * Note: these were saved from Instagram at 640px. Swap in the original phone photos
 * (same filenames) for sharper results on large and retina screens.
 */

const art = (file) => `/artwork/${file}`

/** Gallery filter order. Categories without any artwork are hidden automatically. */
export const categories = ['Wall Art', '3D Art', 'POP Designs', 'Portraits', 'Paintings', 'Details']

export const artworks = [
  {
    id: 'lotus-pond',
    title: 'Lotus Pond',
    category: 'Wall Art',
    image: art('lotus-mural.jpg'),
    aspect: 'portrait',
    description: 'A hand-painted lotus mural in rose, white and fresh greens, climbing up a warm cream wall.',
  },
  {
    id: 'sculpted-lotus',
    title: 'Sculpted Lotus',
    category: 'POP Designs',
    image: art('lotus-relief-3d.jpg'),
    aspect: 'tall',
    description: 'Lotus flowers and leaves built up in POP relief, shaped by hand before any paint goes on.',
  },
  {
    id: 'calla-lilies',
    title: 'Calla Lilies',
    category: 'Wall Art',
    image: art('calla-lily-wall.jpg'),
    aspect: 'tall',
    description: 'Tall pink calla lilies with sweeping leaves, painted to wrap around a corner wall.',
  },
  {
    id: 'sunrise-window',
    title: 'Sunrise Window',
    category: 'Wall Art',
    image: art('sunrise-window-room.jpg'),
    aspect: 'wide',
    description: 'A golden sun rising around a window frame, with banana trees painted on either side.',
  },
  {
    id: 'lotus-in-bloom',
    title: 'Lotus in Bloom',
    category: '3D Art',
    image: art('lotus-bloom-closeup.jpg'),
    aspect: 'tall',
    description: 'Textured, dimensional lotus petals finished in rose and white. Yes, this is a wall.',
  },
  {
    id: 'monstera-drift',
    title: 'Monstera Drift',
    category: 'Wall Art',
    image: art('monstera-living-room.jpg'),
    aspect: 'landscape',
    description: 'Monstera and tropical leaves in green and burnt orange, trailing across a living room wall.',
  },
  {
    id: 'banana-tree',
    title: 'Banana Tree',
    category: 'Wall Art',
    image: art('banana-tree-corner.jpg'),
    aspect: 'tall',
    description: 'A full-height banana tree, fruit and all, painted into the corner beside a doorway.',
  },
  {
    id: 'calla-in-progress',
    title: 'Calla, In Progress',
    category: 'Details',
    image: art('calla-lily-brushwork.jpg'),
    aspect: 'tall',
    description: 'Mid-session on the calla lily wall: shading each petal by hand, one stroke at a time.',
  },
  {
    id: 'calla-heart',
    title: 'The Heart of a Calla',
    category: 'Details',
    image: art('calla-spadix-detail.jpg'),
    aspect: 'square',
    description: 'A close look at the calla lily centre, dotted and layered in ochre, gold and umber.',
  },
  {
    id: 'leaf-study',
    title: 'Leaf Study',
    category: 'Details',
    image: art('calla-leaf-detail.jpg'),
    aspect: 'tall',
    description: 'Layered greens and soft highlights give the calla leaves their gentle curl.',
  },
  {
    id: 'rising-stems',
    title: 'Rising Stems',
    category: 'Details',
    image: art('calla-lily-stems.jpg'),
    aspect: 'portrait',
    description: 'Slender stems and a single bloom, part of the calla lily corner wall.',
  },
]

/** Hand-picked images used by other sections. */
export const featureImages = {
  hero: {
    src: art('lotus-mural.jpg'),
    alt: 'Hand-painted lotus mural by Supi, with pink and white blooms on a cream wall',
  },
  about: {
    src: art('supi-painting-calla.jpg'),
    alt: 'Supi painting a pink calla lily mural by hand',
  },
  aboutDetail: {
    src: art('calla-spadix-detail.jpg'),
    alt: 'Close-up of painted calla lily detail in ochre and pink',
  },
  project: {
    src: art('sunrise-window-room.jpg'),
    alt: 'Room with a golden sun painted around the window and banana trees on both sides',
  },
  projectDetail: {
    src: art('banana-tree-corner.jpg'),
    alt: 'Detail of the painted banana tree from the same room',
  },
}

/** Curated tiles for the Instagram section (each links to the real profile). */
export const instagramTiles = [
  { src: art('lotus-bloom-closeup.jpg'), alt: 'Textured lotus bloom painted on a wall' },
  { src: art('calla-lily-brushwork.jpg'), alt: 'Painting a calla lily mural' },
  { src: art('monstera-living-room.jpg'), alt: 'Monstera leaves mural in a living room' },
  { src: art('pop-plaster-mix.jpg'), alt: 'Mixing plaster of Paris for a relief wall' },
  { src: art('lotus-relief-3d.jpg'), alt: 'White POP lotus relief before painting' },
  { src: art('calla-leaf-detail.jpg'), alt: 'Close-up of painted calla leaves' },
]
