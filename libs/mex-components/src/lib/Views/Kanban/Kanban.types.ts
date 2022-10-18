/**
 * Consider this the documentation for the Kanban component.
 *
 * A kanban consists of a set of vertical columns which have a header and a list of items.
 * Each item can be dragged and dropped between columns.
 * The items can also be reordered/sorted within a column.
 *
 * Columns are generated from the keys of the ItemMap.
 *
 * Items are rendered by the component passed to the itemRenderer prop.
 *
 */

import { DraggableProvided } from 'react-beautiful-dnd'

type ItemProps = {
  item: Item
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: Record<string, unknown>
  index?: number
}

export interface KanbanProps {
  items: ItemMap
  sortDroppedColumn?: (columnId: string, items: Item[]) => Item[]
  RenderItem?: React.FC<ItemProps>
}

export type ItemData = {
  id: string
  name: string
  avatarUrl: string
  url: string
  // colors: AuthorColors,
}

export type Item = {
  id: string
  content: string
  // author: ItemData
}

export type ItemMap = {
  [key: string]: Item[]
}
