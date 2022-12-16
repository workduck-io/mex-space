import { DefaultTheme } from 'styled-components'

export interface LayoutTokens<T> {
  spacing: {
    large: T
    medium: T
    small: T
    tiny: T
  }
  borderRadius: {
    large: T
    small: T
    tiny: T
  }
}

interface TextColorPalette<T, HexGeneric = T> {
  heading: HexGeneric
  default: HexGeneric
  subheading: HexGeneric
  fade: HexGeneric
  disabled: HexGeneric
  accent: HexGeneric
  code: HexGeneric
}

export interface BackgroundImages<T> {
  app: T
  preview: T
}

export interface SurfaceLayers<T, HexGeneric = T> {
  0: HexGeneric
  1: HexGeneric
  2: HexGeneric
  3: HexGeneric
  4: HexGeneric
  5: HexGeneric
  6: HexGeneric
}

interface Surfaces<T, Hex = T> {
  s: SurfaceLayers<T>
  app: Hex
  sidebar: Hex
  modal: Hex
  separator: Hex
  highlight: Hex
  code: Hex
  tooltip: {
    default: Hex
    primary: Hex
    info: Hex
  }
  scrollbar: {
    thumb: Hex
    thumbHover: Hex
  }
}

interface ColorPalette<T, Hex = T> {
  primary: {
    default: Hex
    hover: Hex
    active: Hex
    disabled: Hex
    text: Hex
  }
  fade: Hex
  secondary: Hex
  white: Hex
  black: Hex
  green: Hex
  yellow: Hex
  red: Hex
  blue: Hex
}

// What is fed
export interface ThemeTokens<T> {
  colors: ColorPalette<T>
  text: TextColorPalette<T>
  surfaces: Surfaces<T>
  shadow: {
    color: T
    small: T
    medium: T
    large: T
  }
  additionalTheme?: Partial<DefaultTheme>
}
