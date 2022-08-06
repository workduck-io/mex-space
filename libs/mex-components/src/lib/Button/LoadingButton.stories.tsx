import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Rows } from '../StorybookHelpers/StorybookHelpers'
import { info } from 'console'
import { LoadingButton } from './LoadingButton'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: LoadingButton,
  argTypes: {
    buttonProps: { control: { type: 'object' } },
    loading: { control: { type: 'boolean' } },
    dots: { control: { type: 'number' } }
    // primary: { control: { type: 'boolean' } },
    // large: { control: { type: 'boolean' } },
    // highlight: { control: { type: 'boolean' } },
    // transparent: { control: { type: 'boolean' } }
    // theme: { control: disab
  }
} as ComponentMeta<typeof LoadingButton>

export const Base: ComponentStory<typeof LoadingButton> = (args) => (
  <LoadingButton {...args}>Loading Button</LoadingButton>
)

Base.args = {
  children: 'Loading Button',
  dots: 5,
  loading: false,
  buttonProps: {
    primary: false,
    large: false,
    highlight: false,
    transparent: false
  }
}

export const LoadingBase = Base.bind({})
LoadingBase.args = {
  dots: 5,
  loading: true
}

export const AllLoadingButtons: ComponentStory<typeof LoadingButton> = () => (
  <Rows>
    <LoadingButton>Button</LoadingButton>
    <LoadingButton loading>Button</LoadingButton>
  </Rows>
)
