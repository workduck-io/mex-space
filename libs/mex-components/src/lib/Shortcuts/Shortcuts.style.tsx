import { shade, transparentize } from 'polished'
import styled from 'styled-components'

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
  background-color: ${({ theme }) => transparentize(0.75, theme.colors.palette.black)};
  color: ${({ theme }) => transparentize(0.2, theme.colors.palette.white)};
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
    background-color: ${({ theme }) => shade(0.1, theme.colors.primary)};
    color: ${({ theme }) => theme.colors.text.oppositePrimary};
  }
`
