import { useState, type JSX } from 'react'

import {
  Button,
  Card,
  NextTetromino,
  PageHeader,
  StatCard,
  StatusBadge,
  TetrisWell,
} from '@tetris-battle/ui-library'

import styles from './SoloGamePage.module.css'
import { TETROMINOES, createDemoGrid, createEmptyGrid } from '../../data/mockData'

export const SoloGamePage = (): JSX.Element => {
  const [pieceIndex, setPieceIndex] = useState<number>(2)
  const [isDemoFilled, setIsDemoFilled] = useState<boolean>(true)
  const grid = isDemoFilled
    ? createDemoGrid(20, 10, 'primary')
    : createEmptyGrid(20, 10)
  const nextTetromino = TETROMINOES[pieceIndex]

  const handleCyclePiece = (): void => {
    setPieceIndex((prev) => (prev + 1) % TETROMINOES.length)
  }

  return (
    <div className={styles.page}>
      <PageHeader
        title="Одиночная игра"
        description="Каркас игрового экрана: здесь будет отображаться интерактивный стакан 10x20, следующая фигура, счёт и управление партией."
        actions={<StatusBadge status="waiting" label="Каркас экрана" />}
      />

      <div className={styles.arena}>
        <Card title="Игровое поле" subtitle="Стандартная размерность 10x20">
          <TetrisWell grid={grid} rows={20} cols={10} title="Стакан игрока" />
        </Card>

        <div className={styles.sidebar}>
          <div className={styles.metrics}>
            <StatCard label="Счёт" value={isDemoFilled ? 1200 : 0} />
            <StatCard label="Линии" value={isDemoFilled ? 8 : 0} />
          </div>

          <Card title="Очередь фигур">
            <NextTetromino tetromino={nextTetromino} />
          </Card>

          <Card
            title="Управление (заглушка MVP)"
            subtitle="В ЛР6 здесь будет игровой цикл, клавиатурное управление и сохранение рекорда"
          >
            <div className={styles.controls}>
              <Button size="small" onClick={handleCyclePiece}>
                Следующая фигура
              </Button>
              <Button
                size="small"
                variant="secondary"
                onClick={() => setIsDemoFilled((prev) => !prev)}
              >
                {isDemoFilled ? 'Показать пустой стакан' : 'Показать демо-позицию'}
              </Button>
            </div>
            <p className={styles.note}>
              Планируемые клавиши: ← / → — сдвиг, ↑ — поворот, ↓ — ускорение,
              Пробел — мгновенный сброс, P — пауза.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
