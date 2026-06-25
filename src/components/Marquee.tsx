const items = [
  'Free shipping over $150',
  'Lifetime leather repairs',
  '100-day trial',
  'Carbon-neutral delivery',
  'Made to be worn in',
]

export default function Marquee() {
  // Duplicate the run so the -50% translate loops seamlessly
  const run = [...items, ...items]
  return (
    <div className="relative z-10 overflow-hidden border-y border-ink/15 bg-clay py-2.5 text-cream">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform">
        {run.map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-sans text-xs uppercase tracking-widest">
            {item}
            <span aria-hidden className="text-cream/50">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
