import { useState, type FormEvent, type JSX } from 'react'

import { Button, Card, PageHeader } from '@tetris-battle/ui-library'
import { useLocation, useNavigate } from 'react-router-dom'

import styles from './LoginPage.module.css'
import { useAuth } from '../../auth/useAuth'

interface LocationState {
  from?: string
}

export const LoginPage = (): JSX.Element => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [nickname, setNickname] = useState<string>('')
  const [error, setError] = useState<string>('')

  const state = location.state as LocationState | null
  const redirectTo = state?.from ?? '/profile'

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const trimmed = nickname.trim()

    if (trimmed.length < 2 || trimmed.length > 20) {
      setError('Никнейм должен содержать от 2 до 20 символов.')

      return
    }

    setError('')
    login(trimmed)
    navigate(redirectTo, { replace: true })
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Вход игрока"
        description="Введите никнейм, чтобы получить доступ к защищённому разделу «Кабинет» (/profile) и сохранять настройки в сессии."
      />

      <Card
        title="Авторизация сессии"
        subtitle="Демонстрационный вход сохраняется в sessionStorage браузера"
      >
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Никнейм игрока</span>
            <input
              type="text"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
              placeholder="Например, Student28"
              className={styles.input}
            />
          </label>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <Button type="submit">Войти</Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
            >
              На главную
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
