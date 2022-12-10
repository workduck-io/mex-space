import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Rows } from '../StorybookHelpers/StorybookHelpers'
import { Button, PrimaryButton, SecondaryButton } from './Button'

export default {
  component: Button,
  argTypes: {
    primary: { control: { type: 'boolean' } },
    large: { control: { type: 'boolean' } },
    highlight: { control: { type: 'boolean' } },
    transparent: { control: { type: 'boolean' } }
  }
} as ComponentMeta<typeof Button>

export const Base: ComponentStory<typeof Button> = (args) => (
  <Button label="Button" {...args}>
    Button
  </Button>
)
Base.args = {
  primary: false,
  large: false,
  highlight: false,
  transparent: false
}

export const AllButtons: ComponentStory<typeof Button> = () => (
  <Rows>
    <PrimaryButton>Primary</PrimaryButton>
    <Button large>Large</Button>
    <Button>Highlight</Button>
    <SecondaryButton>Transparent</SecondaryButton>
    <PrimaryButton large>Primary Large</PrimaryButton>
    <PrimaryButton>Primary Highlight</PrimaryButton>
    <SecondaryButton large>Primary Transparent</SecondaryButton>
  </Rows>
)
