import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Kanban from './index'
import { sampleItemMap } from './sample/data'
import ItemRender, { ColumnHeader } from './sample/Item.render'

export default {
  component: Kanban,
  argTypes: {}
} as ComponentMeta<typeof Kanban>

export const Base: ComponentStory<typeof Kanban> = () => (
  <Kanban items={sampleItemMap} RenderItem={ItemRender} RenderColumnHeader={ColumnHeader} />
)
