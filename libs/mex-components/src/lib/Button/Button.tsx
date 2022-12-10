import React from 'react'
import { Button, PrimaryButton, DangerButton, SecondaryButton } from './Button.style'

/**
 * The button component
 *
 */

export { PrimaryButton, DangerButton, SecondaryButton, Button }

Button.defaultProps = {
  children: 'Button',
  large: false,
  async: false
}
