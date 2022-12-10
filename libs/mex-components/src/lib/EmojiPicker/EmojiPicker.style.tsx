import styled from 'styled-components'

// import { hex2Rgba } from '../Helpers'

export const PickerContainer = styled.div`
  em-emoji-picker {
    --border-radius: ${({ theme }) => theme.borderRadius.small};
    --category-icon-size: 24px;
    --color-border: rgba(0, 0, 0, 0.05);
    --font-family: inherit;
    --font-size: 14px;
    --shadow: ${({ theme }) => theme.tokens.shadow.large};

    --rgb-background: ${({ theme }) => `${theme.rgbTokens.surfaces.modal}, 1`};
    --rgb-color: ${({ theme }) => `${theme.rgbTokens.text.fade}, 1`};

    height: 50vh;
    min-height: 400px;
    max-height: 800px;
  }
`
