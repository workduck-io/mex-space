import { Item, ItemMap, ReorderItemMapArgs, ReorderItemMapResult } from './Kanban.types'

// a little function to help us with reordering the result
/**
 * Reorders an item in an array
 * Moves it from start index to end index
 * Used to reorder the column in which the item is dragged
 */
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

export default reorder

export function reorderItemMap({
  itemMap,
  source,
  destination,
  sortDroppedColumn
}: ReorderItemMapArgs): ReorderItemMapResult {
  const current: Item[] = [...itemMap[source.droppableId]]
  const next: Item[] = [...itemMap[destination.droppableId]]
  const target: Item = current[source.index]

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered: Item[] = reorder(current, source.index, destination.index)
    const result: ItemMap = {
      ...itemMap,
      [source.droppableId]: sortDroppedColumn ? sortDroppedColumn(destination.droppableId, reordered) : reordered
    }
    return {
      itemMap: result
    }
  }

  // moving to different list
  // remove from original
  current.splice(source.index, 1)
  // insert into next
  next.splice(destination.index, 0, target)

  const result: ItemMap = {
    ...itemMap,
    [source.droppableId]: current,
    [destination.droppableId]: sortDroppedColumn ? sortDroppedColumn(destination.droppableId, next) : next
  }

  return {
    itemMap: result
  }
}
