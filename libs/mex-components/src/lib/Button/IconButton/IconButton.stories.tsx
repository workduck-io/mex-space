import { IconButton } from './IconButton'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Rows } from '../../StorybookHelpers/StorybookHelpers'

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
  transparent: false,
  highlight: false,
  disabled: false
}

export const AllButtons: ComponentStory<typeof IconButton> = () => (
  <Rows>
    <IconButton title="Hello" icon={icon} />
    <IconButton title="Hello" icon={icon} highlight />
    <IconButton title="Hello" icon={icon} transparent={false} />
    <IconButton title="Hello" icon={icon} size={64} />
  </Rows>
)
