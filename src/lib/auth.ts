import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  role: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login - replace with actual API call
        if (email === 'admin@example.com' && password === 'password') {
          set({
            user: {
              id: '1',
              name: 'M Alwi Nugraha',
              email: email,
              role: 'Divisi Komersial'
            },
            isAuthenticated: true
          })
        } else {
          throw new Error('Invalid credentials')
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false })
      }
    }),
    {
      name: 'auth-storage'
    }
  )
)
