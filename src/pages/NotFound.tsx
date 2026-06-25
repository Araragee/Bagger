import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-[clamp(5rem,20vw,12rem)] font-light leading-none text-clay">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl">This bag wandered off.</h1>
      <p className="mt-3 max-w-sm text-ink-soft">
        The page you’re after isn’t here — but the good stuff is one click away.
      </p>
      <Link to="/shop" className="btn-primary mt-8">
        Back to the shop
      </Link>
    </div>
  )
}
