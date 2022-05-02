import { motion } from 'framer-motion'

import { buttonVariants } from './ListedButton.variants'

type ButtonProps = {
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  value?: string
}

const ListedButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <motion.button variants={buttonVariants} whileHover="hover" {...props}>
      {children}
    </motion.button>
  )
}

export default ListedButton
