import { Dispatch, SetStateAction } from 'react'

import { motion } from 'framer-motion'

import Button from '../ListedButton'
import {
  containerVariants,
  childVariants,
} from '../shared/ContainerWithChildren.variants'

export const Difficulties = {
  Easy: 3,
  Normal: 6,
}

type SelectDifficultyProps = {
  next: () => void
  setDifficulty: Dispatch<SetStateAction<number>>
}

const SelectDifficulty: React.FC<SelectDifficultyProps> = ({
  next,
  setDifficulty,
}) => {
  const handleSelect = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setDifficulty(Number(event.currentTarget.value))
    next()
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Select difficulty</h2>
      <div className="flex-vertical stack">
        {Object.entries(Difficulties).map(([key, value]) => (
          <motion.div key={key} variants={childVariants}>
            <Button onClick={handleSelect} value={value.toString()}>
              {key}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SelectDifficulty
