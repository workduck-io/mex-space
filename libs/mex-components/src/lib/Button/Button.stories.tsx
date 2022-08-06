import { Button } from './Button'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Rows } from '../StorybookHelpers/StorybookHelpers'

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
    <Button label="Button" primary>
      Primary
    </Button>
    <Button label="Button" large>
      Large
    </Button>
    <Button label="Button" highlight>
      Highlight
    </Button>
    <Button label="Button" transparent>
      Transparent
    </Button>
    <Button label="Button" primary large>
      Primary Large
    </Button>
    <Button label="Button" primary highlight>
      Primary Highlight
    </Button>
    <Button label="Button" primary transparent>
      Primary Transparent
    </Button>
  </Rows>
)
