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
          <ManagedProvider theme={theme.data[mode]} mode={mode}>
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

## Style usage

```typescript-react
const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.small};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.app.text.size};
`;

export const PrimaryButton = styled.div`
  ${buttonStyles}
  ${({ theme }) => css`
    ${genButtonStyles(theme.generic.button.primary)}
  `}
`;

export const Button = styled.div`
  ${buttonStyles}
  ${({ theme }) => css`
    ${genButtonStyles(theme.generic.button.default)}
  `}
`;

// Note that generateStyleGeneric and genButtonStyles differ yet do the same thing,
// convert the button styles to css styles
export const SecondaryButton = styled.div`
  ${buttonStyles}
  ${({ theme }) => css`
    ${generateStyleGeneric(theme.generic.button.secondary)}
  `}
`;


```

## Running unit tests

Run `nx test mex-themes` to execute the unit tests via [Jest](https://jestjs.io).
