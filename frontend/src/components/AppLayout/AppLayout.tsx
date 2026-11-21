import type { JSX } from 'react'

import { Outlet } from 'react-router-dom'

import styles from './AppLayout.module.css'
import { Navbar } from '../Navbar/Navbar'

export const AppLayout = (): JSX.Element => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <span>TetrisBattle — курсовой проект по многопользовательскому Тетрису</span>
      </footer>
    </div>
  )
}
