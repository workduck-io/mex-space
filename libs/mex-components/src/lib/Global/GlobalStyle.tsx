import { createGlobalStyle, css } from 'styled-components'
import { ThinScrollbar } from '../Helpers'
import { TippyBalloonStyles } from '../Tooltips/Tooltips.style'
import normalize from './normalize'

const GlobalStyle = createGlobalStyle`
  ${normalize};

  input:focus-visible {
    outline: ${({ theme }) => theme.colors.primary} solid 1px;
  }

  *::placeholder {
    color: ${({ theme }) => theme.colors.text.fade};
    opacity: 0.5;
  }

  html {
    font-size: 14px;
  }


  * {
    box-sizing: border-box;
  }

  body {
    height: 100%;
    width: 100vw;
    overflow: hidden;
    display: flex;
    font-size: 14px;
    font-family: Inter, sans-serif;
    color: ${({ theme }) => theme.colors.text.heading};
    ${({ theme }) => {
      if (theme.backgroundImages) {
        return css`
          background-color: ${({ theme }) => theme.colors.background.app};
          background-image: url(${theme.backgroundImages.app});
          background-size: cover;
        `
      }

      return css`
        background: ${({ theme }) => theme.colors.background.app};
      `
    }}

    * {
      ${ThinScrollbar};
    }
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.colors.primary};
    }
  }

  #root {
    width: 100%;
  }


  body > ul[role="listbox"]{
    display: block;
    /* list-style-type: disc; */
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  }

  button {
    border: none;
  }

  ${TippyBalloonStyles}
`

export default GlobalStyle