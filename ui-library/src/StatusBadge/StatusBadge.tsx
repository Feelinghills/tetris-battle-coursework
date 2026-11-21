import type { JSX } from 'react'

import styles from './StatusBadge.module.css'

import type { StatusVariant } from '../types'

const DEFAULT_LABELS: Record<StatusVariant, string> = {
  waiting: 'Ожидание',
  playing: 'Идёт матч',
  finished: 'Завершён',
  online: 'Онлайн',
  offline: 'Офлайн',
}

export interface StatusBadgeProps {
  status: StatusVariant
  label?: string
}

export const StatusBadge = ({
  status,
  label,
}: StatusBadgeProps): JSX.Element => {
  const text = label ?? DEFAULT_LABELS[status]

  return (
    <span className={`${styles.badge} ${styles[`badge--${status}`]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {text}
    </span>
  )
}
