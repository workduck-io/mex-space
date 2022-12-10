import { ThemeTokens } from '../types/tokens'

import { shadows } from './shadows'

export const mexTheme: ThemeTokens<string> = {
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
    app: '#1F2138',
    sidebar: '#191B2B',
    modal: '#1F2138',
    separator: '#525579',
    highlight: '#525579',
    code: '#525579',
    tooltip: {
      default: '#363959',
      primary: '#525579',
      info: '#363959'
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

export const mexLightTheme: ThemeTokens<string> = {
  surfaces: {
    s: {
      0: '#DFE0EE',
      1: '#e6e8f4',
      2: '#ededf7',
      3: '#f4f5fa',
      4: '#f8f9fc',
      5: '#ffffff',
      6: '#ffffff'
    },
    app: '#e6e8f4',
    sidebar: '#DFE0EE',
    modal: '#F8F9FC',
    separator: '#525579',
    highlight: '#525579',
    code: '#525579',
    tooltip: {
      default: '#FFF',
      primary: '#ccF',
      info: '#f8f9fc'
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
    secondary: '#B877EC',
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
  shadow: shadows('234deg 13% 65%')
}
