import { range } from 'lodash'
import styled, { css, keyframes } from 'styled-components'

import { LoadingProps } from './Loading.types'

const loadingFade = keyframes`
  0% { opacity: 0; }
  50% { opacity: 0.8; }
  100% { opacity: 0; }
`

export const LoadingWrapper = styled.div<LoadingProps>`
  display: flex;
  justify-content: space-around;
  ${({ theme, transparent }) =>
    !transparent &&
    css`
      padding: 10px;
      background: ${theme.tokens.surfaces.s[2]};
    `}

  border-radius: 5px;

  ${({ orientation, dots }) =>
    orientation === 'vertical'
      ? css`
          flex-direction: column;
          max-height: ${dots * 24}px;
          gap: 0.5rem;
          margin: 1rem;
        `
      : css`
          max-width: ${dots * 24}px;
        `}
`

export const LoadingDot = styled.div<{
  totalDots: number
  color?: string
  size?: string
  direction?: 'forward' | 'reverse'
}>`
  width: ${({ size }) => size ?? '8px'};
  height: ${({ size }) => size ?? '8px'};
  margin: 0 4px;
  ${({ theme, color }) =>
    color
      ? css`
          background: ${color};
          box-shadow: 0 2px 8px ${color};
        `
      : css`
          background: ${theme.tokens.colors.primary.default};
          box-shadow: 0 2px 8px ${theme.tokens.colors.primary.default};
        `}

  border-radius: 50%;

  opacity: 0;

  animation: ${loadingFade} 1s infinite;

  ${({ totalDots, direction }) =>
    range(totalDots).reduce((prev, d) => {
      return css`
        ${prev};
        &:nth-child(${d + 1}) {
          animation-delay: ${d * (direction === 'forward' ? 0.1 : -0.1)}s;
        }
      `
    }, css``)}
`
