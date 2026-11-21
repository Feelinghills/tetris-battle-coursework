import type { JSX } from 'react'

import { Button, Card, PageHeader } from '@tetris-battle/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './LeaderboardPage.module.css'
import { LeaderboardTable } from '../../components/LeaderboardTable/LeaderboardTable'
import { MOCK_LEADERBOARD } from '../../data/mockData'

export const LeaderboardPage = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <PageHeader
        title="Таблица лидеров"
        description="Топ игроков TetrisBattle по лучшему счёту. Нажмите на никнейм игрока, чтобы открыть его профиль (/players/:playerId)."
        actions={
          <Button size="small" onClick={() => navigate('/play/solo')}>
            Побей рекорд в соло
          </Button>
        }
      />

      <Card
        title="Общий рейтинг"
        subtitle="В каркасе отображаются демонстрационные рекорды; в MVP сюда будут сохраняться результаты завершённых партий"
      >
        <LeaderboardTable entries={MOCK_LEADERBOARD} />
      </Card>
    </div>
  )
}
