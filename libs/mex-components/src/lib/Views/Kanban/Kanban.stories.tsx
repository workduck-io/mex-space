import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import Kanban from './index'
import { Item } from './Kanban.types'
import { ItemStore, sampleItemMap, useItemStore } from './sample/data'
import ItemRender, { ColumnHeader } from './sample/Item.render'

export default {
  component: Kanban,
  argTypes: {}
} as ComponentMeta<typeof Kanban>

const getItemSize = (item: Item) => {
  return useItemStore.getState().openStates[item?.id] ? 120 : 70
}

export const Base: ComponentStory<typeof Kanban> = () => (
  <>
    <Kanban items={sampleItemMap} getItemSize={getItemSize} RenderItem={ItemRender} RenderColumnHeader={ColumnHeader} />
    <div>
      <p>Help:</p>
      <p>Click on title to expand/collapse</p>
      <p>Drag and drop to reorder</p>
    </div>
  </>
)
