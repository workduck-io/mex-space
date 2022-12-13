import styled from 'styled-components'

export const InfoboxButton = styled.div`
  padding: ${({ theme }) => theme.spacing.tiny};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  display: flex;
  align-items: center;
  cursor: help;
  width: max-content;
  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => `rgba(${theme.rgbTokens.text.fade}, 0.5)`};
  }
  :hover {
    background-color: ${({ theme }) => theme.tokens.surfaces.s[2]};
    svg {
      color: ${({ theme }) => theme.tokens.text.fade};
    }
  }
`

export const InfoboxTip = styled.div`
  font-size: 0.9rem;
  h1 {
    color: ${({ theme }) => theme.tokens.text.accent};
    margin: ${({ theme }) => theme.spacing.small} 0;
    font-size: 1rem;
  }
  p {
    font-size: 0.9rem;
    margin: ${({ theme }) => theme.spacing.small} 0;
  }
`
