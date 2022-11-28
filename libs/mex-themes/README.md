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
// A sample implementation
function ThemeSwitcher() {
  const { themes, preferences, changeTheme, toggleMode } = useThemeContext()
  return (
    <div>
      <p>
        Current Theme: {preferences.themeId} Current Mode: {preferences.mode}
      </p>
      {themes.map((theme) =>
        (['light', 'dark'] as ThemeMode[]).map((mode) => (
          <ManagedProvider theme={theme.data[mode]}>
            <MyWrapper key={theme.id}>
              <h1>
                {theme.id} {mode}
              </h1>
              <DivWrapper>
                {Array.from(Array(10).keys()).map((i) => (
                  // This div just renders the color in gray palette
                  <StyledDiv key={i + 1} colorNum={i + 1} />
                ))}
              </DivWrapper>
              <button onClick={() => changeTheme(theme.id, mode)}>Set Theme</button>
            </MyWrapper>
          </ManagedProvider>
        ))
      )}
      <button onClick={toggleMode}>Toggle Mode</button>
    </div>
  )
}
```

## Running unit tests

Run `nx test mex-themes` to execute the unit tests via [Jest](https://jestjs.io).
