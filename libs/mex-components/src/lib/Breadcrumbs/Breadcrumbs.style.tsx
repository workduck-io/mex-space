import styled, { css } from 'styled-components'

export const BreadcrumbWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  padding: ${({ theme }) => theme.spacing.tiny};
`

export const BreadcrumbItems = styled.div`
  display: flex;
  align-items: center;
  width: min-content;
`

interface SBreadcrumbItemProps {
  // Negative if not collpased
  collapsedIndex: number
}

interface BreadcrumbItemProps {
  interactive?: boolean
}
export const BreadcrumbItem = styled.div<BreadcrumbItemProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: ${({ theme }) => theme.spacing.tiny};
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  ${({ theme, interactive }) =>
    interactive
      ? css`
          &:hover {
            cursor: pointer;
            background: ${theme.tokens.surfaces.s[2]};
          }
        `
      : css`
          pointer-events: none;
        `}
  svg {
    flex-shrink: 0;
  }
`

export const BreadcrumbSection = styled.div<SBreadcrumbItemProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  ${({ collapsedIndex }) =>
    css`
      order: ${collapsedIndex < 0 ? 0 : collapsedIndex + 100};
      opacity: ${collapsedIndex < 0 ? 1 : 0};
      pointer-events: ${collapsedIndex < 0 ? 'all' : 'none'};
    `};
`

export const BreadcrumbLabel = styled.div`
  max-width: 12rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const BreadcrumbSeparator = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.tokens.text.fade};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const SBreadcrumbOverflow = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.tiny};
  background-color: ${({ theme }) => theme.tokens.surfaces.s[2]};

  svg {
    width: 1rem;
    height: 1rem;
  }
`

export const OverflowTooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  background-color: ${({ theme }) => theme.tokens.surfaces.tooltip.info};
  box-shadow: ${({ theme }) => theme.tokens.shadow.large};
`

export const BreadcrumbOverflowList = styled.div`
  display: flex;
  flex-direction: column;
`
