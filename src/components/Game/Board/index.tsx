import Card from '@/components/Card'
import { Difficulties } from '@/components/SelectDifficulty'
import { Card as TCard } from '@/types'

import styles from './Board.module.css'

type BoardProps = {
  deck: TCard[]
  handleSelection: (card: TCard) => void
  flippedCards: (TCard | null)[]
  disabled: boolean
}

const Board: React.FC<BoardProps> = ({
  deck,
  handleSelection,
  flippedCards,
  disabled,
}) => {
  return (
    <div
      className={
        styles[
          deck.length / 2 === Difficulties.Normal
            ? 'card-grid'
            : 'small-card-grid'
        ]
      }
    >
      {deck.map((card) => (
        <div key={card.id}>
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
        </div>
      ))}
    </div>
  )
}

export default Board
