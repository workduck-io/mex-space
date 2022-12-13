import { MexTheme } from '@workduck-io/mex-themes'

// and extend them!
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends MexTheme {}
}
