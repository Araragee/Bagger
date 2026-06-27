import { useToast } from '../store/toast'

const toneStyle: Record<string, string> = {
  info: 'bg-ink text-cream',
  success: 'bg-moss text-cream',
  error: 'bg-clay text-cream',
}

export default function Toaster() {
  const { toasts, dismiss } = useToast()
  if (toasts.length === 0) return null
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismiss(t.id)}
          className={`pointer-events-auto w-full max-w-sm animate-fade-up rounded-full px-5 py-3 text-center font-sans text-sm shadow-lg ${toneStyle[t.tone]}`}
        >
          {t.message}
        </button>
      ))}
    </div>
  )
}
