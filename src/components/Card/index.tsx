import { Card as TCard } from '@/types'

import styles from './Card.module.css'

type Props = {
  card: TCard
  handleSelection: (card: TCard) => void
  flipped: boolean
  disabled: boolean
}

export default function Card({
  card,
  handleSelection,
  flipped,
  disabled,
}: Props) {
  const handleClick = () => {
    if (!disabled) handleSelection(card)
  }

  return (
    <div className={styles.card}>
      <div className={`${styles.inner} ${flipped ? styles.flipped : ''}`}>
        <img className={styles.front} src={card.imageURL} alt="card front" />
        <img
          src={`${card.imageURL.split('/').slice(0, -1).join('/')}/cover.jpg`}
          alt="card back"
          className={styles.back}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}
