import { motion } from 'framer-motion'

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
      <motion.div
        className={styles.inner}
        animate={{
          rotateY: flipped ? '180deg' : '0deg',
          transition: {
            duration: 0.8,
          },
        }}
      >
        <motion.img
          className={styles.front}
          src={card.imageURL}
          style={{ rotateY: '180deg' }}
          alt="card front"
        />
        <img
          src={`${card.imageURL.split('/').slice(0, -1).join('/')}/cover.jpg`}
          alt="card back"
          className={styles.back}
          onClick={handleClick}
        />
      </motion.div>
    </div>
  )
}
