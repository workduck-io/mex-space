import { withThemes } from '@react-theming/storybook-addon'
import { addDecorator } from '@storybook/react'
import { themes } from '@storybook/theming'
import { ThemeProvider } from 'styled-components'
import { providerFn, storybookThemes } from '../src/lib/Theme/generateStorybookThemes'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  darkMode: {
    current: 'dark',
    dark: themes.dark,
    // Override the default light theme
    light: themes.light
  }
}

export const onThemeSwitch = (context) => {
  const { theme } = context
  // console.log('onThemeSwitch', { theme })
  const background = theme.data.surfaces.app
  const parameters = {
    backgrounds: {
      default: background
    }
    // Pass backgrounds: null to disable background switching at all
  }
  return {
    parameters
  }
}

addDecorator(
  withThemes(ThemeProvider, storybookThemes, {
    onThemeSwitch,
    providerFn
  })
)
