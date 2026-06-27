import type { ElementType, ReactNode } from 'react'

type Props = {
  /** 'light' = bright clarity palette (Apple), 'dark' = craft palette (Rolex). */
  tone?: 'light' | 'dark'
  as?: ElementType
  className?: string
  children: ReactNode
}

/**
 * A theme-aware section. Sets `data-theme` so every semantic token (--bg,
 * --text, --accent, …) flips, giving us the section-split light/dark aesthetic
 * with a single prop. Wrap content in <Panel tone="dark"> to enter a craft
 * chapter; nested components read the active theme automatically.
 */
export default function Panel({ tone = 'light', as, className = '', children }: Props) {
  const Tag = (as ?? 'section') as ElementType
  return (
    <Tag data-theme={tone} className={`panel ${className}`}>
      {children}
    </Tag>
  )
}
