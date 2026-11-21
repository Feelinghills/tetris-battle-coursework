import type { JSX } from 'react'

import { Button, StatusBadge } from '@tetris-battle/ui-library'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import styles from './Navbar.module.css'
import { useAuth } from '../../auth/useAuth'

interface NavItem {
  to: string
  label: string
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', label: 'Главная', end: true },
  { to: '/play/solo', label: 'Соло-игра' },
  { to: '/rooms', label: 'Комнаты' },
  { to: '/leaderboard', label: 'Лидеры' },
  { to: '/rules', label: 'Правила' },
  { to: '/profile', label: 'Кабинет' },
]

export const Navbar = (): JSX.Element => {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = (): void => {
    logout()
    navigate('/')
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logoMark} aria-hidden="true">
            T
          </span>
          <span>TetrisBattle</span>
        </Link>

        <nav className={styles.nav} aria-label="Основная навигация">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.authArea}>
          {session ? (
            <>
              <StatusBadge status="online" label={session.nickname} />
              <Button size="small" variant="secondary" onClick={handleLogout}>
                Выйти
              </Button>
            </>
          ) : (
            <Button
              size="small"
              variant="primary"
              onClick={() => navigate('/login')}
            >
              Войти
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
