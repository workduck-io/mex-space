import { defaultThemes } from '.';

export const storybookThemes = defaultThemes.map((t) => ({
  name: t.id,
  ...t.themeData,
}));
