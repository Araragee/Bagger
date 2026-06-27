import Panel from './Panel'
import { useReducedMotion } from '../lib/motion'
import { useGsapScope } from '../lib/useGsapScope'

const steps = [
  { n: '01', title: 'The hide', copy: 'We start with a single full-grain, vegetable-tanned hide — no corrected grain, no shortcuts. Every mark is a record of a life lived.', swatch: '#5A3318' },
  { n: '02', title: 'The cut', copy: 'Panels are cut by hand around the hide’s natural lines, so the grain flows the way nature drew it. Nothing is forced.', swatch: '#7A4B26' },
  { n: '03', title: 'The stitch', copy: 'Saddle-stitched with waxed linen thread — two needles, one seam, locked so a single break can never unravel the row.', swatch: '#9C5A2E' },
  { n: '04', title: 'The finish', copy: 'Edges are burnished by hand until they shine, hardware set in solid brass. Then it’s yours — to wear in for decades.', swatch: '#B08D57' },
]

export default function CraftChapter() {
  const reduced = useReducedMotion()

  const scope = useGsapScope<HTMLDivElement>((_, gsap) => {
    const items = gsap.utils.toArray<HTMLElement>('.craft-step')
    const bar = '.craft-progress-fill'

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: 'top top',
        end: `+=${items.length * 90}%`,
        scrub: 0.6,
        pin: '.craft-pin',
      },
    })

    items.forEach((step, i) => {
      if (i !== 0) tl.fromTo(step, { autoAlpha: 0, yPercent: 10 }, { autoAlpha: 1, yPercent: 0, duration: 0.5 })
      if (i !== items.length - 1) tl.to(step, { autoAlpha: 0, yPercent: -10, duration: 0.5 }, '+=0.7')
    })

    gsap.to(bar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { trigger: scope.current, start: 'top top', end: `+=${items.length * 90}%`, scrub: 0.6 },
    })
  }, [])

  // Accessible fallback: a plain stacked list, no pin, no animation
  if (reduced) {
    return (
      <Panel tone="dark" className="py-[var(--section-y)]">
        <div className="container-wide">
          <span className="eyebrow text-[var(--text-soft)]">How it’s made</span>
          <h2 className="mt-3 font-display text-fluid-3xl font-light">Four hands, one hide.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-line pt-5">
                <span className="font-display text-3xl" style={{ color: s.swatch }}>{s.n}</span>
                <h3 className="mt-2 font-display text-2xl">{s.title}</h3>
                <p className="mt-2 text-soft leading-relaxed">{s.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    )
  }

  return (
    <div ref={scope}>
      <Panel tone="dark">
        <div className="craft-pin relative flex h-screen flex-col justify-center overflow-hidden">
          {/* Progress */}
          <div className="container-wide absolute inset-x-0 top-10">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-[var(--text-soft)]">How it’s made</span>
              <span className="font-sans text-xs uppercase tracking-widest text-[var(--text-soft)]">Atelier · Bagger</span>
            </div>
            <div className="mt-4 h-px w-full bg-line">
              <div className="craft-progress-fill h-px w-full origin-left scale-x-0 bg-[var(--accent)]" />
            </div>
          </div>

          {/* Stacked steps */}
          <div className="container-wide relative">
            <div className="relative h-[60vh]">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className="craft-step absolute inset-0 grid items-center gap-10 lg:grid-cols-2"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <div>
                    <span className="font-display text-[clamp(4rem,10vw,9rem)] font-light leading-none" style={{ color: s.swatch }}>
                      {s.n}
                    </span>
                    <h3 className="mt-2 font-display text-fluid-2xl font-light">{s.title}</h3>
                    <p className="mt-4 max-w-md text-soft text-fluid-base leading-relaxed">{s.copy}</p>
                  </div>
                  <div className="hidden justify-self-end lg:block">
                    <div
                      className="h-72 w-72 rounded-[2rem] shadow-2xl"
                      style={{ background: `radial-gradient(120% 120% at 30% 25%, ${s.swatch} 0%, #160f09 90%)` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Panel>
    </div>
  )
}
