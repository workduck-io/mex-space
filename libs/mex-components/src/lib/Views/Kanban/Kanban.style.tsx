import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.medium};
`

export const ColumnContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.colors.gray[9]};
  flex-shrink: 0;
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing.small};
  display: flex;
  flex-direction: column;
`
