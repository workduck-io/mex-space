import React from 'react'
import { SButton } from './Button.style'

/**
 * The button component
 *
 */

export const Button = SButton

Button.defaultProps = {
  children: 'Button',
  primary: false,
  large: false,
  highlight: false,
  transparent: false
}
