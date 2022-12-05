import { DefaultTheme } from 'styled-components'

export interface LayoutStyle {
  width: {
    nav: Pixels
    sidebar: Pixels
  }
  indent: { sidebar: Pixels }
}

export interface ShadePalette {
  10: string // Darkest
  9: string
  8: string
  7: string
  6: string
  5: string
  4: string
  3: string
  2: string
  1: string // Lightest
}

export interface ColorPalette_ {
  white: string
  black: string
  green: string
  yellow: string
  red: string
  blue: string
}

export interface TextPalette {
  heading: string
  default: string
  subheading: string
  fade: string
  disabled: string
  accent: string
  oppositePrimary: string
}

export interface BackgroundImages {
  app: string
  preview: string
}

export interface ThemePalette {
  // Colors
  primary: string
  secondary: string

  // Palettes
  gray: ShadePalette
  palette: Partial<ColorPalette_>

  backgroundImages?: BackgroundImages

  text?: TextPalette

  custom?: string
  additionalTheme?: Partial<DefaultTheme>
  hasBlocks?: boolean
}
type Pixels = number // Pixels in integer

interface ColorPalette {
  white: string
  black: string
  green: string
  yellow: string
  red: string
  blue: string
}

export interface LegacyTheme extends LayoutStyle {
  colors: {
    primary: string
    secondary: string
    palette: ColorPalette
    gray: ShadePalette

    background: {
      app: string
      card: string
      modal: string
      sidebar: string
      highlight: string
    }
    divider: string
    fade: {
      primary: string
      secondary: string
      background: string
    }
    form: {
      input: {
        bg: string
        fg: string
        border: string
      }
      button: {
        bg: string
        fg: string
        hover: string
        border: string
      }
    }
    text: {
      heading: string
      subheading: string
      default: string
      fade: string
      disabled: string
      accent: string
      oppositePrimary: string
    }
  }
  backgroundImages?: BackgroundImages
  additional: {
    profilePalette: string[]
    reactSelect: any
    hasBlocks?: boolean
  }
  custom?: string
}
