import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultThemes } from './Themes/defaultThemes'
import { mexTheme } from './Themes/mex'

type ThemeProviderContextType = {
  themeId: string
  themes: typeof defaultThemes
  changeTheme: (themeId: string) => void
}

const ThemeContext = createContext<ThemeProviderContextType>(undefined!)
export const useThemeContext = () => useContext(ThemeContext)

export const Provider = ({ children }) => {
  const defaultThemeId = useMemo(() => defaultThemes[0].id, [])
  const [themeId, setThemeId] = useState(defaultThemeId)

  const currentTheme = useMemo(() => {
    const theme = defaultThemes.find((theme) => theme.id === themeId)
    return theme
  }, [themeId])

  const changeTheme = (themeId: string) => {
    const newTheme = defaultThemes.find((theme) => theme.id === themeId)
    // console.log('newTheme', { newTheme, defaultThemes, themeId })
    if (newTheme) {
      // console.log('SettingNewTheme', { newTheme })
      setThemeId(themeId)
    }
  }
  return (
    <ThemeProvider theme={currentTheme?.themeData ?? mexTheme}>
      <ThemeContext.Provider value={{ themeId, themes: defaultThemes, changeTheme }}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  )
}
