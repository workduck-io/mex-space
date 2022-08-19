import { DefaultTheme } from 'styled-components'

// import create from 'zustand';
// import { defaultThemes } from './Themes/defaultThemes';
// import { mexTheme } from './Themes/mex';

interface Theme {
  id: string
  themeData: DefaultTheme
}

export interface ThemeStoreState {
  theme: Theme
  themes: Theme[]
  setTheme: (theme: Theme) => void
  setThemes: (theme: Theme[]) => void
}

// const useThemeStore = create<ThemeStoreState>((set) => ({
//   theme: { id: 'mex', themeData: mexTheme },

//   themes: defaultThemes,

//   setTheme: (theme: Theme) => {
//     set({ theme });
//   },

//   setThemes: (themes: Theme[]) => {
//     set({ themes });
//   },
// }));

// export default useThemeStore;
