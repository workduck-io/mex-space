import { ThemeProvider } from 'styled-components';
import { addDecorator } from '@storybook/react';
import { withThemes } from '@react-theming/storybook-addon';
import { defaultThemes } from '../src/lib/Theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const onThemeSwitch = (context) => {
  const { theme } = context;
  const background = theme.colors.background.app;
  const parameters = {
    backgrounds: {
      default: background,
    },
    // Pass backgrounds: null to disable background switching at all
  };
  return {
    parameters,
  };
};

addDecorator(
  withThemes(ThemeProvider, [defaultThemes[0].themeData], { onThemeSwitch })
);
