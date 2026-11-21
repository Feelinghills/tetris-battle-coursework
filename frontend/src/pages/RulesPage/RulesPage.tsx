import type { JSX } from 'react'

import { Card, NextTetromino, PageHeader } from '@tetris-battle/ui-library'

import styles from './RulesPage.module.css'
import { SCORING_RULES, TETROMINOES } from '../../data/mockData'

export const RulesPage = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <PageHeader
        title="Правила TetrisBattle"
        description="Механика классического Тетриса, таблица начисления очков и набор из 7 классических фигур."
      />

      <Card
        title="Начисление очков"
        subtitle="Бонус зависит от числа строк, очищенных одним ходом"
      >
        <div className={styles.rulesGrid}>
          {SCORING_RULES.map((rule) => (
            <div key={rule.lines} className={styles.ruleBox}>
              <div className={styles.ruleHeader}>
                <strong>{rule.name}</strong>
                <span className={styles.points}>+{rule.points}</span>
              </div>
              <p className={styles.ruleDesc}>{rule.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Классический набор фигур (7 тетрамино)"
        subtitle="Все фигуры отображаются компонентом NextTetromino из @tetris-battle/ui-library"
      >
        <div className={styles.piecesGrid}>
          {TETROMINOES.map((piece) => (
            <NextTetromino
              key={piece.id}
              tetromino={piece}
              title={`Фигура ${piece.type}`}
            />
          ))}
        </div>
      </Card>
    </div>
  )
}
