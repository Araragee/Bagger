import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

/** Catches render errors so a broken page degrades to a friendly message. */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Hook a real error reporter (Sentry) in here later
    console.error('Render error:', error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children
    return (
      <div className="container-wide flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-display text-5xl font-light text-clay">Something came loose.</p>
        <p className="mt-3 max-w-sm text-ink-soft">
          A stitch slipped on our end. Reloading usually sorts it.
        </p>
        <button onClick={() => window.location.reload()} className="btn-primary mt-8">
          Reload
        </button>
      </div>
    )
  }
}
