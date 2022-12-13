import React from 'react'

import { Icon } from '@iconify/react'
import { TippyProps } from '@tippyjs/react'

import { ToolbarTooltip } from '../../Primitives/Tooltips/Tooltips'
import { TitleWithShortcut } from '../../Shortcuts/Shortcuts'
import { Button } from '../Button'

export type IconButtonProps = {
  icon: any // eslint-disable-line @typescript-eslint/no-explicit-any
  title: string
  size?: string | number
  onClick?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  singleton?: TippyProps['singleton']
  disabled?: boolean
  color?: string
  shortcut?: string
}

export const IconButton = ({ icon, disabled, title, size, onClick, shortcut, color, singleton }: IconButtonProps) => {
  return (
    <ToolbarTooltip
      content={shortcut !== undefined ? <TitleWithShortcut shortcut={shortcut} title={title} /> : <span>{title}</span>}
      singleton={singleton}
    >
      <Button disabled={disabled} onClick={onClick}>
        <Icon color={color} icon={icon} height={size} />
      </Button>
    </ToolbarTooltip>
  )
}
