import { ThemeTokens } from '../types/tokens'

import { shadows } from './shadows'

export const gruvboxTheme: ThemeTokens<string> = {
  // Palettes
  //   gray: {
  //     10: '#1d2021', // Darkest
  //     9: '#282828',
  //     8: '#3c3836',
  //     7: '#504945',
  //     6: '#665c54',
  //     5: '#7c6f64',
  //     4: '#a89984',
  //     3: '#bdae93',
  //     2: '#d5c4a1',
  //     1: '#fbf1c7' // Lightest
  //   },
  surfaces: {
    s: {
      0: '#1d2021', // Darkest
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
    fade: '#d5c4a1',
    disabled: '#a89984',
    accent: '#fe8019',
    code: '#a89984'
  },
  shadow: shadows('38deg 45% 6%')
}

export const gruvboxLightTheme: ThemeTokens<string> = {
  // // Palettes
  // gray: {
  //   1: '#1d2021', // Darkest
  //   2: '#282828',
  //   3: '#3c3836',
  //   4: '#504945',
  //   5: '#665c54',
  //   6: '#7c6f64',
  //   7: '#a89984',
  //   8: '#bdae93',
  //   9: '#d5c4a1',
  //   10: '#fbf1c7' // Lightest
  // },
  surfaces: {
    s: {
      0: '#fbf1c7', // Lightest
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
    separator: '#665c54',
    highlight: '#665c54',
    code: '#bdae93',
    tooltip: {
      default: '#fffff0',
      primary: '#FFa',
      info: '#fffff0'
    }
  },
  //   // Colors
  //   primary: '#b8bb26',
  //   secondary: '#fabd2f',
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
    heading: '#1d2021',
    default: '#282828',
    subheading: '#3c3836',
    fade: '#504945',
    disabled: '#665c54',
    accent: '#fe8019',
    code: '#a89984'
  },
  shadow: shadows('38deg 36% 54%')
}
