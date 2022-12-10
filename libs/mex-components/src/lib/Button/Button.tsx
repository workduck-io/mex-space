import React from 'react'
import { Button, ButtonRow, PrimaryButton, DangerButton, SecondaryButton } from './Button.style'

/**
 * The button component
 *
 */

export { PrimaryButton, DangerButton, SecondaryButton, Button, ButtonRow }

Button.defaultProps = {
  children: 'Button',
  large: false,
  async: false
}
