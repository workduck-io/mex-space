import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Rows } from '../StorybookHelpers/StorybookHelpers'
import { Infobox } from './Infobox'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: Infobox,
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
} as ComponentMeta<typeof Infobox>

export const Base: ComponentStory<typeof Infobox> = (args) => <Infobox {...args} />

Base.args = {
  text: <p>This is some info text</p>
  // dots: 5,
  // loading: false,
  // buttonProps: {
  //   primary: false,
  //   large: false,
  //   highlight: false,
  //   transparent: false
  // }
}
