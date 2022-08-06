import { ThemeProvider } from 'styled-components'
import { addDecorator } from '@storybook/react'
import { withThemes } from '@react-theming/storybook-addon'
import { themes } from '@storybook/theming'
import { storybookThemes } from '../src/lib/Theme'
import { StoryWrapper } from '../src/lib/StorybookHelpers/StorybookHelpers'

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
  const background = theme.colors.background.app
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

addDecorator((story) => <StoryWrapper>{story()}</StoryWrapper>)

addDecorator(
  withThemes(ThemeProvider, storybookThemes, {
    onThemeSwitch
  })
)
