import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Infobox } from './Infobox'

export default {
  component: Infobox,
  argTypes: {}
} as ComponentMeta<typeof Infobox>

export const Base: ComponentStory<typeof Infobox> = (args) => <Infobox {...args} />

Base.args = {
  text: <p>This is some info text</p>
}
