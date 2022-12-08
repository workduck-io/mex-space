import { MexThemeData } from '../types/theme'
import { gruvboxLightTheme, gruvboxTheme } from './gruvbox'
import { mexLightTheme, mexTheme } from './mex'
import { mexThemeNew } from './mex-new'
import { xemLightTheme, xemTheme } from './xem'

export const defaultThemes: MexThemeData[] = [
  { id: 'mex', name: 'Mex', data: { light: mexLightTheme, dark: mexTheme } },
  { id: 'gruvbox', name: 'Gruvbox', data: { light: gruvboxLightTheme, dark: gruvboxTheme } },
  { id: 'xem', name: 'Xem', data: { light: xemLightTheme, dark: xemTheme } }
]

export { mexThemeNew }

export const getTheme = (themeId: string) => {
  const theme = defaultThemes.filter((t) => t.id === themeId)
  if (theme.length > 0) return theme[0]
  return defaultThemes[0]
}
