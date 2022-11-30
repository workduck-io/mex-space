import { DefaultTheme } from 'styled-components'

type Shadow = string
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
}

interface TextColorPalette {
  heading: HexColor
  default: HexColor
  subheading: HexColor
  fade: HexColor
  disabled: HexColor
  accent: HexColor
  oppositePrimary: HexColor
}

export interface BackgroundImages {
  app: string
  preview: string
}

export interface SurfaceLayers {
  0: HexColor
  1: HexColor
  2: HexColor
  3: HexColor
  4: HexColor
  5: HexColor
  6: HexColor
}

interface Surfaces {
  s: SurfaceLayers
  sidebar: HexColor
  modal: HexColor
  tooltip: {
    default: HexColor
    primary: HexColor
    info: HexColor
  }
}

interface ColorPalette {
  primary: {
    default: HexColor
    hover: HexColor
    active: HexColor
    disabled: HexColor
    text: HexColor
  }
  secondary: HexColor
  white: HexColor
  black: HexColor
  green: HexColor
  yellow: HexColor
  red: HexColor
  blue: HexColor
}

// What is fed
export interface ThemeTokens {
  layout: LayoutTokens
  colors: ColorPalette
  text: TextColorPalette
  surfaces: Surfaces
  shadow: {
    small: Shadow
    medium: Shadow
    large: Shadow
  }
  additionalTheme?: Partial<DefaultTheme>
}
