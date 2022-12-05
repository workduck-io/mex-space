import React, { createContext, useContext, useMemo, useState } from 'react'
import styled, { FlattenSimpleInterpolation, ThemeProvider } from 'styled-components'

import { defaultThemes, mexThemeNew } from './Themes/defaultThemes'
import { DEFAULT_LOCAL_STORAGE_KEY } from './defaults'
import { generateGlobalStyles } from './globalStyles'
import { ThemeMode, UserThemePreferences } from './types/theme'
import { ThemeTokens } from './types/tokens'
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
  /**
   * If false, the legacy theme will be set to antiLegacy
   * to facilitate removal of the legacy theme
   */
  legacySupport?: boolean
}

export const Provider = ({
  children,
  localStorageKey = DEFAULT_LOCAL_STORAGE_KEY,
  legacySupport = true
}: ProviderProps) => {
  const defaultThemeId = useMemo(() => defaultThemes[0].id, [])
  const [pref, setPref] = useState<UserThemePreferences>(
    getInitialTheme(localStorageKey) ?? {
      themeId: defaultThemeId,
      mode: 'light'
    }
  )

  const { theme: currentTheme, GlobalStyle } = useMemo(() => {
    const themeTokens = defaultThemes.find((theme) => theme.id === pref.themeId)
    const { theme, style: GlobalStyle } = generateGlobalStyles(themeTokens?.data[pref.mode] ?? mexThemeNew, {
      antiLegacy: !legacySupport
    })
    return { theme, GlobalStyle }
  }, [pref, legacySupport])

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
    <ThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={{ preferences: pref, themes: defaultThemes, changeTheme, toggleMode }}>
        {children}
        {GlobalStyle ? <GlobalStyle /> : null}
      </ThemeContext.Provider>
    </ThemeProvider>
  )
}

interface ManagedProviderProps {
  /**
   * Theme to display for this provider
   */
  tokens: ThemeTokens<string>
  /**
   * If false, the legacy theme will be set to antiLegacy
   * to facilitate removal of the legacy theme
   */
  legacySupport?: boolean
  children: React.ReactNode
}

const DIv = styled.div<{ styl: FlattenSimpleInterpolation }>`
  ${({ styl }) => styl}
`

export const ManagedProvider = ({ tokens, children, legacySupport = true }: ManagedProviderProps) => {
  const { theme, wrapperStyle: WrapperStyle } = useMemo(
    () =>
      generateGlobalStyles(tokens, {
        wrapperStyles: true,
        antiLegacy: !legacySupport
      }),
    [tokens, legacySupport]
  )
  if (!WrapperStyle) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  } else
    return (
      <ThemeProvider theme={theme}>
        <DIv styl={WrapperStyle}>{children}</DIv>
      </ThemeProvider>
    )
}
