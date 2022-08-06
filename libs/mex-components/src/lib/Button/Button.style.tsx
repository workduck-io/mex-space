import { transparentize } from 'polished'
import styled, { css } from 'styled-components'
import { centeredCss } from '../Helpers'
import { LoadingWrapper } from '../Loading/Loading.style'
import { ButtonProps } from './Button.types'

export const SButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.text.subheading};
  cursor: pointer;
  transition: 0.3s ease;
  background-color: ${({ theme }) => theme.colors.form.button.bg};

  flex-shrink: 0;
  flex-grow: 0;

  &:focus {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 6px 12px ${({ theme }) => transparentize(0.75, theme.colors.primary)};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 6px 12px ${({ theme }) => transparentize(0.75, theme.colors.primary)};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.form.button.bg};
    color: ${({ theme }) => transparentize(0.5, theme.colors.form.button.fg)};
    cursor: not-allowed;
    pointer-events: none;
  }

  ${({ primary, transparent, theme }) =>
    !primary &&
    transparent &&
    css`
      background-color: transparent;
      &:hover {
        background-color: ${theme.colors.form.button.bg};
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.gray[6]};
        cursor: default;
      }
    `}

  ${({ theme: { spacing }, large }) =>
    large
      ? css`
          padding: ${`${spacing.small} ${spacing.medium}`};
          font-size: 1.2rem;
        `
      : css`
          padding: ${spacing.small};
        `}

  ${({ theme, primary }) =>
    primary
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.oppositePrimary};
          &:hover {
            background-color: ${theme.colors.fade.primary};
            color: ${theme.colors.text.oppositePrimary};
          }
          &:disabled {
            background-color: ${({ theme }) => theme.colors.gray[6]};
            cursor: default;
          }
          &:focus {
            color: ${theme.colors.text.oppositePrimary};
            box-shadow: 0px 6px 12px ${({ theme }) => transparentize(0.75, theme.colors.primary)};
          }
        `
      : ''}

  ${({ theme, highlight }) =>
    highlight
      ? css`
          background-color: ${theme.colors.primary};
          color: ${theme.colors.text.oppositePrimary};
          box-shadow: 0px 4px 8px ${({ theme }) => transparentize(0.33, theme.colors.primary)};
          &:hover {
            background-color: ${theme.colors.fade.primary};
            color: ${theme.colors.text.oppositePrimary};
          }
          &:disabled {
            background-color: ${({ theme }) => theme.colors.gray[6]};
          }
        `
      : ''}
`

// export interface AsyncButtonProps extends ButtonProps {
//   style?: any
// }

export const AsyncButton = styled(SButton)`
  ${centeredCss};
  overflow: hidden;
  position: relative;

  ${LoadingWrapper} {
    position: absolute;
    margin: auto;
  }
`
