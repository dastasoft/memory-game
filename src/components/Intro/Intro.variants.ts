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

export { buttonVariants, containerVariants, h1Variants }
