import React from 'react'
import { useTheme } from 'styled-components'

import Loading from '../../Loading/Loading'
import { AsyncButton as StyledAsyncButton } from '../Button.style'
import { CustomProps } from '../Button.types'

// import Loading from '../../../style/Loading'

export const AsyncButton = StyledAsyncButton

export interface LoadingButtonProps {
  children?: React.ReactNode
  loading?: boolean
  dots?: number
  /** Also disable the button with a boolean condition */
  alsoDisabled?: boolean
  /** Props to pass to the Button component */
  buttonProps?: CustomProps
}

/**
 * Loading Button
 *
 * Button that shows a loading indicator when loading is true
 */
export const LoadingButton = ({ children, dots, loading, alsoDisabled, buttonProps }: LoadingButtonProps) => {
  const theme = useTheme()
  return (
    <StyledAsyncButton disabled={alsoDisabled || loading} {...buttonProps}>
      {!loading ? (
        children
      ) : (
        <>
          <Loading transparent dots={dots ?? 5} color={theme.colors.primary} />
          {children}
        </>
      )}
    </StyledAsyncButton>
  )
}
