import type { JSX, ReactNode } from 'react'

import styles from './Button.module.css'

import type { ButtonSize, ButtonVariant } from '../types'

export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  type = 'button',
  onClick,
  children,
}: ButtonProps): JSX.Element => {
  const className = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}
