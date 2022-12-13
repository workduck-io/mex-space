import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LongContent } from '../../StorybookHelpers/StorybookHelpers'

import Collapse from './Collapse'

// import { Rows } from '../../StorybookHelpers/StorybookHelpers'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  // title: 'Loading',
  component: Collapse,
  argTypes: {}
} as ComponentMeta<typeof Collapse>

export const Base: ComponentStory<typeof Collapse> = (args) => <Collapse {...args} />
Base.args = {
  title: 'Collapse',
  children: <LongContent />
}

export const CollapseWithInfobox = Base.bind({})
CollapseWithInfobox.args = {
  ...Base.args,
  infoProps: {
    text: 'Info Box'
  }
}

// export const LoadingVariants: ComponentStory<typeof Loading> = () => (
//   <Rows>
//     <Loading dots={3} />
//     <Loading dots={5} direction="forward" />
//     <Loading dots={5} direction="reverse" />
//     <Loading dots={5} orientation="vertical" />
//     <Loading dots={5} orientation="horizontal" />
//   </Rows>
// )
