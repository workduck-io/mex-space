import styled from 'styled-components'

/* eslint-disable-next-line */
export interface MexThemesProps {}

const StyledMexThemes = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.gray[10]};
`

export function MexThemes(props: MexThemesProps) {
  return (
    <StyledMexThemes>
      <h1>Welcome to MexThemes!</h1>
    </StyledMexThemes>
  )
}

export default MexThemes
