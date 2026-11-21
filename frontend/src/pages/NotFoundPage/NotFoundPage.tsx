import type { JSX } from 'react'

import { Button, EmptyState, PageHeader } from '@tetris-battle/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './NotFoundPage.module.css'

export const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate()

  return (
    <div className={styles.page}>
      <PageHeader
        title="404 — Страница не найдена"
        description="Запрошенный маршрут отсутствует в приложении TetrisBattle."
      />
      <EmptyState
        title="Маршрут не найден"
        description="Воспользуйтесь верхним меню или вернитесь на главную страницу."
        action={
          <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
        }
      />
    </div>
  )
}
