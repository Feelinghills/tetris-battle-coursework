import type { JSX } from 'react'

import styles from './StatCard.module.css'

export interface StatCardProps {
  label: string
  value: string | number
  hint?: string
}

export const StatCard = ({
  label,
  value,
  hint,
}: StatCardProps): JSX.Element => {
  return (
    <div className={styles.statCard}>
      <span className={styles.label}>{label}</span>
      <strong className={styles.value}>{value}</strong>
      {hint && <span className={styles.hint}>{hint}</span>}
    </div>
  )
}
