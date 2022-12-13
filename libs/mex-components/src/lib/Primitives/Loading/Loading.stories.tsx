import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Rows } from '../../StorybookHelpers/StorybookHelpers'

import Loading from './Loading'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  // title: 'Loading',
  component: Loading,
  argTypes: {}
} as ComponentMeta<typeof Loading>

export const Base: ComponentStory<typeof Loading> = (args) => <Loading {...args} />
Base.args = {
  dots: 5
}

export const Reversed = Base.bind({})
Reversed.args = {
  dots: 5,
  direction: 'reverse'
}

export const LoadingVariants: ComponentStory<typeof Loading> = () => (
  <Rows>
    <Loading dots={3} />
    <Loading dots={5} direction="forward" />
    <Loading dots={5} direction="reverse" />
    <Loading dots={5} orientation="vertical" />
    <Loading dots={5} orientation="horizontal" />
  </Rows>
)
