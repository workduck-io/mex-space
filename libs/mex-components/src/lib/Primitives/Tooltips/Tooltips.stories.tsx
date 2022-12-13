import React from 'react'

import { ComponentMeta } from '@storybook/react'

import { Rows } from '../../StorybookHelpers/StorybookHelpers'

import { NavTooltip, ToolbarTooltip } from './Tooltips'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: NavTooltip,
  argTypes: {}
} as ComponentMeta<typeof NavTooltip>

export const AllTooltips = () => (
  <Rows>
    <NavTooltip content="NavTooltip">
      <span>NavTooltip - Shown to the right</span>
    </NavTooltip>
    <ToolbarTooltip content="ToolbarTooltip">
      <span>ToolbarTooltip - Shown at the bottom</span>
    </ToolbarTooltip>
  </Rows>
)
