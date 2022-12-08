import { ThemeTokens } from '../types/tokens'
import { shadows } from './shadows'

export const mexThemeNew: ThemeTokens<string> = {
  // Palettes
  surfaces: {
    s: {
      0: '#191B2B', // Darkest
      1: '#26283e',
      2: '#2b2e4a',
      3: '#363959',
      4: '#525579',
      5: '#878BAE',
      6: '#8F94C1'
    },
    app: '#191B2B',
    sidebar: '#1F2138',
    modal: '#1F2138',
    separator: '#525579',
    highlight: '#525579',
    code: '#525579',
    tooltip: {
      default: '#525579',
      primary: '#525',
      info: '#525579'
    }
  },
  colors: {
    primary: {
      default: '#55A2EA',
      hover: '#55A2EA',
      active: '#55A2EA',
      disabled: '#55A2EA',
      text: '#1F2933'
    },
    fade: '#55A2EA',
    secondary: '#B877EC',
    white: '#ffffff',
    black: '#000000',
    green: '#00e676',
    yellow: '#eeff41',
    red: '#fb4934',
    blue: '#55A2EA'
  },
  text: {
    heading: '#E4F1FF',
    default: '#B9C1D6',
    subheading: '#D1E5FB',
    fade: '#9aa2c9',
    code: '#9aa2c9',
    disabled: '#72767D',
    accent: '#fe8019'
  },
  shadow: shadows('234deg 36% 7%')
}
