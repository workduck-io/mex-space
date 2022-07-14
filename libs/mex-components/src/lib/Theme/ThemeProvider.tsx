import React from 'react';
// import { defaultThemes } from '../../style/themes/defaultThemes'
import { ThemeProvider } from 'styled-components';
import { defaultThemes } from './Themes/defaultThemes';
import useThemeStore from './ThemeStore';

const Providers: React.FC = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <ThemeProvider theme={theme?.themeData ?? defaultThemes[0].themeData}>
      {children}
    </ThemeProvider>
  );
};

export default Providers;
