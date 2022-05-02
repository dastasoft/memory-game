import { motion } from 'framer-motion'

import { DECKS } from '@/utils/Decks'

import Button from '../ListedButton'
import {
  containerVariants,
  childVariants,
} from '../shared/ContainerWithChildren.variants'

type Props = {
  next: () => void
  setDeck: (deckName: string) => void
}

const SelectDeck: React.FC<Props> = ({ next, setDeck }) => {
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
            <Button onClick={handleSelect} value={theme}>
              {theme}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SelectDeck
