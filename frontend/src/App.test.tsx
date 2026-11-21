import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import App from './App'
import { AuthProvider } from './auth/AuthProvider'
import { AppRoutes } from './router/AppRoutes'

const renderAtRoute = (initialRoute: string): void => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={[initialRoute]}>
        <AppRoutes />
      </MemoryRouter>
    </AuthProvider>,
  )
}

describe('TetrisBattle routing and skeleton', () => {
  beforeEach(() => {
    window.sessionStorage.clear()
  })

  test('renders HomePage with ui-library preview components', () => {
    renderAtRoute('/')

    expect(
      screen.getByRole('heading', {
        name: 'TetrisBattle — Арена многопользовательского Тетриса',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Демо-стакан (10x12)' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Следующая фигура' }),
    ).toBeInTheDocument()
  })

  test('navigates to SoloGamePage and cycles tetromino preview', async () => {
    const user = userEvent.setup()

    renderAtRoute('/play/solo')

    expect(
      screen.getByRole('heading', { name: 'Одиночная игра' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Фигура: T-образное (T)')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Следующая фигура' }))
    expect(screen.getByText('Фигура: S-образное (S)')).toBeInTheDocument()

    await user.click(
      screen.getByRole('button', { name: 'Показать пустой стакан' }),
    )
    expect(screen.getByText('Занято клеток: 0')).toBeInTheDocument()
  })

  test('filters rooms and opens parameterized RoomBattlePage', async () => {
    const user = userEvent.setup()

    renderAtRoute('/rooms')

    expect(
      screen.getByRole('heading', { name: 'Комнаты дуэлей' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Идёт матч' }))
    expect(
      screen.getByRole('heading', { name: 'Блиц-дуэль на скорость' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Открыть комнату' }))
    expect(
      screen.getByRole('heading', { name: 'Комната: Блиц-дуэль на скорость' }),
    ).toBeInTheDocument()
  })

  test('renders App root with BrowserRouter', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: 'TetrisBattle — Арена многопользовательского Тетриса',
      }),
    ).toBeInTheDocument()
  })

  test('renders EmptyState for unknown roomId and unknown playerId', () => {
    renderAtRoute('/rooms/missing-room')
    expect(
      screen.getByRole('heading', { name: 'Такой комнаты не существует' }),
    ).toBeInTheDocument()

    renderAtRoute('/players/unknown-player')
    expect(
      screen.getByRole('heading', { name: 'Игрок не найден' }),
    ).toBeInTheDocument()
  })

  test('opens LeaderboardPage and navigates to PlayerProfilePage', async () => {
    const user = userEvent.setup()

    renderAtRoute('/leaderboard')

    expect(
      screen.getByRole('heading', { name: 'Таблица лидеров' }),
    ).toBeInTheDocument()

    await user.click(screen.getByRole('link', { name: 'TetrisMaster' }))
    expect(
      screen.getByRole('heading', { name: 'Профиль игрока: TetrisMaster' }),
    ).toBeInTheDocument()
  })

  test('renders RulesPage with all 7 classic tetrominoes', () => {
    renderAtRoute('/rules')

    expect(
      screen.getByRole('heading', { name: 'Правила TetrisBattle' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Tetris (4 линии)')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Фигура I' }),
    ).toBeInTheDocument()
  })

  test('redirects /profile to /login when unauthenticated and returns after login', async () => {
    const user = userEvent.setup()

    renderAtRoute('/profile')

    expect(
      screen.getByRole('heading', { name: 'Вход игрока' }),
    ).toBeInTheDocument()

    const mainArea = screen.getByRole('main')

    await user.type(within(mainArea).getByLabelText('Никнейм игрока'), 'A')
    await user.click(within(mainArea).getByRole('button', { name: 'Войти' }))
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Никнейм должен содержать от 2 до 20 символов.',
    )

    await user.clear(within(mainArea).getByLabelText('Никнейм игрока'))
    await user.type(
      within(mainArea).getByLabelText('Никнейм игрока'),
      'Student28',
    )
    await user.click(within(mainArea).getByRole('button', { name: 'Войти' }))

    expect(
      screen.getByRole('heading', { name: 'Личный кабинет и настройки' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Игрок: Student28')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Ускоренный' }))
    expect(screen.getByText('Текущий режим: Ускоренный')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Выключить' }))
    expect(screen.getByText('Статус: Выключена')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Завершить сессию' }))
    expect(
      screen.getByRole('heading', { name: 'Вход игрока' }),
    ).toBeInTheDocument()
  })

  test('renders NotFoundPage for unknown routes', () => {
    renderAtRoute('/non-existent-route')

    expect(
      screen.getByRole('heading', { name: '404 — Страница не найдена' }),
    ).toBeInTheDocument()
  })
})
