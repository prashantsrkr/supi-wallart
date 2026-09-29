import { Paintbrush, Box, Layers, UserRound, Frame, Sparkles } from 'lucide-react'

export const services = [
  {
    title: 'Wall Art',
    description: 'Custom murals and artistic wall paintings designed specifically for your space.',
    icon: Paintbrush,
  },
  {
    title: '3D Wall Art',
    description: 'Dimensional wall artwork combining painting and POP designs.',
    icon: Box,
  },
  {
    title: 'POP Designs',
    description: 'Decorative POP wall designs with artistic detailing.',
    icon: Layers,
  },
  {
    title: 'Portraits',
    description: 'Hand-painted portraits capturing personality and emotion.',
    icon: UserRound,
  },
  {
    title: 'Canvas Paintings',
    description: 'Original and commissioned artwork for homes and interiors.',
    icon: Frame,
  },
  {
    title: 'Custom Art',
    description: "Personalized artwork created around a client's idea, space, or vision.",
    icon: Sparkles,
  },
]

/** Options for the commission form's "Artwork Type" select. */
export const artworkTypes = [
  ...services.map((s) => s.title),
  'Not sure yet',
]
