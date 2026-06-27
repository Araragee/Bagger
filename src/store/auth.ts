import { create } from 'zustand'
import { api, ApiError, type User, type Address } from '../lib/api'

type AuthState = {
  user: User | null
  loading: boolean
  error: string | null
  register: (input: { name: string; email: string; password: string }) => Promise<boolean>
  login: (input: { email: string; password: string }) => Promise<boolean>
  logout: () => void
  saveAddress: (address: Address) => Promise<void>
  clearError: () => void
}

export const useAuth = create<AuthState>((set, get) => ({
  // Rehydrate the session synchronously from the persistence layer
  user: api.auth.current(),
  loading: false,
  error: null,

  register: async (input) => {
    set({ loading: true, error: null })
    try {
      const user = await api.auth.register(input)
      set({ user, loading: false })
      return true
    } catch (e) {
      set({ loading: false, error: e instanceof ApiError ? e.message : 'Something went wrong.' })
      return false
    }
  },

  login: async (input) => {
    set({ loading: true, error: null })
    try {
      const user = await api.auth.login(input)
      set({ user, loading: false })
      return true
    } catch (e) {
      set({ loading: false, error: e instanceof ApiError ? e.message : 'Something went wrong.' })
      return false
    }
  },

  logout: () => {
    api.auth.logout()
    set({ user: null })
  },

  saveAddress: async (address) => {
    const user = get().user
    if (!user) return
    const updated = await api.auth.saveAddress(user.id, address)
    set({ user: updated })
  },

  clearError: () => set({ error: null }),
}))
