import type { JSX } from 'react'

import { StatusBadge } from '@tetris-battle/ui-library'
import { Link } from 'react-router-dom'

import styles from './LeaderboardTable.module.css'

import type { LeaderboardEntry } from '../../data/types'

export interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export const LeaderboardTable = ({
  entries,
}: LeaderboardTableProps): JSX.Element => {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Игрок</th>
            <th>Рекорд</th>
            <th>Линии</th>
            <th>Победы</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.playerId}>
              <td className={styles.rank}>{entry.rank}</td>
              <td>
                <Link to={`/players/${entry.playerId}`} className={styles.playerLink}>
                  {entry.nickname}
                </Link>
              </td>
              <td className={styles.score}>{entry.bestScore}</td>
              <td>{entry.linesCleared}</td>
              <td>{entry.wins}</td>
              <td>
                <StatusBadge status={entry.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
