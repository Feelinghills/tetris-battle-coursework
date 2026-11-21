import { render, screen } from '@testing-library/react'

import { PageHeader } from './PageHeader'

describe('PageHeader', () => {
  test('renders title, description and actions', () => {
    render(
      <PageHeader
        title="Игровые комнаты"
        description="Выберите комнату для дуэли"
        actions={<button type="button">Создать</button>}
      />,
    )

    expect(
      screen.getByRole('heading', { name: 'Игровые комнаты' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Выберите комнату для дуэли')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Создать' })).toBeInTheDocument()
  })

  test('renders only title when optional props omitted', () => {
    render(<PageHeader title="Правила" />)

    expect(screen.getByRole('heading', { name: 'Правила' })).toBeInTheDocument()
  })
})
