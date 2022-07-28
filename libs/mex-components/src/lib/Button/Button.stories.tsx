import React from 'react';

import Button from './Button';

import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => (
  <Button label="Button" primary>
    Primary
  </Button>
);

export const Secondary: ComponentStory<typeof Button> = () => (
  <Button>Secondary</Button>
);

export const Transparent: ComponentStory<typeof Button> = () => (
  <Button transparent>transparent</Button>
);
