import React from 'react';

import { Button } from './Button';

import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Rows } from '../StorybookHelpers/StorybookHelpers';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
  argTypes: {
    primary: { control: { type: 'boolean' } },
    large: { control: { type: 'boolean' } },
    highlight: { control: { type: 'boolean' } },
    transparent: { control: { type: 'boolean' } },
    // theme: { control: disab
  },
} as ComponentMeta<typeof Button>;

export const Base: ComponentStory<typeof Button> = (args) => (
  <Button label="Button" {...args}>
    Button
  </Button>
);

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
);
