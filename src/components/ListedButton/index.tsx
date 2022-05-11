type ButtonProps = {
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  value?: string
}

const ListedButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}

export default ListedButton
