import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Rows } from '../StorybookHelpers/StorybookHelpers'
import { Button } from './Button'

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
    <Button primary>Primary</Button>
    <Button large>Large</Button>
    <Button highlight>Highlight</Button>
    <Button transparent>Transparent</Button>
    <Button primary large>
      Primary Large
    </Button>
    <Button primary highlight>
      Primary Highlight
    </Button>
    <Button primary transparent>
      Primary Transparent
    </Button>
  </Rows>
)
