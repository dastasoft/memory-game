import { motion } from 'framer-motion'

import { containerVariants, h1Variants, buttonVariants } from './Intro.variants'

const Intro = ({ next }: { next: () => void }) => {
  return (
    <motion.div
      className="flex-vertical"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.h1 variants={h1Variants}>Memory Game</motion.h1>
      <motion.button
        onClick={next}
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
      >
        Play
      </motion.button>
    </motion.div>
  )
}

export default Intro
