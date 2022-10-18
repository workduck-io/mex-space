import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
`

export const ColumnContainer = styled.div`
  border-top-left-radius: ${({ theme }) => theme.borderRadius.small}
  border-top-right-radius: ${({ theme }) => theme.borderRadius.small}
  background-color: ${({ theme }) => theme.colors.background.card};
  flex-shrink: 0;
  margin: ${({ theme }) => theme.spacing.small};
  display: flex;
  flex-direction: column;
`
