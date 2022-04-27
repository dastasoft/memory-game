import { Dispatch, SetStateAction } from 'react'

import { motion } from 'framer-motion'

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

export const Difficulties = {
  Easy: 3,
  Normal: 6,
}

const SelectDifficulty = ({
  next,
  setDifficulty,
}: {
  next: () => void
  setDifficulty: Dispatch<SetStateAction<number>>
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
            <motion.button
              onClick={handleSelect}
              value={value}
              variants={buttonVariants}
              whileHover="hover"
            >
              {key}
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default SelectDifficulty
