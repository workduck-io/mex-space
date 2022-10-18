import React, { useMemo } from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import { Title } from '../../../Primitives'
import { ColumnHeaderProps, ItemProps } from '../Kanban.types'
import { ItemStore } from './data'
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
  const { item, isDragging, isGroupedOver, provided, style, index } = props
  const itemData = useMemo(() => ItemStore.getItemData(item.id), [item.id])

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
      // aria-label={`${item.author.name} quote ${item.content}`}
    >
      <Content>
        <p>{itemData?.title}</p>
        <BlockQuote>{itemData?.description}</BlockQuote>
        <Footer>
          <QuoteId>id:{item.id}</QuoteId>
        </Footer>
      </Content>
    </Container>
  )
}

export default React.memo<ItemProps>(SampleItem)

export const ColumnHeader = React.memo(function ColumnHeader(props: ColumnHeaderProps) {
  const { columnId } = props
  return <Title>{columnId}</Title>
})
