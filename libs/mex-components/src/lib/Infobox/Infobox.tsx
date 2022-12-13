// import informationLine from '@iconify/icons-ri/information-line'
import React from 'react'

import { Icon } from '@iconify/react'
import Tippy, { TippyProps } from '@tippyjs/react'

import { InfoboxButton, InfoboxTip } from './Infobox.style'

export interface InfoboxProps {
  text: React.ReactNode
  icon?: string
  root?: Element
}

export const InfoboxTooltip = (props: TippyProps) => {
  return <Tippy theme="help-text" moveTransition="transform 0.25s ease-out" placement="auto" {...props} />
}

export const Infobox = ({ icon, text, root }: InfoboxProps) => {
  return (
    <InfoboxTooltip content={<InfoboxTip>{text}</InfoboxTip>} appendTo={root}>
      <InfoboxButton>
        <Icon icon={icon || 'ri:information-line'} />
      </InfoboxButton>
    </InfoboxTooltip>
  )
}
