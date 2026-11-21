import type { StatusVariant } from '@tetris-battle/ui-library'

export interface PlayerSession {
  nickname: string
  preferredSpeed: 'normal' | 'fast'
  showGhostPiece: boolean
}

export interface GameRoom {
  id: string
  name: string
  host: string
  guest: string | null
  status: Extract<StatusVariant, 'waiting' | 'playing' | 'finished'>
  speedLevel: number
  createdAt: string
}

export interface LeaderboardEntry {
  rank: number
  playerId: string
  nickname: string
  bestScore: number
  linesCleared: number
  wins: number
  status: Extract<StatusVariant, 'online' | 'offline'>
}

export interface MatchHistoryItem {
  id: string
  opponent: string
  result: 'Победа' | 'Поражение' | 'Соло'
  score: number
  lines: number
  playedAt: string
}

export interface PlayerProfile {
  id: string
  nickname: string
  rankTitle: string
  status: Extract<StatusVariant, 'online' | 'offline'>
  bestScore: number
  totalGames: number
  wins: number
  totalLines: number
  favoritePiece: string
  recentMatches: MatchHistoryItem[]
}

export interface ScoringRule {
  lines: number
  name: string
  points: number
  description: string
}
