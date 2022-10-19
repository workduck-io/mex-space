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

const virtualizerOptions = {
  // estimateSize: (i) getItemSize,
  overscan: 5,
  initialOffset: 100
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

const sortDroppedColumn = (columnId: string, items: Item[]) => {
  const sorted = items.sort((a, b) => {
    const aIndex = a?.id?.split('-')[1]
    const bIndex = b?.id?.split('-')[1]
    return Number(aIndex) - Number(bIndex)
  })
  return sorted
}

export const AutoSortKanban: ComponentStory<typeof Kanban> = () => (
  <>
    <Kanban
      items={sampleItemMap}
      sortDroppedColumn={sortDroppedColumn}
      getItemSize={getItemSize}
      RenderItem={ItemRender}
      virtualizerOptions={virtualizerOptions}
      RenderColumnHeader={ColumnHeader}
    />
    <div>
      <p>Help:</p>
      <p>Click on title to expand/collapse</p>
      <p>Drag and drop to move around columns</p>
      <p>Order inside columns is updated by sorting the items by index</p>
    </div>
  </>
)
