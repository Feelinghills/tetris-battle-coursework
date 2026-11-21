import { render, screen } from '@testing-library/react'

import { Card } from './Card'

describe('Card', () => {
  test('renders title, subtitle, actions and content', () => {
    render(
      <Card
        title="Статистика"
        subtitle="Текущая сессия"
        actions={<button type="button">Сброс</button>}
        className="extra-card"
      >
        Очки: 1200
      </Card>,
    )

    expect(screen.getByRole('heading', { name: 'Статистика' })).toBeInTheDocument()
    expect(screen.getByText('Текущая сессия')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Сброс' })).toBeInTheDocument()
    expect(screen.getByText('Очки: 1200')).toBeInTheDocument()
  })

  test('renders content without header when header props omitted', () => {
    render(<Card>Только контент</Card>)

    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
    expect(screen.getByText('Только контент')).toBeInTheDocument()
  })
})
