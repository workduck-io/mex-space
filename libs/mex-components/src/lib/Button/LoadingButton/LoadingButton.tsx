import React from 'react'
import { useTheme } from 'styled-components'

import Loading from '../../Loading/Loading'
import { AsyncButton as StyledAsyncButton } from '../Button.style'

export const AsyncButton = StyledAsyncButton

export type LoadingButtonProps = React.ComponentProps<typeof StyledAsyncButton> & {
  /**
   * Whether the button is in loading state
   */
  loading?: boolean
  dots?: number
  /** Also disable the button with a boolean condition */
  alsoDisabled?: boolean
}

/**
 * Loading Button
 *
 * Button that shows a loading indicator when loading is true
 */
export const LoadingButton = ({ dots, loading, alsoDisabled, ...props }: LoadingButtonProps) => {
  const theme = useTheme()
  return (
    <StyledAsyncButton disabled={alsoDisabled || loading} {...props}>
      {loading ? (
        <>
          <Loading transparent dots={dots ?? 5} color={theme.colors.primary} />
          {props.children}
        </>
      ) : (
        props.children
      )}
    </StyledAsyncButton>
  )
}
