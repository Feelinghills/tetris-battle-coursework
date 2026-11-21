import type { JSX } from 'react'

import {
  Button,
  Card,
  EmptyState,
  NextTetromino,
  PageHeader,
  StatusBadge,
  TetrisWell,
} from '@tetris-battle/ui-library'
import { useNavigate, useParams } from 'react-router-dom'

import styles from './RoomBattlePage.module.css'
import {
  MOCK_ROOMS,
  TETROMINOES,
  createDemoGrid,
} from '../../data/mockData'

export const RoomBattlePage = (): JSX.Element => {
  const { roomId } = useParams<{ roomId: string }>()
  const navigate = useNavigate()
  const room = MOCK_ROOMS.find((item) => item.id === roomId)

  if (!room) {
    return (
      <div className={styles.page}>
        <PageHeader
          title="Комната не найдена"
          description={`Идентификатор комнаты: ${roomId ?? 'не указан'}`}
        />
        <EmptyState
          title="Такой комнаты не существует"
          description="Возможно, матч уже был удалён или указан неверный идентификатор комнаты."
          action={
            <Button onClick={() => navigate('/rooms')}>
              Вернуться к списку комнат
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title={`Комната: ${room.name}`}
        description={`ID: ${room.id} • Скорость: уровень ${room.speedLevel} • Каркас экрана многопользовательской дуэли.`}
        actions={
          <>
            <StatusBadge status={room.status} />
            <Button
              size="small"
              variant="secondary"
              onClick={() => navigate('/rooms')}
            >
              Все комнаты
            </Button>
          </>
        }
      />

      <div className={styles.duelGrid}>
        <Card
          title={`Игрок 1: ${room.host}`}
          subtitle="Основной стакан и следующая фигура"
        >
          <div className={styles.boardRow}>
            <TetrisWell
              grid={createDemoGrid(16, 10, 'primary')}
              rows={16}
              cols={10}
              title={room.host}
            />
            <NextTetromino
              tetromino={TETROMINOES[0]}
              title="Следующая фигура"
            />
          </div>
        </Card>

        <Card
          title={`Игрок 2: ${room.guest ?? 'Ожидание подключения'}`}
          subtitle="Поле соперника (синхронизация в будущих версиях)"
        >
          <div className={styles.boardRow}>
            <TetrisWell
              grid={createDemoGrid(16, 10, 'opponent')}
              rows={16}
              cols={10}
              title={room.guest ?? 'Соперник'}
            />
            <NextTetromino
              tetromino={TETROMINOES[4]}
              title="Фигура соперника"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}
