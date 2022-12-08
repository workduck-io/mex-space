import { ThemeTokens } from '../types/tokens'
import { shadows } from './shadows'

export const xemTheme: ThemeTokens<string> = {
  // Palettes
  surfaces: {
    s: {
      0: '#181b20', // Darkest
      1: '#292d30',
      2: '#2f353a',
      3: '#40444B',
      4: '#4E525A',
      5: '#646A75',
      6: '#8E9096'
    },
    app: '#181b20',
    sidebar: '#292d30',
    modal: '#2f353a',
    separator: '#4E525A',
    highlight: '#4E525A',
    code: '#4E525A',
    tooltip: {
      default: '#4E525A',
      primary: '#4E525A',
      info: '#4E525A'
    }
  },
  colors: {
    primary: {
      default: '#479bf0',
      hover: '#61a9f3',
      active: '#2185ec',
      disabled: '#1f70c5',
      text: '#1F2933'
    },
    fade: '#55A2EA',
    secondary: '#128C7E',
    white: '#ffffff',
    black: '#000000',
    green: '#00e676',
    yellow: '#eeff41',
    red: '#fb4934',
    blue: '#55A2EA'
  },
  text: {
    heading: '#E4F1FF',
    default: '#cbd2d8',
    subheading: '#D1E5FB',
    fade: '#a1a4a9',
    disabled: '#72767D',
    code: '#a1a4a9',
    accent: '#fe8019'
  },
  shadow: shadows('234deg 36% 7%')
}

export const xemLightTheme: ThemeTokens<string> = {
  surfaces: {
    s: {
      0: '#e6e6e6',
      1: '#ebebeb',
      2: '#f0f0f0',
      3: '#f5f5f5',
      4: '#fafafa',
      5: '#ffffff',
      6: '#ffffff'
    },
    app: '#e6e6e6',
    sidebar: '#ebebeb',
    modal: '#f0f0f0',
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
      default: '#479bf0',
      hover: '#61a9f3',
      active: '#2185ec',
      disabled: '#1f70c5',
      text: '#ffffff'
    },
    fade: '#363959',
    secondary: '#128C7E',
    white: '#ffffff',
    black: '#000000',
    green: '#00e676',
    yellow: '#eeff41',
    red: '#fb4934',
    blue: '#55A2EA'
  },
  text: {
    heading: '#1F2933',
    default: '#4d5173',
    subheading: '#2b2e4a',
    fade: '#8288a6',
    code: '#9aa2c9',
    disabled: '#72767D',
    accent: '#fe8019'
  },
  shadow: shadows('0deg 0% 63%')
}
