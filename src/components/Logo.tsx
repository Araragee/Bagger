import { Link } from 'react-router-dom'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Bagger — home"
      className={`group inline-flex items-baseline gap-1.5 ${className}`}
    >
      <span className="font-display text-2xl font-semibold leading-none tracking-tight">
        Bagger
      </span>
      <span className="h-2 w-2 rounded-full bg-clay transition-transform duration-300 group-hover:scale-150" />
    </Link>
  )
}
