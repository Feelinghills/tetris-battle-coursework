import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from './Button'

describe('Button', () => {
  test('renders label and triggers onClick', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(<Button onClick={handleClick}>Начать игру</Button>)

    const button = screen.getByRole('button', { name: 'Начать игру' })

    expect(button).toHaveAttribute('type', 'button')
    expect(button).not.toBeDisabled()

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('supports variants, sizes, submit type and disabled state', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()

    render(
      <Button
        variant="danger"
        size="large"
        type="submit"
        disabled
        onClick={handleClick}
      >
        Удалить
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'Удалить' })

    expect(button).toHaveAttribute('type', 'submit')
    expect(button).toBeDisabled()

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })
})
