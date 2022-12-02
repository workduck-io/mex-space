import { MexThemeData } from '../types/theme'
import { gruvboxLightTheme, gruvboxTheme } from './gruvbox'
import { mexLightTheme, mexTheme } from './mex'
import { mexThemeNew } from './mex-new'

export const defaultThemes: MexThemeData[] = [
  { id: 'mex', name: 'Mex', data: { light: mexLightTheme, dark: mexTheme } },
  { id: 'gruvbox', name: 'Gruvbox', data: { light: gruvboxLightTheme, dark: gruvboxTheme } }
]

export { mexThemeNew }

export const getTheme = (themeId: string) => {
  const theme = defaultThemes.filter((t) => t.id === themeId)
  if (theme.length > 0) return theme[0]
  return defaultThemes[0]
}
