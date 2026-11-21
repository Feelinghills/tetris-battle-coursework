import { render, screen } from '@testing-library/react'

import { StatCard } from './StatCard'

describe('StatCard', () => {
  test('renders label, value and optional hint', () => {
    render(<StatCard label="Счёт" value={2450} hint="+300 за последний матч" />)

    expect(screen.getByText('Счёт')).toBeInTheDocument()
    expect(screen.getByText('2450')).toBeInTheDocument()
    expect(screen.getByText('+300 за последний матч')).toBeInTheDocument()
  })

  test('renders without hint when omitted', () => {
    render(<StatCard label="Линии" value={14} />)

    expect(screen.getByText('Линии')).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument()
  })
})
