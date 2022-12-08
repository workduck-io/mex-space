import { DEFAULT_LOCAL_STORAGE_KEY } from './defaults'
import { ThemeMode, UserThemePreferences } from './types/theme'

export function saveThemePreferenceToLocalStorage(
  props: { themeId: string; mode: ThemeMode },
  localStorageKey = DEFAULT_LOCAL_STORAGE_KEY
) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(props))
}

/**
 * Get initial theme preferences from local storage
 */
export function getInitialTheme(localStorageKey = DEFAULT_LOCAL_STORAGE_KEY): UserThemePreferences {
  const preferences: UserThemePreferences = {
    mode: 'light',
    themeId: 'mex'
  }

  const persistedColorPreference = window.localStorage.getItem(localStorageKey)
  if (persistedColorPreference) {
    const parsed = JSON.parse(persistedColorPreference)
    try {
      const { themeId, mode } = parsed
      if (mode === 'dark' || mode === 'light') {
        preferences.mode = mode
      }
      preferences.themeId = themeId
    } catch (e) {
      console.error(e)
    }
  } else {
    // If they haven't been explicit, let's check the media query
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean'
    if (hasMediaQueryPreference) {
      preferences.mode = mql.matches ? 'dark' : 'light'
    }
  }

  // console.log({ preferences })
  return preferences
}
