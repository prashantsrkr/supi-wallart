/** Subtle translucent surface. Use for floating/elevated UI only, not whole sections. */
export default function GlassCard({ as: Tag = 'div', dark = false, className = '', children, ...props }) {
  return (
    <Tag className={`${dark ? 'glass-dark' : 'glass'} rounded-2xl ${className}`} {...props}>
      {children}
    </Tag>
  )
}
