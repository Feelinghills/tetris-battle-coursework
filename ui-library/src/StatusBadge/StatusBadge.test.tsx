import { render, screen } from '@testing-library/react'

import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  test('renders default russian label for status', () => {
    render(<StatusBadge status="playing" />)

    expect(screen.getByText('Идёт матч')).toBeInTheDocument()
  })

  test('renders custom label when provided', () => {
    render(<StatusBadge status="waiting" label="Свободно 1 место" />)

    expect(screen.getByText('Свободно 1 место')).toBeInTheDocument()
  })
})
