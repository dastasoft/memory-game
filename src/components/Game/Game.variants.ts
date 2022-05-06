const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}

const resetVariants = {
  hover: {
    rotate: 180,
    transition: {
      type: 'spring',
      duration: 1,
    },
  },
}

export { containerVariants, resetVariants }
