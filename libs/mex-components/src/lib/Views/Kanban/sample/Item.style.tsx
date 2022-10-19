import styled, { DefaultTheme } from 'styled-components'
import { Ellipsis } from '../../../Helpers'

export const getBackgroundColor = (isDragging: boolean, isGroupedOver: boolean, theme: DefaultTheme) => {
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

export const CloneBadge = styled.div`
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

export const Container = styled.a<{ isDragging?: boolean; isGroupedOver?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(!!props.isDragging, props.theme)};
  background-color: ${(props) => getBackgroundColor(!!props.isDragging, !!props.isGroupedOver, props.theme)};
  box-shadow: ${({ isDragging }) => (isDragging ? `2px 2px 1px ${({ theme }) => theme.colors.gray[3]}` : 'none')};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  user-select: none;
  margin-bottom: ${({ theme }) => theme.spacing.small};

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

export const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  width: 100%;

  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;

  /* flex parent */
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.small};

  transition: height 0.2s ease;

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.accent};
  }
`

export const BlockQuote = styled.div`
  &::before {
    content: open-quote;
  }

  &::after {
    content: close-quote;
  }

  ${Ellipsis}
`

export const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`

export const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`
