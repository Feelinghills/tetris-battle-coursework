import { useState, type JSX, type ReactNode } from 'react'

import { AuthContext } from './AuthContext'

import type { PlayerSession } from '../data/types'

const STORAGE_KEY = 'tetris_battle_player_session'

const readStoredSession = (): PlayerSession | null => {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)

    if (!raw) {
      return null
    }

    const parsed: unknown = JSON.parse(raw)

    if (
      typeof parsed === 'object' &&
      parsed !== null &&
      'nickname' in parsed &&
      typeof parsed.nickname === 'string'
    ) {
      const record = parsed as Record<string, unknown>

      return {
        nickname: record.nickname as string,
        preferredSpeed: record.preferredSpeed === 'fast' ? 'fast' : 'normal',
        showGhostPiece: record.showGhostPiece !== false,
      }
    }

    return null
  } catch {
    return null
  }
}

export interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [session, setSession] = useState<PlayerSession | null>(() =>
    readStoredSession(),
  )

  const persist = (next: PlayerSession | null): void => {
    setSession(next)

    if (next) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY)
    }
  }

  const login = (nickname: string): void => {
    const trimmed = nickname.trim()

    if (trimmed.length < 2) {
      return
    }

    persist({
      nickname: trimmed,
      preferredSpeed: 'normal',
      showGhostPiece: true,
    })
  }

  const updatePreferences = (
    updates: Partial<Omit<PlayerSession, 'nickname'>>,
  ): void => {
    if (!session) {
      return
    }

    persist({
      ...session,
      ...updates,
    })
  }

  const logout = (): void => {
    persist(null)
  }

  return (
    <AuthContext.Provider
      value={{ session, login, updatePreferences, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
