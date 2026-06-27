/**
 * Tiny localStorage-backed persistence layer.
 *
 * This stands in for a real database. Everything the app persists (users,
 * sessions, orders) goes through here, namespaced under a single prefix so the
 * whole "backend" is easy to reason about — and easy to replace with Supabase
 * or any real datastore by swapping `src/lib/api.ts`.
 */

const PREFIX = 'bagger:db:'

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* quota / private mode — fail soft */
  }
}

export const db = {
  read,
  write,
  /** Read a keyed collection (object map). */
  collection<T>(key: string): Record<string, T> {
    return read<Record<string, T>>(key, {})
  },
  upsert<T>(key: string, id: string, value: T): void {
    const c = read<Record<string, T>>(key, {})
    c[id] = value
    write(key, c)
  },
}

/** Simulate realistic network latency so loading states are exercised. */
export function latency(min = 220, max = 520): Promise<void> {
  const ms = Math.round(min + Math.random() * (max - min))
  return new Promise((r) => setTimeout(r, ms))
}

/** URL-safe-ish unique id. */
export function uid(prefix = ''): string {
  return (
    prefix +
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  ).toUpperCase()
}
