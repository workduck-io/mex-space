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

import {
  DraggableLocation,
  DraggableProvided,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult
} from 'react-beautiful-dnd'

export type ItemProps = {
  item: Item
  isDragging: boolean
  provided: DraggableProvided
  isGroupedOver?: boolean
  style?: Record<string, unknown>
  index?: number
}

export interface ColumnHeaderProps {
  columnId: string
}

type SortDroppedColumnFn = (columnId: string, items: Item[]) => Item[]

export interface KanbanProps {
  /**
   * Column ids with their corresponding items.
   */
  items: ItemMap

  /**
   * If provided, this function is called to sort the items on drop in a column
   */
  sortDroppedColumn?: SortDroppedColumnFn

  /**
   * Called when a item is dropped in a column
   */
  onDrop?: (result: DropResult) => void

  /**
   * A function that renders an item in the column
   */
  RenderItem: React.FC<ItemProps>

  /**
   * A function that renders a column header
   */
  RenderColumnHeader: React.FC<ColumnHeaderProps>
}

export type ColumnProps = {
  columnId: string
  items: Item[]
  itemCount: number
  RenderItem: React.FC<ItemProps>
  RenderColumnHeader: React.FC<ColumnHeaderProps>
}

export type RenderVirtualProps = {
  columnId: string
  items: Item[]
  itemCount: number
  droppableProvided: DroppableProvided
  snapshot: DroppableStateSnapshot
  RenderItem: React.FC<ItemProps>
}

export type ReorderItemMapArgs = {
  itemMap: ItemMap
  source: DraggableLocation
  destination: DraggableLocation
  sortDroppedColumn?: SortDroppedColumnFn
}

export type ReorderItemMapResult = {
  itemMap: ItemMap
}

export type Item = {
  id: string
}

export type ItemMap = {
  [key: string]: Item[]
}
