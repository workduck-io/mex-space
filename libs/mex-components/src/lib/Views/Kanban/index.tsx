import React, { useCallback, useEffect, useReducer } from 'react'
import ReactDOM from 'react-dom'
import { useVirtualizer } from '@tanstack/react-virtual'
import { mergeRefs } from 'react-merge-refs'

// import { List } from 'react-virtualized';
// import styled from '@emotion/styled';
// import { Global, css } from '@emotion/core';
// import { colors } from '@atlaskit/theme';
import {
  DropResult,
  DraggableLocation,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableRubric,
  Draggable,
  Droppable,
  DragDropContext
} from 'react-beautiful-dnd'
import { ColumnContainer, Container } from './Kanban.style'
import { Title } from '../../Primitives'
import { reorderQuoteMap } from './Kanban.helpers'
import { Item, ItemMap, KanbanProps } from './Kanban.types'
import SampleItem from './sampleItem.render'
import { sampleItemMap } from './sampleData'

type RowProps = {
  index: number
  style: Record<string, number>
}

const grid = 8

const RenderVirtual = ({
  items,
  itemCount,
  droppableProvided
}: {
  items: Item[]
  itemCount: number
  droppableProvided: DroppableProvided
}) => {
  const parentRef = React.useRef<HTMLDivElement>(null)
  // const getestimate = useCallback((index) => (index > items.length ? 0 : 100), [items.length])
  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: itemCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 1
  })

  // Used to recalculate the layout of the column as the changed props
  useEffect(() => {
    // eslint-disable-next-line
    // @ts-expect-error
    rowVirtualizer.calculateRange()
  }, [items])

  const itemsss = rowVirtualizer.getVirtualItems()
  console.log('Virtual Items Renderer', { itemCount, items, itemsss })

  return (
    <div
      // ref={parentRef}
      ref={mergeRefs([droppableProvided.innerRef, parentRef])}
      style={{
        height: `400px`,
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
        {rowVirtualizer.getVirtualItems().map((virtualItem, index) => {
          const item = items[virtualItem.index]
          console.log('VirtualItem', { virtualItem, item, index })
          if (!item) {
            console.log('LMAO LOL Fake item')
            return null
          }
          return (
            <div
              key={virtualItem.key}
              ref={virtualItem.measureElement}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                // height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`
              }}
            >
              {!item ? null : (
                <Draggable draggableId={item.id} index={index} key={item.id}>
                  {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                    <SampleItem
                      provided={provided}
                      item={item}
                      isDragging={snapshot.isDragging}
                      // style={patchedStyle}
                    />
                  )}
                </Draggable>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

type ColumnProps = {
  columnId: string
  items: Item[]
  itemCount: number
}

const Column = React.memo(function Column(props: ColumnProps) {
  const { columnId, items, itemCount } = props

  console.log('ColumnOfKanban', { columnId, items, itemCount })

  return (
    <ColumnContainer>
      <Title>{columnId}</Title>
      <Droppable
        droppableId={columnId}
        mode="virtual"
        renderClone={(provided: DraggableProvided, snapshot: DraggableStateSnapshot, rubric: DraggableRubric) => (
          <SampleItem
            provided={provided}
            isDragging={snapshot.isDragging}
            item={items[rubric.source.index]}
            style={{ margin: 0 }}
          />
        )}
      >
        {(droppableProvided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
          // Set item count somehow in the rowVirtualizer
          const itemCount: number = snapshot.isUsingPlaceholder ? items.length + 1 : items.length

          return <RenderVirtual items={items} itemCount={itemCount} droppableProvided={droppableProvided} />
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

function getColumnKeys(quoteMap: ItemMap): string[] {
  return Object.keys(quoteMap).sort()
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
function Kanban({ items }: KanbanProps) {
  const [state, dispatch] = useReducer(reducer, undefined, () => ({
    itemCount: Object.entries(items).flatMap(([_, value]) => value).length,
    itemMap: items,
    columnKeys: getColumnKeys(items)
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

    const updated = reorderQuoteMap({
      itemMap: state.itemMap,
      source,
      destination
    })

    // console.log('onDragEnd', { updated, result })

    dispatch({ type: 'REORDER', payload: updated.quoteMap })
  }

  // console.log('Kanban', { state })

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnKeys.map((key: string) => {
          const quotes: Item[] = state.itemMap[key]

          return <Column key={key} itemCount={state.itemCount} items={quotes} columnId={key} />
        })}
      </Container>
    </DragDropContext>
  )
}

export default Kanban
