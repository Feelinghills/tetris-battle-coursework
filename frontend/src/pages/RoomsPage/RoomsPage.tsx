import { useState, type JSX } from 'react'

import { Button, EmptyState, PageHeader } from '@tetris-battle/ui-library'

import styles from './RoomsPage.module.css'
import { RoomCard } from '../../components/RoomCard/RoomCard'
import { MOCK_ROOMS } from '../../data/mockData'

type RoomFilter = 'all' | 'waiting' | 'playing' | 'finished'

const FILTER_LABELS: Record<RoomFilter, string> = {
  all: 'Все комнаты',
  waiting: 'Ожидают соперника',
  playing: 'Идёт матч',
  finished: 'Завершённые',
}

export const RoomsPage = (): JSX.Element => {
  const [filter, setFilter] = useState<RoomFilter>('all')
  const visibleRooms =
    filter === 'all'
      ? MOCK_ROOMS
      : MOCK_ROOMS.filter((room) => room.status === filter)

  return (
    <div className={styles.page}>
      <PageHeader
        title="Комнаты дуэлей"
        description="Список многопользовательских комнат. В каркасе используются демонстрационные комнаты с переходом на страницу /rooms/:roomId."
      />

      <div className={styles.filters} role="group" aria-label="Фильтр комнат">
        {(Object.keys(FILTER_LABELS) as RoomFilter[]).map((key) => (
          <Button
            key={key}
            size="small"
            variant={filter === key ? 'primary' : 'secondary'}
            onClick={() => setFilter(key)}
          >
            {FILTER_LABELS[key]}
          </Button>
        ))}
      </div>

      {visibleRooms.length > 0 ? (
        <div className={styles.grid}>
          {visibleRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Подходящих комнат нет"
          description="Сбросьте фильтр, чтобы увидеть все доступные комнаты."
          action={
            <Button size="small" onClick={() => setFilter('all')}>
              Показать все
            </Button>
          }
        />
      )}
    </div>
  )
}
