import { IS_DEV } from './devCheck'

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
