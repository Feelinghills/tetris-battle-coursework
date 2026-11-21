import type { JSX } from 'react'

import styles from './TetrisWell.module.css'

import type { ColorPalette } from '../types'

const DEFAULT_COLORS: ColorPalette = {
  1: '#06b6d4',
  2: '#eab308',
  3: '#a855f7',
  4: '#22c55e',
  5: '#ef4444',
  6: '#3b82f6',
  7: '#f97316',
}

export interface TetrisWellProps {
  grid: number[][]
  rows?: number
  cols?: number
  colorMap?: ColorPalette
  title?: string
}

export const TetrisWell = ({
  grid,
  rows = 20,
  cols = 10,
  colorMap = DEFAULT_COLORS,
  title = 'Стакан тетриса',
}: TetrisWellProps): JSX.Element => {
  const cells = Array.from({ length: rows * cols }, (_, index) => {
    const row = Math.floor(index / cols)
    const col = index % cols
    const value = grid[row]?.[col] ?? 0
    const isFilled = value > 0
    const color = isFilled ? (colorMap[value] ?? '#64748b') : undefined

    return { row, col, value, isFilled, color }
  })

  const colLabels = Array.from({ length: cols }, (_, index) =>
    String((index + 1) % 10),
  )
  const filledCount = cells.filter((c) => c.isFilled).length

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          {title} ({cols}x{rows})
        </h4>
        <span className={styles.counter}>Занято клеток: {filledCount}</span>
      </div>

      <div
        className={styles.grid}
        role="grid"
        aria-label={`Поле ${cols}x${rows}`}
        style={{
          gridTemplateColumns: `repeat(${cols}, 20px)`,
        }}
      >
        {cells.map(({ row, col, value, isFilled, color }) => (
          <div
            key={`${row}-${col}`}
            role="gridcell"
            aria-label={`Ячейка ${row},${col}`}
            data-value={value}
            className={
              isFilled ? `${styles.cell} ${styles.filled}` : styles.cell
            }
            style={color ? { backgroundColor: color } : undefined}
          />
        ))}
      </div>

      <div
        className={styles.colNumbers}
        aria-label="Номера столбцов"
        style={{
          gridTemplateColumns: `repeat(${cols}, 20px)`,
        }}
      >
        {colLabels.map((label, colIndex) => (
          <span
            key={colIndex}
            className={styles.colLabel}
            aria-label={`Столбец ${colIndex + 1}`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
