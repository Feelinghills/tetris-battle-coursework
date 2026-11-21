import type { JSX, ReactNode } from 'react'

import styles from './Card.module.css'

export interface CardProps {
  title?: string
  subtitle?: string
  actions?: ReactNode
  children: ReactNode
  className?: string
}

export const Card = ({
  title,
  subtitle,
  actions,
  children,
  className = '',
}: CardProps): JSX.Element => {
  const cardClass = [styles.card, className].filter(Boolean).join(' ')
  const hasHeader = Boolean(title || subtitle || actions)

  return (
    <section className={cardClass}>
      {hasHeader && (
        <div className={styles.header}>
          <div className={styles.headingGroup}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </section>
  )
}
