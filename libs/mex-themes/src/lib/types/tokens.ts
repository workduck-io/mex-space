import { DefaultTheme } from 'styled-components'

type Shadow = string
type Pixels = number // Pixels in integer
type HexColor = string

export interface LayoutTokens {
  spacing: {
    large: string
    medium: string
    small: string
    tiny: string
  }
  borderRadius: {
    large: string
    small: string
    tiny: string
  }
  width: {
    nav: Pixels
    sidebar: Pixels
  }
  indent: { sidebar: Pixels }
}

// interface ShadePalette {
//   10: HexColor // Darkest
//   9: HexColor
//   8: HexColor
//   7: HexColor
//   6: HexColor
//   5: HexColor
//   4: HexColor
//   3: HexColor
//   2: HexColor
//   1: HexColor // Lightest
// }

interface TextPalette {
  heading: HexColor
  default: HexColor
  subheading: HexColor
  fade: HexColor
  disabled: HexColor
  accent: HexColor
  oppositePrimary: HexColor
}

export interface ElementStyle {
  text: TextPalette
  surface: HexColor
}

export interface BackgroundImages {
  app: string
  preview: string
}

interface Surfaces {
  card: string
  sidebar: string
  nav: string
  modal: string
  tooltip: {
    default: string
    primary: string
    info: string
  }
  editor: string
  appBackground: string
}

interface ColorPalette {
  primary: string
  secondary: string
  white: string
  black: string
  green: string
  yellow: string
  red: string
  blue: string
}

// What is fed
interface ThemeTokens {
  layout: LayoutTokens
  colors: ColorPalette
  text: TextPalette
  surfaces: Surfaces
  shadow: {
    small: Shadow
    medium: Shadow
    large: Shadow
  }
  additionalTheme?: Partial<DefaultTheme>
}
