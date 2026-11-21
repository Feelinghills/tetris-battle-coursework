import { render, screen } from '@testing-library/react'

import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  test('renders title, description and action', () => {
    render(
      <EmptyState
        title="Комната не найдена"
        description="Проверьте идентификатор комнаты."
        action={<a href="/rooms">К списку комнат</a>}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Комната не найдена' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Проверьте идентификатор комнаты.'),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'К списку комнат' }),
    ).toBeInTheDocument()
  })

  test('renders without action', () => {
    render(
      <EmptyState
        title="Пусто"
        description="Данные пока отсутствуют."
      />,
    )

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText('Данные пока отсутствуют.')).toBeInTheDocument()
  })
})
