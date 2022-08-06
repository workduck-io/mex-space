import React from 'react'
import styled from 'styled-components'
import GlobalStyle from '../Global/GlobalStyle'

export const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
`

export const StoryWrapper = ({ children }) => {
  return (
    <>
      {
        // Shows error for GlobalStyle which can be ignoredb
      }
      {/* eslint-disable-line */}
      <GlobalStyle />
      {children}
    </>
  )
}

