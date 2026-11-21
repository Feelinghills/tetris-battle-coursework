import { createContext } from 'react'

import type { PlayerSession } from '../data/types'

export interface AuthContextValue {
  session: PlayerSession | null
  login: (nickname: string) => void
  updatePreferences: (
    updates: Partial<Omit<PlayerSession, 'nickname'>>,
  ) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
