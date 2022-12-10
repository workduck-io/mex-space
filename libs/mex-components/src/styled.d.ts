import { ThemeConfig } from 'react-select/src/theme'
import { MexTheme } from '@workduck-io/mex-themes'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends MexTheme {}
}
