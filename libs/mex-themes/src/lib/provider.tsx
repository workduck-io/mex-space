import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import styled, { FlattenSimpleInterpolation, ThemeProvider } from 'styled-components'

import { defaultThemes, mexThemeNew } from './Themes/defaultThemes'
import { MexThemeData, ThemeMode, UserThemePreferences } from './types/theme'
import { ThemeTokens } from './types/tokens'
import { DEFAULT_LOCAL_STORAGE_KEY } from './defaults'
import { appendGlobalStyle, generateGlobalStyles } from './globalStyles'
import { getInitialTheme, saveThemePreferenceToLocalStorage } from './userPref'

type ThemeProviderContextType = {
  /**
   * Currently applied preferences of theme and mode
   */
  preferences: UserThemePreferences

  /**
   * All available themes
   */
  themes: MexThemeData[]

  /**
   * Change to a theme (and optionally mode)
   */
  changeTheme: (themeId: string, mode?: ThemeMode) => void

  /**
   * Toggle mode of current theme
   */
  toggleMode: () => void
}

const ThemeContext = createContext<ThemeProviderContextType | undefined>(undefined)
export const useThemeContext = () => useContext(ThemeContext)

interface ProviderProps {
  children: React.ReactNode

  /**
   * If provided these are used instead of default theme
   */
  availableThemes?: MexThemeData[]

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
  availableThemes = defaultThemes,
  localStorageKey = DEFAULT_LOCAL_STORAGE_KEY,
  legacySupport = true
}: ProviderProps) => {
  const defaultThemeId = useMemo(() => availableThemes[0].id, [availableThemes])

  const [pref, setPref] = useState<UserThemePreferences>(
    getInitialTheme(localStorageKey) ?? {
      themeId: defaultThemeId,
      mode: 'light'
    }
  )
  const tokens = useMemo(() => {
    const themeTokens = availableThemes.find((theme) => theme.id === pref.themeId)
    return themeTokens
  }, [pref, availableThemes])

  const { theme: currentTheme, style: globalStyle } = generateGlobalStyles(
    tokens?.data[pref.mode] ?? mexThemeNew,
    pref.mode,
    {
      antiLegacy: !legacySupport
    }
  )

  useEffect(() => {
    // console.log('global styles')
    if (globalStyle) {
      // console.log('global styles found', { globalStyle })
      appendGlobalStyle(globalStyle)
    }
  }, [globalStyle])

  const changeTheme = (themeId: string, mode?: ThemeMode) => {
    const newTheme = availableThemes.find((theme) => theme.id === themeId)
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

  // console.log('Rider provider', { currentTheme, pref })

  return (
    <ThemeProvider theme={currentTheme}>
      <ThemeContext.Provider value={{ preferences: pref, themes: availableThemes, changeTheme, toggleMode }}>
        {children}
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
   * Mode to display for this provider
   * @default dark
   */
  mode: ThemeMode

  /**
   * If false, the legacy theme will be set to antiLegacy
   * to facilitate removal of the legacy theme
   */
  legacySupport?: boolean

  /**
   * Global Injection
   * @default false
   */
  globalInjection?: boolean

  children: React.ReactNode
}

const DIv = styled.div<{ styl: FlattenSimpleInterpolation }>`
  ${({ styl }) => styl}
`

export const ManagedProvider = ({
  tokens,
  mode = 'dark',
  children,
  legacySupport = true,
  globalInjection = false
}: ManagedProviderProps) => {
  const {
    theme,
    style,
    wrapperStyle: WrapperStyle
  } = useMemo(
    () =>
      generateGlobalStyles(tokens, mode, {
        wrapperStyles: !globalInjection,
        antiLegacy: !legacySupport
      }),
    [tokens, legacySupport, globalInjection]
  )

  useEffect(() => {
    if (globalInjection) {
      if (style) appendGlobalStyle(style)
    }
  }, [style, globalInjection])

  if (!WrapperStyle) {
    // Note that here the wrapper styles could not be generated, which is not a error
    // console.error('Could not generate wrapper styles')
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
  } else
    return (
      <ThemeProvider theme={theme}>
        <DIv styl={WrapperStyle}>{children}</DIv>
      </ThemeProvider>
    )
}
