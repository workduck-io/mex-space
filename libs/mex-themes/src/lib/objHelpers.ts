import { set } from 'lodash'

import { CssVariable, CssVariableAccessor } from './types/theme'

type DeepObject<T> = {
  [key: string]: DeepObject<T> | T
}

export const getKeyOfLeaves = <T>(obj: DeepObject<T>): Array<string[]> => {
  const keys: Array<string[]> = []
  const leaves = (obj: DeepObject<T> | T, path: string[] = []) => {
    if (typeof obj !== 'object') {
      keys.push(path)
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => leaves(obj[key], [...path, key]))
    }
  }
  leaves(obj)
  return keys
}

export const getKeyMap = <T>(
  obj: DeepObject<T>
): {
  keys: Array<string[]>
  keyMap: Record<CssVariable, string>
  objMap: DeepObject<CssVariableAccessor>
} => {
  const keys: Array<string[]> = []
  const keyMap: Record<CssVariable, string> = {}
  const objMap: DeepObject<CssVariableAccessor> = {}

  const leaves = (obj: DeepObject<T> | T, path: string[] = []) => {
    if (typeof obj !== 'object') {
      keys.push(path)
      const cssvar = ['--theme', ...path].join('-') as CssVariable
      keyMap[cssvar] = String(obj)
      set(objMap, path, `var(${cssvar})`)
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => leaves(obj[key], [...path, key]))
    }
  }

  leaves(obj)

  return { keys, keyMap, objMap }
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
  // const objMap: DeepObject<CssVariableAccessor> = {}
  // const cssVariablesMap: Record<CssVariableAccessor, T> = {}

  const { keyMap, objMap } = getKeyMap(obj as any)

  // leaveKeys.forEach((key) => {
  //   const joinedKey = key.join('-')
  //   const cssVariableAccessor: CssVariableAccessor = `var(--theme-${joinedKey})`
  //   set(objMap, key, cssVariableAccessor)
  // })

  return {
    obj: objMap,
    keys: keyMap
  }
}
