import styled, { css } from 'styled-components'

export const Title = styled.h1<{ colored?: boolean }>`
  ${({ theme, colored }) =>
    colored &&
    css`
      color: ${theme.tokens.colors.primary.default};
    `}
`

export const TitleText = styled.div`
  color: ${({ theme }) => theme.tokens.text.heading};
  flex-grow: 1;
`

export const Subtitle = styled.h2``

export const Description = styled.div`
  font-size: 1rem;
  color: ${({ theme }) => theme.tokens.text.fade};
`

export const Para = styled.p`
  line-height: 1.5;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.tokens.text.default};
`

export const Note = styled.p`
  margin: ${({ theme }) => theme.spacing.small} 0;
  color: ${({ theme }) => theme.tokens.text.fade};
`
