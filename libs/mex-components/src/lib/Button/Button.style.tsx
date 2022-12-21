import styled, { css } from 'styled-components'

import { generateStyle } from '@workduck-io/mex-themes'

import { LoadingWrapper } from '../Primitives/Loading/Loading.style'

type ShadowStyle = 'none' | 'medium' | 'large'

export const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};
`

const buttonStyles = (shadowStyle: ShadowStyle, large: boolean) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  border: none;
  outline: none;

  cursor: pointer;
  line-height: 1.15;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => (large ? '1.2rem' : theme.app.text.size)};
  width: max-content;
  gap: ${({ theme }) => theme.spacing.tiny};

  flex-shrink: 0;
  flex-grow: 0;

  box-shadow: ${({ theme }) =>
    shadowStyle === 'medium'
      ? theme.tokens.shadow.small
      : shadowStyle === 'large'
      ? theme.tokens.shadow.medium
      : 'none'};

  &:hover {
    box-shadow: ${({ theme }) =>
      shadowStyle === 'medium'
        ? theme.tokens.shadow.medium
        : shadowStyle === 'large'
        ? theme.tokens.shadow.large
        : theme.tokens.shadow.small};
  }

  &:active {
    transform: scale(0.95) translateY(1px);
  }

  &:disabled {
    cursor: not-allowed;
    pointer-events: none;
  }

  &:disabled:active {
    transform: none;
  }

  transition: background-color 0.1s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.1s ease-in-out;
`

const asyncCss = css`
  overflow: hidden;
  position: relative;

  ${LoadingWrapper} {
    position: absolute;
    margin: auto;
  }
`

interface ButtonProps {
  shadowStyle?: ShadowStyle
  async?: boolean
  large?: boolean
}

const basicButton = ({ shadowStyle = 'medium', async = false, large = false }: ButtonProps) => css`
  ${shadowStyle && buttonStyles(shadowStyle, large)}
  ${async && asyncCss}
`

export const PrimaryButton = styled.button<ButtonProps>`
  ${(props) => basicButton(props)}
  ${({ theme }) => generateStyle(theme.generic.button.primary)}
`

export const Button = styled.button<ButtonProps>`
  ${(props) => basicButton(props)}
  ${({ theme }) => generateStyle(theme.generic.button.default)}
`

export const DangerButton = styled.button<ButtonProps>`
  ${(props) => basicButton(props)}
  ${({ theme }) => generateStyle(theme.generic.button.danger)}
`

export const SecondaryButton = styled.button<ButtonProps>`
  ${(props) => basicButton(props)}
  ${({ theme }) => generateStyle(theme.generic.button.secondary)}
`

const defaultProps = {
  shadowStyle: 'medium' as ShadowStyle
}

PrimaryButton.defaultProps = defaultProps
Button.defaultProps = defaultProps
DangerButton.defaultProps = defaultProps
SecondaryButton.defaultProps = {
  shadowStyle: 'none' as ShadowStyle
}
