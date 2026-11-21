import type { JSX } from 'react'

import {
  Button,
  Card,
  NextTetromino,
  PageHeader,
  StatCard,
  TetrisWell,
} from '@tetris-battle/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './HomePage.module.css'
import {
  MOCK_LEADERBOARD,
  MOCK_ROOMS,
  TETROMINOES,
  createDemoGrid,
} from '../../data/mockData'

export const HomePage = (): JSX.Element => {
  const navigate = useNavigate()
  const activeRoomsCount = MOCK_ROOMS.filter(
    (room) => room.status !== 'finished',
  ).length
  const onlinePlayersCount = MOCK_LEADERBOARD.filter(
    (player) => player.status === 'online',
  ).length
  const topScore = MOCK_LEADERBOARD[0]?.bestScore ?? 0

  return (
    <div className={styles.page}>
      <PageHeader
        title="TetrisBattle — Арена многопользовательского Тетриса"
        description="Каркас курсового веб-приложения: одиночная игра, комнаты дуэлей, рейтинг игроков и личный кабинет."
        actions={
          <>
            <Button onClick={() => navigate('/play/solo')}>
              Играть соло
            </Button>
            <Button variant="secondary" onClick={() => navigate('/rooms')}>
              Открыть комнаты
            </Button>
          </>
        }
      />

      <section className={styles.statsGrid} aria-label="Ключевые показатели">
        <StatCard
          label="Активные комнаты"
          value={activeRoomsCount}
          hint="Доступны для просмотра и входа"
        />
        <StatCard
          label="Игроков онлайн"
          value={onlinePlayersCount}
          hint="Демонстрационные данные"
        />
        <StatCard
          label="Рекорд арены"
          value={topScore}
          hint={`Лидер: ${MOCK_LEADERBOARD[0]?.nickname ?? '—'}`}
        />
      </section>

      <section className={styles.showcase}>
        <Card
          title="Режимы игры"
          subtitle="Навигация по основным разделам курсового проекта"
        >
          <div className={styles.modes}>
            <div className={styles.modeItem}>
              <h4>Одиночный режим (/play/solo)</h4>
              <p>
                Классический стакан 10x20, отображение следующей фигуры, подсчёт
                очков и сохранение результата в таблицу лидеров (основной
                сценарий MVP).
              </p>
              <Button size="small" onClick={() => navigate('/play/solo')}>
                Перейти к соло-игре
              </Button>
            </div>

            <div className={styles.modeItem}>
              <h4>Комнаты дуэлей (/rooms)</h4>
              <p>
                Лобби многопользовательских матчей с фильтрацией по статусу и
                просмотром арены конкретной комнаты (/rooms/:roomId).
              </p>
              <Button
                size="small"
                variant="secondary"
                onClick={() => navigate('/rooms')}
              >
                Смотреть комнаты
              </Button>
            </div>

            <div className={styles.modeItem}>
              <h4>Таблица лидеров (/leaderboard)</h4>
              <p>
                Рейтинг лучших игроков с переходом на профиль каждого участника
                (/players/:playerId) и историей его матчей.
              </p>
              <Button
                size="small"
                variant="secondary"
                onClick={() => navigate('/leaderboard')}
              >
                Открыть рейтинг
              </Button>
            </div>
          </div>
        </Card>

        <Card
          title="Превью компонентов @tetris-battle/ui-library"
          subtitle="Реальное использование компонентов TetrisWell и NextTetromino"
        >
          <div className={styles.previewArea}>
            <TetrisWell
              grid={createDemoGrid(12, 10, 'primary')}
              rows={12}
              cols={10}
              title="Демо-стакан"
            />
            <NextTetromino
              tetromino={TETROMINOES[2]}
              title="Следующая фигура"
            />
          </div>
        </Card>
      </section>
    </div>
  )
}
