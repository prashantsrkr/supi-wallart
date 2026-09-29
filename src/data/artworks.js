/**
 * Artwork library: Supi's own photos, plus a few pieces saved from Instagram (@supi_wallart).
 *
 * Images live in /public/artwork/. To add a piece, drop the photo there and add an entry below.
 * `aspect` controls the tile shape in the masonry gallery:
 *   'tall' (3:4) · 'portrait' (4:5) · 'square' (1:1) · 'landscape' (4:3) · 'wide' (16:10)
 *   · 'panorama' (5:2)
 *
 * Photos are resized to 1600px on the long edge. The detail shots (calla-*, lotus-relief-3d,
 * pop-plaster-mix, supi-painting-calla) are still 640px Instagram saves: replace them with the
 * original photos, using the same filenames, when available.
 */

// BASE_URL keeps paths correct when the site is served from a sub-path (e.g. GitHub Pages).
const art = (file) => `${import.meta.env.BASE_URL}artwork/${file}`

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
    id: 'pichwai-cow-and-calf',
    title: 'Pichwai Cow & Calf',
    category: 'Wall Art',
    image: art('pichwai-cow-and-calf.jpg'),
    aspect: 'square',
    description: 'A Pichwai-inspired mural of a cow and her calf beside blooming pink lotuses, in soft, warm tones.',
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
    id: 'tulip-arch',
    title: 'Tulip Arch',
    category: 'Wall Art',
    image: art('tulip-arch.jpg'),
    aspect: 'landscape',
    description: 'Golden tulips rising inside a painted yellow arch, turning a floating shelf into a feature wall.',
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
    id: 'linework-blooms',
    title: 'Linework Blooms',
    category: 'Wall Art',
    image: art('linework-blooms.jpg'),
    aspect: 'wide',
    description: 'Oversized flowers drawn in bold black line, lifted with sweeps of yellow and fresh green leaves.',
  },
  {
    id: 'dreams-and-wings',
    title: 'Dreams & Wings',
    category: 'Wall Art',
    image: art('dreams-and-wings-panels.jpg'),
    aspect: 'panorama',
    description:
      'Five hand-painted panels pairing boho botanicals and a rising sun with hand-lettered quotes: let your dreams be your wings, and the best is yet to come.',
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
