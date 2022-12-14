export const IS_DEV = (() => {
  if (import.meta.env && import.meta.env.VITE_THREADS_DEBUG) return true
  else if (import.meta.env && import.meta.env.MODE) return import.meta.env.MODE === 'development'
  else if (process.env['VITE_THREADS_DEBUG'] === 'development') return true
  else if (process.env['NODE_ENV'] === 'development') return true
  return false
})()

type MogOptions = {
  pretty: boolean
  collapsed: boolean
}

export const mog = (
  title: string,
  propertiesToLog?: Record<string, any>, // eslint-disable-line
  options: Partial<MogOptions> = { pretty: false, collapsed: false }
) => {
  if (IS_DEV) {
    if (!propertiesToLog) {
      console.log(title)
      return
    }

    options.collapsed ? console.groupCollapsed(title) : console.group(title)
    Object.entries(propertiesToLog).forEach(([key, value]) => {
      console.info(`${key}: `, options?.pretty ? JSON.stringify(value, null, 2) : value)
    })
    console.groupEnd()
  }
}
