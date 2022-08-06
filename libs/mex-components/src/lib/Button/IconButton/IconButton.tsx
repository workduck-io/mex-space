import { TippyProps } from '@tippyjs/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { ToolbarTooltip } from '../../Tooltips/Tooltips'
import { Button } from '..'
import { TitleWithShortcut } from '../../Shortcuts/Shortcuts'

export type IconButtonProps = {
  icon: any // eslint-disable-line @typescript-eslint/no-explicit-any
  title: string
  size?: string | number
  onClick?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  singleton?: TippyProps['singleton']
  /** By default the button is transparent, to remove transparency use false */
  transparent?: boolean
  highlight?: boolean
  disabled?: boolean
  color?: string
  shortcut?: string
}

export const IconButton = ({
  icon,
  disabled,
  title,
  size,
  onClick,
  transparent,
  shortcut,
  highlight,
  color,
  singleton
}: IconButtonProps) => {
  return (
    <ToolbarTooltip
      content={shortcut !== undefined ? <TitleWithShortcut shortcut={shortcut} title={title} /> : <span>{title}</span>}
      singleton={singleton}
    >
      <Button
        transparent={transparent !== undefined ? transparent : true}
        disabled={disabled}
        onClick={onClick}
        highlight={highlight}
      >
        <Icon color={color} icon={icon} height={size} />
      </Button>
    </ToolbarTooltip>
  )
}
