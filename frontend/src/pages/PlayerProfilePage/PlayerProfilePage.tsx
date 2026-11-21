import type { JSX } from 'react'

import {
  Button,
  Card,
  EmptyState,
  PageHeader,
  StatCard,
  StatusBadge,
} from '@tetris-battle/ui-library'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './PlayerProfilePage.module.css'
import { MOCK_PLAYERS } from '../../data/mockData'

export const PlayerProfilePage = (): JSX.Element => {
  const { playerId } = useParams<{ playerId: string }>()
  const navigate = useNavigate()
  const profile = playerId ? MOCK_PLAYERS[playerId] : undefined

  if (!profile) {
    return (
      <div className={styles.page}>
        <PageHeader
          title="Профиль не найден"
          description={`Идентификатор игрока: ${playerId ?? 'не указан'}`}
        />
        <EmptyState
          title="Игрок не найден"
          description="Проверьте ссылку или выберите игрока из таблицы лидеров."
          action={
            <Button onClick={() => navigate('/leaderboard')}>
              Перейти к таблице лидеров
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={`Профиль игрока: ${profile.nickname}`}
        description={`${profile.rankTitle} • Любимая фигура: ${profile.favoritePiece}`}
        actions={
          <>
            <StatusBadge status={profile.status} />
            <Button
              size="small"
              variant="secondary"
              onClick={() => navigate('/leaderboard')}
            >
              К рейтингу
            </Button>
          </>
        }
      />

      <section className={styles.statsGrid} aria-label="Статистика игрока">
        <StatCard label="Лучший счёт" value={profile.bestScore} />
        <StatCard label="Побед" value={profile.wins} hint={`из ${profile.totalGames} игр`} />
        <StatCard label="Всего линий" value={profile.totalLines} />
      </section>

      <Card
        title="История последних матчей"
        subtitle="Демонстрационная сводка игр пользователя"
      >
        <ul className={styles.historyList}>
          {profile.recentMatches.map((match) => (
            <li key={match.id} className={styles.historyItem}>
              <div>
                <strong>{match.result}</strong> — против: {match.opponent}
              </div>
              <div className={styles.meta}>
                <span>Счёт: {match.score}</span>
                <span>Линии: {match.lines}</span>
                <span>{match.playedAt}</span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
