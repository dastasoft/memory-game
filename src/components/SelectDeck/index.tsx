import { motion } from 'framer-motion'

import { DECKS } from '@/utils/Decks'

const containerVariants = {
  hidden: {
    opacity: 0,
    x: '100vw',
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      mass: 0.4,
      damping: 8,
      when: 'beforeChildren',
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: '-100vh',
    transition: { ease: 'easeInOut' },
  },
}

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const buttonVariants = {
  hover: {
    scale: 1.3,
    textShadow: '0px 0px 7px rgb(19, 54, 108)',
    transition: {
      duration: 0.3,
    },
  },
}

const SelectDeck = ({
  next,
  setDeck,
}: {
  next: () => void
  setDeck: (deckName: string) => void
}) => {
  const handleSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDeck(event.currentTarget.value)
    next()
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Select Deck</h2>
      <div className="flex-vertical stack">
        {Object.keys(DECKS).map((theme: string) => (
          <motion.div key={theme} variants={childVariants}>
            <motion.button
              onClick={handleSelect}
              value={theme}
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {theme}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SelectDeck
