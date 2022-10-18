import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Kanban from './index'
import { sampleItemMap } from './sampleData'

export default {
  component: Kanban,
  argTypes: {}
} as ComponentMeta<typeof Kanban>

export const Base: ComponentStory<typeof Kanban> = () => <Kanban items={sampleItemMap} />
