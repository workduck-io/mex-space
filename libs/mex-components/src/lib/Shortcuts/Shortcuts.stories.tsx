import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Rows } from '../StorybookHelpers/StorybookHelpers'

import { DisplayShortcut, TitleWithShortcut } from './Shortcuts'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: DisplayShortcut,
  argTypes: {
    // buttonProps: { control: { type: 'object' } },
    // loading: { control: { type: 'boolean' } },
    // dots: { control: { type: 'number' } }
    // primary: { control: { type: 'boolean' } },
    // large: { control: { type: 'boolean' } },
    // highlight: { control: { type: 'boolean' } },
    // transparent: { control: { type: 'boolean' } }
    // theme: { control: disab
  }
} as ComponentMeta<typeof DisplayShortcut>

export const Base: ComponentStory<typeof DisplayShortcut> = (args) => <DisplayShortcut {...args} />

Base.args = {
  shortcut: '$mod+Shift+L'
}

export const AllShortcuts = () => (
  <Rows>
    <DisplayShortcut shortcut="$mod+Shift+L" />
    <TitleWithShortcut shortcut="$mod+Shift+L" title="This has a title with shortcut, used in Tooltip Content" />
  </Rows>
)
