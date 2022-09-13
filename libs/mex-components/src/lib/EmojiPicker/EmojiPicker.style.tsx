import styled from 'styled-components'

import { hex2Rgba } from '../Helpers'

export const PickerContainer = styled.div`
  em-emoji-picker {
    --border-radius: ${({ theme }) => theme.borderRadius.small};
    --category-icon-size: 24px;
    --color-border: rgba(0, 0, 0, 0.05);
    --font-family: inherit;
    --font-size: 14px;
    --shadow: rgba(0, 0, 0, 0.133) 0 3.2px 7.2px 0, rgba(0, 0, 0, 0.11) 0 0.6px 1.8px 0;

    --rgb-background: ${({ theme }) => hex2Rgba(theme.colors.background.modal, 1)};

    height: 50vh;
    min-height: 400px;
    max-height: 800px;
  }
`
