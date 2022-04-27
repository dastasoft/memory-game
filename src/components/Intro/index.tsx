import { motion } from 'framer-motion'

const buttonVariants = {
  hidden: {
    x: '500vw',
  },
  visible: {
    x: 0,
    transition: { type: 'spring', delay: 0.3, duration: 1 },
  },
  hover: {
    scale: 1.5,
    transition: {
      duration: 0.4,
      yoyo: Infinity,
    },
  },
}

const containerVariants = {
  exit: {
    x: '-100vh',
    transition: { ease: 'easeInOut' },
  },
}

const h1Variants = {
  hidden: {
    y: '-100vh',
  },
  visible: {
    y: 0,
  },
}

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
