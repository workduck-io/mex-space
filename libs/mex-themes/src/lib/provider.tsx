import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultThemes } from './Themes/defaultThemes'
import { mexTheme } from './Themes/mex'
import { MexTheme, ThemeMode } from './types/theme'

type ThemeProviderContextType = {
  themeId: string
  themes: typeof defaultThemes
  changeTheme: (themeId: string, mode?: ThemeMode) => void
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeProviderContextType>(undefined!)
export const useThemeContext = () => useContext(ThemeContext)

export const Provider = ({ children }) => {
  const defaultThemeId = useMemo(() => defaultThemes[0].id, [])
  const [mode, setMode] = useState<ThemeMode>('light')
  const [themeId, setThemeId] = useState(defaultThemeId)

  const currentTheme = useMemo(() => {
    const theme = defaultThemes.find((theme) => theme.id === themeId)
    return theme
  }, [themeId])

  const changeTheme = (themeId: string, mode?: ThemeMode) => {
    const newTheme = defaultThemes.find((theme) => theme.id === themeId)
    if (newTheme) {
      setThemeId(themeId)
      if (mode) setMode(mode)
    }
  }

  const toggleMode = () => {
    setMode((mode) => {
      const newMode = mode === 'light' ? 'dark' : 'light'
      return newMode
    })
  }

  return (
    <ThemeProvider theme={currentTheme?.data[mode] ?? mexTheme}>
      <ThemeContext.Provider value={{ themeId, themes: defaultThemes, changeTheme, toggleMode }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

interface ManagedProviderProps {
  theme: MexTheme
  children: React.ReactNode
}
export const ManagedProvider = ({ theme, children }: ManagedProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
