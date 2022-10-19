import { useVirtualizer } from '@tanstack/react-virtual'
import React, { useEffect, useReducer } from 'react'
import { mergeRefs } from 'react-merge-refs'
import {
  DragDropContext,
  Draggable,
  DraggableLocation,
  DraggableProvided,
  DraggableRubric,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult
} from 'react-beautiful-dnd'
import { reorderItemMap } from './Kanban.helpers'
import { ColumnContainer, ColumnDropArea, Container, DraggableWrapper } from './Kanban.style'
import { ColumnProps, Item, ItemMap, KanbanProps, RenderVirtualProps } from './Kanban.types'

// const DefaultColumnHeight = 600

/**
 * Renders the virtual items inside a column
 */
const RenderVirtual = ({
  items,
  snapshot,
  columnId,
  itemCount,
  RenderItem,
  droppableProvided,
  getItemSize,
  virtualizerOptions
}: RenderVirtualProps) => {
  const parentRef = React.useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: getItemSize ? (i) => getItemSize(items[i]) : () => 50,
    ...virtualizerOptions
  })

  const recal = () => {
    rowVirtualizer.measure()

    // eslint-disable-next-line
    // @ts-expect-error
    rowVirtualizer.calculateRange()
  }

  // Used to recalculate the layout of the column as the changed props
  useEffect(() => {
    // These two lines set the correct element position but the immediate dragged to column is not updated
    recal()
  }, [itemCount, items, getItemSize])

  return (
    <ColumnDropArea
      ref={mergeRefs([droppableProvided.innerRef, parentRef])}
      // To render the background color on different states of being dragged over
      dragState={snapshot.isDraggingOver ? 'draggingOver' : snapshot.draggingFromThisWith ? 'draggingFrom' : 'normal'}
      style={{
        overflow: 'auto' // Make it scroll!
      }}
    >
      {/* The large inner element to hold all of the items */}
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative'
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index]
          // console.log('VirtualItem', { virtualItem, item })
          if (!item) {
            // ('LMAO LOL Fake item') Is in the case of a placeholder
            return null
          }

          // Use this index instead of the map,
          // the map index gives index of shown virtualized items
          const indexOfItem = items.findIndex((i) => i.id === item.id)

          return (
            <DraggableWrapper
              key={`${columnId}_${virtualItem.key}`}
              // ref={virtualItem.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`
              }}
            >
              <Draggable draggableId={item.id} index={indexOfItem} key={item.id}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <RenderItem recal={recal} provided={provided} item={item} isDragging={snapshot.isDragging} />
                )}
              </Draggable>
            </DraggableWrapper>
          )
        })}
      </div>
    </ColumnDropArea>
  )
}

/**
 * Renders a column
 */
const Column = React.memo(function Column(props: ColumnProps) {
  const {
    columnId,
    items,
    // itemCount,
    virtualizerOptions,
    RenderColumnHeader,
    getItemSize,
    RenderItem
  } = props

  // console.log('ColumnOfKanban', { columnId, items, itemCount })

  return (
    <ColumnContainer>
      <RenderColumnHeader columnId={columnId} />
      <Droppable
        droppableId={columnId}
        mode="virtual"
        renderClone={(provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => {
          // console.log('RenderClone', { provided, snapshot, rubric })
          return (
            <RenderItem
              provided={provided}
              isDragging={snapshot.isDragging}
              item={items[rubric.source.index]}
              style={{ margin: 0 }}
            />
          )
        }}
      >
        {(droppableProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
          const itemCount: number = snapshot.isUsingPlaceholder ? items.length + 1 : items.length

          return (
            <RenderVirtual
              columnId={columnId}
              items={items}
              snapshot={snapshot}
              itemCount={itemCount}
              droppableProvided={droppableProvided}
              virtualizerOptions={virtualizerOptions}
              getItemSize={getItemSize}
              RenderItem={RenderItem}
            />
          )
        }}
      </Droppable>
    </ColumnContainer>
  )
})

type State = {
  itemCount: number
  itemMap: ItemMap
  columnKeys: string[]
}

function getColumnKeys(itemMap: ItemMap): string[] {
  return Object.keys(itemMap).sort()
}

type Action = {
  type: 'REORDER'
  payload: ItemMap
}

function reducer(state: State, action: Action) {
  if (action.type === 'REORDER') {
    return {
      itemCount: state.itemCount,
      itemMap: action.payload,
      columnKeys: getColumnKeys(action.payload)
    }
  }

  return state
}

// type Empty = {}

// eslint-disable-next-line no-unused-vars
export function Kanban({
  items,
  virtualizerOptions,
  getItemSize,
  sortDroppedColumn,
  onDrop,
  kanbanHeight,
  getColumnKeys,
  RenderItem,
  RenderColumnHeader
}: KanbanProps) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    itemCount: Object.entries(items).flatMap(([_, value]) => value).length,
    itemMap: items,
    columnKeys: getColumnKeys ? getColumnKeys(items) : Object.keys(items).sort()
  }))

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return
    }
    const source: DraggableLocation = result.source
    const destination: DraggableLocation = result.destination

    // did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return
    }

    const updated = reorderItemMap({
      itemMap: state.itemMap,
      source,
      destination,
      sortDroppedColumn
    })

    onDrop?.(result)

    // console.log('onDragEnd', { result, updated })
    dispatch({ type: 'REORDER', payload: updated.itemMap })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container height={kanbanHeight}>
        {state.columnKeys.map((key: string) => {
          const items: Item[] = state.itemMap[key]
          return (
            <Column
              RenderItem={RenderItem}
              RenderColumnHeader={RenderColumnHeader}
              key={key}
              itemCount={state.itemCount}
              items={items}
              columnId={key}
              getItemSize={getItemSize}
              virtualizerOptions={virtualizerOptions}
            />
          )
        })}
      </Container>
    </DragDropContext>
  )
}
