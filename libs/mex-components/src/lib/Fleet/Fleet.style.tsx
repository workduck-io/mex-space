import Modal from 'react-modal'

import styled, { css } from 'styled-components'

export const FleetStyled = styled.section<{ index: number; total: number }>`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  align-items: center;

  ${({ index, total }) =>
    css`
      &::before {
        content: '';
        display: block;
        position: absolute;
        width: calc(100% / ${total});
        height: 100%;
        border-radius: ${({ theme }) => theme.borderRadius.large};
        top: 0;
        left: 0;
        box-shadow: ${({ theme }) => theme.tokens.shadow.large};
        background-color: ${({ theme }) => theme.tokens.surfaces.modal};
        transform: translateX(${index * 100}%);
        transition: background 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0s, transform 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
      }
    `}
`

export const StyledModal = styled(Modal)`
  /* width: 44rem;  */
`

export const FleetSectionTitle = styled.div`
  width: 8rem;
  display: flex;
  justify-content: center;
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
`

export const AnimateZoom = styled.span<{ selected?: boolean }>`
  transition: transform 0.2s;

  ${({ selected }) =>
    selected &&
    css`
      transform: scale(1.15);
    `}
`

export const FleetSection = styled.div<{ highlight?: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.large};
  display: flex;
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.large} ${theme.spacing.large}`};
  flex-direction: column;
  z-index: 1;
  align-items: center;
  justify-content: center;
  transition: color 0.1s;
  ${({ highlight, theme }) =>
    highlight
      ? css`
          color: ${theme.tokens.colors.primary.default};
        `
      : css`
          opacity: 0.5;
          color: ${theme.tokens.text.default};
        `}
  gap: ${({ theme }) => theme.spacing.medium};
`
