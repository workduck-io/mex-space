import { ThemeTokens } from '../types/tokens'

import { shadows } from './shadows'

export const gruvboxTheme: ThemeTokens<string> = {
  surfaces: {
    s: {
      0: '#1d2021',
      1: '#282828',
      2: '#3c3836',
      3: '#504945',
      4: '#665c54',
      5: '#7c6f64',
      6: '#a89984'
    },
    app: '#282828',
    sidebar: '#1d2021',
    modal: '#3c3836',
    separator: '#665c54',
    highlight: '#665c54',
    code: '#3c3836',
    tooltip: {
      default: '#504945',
      primary: '#665c54',
      info: '#504945'
    },
    scrollbar: {
      thumb: '#665c54',
      thumbHover: '#a89984'
    }
  },

  colors: {
    primary: {
      default: '#b8bb26',
      hover: '#d1d43c',
      active: '#a9ac22',
      disabled: '#919341',
      text: '#1d2021'
    },
    fade: '#bdae93',
    secondary: '#fabd2f',
    white: '#ffffff',
    black: '#000000',
    green: '#00e676',
    yellow: '#eeff41',
    red: '#fb4934',
    blue: '#55A2EA'
  },
  text: {
    heading: '#f9f5d7',
    default: '#ebdbb2',
    subheading: '#f2e5bc',
    fade: '#9d9481',
    disabled: '#a89984',
    accent: '#fe8019',
    code: '#a89984'
  },
  shadow: shadows('38deg 45% 6%')
}

export const gruvboxLightTheme: ThemeTokens<string> = {
  surfaces: {
    s: {
      0: '#fbf1c7',
      1: '#fcf4d3',
      2: '#fdf8e3',
      3: '#fffff0',
      4: '#fffff0',
      5: '#ffffff',
      6: '#ffffff'
    },
    app: '#fcf4d3',
    sidebar: '#fbf1c7',
    modal: '#fffff0',
    separator: '#ead6c5',
    highlight: '#665c54',
    code: '#bdae93',
    tooltip: {
      default: '#fffff0',
      primary: '#FFa',
      info: '#fffff0'
    },
    scrollbar: {
      thumb: '#a89984',
      thumbHover: '#665c54'
    }
  },
  colors: {
    primary: {
      default: '#E48B39',
      hover: '#f89840',
      active: '#d17a2a',
      disabled: '#a66427',
      text: '#ffffff'
    },
    fade: '#aa9b8e',
    secondary: '#b8bb26',
    white: '#ffffff',
    black: '#000000',
    green: '#00e676',
    yellow: '#eeff41',
    red: '#fb4934',
    blue: '#55A2EA'
  },
  text: {
    heading: '#1d2021',
    default: '#282828',
    subheading: '#3c3836',
    fade: '#aa9b8e',
    disabled: '#665c54',
    accent: '#fe8019',
    code: '#a89984'
  },
  shadow: shadows('38deg 36% 54%')
}
