export const IS_DEV = (() => {
  if (import.meta.env && import.meta.env.MODE) return import.meta.env.MODE === 'development' ? true : false
  else if (process.env['NX_BUILD_MODE'] === 'development') return true
  else if (process.env['NODE_ENV'] === 'development') return true
  return false
})()

export const IS_DEV_FUNCTION = () => {
  if (import.meta.env && import.meta.env.MODE) return import.meta.env.MODE === 'development' ? true : false
  else if (process.env['NX_BUILD_MODE'] === 'development') return true
  else if (process.env['NODE_ENV'] === 'development') return true
  return false
}
