import React, { useMemo } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { Title } from '../../../Primitives'
import { ColumnHeaderProps, ItemProps } from '../Kanban.types'
import { useItemStore } from './data'
import { BlockQuote, Container, Content, Footer, QuoteId } from './Item.style'

function getStyle(provided: DraggableProvided, style?: Record<string, unknown>) {
  if (!style) {
    return provided.draggableProps.style
  }

  return {
    ...provided.draggableProps.style,
    ...style
  }
}

function SampleItem(props: ItemProps) {
  const { item, recal, isDragging, isGroupedOver, provided, style, index } = props

  // Data of the current item
  const getItemData = useItemStore((state) => state.getItemData)
  const itemData = useMemo(() => getItemData(item.id), [item.id])

  // To manage open/close or expand/collapse states of item
  const toggleOpen = useItemStore((state) => state.toggleOpen)
  const openStates = useItemStore((state) => state.openStates)
  const isOpen = useMemo(() => openStates[item.id], [item, openStates])

  return (
    <Container
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={item.id}
      data-index={index}
      aria-label={`${itemData?.title} quote ${itemData?.description}`}
    >
      <Content>
        <p
          onClick={() => {
            toggleOpen(item.id)
            if (recal) recal()
          }}
        >
          {itemData?.title}
        </p>
        <BlockQuote>{itemData?.description}</BlockQuote>
        {isOpen && (
          <>
            <BlockQuote>{itemData?.description}</BlockQuote>
            <Footer>
              <QuoteId>
                id:{item.id} {itemData?.id}
              </QuoteId>
            </Footer>
          </>
        )}
      </Content>
    </Container>
  )
}

export default React.memo<ItemProps>(SampleItem)

export const ColumnHeader = React.memo(function ColumnHeader(props: ColumnHeaderProps) {
  const { columnId } = props
  return <Title>{columnId}</Title>
})
