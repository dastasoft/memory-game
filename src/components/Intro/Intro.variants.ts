const buttonVariants = {
  hidden: {
    x: '500vw',
  },
  visible: {
    x: 0,
    transition: { type: 'spring', delay: 0.3, duration: 1 },
  },
  loop: {
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

const pathVariants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 4,
      yoyo: Infinity,
      ease: 'easeInOut',
    },
  },
}

export { buttonVariants, containerVariants, h1Variants, pathVariants }
