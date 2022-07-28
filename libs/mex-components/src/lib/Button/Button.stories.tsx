import React from 'react';

import Button from './Button';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button Story',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Button label="Button" primary>
    Primary
  </Button>
);

export const AllButtons: ComponentStory<typeof Button> = () => (
  <>
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
  </>
);

export const Secondary: ComponentStory<typeof Button> = () => (
  <Button>Secondary</Button>
);

export const Transparent: ComponentStory<typeof Button> = () => (
  <Button transparent>transparent</Button>
);
