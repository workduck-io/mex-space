import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`

export const ColumnContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => transparentize(0.5, theme.colors.gray[9])};
  flex-shrink: 0;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.small};
  display: flex;
  flex-direction: column;
`

interface ColumnDropAreaProps {
  dragState?: 'normal' | 'draggingOver' | 'draggingFrom'
}

export const ColumnDropArea = styled.div`
  overflow: auto;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  ${({ dragState }: ColumnDropAreaProps) => {
    switch (dragState) {
      case 'draggingOver':
        return css`
          background-color: ${({ theme }) => transparentize(0.75, theme.colors.primary)};
        `
      case 'draggingFrom':
        return css`
          background-color: ${({ theme }) => transparentize(0.5, theme.colors.gray[10])};
        `
      default:
        return css``
    }
  }}
`
