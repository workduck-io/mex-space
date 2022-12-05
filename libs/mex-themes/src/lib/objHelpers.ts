import { get, set } from 'lodash'

import { CssVariable, CssVariableAccessor } from './types/theme'

type DeepObject<T> = {
  [key: string]: DeepObject<T> | T
}

export const getKeyOfLeaves = <T>(obj: DeepObject<T>): Array<string[]> => {
  const keys: Array<string[]> = []
  const leaves = (obj: DeepObject<T> | T, path: string[] = []) => {
    if (typeof obj === 'string') {
      keys.push(path)
    } else {
      Object.keys(obj).forEach((key) => leaves(obj[key], [...path, key]))
    }
  }
  leaves(obj)
  return keys
}

export const keyConverter = <T>(
  obj: DeepObject<T>
): {
  obj: DeepObject<CssVariableAccessor>
  keys: Record<CssVariable, string>
} => {
  /*
   * We will now generate the two maps,
   * first the theme map in CssVariables
   * and the second of CssVariables and their values
   */
  const objMap: DeepObject<CssVariableAccessor> = {}
  const cssVariablesMap: Record<CssVariableAccessor, T> = {}

  const leaveKeys = getKeyOfLeaves(obj as any)

  // console.log({ leaveKeys })

  leaveKeys.forEach((key) => {
    const cssVariableAccessor: CssVariableAccessor = `var(--theme-${key.join('-')})`
    const cssVariable = `--theme-${key.join('-')}`
    set(objMap, key, cssVariableAccessor)
    set(cssVariablesMap, cssVariable, get(obj, key))
  })

  return {
    obj: objMap,
    keys: cssVariablesMap
  }
}
