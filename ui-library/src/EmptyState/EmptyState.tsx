import type { JSX, ReactNode } from 'react'

import styles from './EmptyState.module.css'

export interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export const EmptyState = ({
  title,
  description,
  action,
}: EmptyStateProps): JSX.Element => {
  return (
    <div className={styles.container} role="status">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  )
}
