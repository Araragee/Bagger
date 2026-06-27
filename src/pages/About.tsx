import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductArt from '../components/ProductArt'
import Reveal from '../components/Reveal'
import { useTitle } from '../lib/useTitle'

const values = [
  {
    title: 'One material, done right',
    body: 'Full-grain, vegetable-tanned leather from a single tannery we’ve worked with for years. No corrected grain, no shortcuts.',
  },
  {
    title: 'Repairs, not landfill',
    body: 'Every stitch and rivet is covered for life. Send it back, we’ll fix it. A bag should outlive its receipt.',
  },
  {
    title: 'Priced like it’s ours',
    body: 'We sell direct, so you pay for the bag — not three middlemen and a billboard.',
  },
]

export default function About() {
  useTitle('Our story')
  return (
    <div>
      {/* Hero */}
      <section className="container-wide grid items-center gap-10 py-12 lg:grid-cols-2">
        <div>
          <span className="eyebrow">Our story</span>
          <h1 className="mt-4 font-display text-[clamp(2.5rem,7vw,5rem)] font-light leading-[0.98]">
            A workshop, a hide, and a stubborn idea.
          </h1>
          <p className="mt-6 max-w-md leading-relaxed text-ink-soft">
            Bagger started in 2014 on a single sewing machine and the belief that
            the world had enough disposable bags. We make a small number of
            things, slowly, from materials that get better with age — and we
            stand behind every one for life.
          </p>
          <Link to="/shop" className="btn-primary mt-8">
            Shop the collection
          </Link>
        </div>
        <Reveal>
          <div className="overflow-hidden rounded-[2rem] bg-bone-200">
            <ProductArt product={products[7]} className="aspect-[4/5] w-full" variant="hero" />
          </div>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-ink py-20 text-cream">
        <div className="container-wide">
          <h2 className="max-w-2xl font-display text-4xl font-light leading-tight sm:text-5xl">
            What we actually mean by “made to last.”
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="border-t border-cream/20 pt-5">
                  <span className="font-display text-2xl text-tan">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-xl">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="container-wide grid gap-8 py-20 text-center sm:grid-cols-4">
        {[
          ['2014', 'Founded'],
          ['1', 'Tannery, since day one'],
          ['62k', 'Bags repaired, not binned'],
          ['4.8★', 'From 2,300+ owners'],
        ].map(([big, small], i) => (
          <Reveal key={small} delay={i * 80}>
            <p className="font-display text-5xl font-light">{big}</p>
            <p className="mt-2 text-sm uppercase tracking-widest text-ink-soft">{small}</p>
          </Reveal>
        ))}
      </section>

      {/* CTA */}
      <section className="container-wide pb-12">
        <div className="rounded-[2rem] bg-clay px-8 py-16 text-center text-cream">
          <h2 className="mx-auto max-w-xl font-display text-4xl font-light leading-tight sm:text-5xl">
            Find the one you’ll still be carrying in 2040.
          </h2>
          <Link
            to="/shop"
            className="mt-8 inline-flex rounded-full bg-cream px-7 py-3.5 font-sans text-sm uppercase tracking-widest text-ink transition-transform hover:-translate-y-0.5"
          >
            Start browsing
          </Link>
        </div>
      </section>
    </div>
  )
}
