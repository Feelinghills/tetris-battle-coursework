import type { JSX } from 'react'

import {
  Button,
  Card,
  PageHeader,
  StatusBadge,
} from '@tetris-battle/ui-library'
import { useNavigate } from 'react-router-dom'

import styles from './ProfileSettingsPage.module.css'
import { useAuth } from '../../auth/useAuth'

export const ProfileSettingsPage = (): JSX.Element => {
  const { session, updatePreferences, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Личный кабинет и настройки"
        description="Защищённый маршрут (/profile): доступен только после входа на странице /login."
        actions={
          <StatusBadge
            status="online"
            label={`Игрок: ${session?.nickname ?? ''}`}
          />
        }
      />

      <Card
        title="Настройки игрового процесса"
        subtitle="Параметры сохраняются в текущей сессии браузера"
      >
        <div className={styles.settings}>
          <div className={styles.row}>
            <div>
              <strong>Скорость падения фигур</strong>
              <p className={styles.hint}>
                Текущий режим:{' '}
                {session?.preferredSpeed === 'fast'
                  ? 'Ускоренный'
                  : 'Классический'}
              </p>
            </div>
            <div className={styles.btnGroup}>
              <Button
                size="small"
                variant={
                  session?.preferredSpeed === 'normal' ? 'primary' : 'secondary'
                }
                onClick={() => updatePreferences({ preferredSpeed: 'normal' })}
              >
                Классический
              </Button>
              <Button
                size="small"
                variant={
                  session?.preferredSpeed === 'fast' ? 'primary' : 'secondary'
                }
                onClick={() => updatePreferences({ preferredSpeed: 'fast' })}
              >
                Ускоренный
              </Button>
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <strong>Подсветка проекции фигуры (Ghost Piece)</strong>
              <p className={styles.hint}>
                Статус: {session?.showGhostPiece ? 'Включена' : 'Выключена'}
              </p>
            </div>
            <Button
              size="small"
              variant="secondary"
              onClick={() =>
                updatePreferences({
                  showGhostPiece: !session?.showGhostPiece,
                })
              }
            >
              {session?.showGhostPiece ? 'Выключить' : 'Включить'}
            </Button>
          </div>

          <div className={styles.footer}>
            <Button size="small" variant="danger" onClick={handleLogout}>
              Завершить сессию
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
