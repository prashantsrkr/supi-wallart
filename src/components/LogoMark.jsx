/**
 * The Supi Wall Art mark: an open arch (a wall niche) holding a lotus.
 * Same geometry as brand/supi-mark.svg. The arch uses currentColor so it follows the text colour;
 * the stroke is heavier than the print logo so it stays crisp at small UI sizes.
 */
export default function LogoMark({ className = 'h-8 w-auto', petal = '#A65A3F', petalSoft = '#C98A6E', strokeWidth = 7 }) {
  return (
    <svg viewBox="4 4 112 150" className={className} aria-hidden="true" focusable="false">
      <path
        d="M10 150V60a50 50 0 0 1 100 0v90"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <g transform="translate(60 124) scale(1.15) translate(-60 -124)">
        <path d="M60 124C44 121 31 108 27 88c15 4 28 16 33 36z" fill={petalSoft} />
        <path d="M60 124c16-3 29-16 33-36-15 4-28 16-33 36z" fill={petalSoft} />
        <path d="M60 70c12 15 14 38 0 54-14-16-12-39 0-54z" fill={petal} />
        <path d="M35 137q25-7 50 0" fill="none" stroke={petal} strokeWidth="3.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
