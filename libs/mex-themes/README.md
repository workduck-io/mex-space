# mex-themes

This library was generated with [Nx](https://nx.dev).

## Using mex-themes

1. Add it as a dependency.
2. Add a `styled.d.ts` with contents:

```typescript
import { MexTheme } from '@workduck-io/mex-themes'

declare module 'styled-components' {
  export interface DefaultTheme extends MexTheme {}
}
```

3. Wrap all `styled-components` using the theme in `Provider`

4. For adding theme switcher:

```typescript
// A sample theme switcher
function ThemeSwitcher() {
  const { themes, themeId, changeTheme } = useThemeContext()
  return (
    <div>
      <p>Current Theme: {themeId}</p>
      {themes.map((theme) => (
        <MyWrapper key={theme.id}>
          <h1>{theme.id}</h1>
          <button onClick={() => changeTheme(theme.id)}>Set Theme</button>
        </MyWrapper>
      ))}
    </div>
  )
}
```

## Running unit tests

Run `nx test mex-themes` to execute the unit tests via [Jest](https://jestjs.io).
