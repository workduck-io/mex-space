import styled from 'styled-components'

import { rgba } from '../Helpers/Colors'

export const ShortcutWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.tiny};
`
export const ShortcutMid = styled.div`
  opacity: 0.66;
`
export const ShortcutBox = styled.div`
  font-size: 0.7rem;
  padding: 4px ${({ theme }) => theme.spacing.tiny};
  border-radius: 4px;
  background-color: ${({ theme }) => rgba(theme.rgbTokens.surfaces.s[2], 0.75)};
  color: ${({ theme }) => theme.tokens.text.fade};
  box-shadow: ${({ theme }) => theme.tokens.shadow.small};
`

export const TooltipShortcut = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  ${ShortcutWrapper} {
    gap: 1px;
  }
  ${ShortcutBox} {
    font-size: 0.75rem;
    background-color: ${({ theme }) => theme.tokens.colors.primary.default};
    color: ${({ theme }) => theme.tokens.colors.primary.text};
  }
`
