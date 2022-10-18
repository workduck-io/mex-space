import React from 'react'
import { DraggableProvided } from 'react-beautiful-dnd'
import styled, { DefaultTheme } from 'styled-components'
import { Item } from './Kanban.types'
// import styled from '@emotion/styled';
// import { colors } from '@atlaskit/theme';
// import { borderRadius, grid } from '../constants';
// import type { Quote, AuthorColors } from '../types';
// import type { DraggableProvided } from '../../../src';

type Props = {
  item: Item
  isDragging: boolean
  provided: DraggableProvided
  isClone?: boolean
  isGroupedOver?: boolean
  style?: Record<string, unknown>
  index?: number
}

const getBackgroundColor = (isDragging: boolean, isGroupedOver: boolean, theme: DefaultTheme) => {
  if (isDragging) {
    return theme.colors.gray[8]
  }

  if (isGroupedOver) {
    return theme.colors.gray[9]
  }

  return theme.colors.gray[8]
}

const getBorderColor = (isDragging: boolean, theme: DefaultTheme) => (isDragging ? theme.colors.gray[7] : 'transparent')

const imageSize = 40
const grid = 8

const CloneBadge = styled.div`
  background: ${({ theme }) => theme.colors.gray[7]};
  bottom: ${grid / 2}px;
  border: 2px solid ${({ theme }) => theme.colors.gray[8]};
  border-radius: 50%;
  box-sizing: border-box;
  font-size: 10px;
  position: absolute;
  right: -${imageSize / 3}px;
  top: -${imageSize / 3}px;
  transform: rotate(40deg);

  height: ${imageSize}px;
  width: ${imageSize}px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Container = styled.a<{ isDragging?: boolean; isGroupedOver?: boolean; isClone?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(!!props.isDragging, props.theme)};
  background-color: ${(props) => getBackgroundColor(!!props.isDragging, !!props.isGroupedOver, props.theme)};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px ${({ theme }) => theme.colors.gray[3]}` : 'none')};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */
  color: ${({ theme }) => theme.colors.gray[1]};

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`

const Avatar = styled.img`
  width: ${imageSize}px;
  height: ${imageSize}px;
  border-radius: 50%;
  margin-right: ${grid}px;
  flex-shrink: 0;
  flex-grow: 0;
`

const Content = styled.div`
  /* flex child */
  flex-grow: 1;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
`

const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }
`

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`

const Author = styled.small`
  color: ${({ theme }) => theme.colors.gray[3]};
  flex-grow: 0;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.gray[8]};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-weight: normal;
  padding: ${grid / 2}px;
`

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`

function getStyle(provided: DraggableProvided, style?: Record<string, unknown>) {
  if (!style) {
    return provided.draggableProps.style
  }

  return {
    ...provided.draggableProps.style,
    ...style
  }
}

// Previously this extended React.Component
// That was a good thing, because using React.PureComponent can hide
// issues with the selectors. However, moving it over does can considerable
// performance improvements when reordering big lists (400ms => 200ms)
// Need to be super sure we are not relying on PureComponent here for
// things we should be doing in the selector as we do not know if consumers
// will be using PureComponent
function SampleItem(props: Props) {
  const { item, isDragging, isGroupedOver, provided, style, isClone, index } = props

  return (
    <Container
      // href={item.author.url}
      isDragging={isDragging}
      isGroupedOver={isGroupedOver}
      isClone={isClone}
      // colors={item.author.colors}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={item.id}
      data-index={index}
      // aria-label={`${item.author.name} quote ${item.content}`}
    >
      {/*<Avatar src={item.author.avatarUrl} alt={item.author.name} />*/}
      {isClone ? <CloneBadge>Clone</CloneBadge> : null}
      <Content>
        <BlockQuote>{item.content}</BlockQuote>
        <Footer>
          {/*<Author>{item.author.name}</Author>*/}
          <QuoteId>id:{item.id}</QuoteId>
        </Footer>
      </Content>
    </Container>
  )
}

// export default React.memo<Props>(QuoteItem);

export default SampleItem
