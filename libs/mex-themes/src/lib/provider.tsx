import React, { createContext, useContext, useMemo, useState } from 'react'
import { ThemeProvider } from 'styled-components'

import { defaultThemes } from './Themes/defaultThemes'
import { mexTheme } from './Themes/mex'
import { DEFAULT_LOCAL_STORAGE_KEY } from './defaults'
import { MexTheme, ThemeMode, UserThemePreferences } from './types/theme'
import { getInitialTheme, saveThemePreferenceToLocalStorage } from './userPref'

type ThemeProviderContextType = {
  /**
   * Currently applied preferences of theme and mode
   */
  preferences: UserThemePreferences

  /**
   * All available themes
   */
  themes: typeof defaultThemes

  /**
   * Change to a theme (and optionally mode)
   */
  changeTheme: (themeId: string, mode?: ThemeMode) => void

  /**
   * Toggle mode of current theme
   */
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeProviderContextType>(undefined!)
export const useThemeContext = () => useContext(ThemeContext)

interface ProviderProps {
  children: React.ReactNode
  /**
   * The key to use for local storage of user theme preferences
   */
  localStorageKey?: string
}

export const Provider = ({ children, localStorageKey = DEFAULT_LOCAL_STORAGE_KEY }: ProviderProps) => {
  const defaultThemeId = useMemo(() => defaultThemes[0].id, [])
  const [pref, setPref] = useState<UserThemePreferences>(
    getInitialTheme(localStorageKey) ?? {
      themeId: defaultThemeId,
      mode: 'light'
    }
  )

  const currentTheme = useMemo(() => {
    const theme = defaultThemes.find((theme) => theme.id === pref.themeId)
    return theme
  }, [pref])

  const changeTheme = (themeId: string, mode?: ThemeMode) => {
    const newTheme = defaultThemes.find((theme) => theme.id === themeId)
    if (newTheme) {
      setPref((pref) => {
        const newPref = { themeId, mode: mode ?? pref.mode }
        saveThemePreferenceToLocalStorage(newPref, localStorageKey)
        return newPref
      })
    }
  }

  const toggleMode = () => {
    setPref((p) => {
      const newMode = p.mode === 'light' ? 'dark' : 'light'
      const newPerf: UserThemePreferences = { ...p, mode: newMode }
      saveThemePreferenceToLocalStorage(newPerf, localStorageKey)
      return newPerf
    })
  }

  return (
    <ThemeProvider theme={currentTheme?.data[pref.mode] ?? mexTheme}>
      <ThemeContext.Provider value={{ preferences: pref, themes: defaultThemes, changeTheme, toggleMode }}>
        {children}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

interface ManagedProviderProps {
  /**
   * Theme to display for this provider
   */
  theme: MexTheme
  children: React.ReactNode
}

export const ManagedProvider = ({ theme, children }: ManagedProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
