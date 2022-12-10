import { defaultThemes, ManagedProvider } from '@workduck-io/mex-themes'

export const storybookThemes = defaultThemes
  .map((t) => {
    return [
      {
        id: t.id,
        name: t.name + ' dark',
        data: t.data['dark']
      },
      {
        id: t.id,
        name: t.name + ' light',
        data: t.data['light']
      }
    ]
  })
  .flat()

export const providerFn = ({ theme, children }) => {
  // console.log({ theme })
  return (
    <ManagedProvider legacySupport={false} globalInjection tokens={theme.data}>
      {children}
    </ManagedProvider>
  )
}

// const themingDecorator = withThemes(null, defaultThemes, { providerFn })
