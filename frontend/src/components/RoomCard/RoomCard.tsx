import type { JSX } from 'react'

import { Button, Card, StatusBadge } from '@tetris-battle/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './RoomCard.module.css'

import type { GameRoom } from '../../data/types'

export interface RoomCardProps {
  room: GameRoom
}

export const RoomCard = ({ room }: RoomCardProps): JSX.Element => {
  const navigate = useNavigate()
  const playersText = room.guest
    ? `${room.host} vs ${room.guest}`
    : `${room.host} (ожидает соперника)`

  return (
    <Card
      title={room.name}
      subtitle={`Создана: ${room.createdAt}`}
      actions={<StatusBadge status={room.status} />}
    >
      <div className={styles.details}>
        <p className={styles.row}>
          <strong>Игроки:</strong> {playersText}
        </p>
        <p className={styles.row}>
          <strong>Уровень скорости:</strong> {room.speedLevel}
        </p>
        <div className={styles.footer}>
          <Button
            size="small"
            variant={room.status === 'waiting' ? 'primary' : 'secondary'}
            onClick={() => navigate(`/rooms/${room.id}`)}
          >
            {room.status === 'waiting' ? 'Войти в комнату' : 'Открыть комнату'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
