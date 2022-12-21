import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Rows } from '../../StorybookHelpers/StorybookHelpers'

import { IconButton } from './IconButton'

export default {
  component: IconButton,
  argTypes: {
    primary: { control: { type: 'boolean' } },
    large: { control: { type: 'boolean' } },
    highlight: { control: { type: 'boolean' } },
    transparent: { control: { type: 'boolean' } }
  }
} as ComponentMeta<typeof IconButton>

const icon = 'ri:save-3-fill'

export const Base: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />
Base.args = {
  icon,
  title: 'Button',
  size: 24,
  disabled: false
}

export const AllButtons: ComponentStory<typeof IconButton> = () => (
  <Rows>
    <IconButton title="Hello" icon={icon} />
    <IconButton title="Hello" icon={icon} size={64} />
  </Rows>
)
