import type { Product } from '../data/products'

type Props = {
  product: Product
  className?: string
  // Vary the silhouette by category so the catalogue doesn't look uniform
  variant?: 'card' | 'hero'
}

/**
 * Generative, on-brand product artwork rendered as inline SVG.
 * Keeps the demo fully self-contained (no image hosting) while still
 * giving each category a recognisably different silhouette.
 */
export default function ProductArt({ product, className }: Props) {
  const { base, accent, strap } = product.art
  const seed = product.id.charCodeAt(1) || 1

  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label={`${product.name} in ${product.colors[0].name}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`bg-${product.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F6F1E7" />
          <stop offset="100%" stopColor="#E3DAC6" />
        </linearGradient>
        <linearGradient id={`leather-${product.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="45%" stopColor={base} />
          <stop offset="100%" stopColor={strap} />
        </linearGradient>
      </defs>

      <rect width="400" height="400" fill={`url(#bg-${product.id})`} />

      {/* soft floor shadow */}
      <ellipse cx="200" cy="330" rx="120" ry="18" fill={strap} opacity="0.12" />

      <BagSilhouette product={product} seed={seed} />
    </svg>
  )
}

function BagSilhouette({ product, seed }: { product: Product; seed: number }) {
  const { base, accent, strap } = product.art
  const fill = `url(#leather-${product.id})`
  const stitch = { stroke: accent, strokeWidth: 1.5, strokeDasharray: '4 4', fill: 'none', opacity: 0.7 }

  switch (product.category) {
    case 'Backpacks':
      return (
        <g>
          <path d="M150 90 q50 -45 100 0" fill="none" stroke={strap} strokeWidth="14" strokeLinecap="round" />
          <rect x="120" y="110" width="160" height="200" rx="40" fill={fill} />
          <rect x="120" y="150" width="160" height="120" rx="20" fill={accent} opacity="0.18" />
          <rect x="158" y="180" width="84" height="70" rx="14" fill={strap} opacity="0.85" />
          <circle cx="200" cy="215" r="9" fill={accent} />
          <path d="M132 120 v180" {...stitch} />
          <path d="M268 120 v180" {...stitch} />
        </g>
      )
    case 'Crossbody':
      return (
        <g>
          <path d="M120 80 L255 230" fill="none" stroke={strap} strokeWidth="13" strokeLinecap="round" />
          <rect x="150" y="190" width="140" height="120" rx="22" fill={fill} />
          <path d="M150 215 q70 -55 140 0" fill={accent} opacity="0.25" />
          <rect x="200" y="200" width="40" height="22" rx="6" fill={strap} />
          <circle cx="220" cy="250" r="7" fill={accent} />
          <path d="M162 205 v90" {...stitch} />
        </g>
      )
    case 'Weekenders':
      return (
        <g>
          <path d="M150 150 q50 -50 100 0" fill="none" stroke={strap} strokeWidth="12" strokeLinecap="round" />
          <path d="M180 145 q20 -28 40 0" fill="none" stroke={strap} strokeWidth="12" strokeLinecap="round" />
          <rect x="90" y="170" width="220" height="140" rx="70" fill={fill} />
          <rect x="170" y="170" width="60" height="140" fill={accent} opacity="0.2" />
          <rect x="186" y="225" width="28" height="34" rx="5" fill={strap} />
          <path d="M110 195 q90 40 180 0" {...stitch} />
        </g>
      )
    case 'Wallets':
      return (
        <g>
          <rect x="115" y="150" width="170" height="120" rx="14" fill={fill} />
          <rect x="115" y="150" width="170" height="60" rx="14" fill={base} />
          <rect x="140" y="225" width="70" height="14" rx="3" fill={accent} opacity="0.6" />
          <rect x="140" y="245" width="50" height="10" rx="3" fill={accent} opacity="0.4" />
          <path d="M125 215 h150" {...stitch} />
          <path d="M125 160 v100" {...stitch} />
        </g>
      )
    case 'Totes':
    default:
      return (
        <g>
          <path
            d={`M150 ${110 + (seed % 5)} q50 -40 100 0`}
            fill="none"
            stroke={strap}
            strokeWidth="13"
            strokeLinecap="round"
          />
          <path d="M120 140 L130 310 H270 L280 140 Z" fill={fill} />
          <path d="M120 140 L130 310 H200 L200 140 Z" fill={accent} opacity="0.12" />
          <path d="M134 160 L143 295" {...stitch} />
          <path d="M266 160 L257 295" {...stitch} />
          <rect x="180" y="150" width="40" height="8" rx="4" fill={strap} opacity="0.6" />
        </g>
      )
  }
}
