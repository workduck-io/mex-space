import { gruvboxTheme } from './gruvbox';
import { mexTheme } from './mex';

export const defaultThemes = [
  { id: 'Mex', themeData: mexTheme },
  { id: 'Gruvbox', themeData: gruvboxTheme },
];

export const getTheme = (themeId: string) => {
  const theme = defaultThemes.filter((t) => t.id === themeId);
  if (theme.length > 0) return theme[0];
  return defaultThemes[0];
};
