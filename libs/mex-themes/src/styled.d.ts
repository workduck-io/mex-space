import { MexTheme } from './lib/types/theme'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme extends MexTheme {}
}
