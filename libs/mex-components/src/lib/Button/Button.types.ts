export interface CustomProps {
  primary?: boolean
  large?: boolean
  highlight?: boolean
  transparent?: boolean
}

export interface ButtonProps extends CustomProps, React.HTMLProps<HTMLButtonElement> {}
