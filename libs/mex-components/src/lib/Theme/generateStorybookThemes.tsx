import { defaultThemes } from './Themes/defaultThemes'

export const storybookThemes = defaultThemes.map((t) => ({
  name: t.id,
  ...t.themeData
}))
