import type {
  GameRoom,
  LeaderboardEntry,
  PlayerProfile,
  ScoringRule,
} from './types'
import type { Tetromino } from '@tetris-battle/ui-library'

export const TETROMINOES: Tetromino[] = [
  {
    id: 'tetromino-i',
    name: 'I-образное (Прямое)',
    type: 'I',
    defaultColor: '#06b6d4',
    colorCode: 1,
    coords: [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 1, col: 3 },
    ],
  },
  {
    id: 'tetromino-o',
    name: 'O-образное (Квадрат)',
    type: 'O',
    defaultColor: '#eab308',
    colorCode: 2,
    coords: [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: 'tetromino-t',
    name: 'T-образное',
    type: 'T',
    defaultColor: '#a855f7',
    colorCode: 3,
    coords: [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
    ],
  },
  {
    id: 'tetromino-s',
    name: 'S-образное',
    type: 'S',
    defaultColor: '#22c55e',
    colorCode: 4,
    coords: [
      { row: 1, col: 1 },
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
    ],
  },
  {
    id: 'tetromino-z',
    name: 'Z-образное',
    type: 'Z',
    defaultColor: '#ef4444',
    colorCode: 5,
    coords: [
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: 'tetromino-j',
    name: 'J-образное',
    type: 'J',
    defaultColor: '#3b82f6',
    colorCode: 6,
    coords: [
      { row: 1, col: 0 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
  {
    id: 'tetromino-l',
    name: 'L-образное',
    type: 'L',
    defaultColor: '#f97316',
    colorCode: 7,
    coords: [
      { row: 1, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 1 },
      { row: 2, col: 2 },
    ],
  },
]

export const createEmptyGrid = (rows: number, cols: number): number[][] =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0))

export const createDemoGrid = (
  rows: number,
  cols: number,
  variant: 'primary' | 'opponent' = 'primary',
): number[][] => {
  const grid = createEmptyGrid(rows, cols)
  const patterns: Record<'primary' | 'opponent', number[][]> = {
    primary: [
      [0, 0, 3, 0, 0, 0, 4, 4, 0, 0],
      [0, 3, 3, 3, 0, 4, 4, 0, 7, 0],
      [6, 0, 2, 2, 5, 5, 0, 0, 7, 0],
      [6, 6, 2, 2, 0, 5, 5, 1, 7, 7],
      [1, 1, 1, 1, 0, 3, 3, 1, 2, 2],
    ],
    opponent: [
      [0, 0, 0, 0, 6, 0, 0, 0, 0, 0],
      [0, 5, 5, 0, 6, 6, 6, 0, 2, 2],
      [0, 0, 5, 5, 0, 3, 0, 0, 2, 2],
      [4, 4, 0, 7, 3, 3, 3, 1, 1, 1],
    ],
  }

  const bottomRows = patterns[variant]

  bottomRows.forEach((pattern, index) => {
    const targetRow = rows - bottomRows.length + index

    grid[targetRow] = Array.from(
      { length: cols },
      (_, colIdx) => pattern[colIdx % pattern.length],
    )
  })

  return grid
}

export const MOCK_ROOMS: GameRoom[] = [
  {
    id: 'room-1',
    name: 'Классическая арена #1',
    host: 'TetrisMaster',
    guest: null,
    status: 'waiting',
    speedLevel: 2,
    createdAt: '2 минуты назад',
  },
  {
    id: 'room-2',
    name: 'Блиц-дуэль на скорость',
    host: 'Alex',
    guest: 'BlockBuilder',
    status: 'playing',
    speedLevel: 5,
    createdAt: '7 минут назад',
  },
  {
    id: 'room-3',
    name: 'Тренировка новичков',
    host: 'Rookie',
    guest: null,
    status: 'waiting',
    speedLevel: 1,
    createdAt: '12 минут назад',
  },
  {
    id: 'room-4',
    name: 'Финал недели',
    host: 'Gamer_99',
    guest: 'TetrisMaster',
    status: 'finished',
    speedLevel: 4,
    createdAt: '35 минут назад',
  },
]

export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    playerId: 'player-1',
    nickname: 'TetrisMaster',
    bestScore: 4800,
    linesCleared: 52,
    wins: 19,
    status: 'online',
  },
  {
    rank: 2,
    playerId: 'player-2',
    nickname: 'Alex',
    bestScore: 3650,
    linesCleared: 41,
    wins: 14,
    status: 'online',
  },
  {
    rank: 3,
    playerId: 'player-3',
    nickname: 'BlockBuilder',
    bestScore: 2900,
    linesCleared: 33,
    wins: 11,
    status: 'online',
  },
  {
    rank: 4,
    playerId: 'player-4',
    nickname: 'Gamer_99',
    bestScore: 2150,
    linesCleared: 24,
    wins: 7,
    status: 'offline',
  },
  {
    rank: 5,
    playerId: 'player-5',
    nickname: 'Rookie',
    bestScore: 1200,
    linesCleared: 14,
    wins: 3,
    status: 'offline',
  },
]

export const MOCK_PLAYERS: Record<string, PlayerProfile> = {
  'player-1': {
    id: 'player-1',
    nickname: 'TetrisMaster',
    rankTitle: 'Гроссмейстер Тетриса',
    status: 'online',
    bestScore: 4800,
    totalGames: 25,
    wins: 19,
    totalLines: 412,
    favoritePiece: 'I-образное (Прямое)',
    recentMatches: [
      {
        id: 'm-1',
        opponent: 'Gamer_99',
        result: 'Победа',
        score: 4800,
        lines: 52,
        playedAt: 'Сегодня, 15:10',
      },
      {
        id: 'm-2',
        opponent: 'Alex',
        result: 'Победа',
        score: 3900,
        lines: 44,
        playedAt: 'Вчера, 21:40',
      },
    ],
  },
  'player-2': {
    id: 'player-2',
    nickname: 'Alex',
    rankTitle: 'Мастер линий',
    status: 'online',
    bestScore: 3650,
    totalGames: 22,
    wins: 14,
    totalLines: 318,
    favoritePiece: 'T-образное',
    recentMatches: [
      {
        id: 'm-3',
        opponent: 'BlockBuilder',
        result: 'Победа',
        score: 3650,
        lines: 41,
        playedAt: 'Сегодня, 14:25',
      },
      {
        id: 'm-4',
        opponent: 'TetrisMaster',
        result: 'Поражение',
        score: 2950,
        lines: 35,
        playedAt: 'Вчера, 21:40',
      },
    ],
  },
  'player-3': {
    id: 'player-3',
    nickname: 'BlockBuilder',
    rankTitle: 'Стратег',
    status: 'online',
    bestScore: 2900,
    totalGames: 19,
    wins: 11,
    totalLines: 245,
    favoritePiece: 'O-образное (Квадрат)',
    recentMatches: [
      {
        id: 'm-5',
        opponent: 'Одиночная игра',
        result: 'Соло',
        score: 2900,
        lines: 33,
        playedAt: 'Сегодня, 13:05',
      },
    ],
  },
  'player-4': {
    id: 'player-4',
    nickname: 'Gamer_99',
    rankTitle: 'Претендент',
    status: 'offline',
    bestScore: 2150,
    totalGames: 15,
    wins: 7,
    totalLines: 170,
    favoritePiece: 'L-образное',
    recentMatches: [
      {
        id: 'm-6',
        opponent: 'TetrisMaster',
        result: 'Поражение',
        score: 2150,
        lines: 24,
        playedAt: 'Сегодня, 15:10',
      },
    ],
  },
  'player-5': {
    id: 'player-5',
    nickname: 'Rookie',
    rankTitle: 'Новичок',
    status: 'offline',
    bestScore: 1200,
    totalGames: 8,
    wins: 3,
    totalLines: 84,
    favoritePiece: 'S-образное',
    recentMatches: [
      {
        id: 'm-7',
        opponent: 'Одиночная игра',
        result: 'Соло',
        score: 1200,
        lines: 14,
        playedAt: 'Вчера, 18:15',
      },
    ],
  },
}

export const SCORING_RULES: ScoringRule[] = [
  {
    lines: 1,
    name: 'Single (1 линия)',
    points: 100,
    description: 'Базовая очистка одной полностью заполненной строки.',
  },
  {
    lines: 2,
    name: 'Double (2 линии)',
    points: 300,
    description: 'Одновременная очистка двух строк одной фигурой.',
  },
  {
    lines: 3,
    name: 'Triple (3 линии)',
    points: 500,
    description: 'Сложная комбинация с очисткой трёх строк сразу.',
  },
  {
    lines: 4,
    name: 'Tetris (4 линии)',
    points: 800,
    description: 'Максимальный бонус за 4 строки с помощью I-тетрамино.',
  },
]
