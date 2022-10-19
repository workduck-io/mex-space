import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

export const Container = styled.div<{ height?: string }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
  height: ${({ height }) => height || '80vh'};
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

export const DraggableWrapper = styled.div`
  transition: height 0.2s ease, transform 0.2s ease;
`
interface ColumnDropAreaProps {
  dragState?: 'normal' | 'draggingOver' | 'draggingFrom'
}

export const ColumnDropArea = styled.div`
  overflow: auto;
  height: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  ${({ dragState }: ColumnDropAreaProps) => {
    switch (dragState) {
      case 'draggingOver':
        return css`
          background-color: ${({ theme }) => transparentize(0.75, theme.colors.primary)};
        `
      case 'draggingFrom':
        return css``
      default:
        return css``
    }
  }}
`
