import styled from 'styled-components';

export const StyledHome = styled.section`
  -webkit-text-size-adjust: 100%;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  line-height: 1.5;
  tab-size: 4;
  scroll-behavior: smooth;
  .shadow {
    box-shadow: 0 0 #0000, 0 0 #0000, 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
  .rounded {
    border-radius: 1.5rem;
  }
  .wrapper {
    width: 100%;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    max-width: 768px;
    padding-bottom: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: rgba(55, 65, 81, 1);
    width: 100%;
  }
  #welcome {
    margin-top: 2.5rem;
  }
  #welcome h1 {
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1;
  }
  #welcome span {
    display: block;
    font-size: 1.875rem;
    font-weight: 300;
    line-height: 2.25rem;
    margin-bottom: 0.5rem;
  }
  #mex-editor-container {
    background-color: hsla(214, 62%, 21%, 1);
    border: none;
    box-sizing: border-box;
    color: rgba(55, 65, 81, 1);
    display: grid;
    grid-template-columns: 1fr;
    min-height: 40vh;
    margin-top: 3.5rem;
  }
  #mex-editor-container .text-container {
    color: rgba(255, 255, 255, 1);
    padding: 3rem 2rem;
  }
  #mex-editor-container .text-container h2 {
    font-size: 1.5rem;
    line-height: 2rem;
    position: relative;
  }
  #mex-editor-container .text-container h2 svg {
    color: hsla(162, 47%, 50%, 1);
    height: 2rem;
    left: -0.25rem;
    position: absolute;
    top: 0;
    width: 2rem;
  }
  #mex-editor-container .text-container h2 span {
    margin-left: 2.5rem;
  }
  #mex-editor-container .text-container a {
    background-color: rgba(255, 255, 255, 1);
    border-radius: 0.75rem;
    color: rgba(55, 65, 81, 1);
    display: inline-block;
    margin-top: 1.5rem;
    padding: 1rem 2rem;
    text-decoration: inherit;
  }
  #mex-editor-container .logo-container {
    display: none;
    justify-content: center;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  #mex-editor-container .logo-container svg {
    color: rgba(255, 255, 255, 1);
    width: 66.666667%;
  }
  @media screen and (min-width: 768px) {
    #hero {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    #hero .logo-container {
      display: flex;
    }
    #middle-content {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
`;
