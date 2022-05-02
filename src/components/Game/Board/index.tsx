import { useEffect } from 'react'

import { AnimationControls, motion } from 'framer-motion'

import Card from '@/components/Card'
import { Difficulties } from '@/components/SelectDifficulty'
import { Card as TCard } from '@/types'

import styles from './Board.module.css'
import { containerVariants, childVariants } from './Board.variants'

type BoardProps = {
  deck: TCard[]
  handleSelection: (card: TCard) => void
  flippedCards: (TCard | null)[]
  disabled: boolean
  controls: AnimationControls
  onAnimationStart: () => void
  onAnimationComplete: () => void
}

const Board: React.FC<BoardProps> = ({
  deck,
  handleSelection,
  flippedCards,
  disabled,
  controls,
  onAnimationStart,
  onAnimationComplete,
}) => {
  useEffect(() => {
    controls.start('visible')
  }, [controls])

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      onAnimationStart={onAnimationStart}
      onAnimationComplete={onAnimationComplete}
      className={
        styles[
          deck.length / 2 === Difficulties.Normal
            ? 'card-grid'
            : 'small-card-grid'
        ]
      }
      variants={containerVariants}
    >
      {deck.map((card) => (
        <motion.div key={card.id} variants={childVariants}>
          <Card
            card={card}
            handleSelection={handleSelection}
            flipped={Boolean(
              card.matched ||
                flippedCards.find(
                  (flippedCard) => flippedCard && flippedCard.id === card.id
                )
            )}
            disabled={disabled}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default Board
