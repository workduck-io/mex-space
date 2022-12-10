import { set } from 'lodash'

import { CssVariable, CssVariableAccessor } from './types/theme'

export function hex2rgb(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16)
  const g = parseInt(hex.substring(3, 5), 16)
  const b = parseInt(hex.substring(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

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

const convertToVar = (path: string[]) => ['--theme', ...path].join('-') as CssVariable

export const getKeyMap = <T>(
  obj: DeepObject<T>,
  convertToVar: (path: string[]) => CssVariable,
  convertValue: (value: T) => T | undefined
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
      const value = String(convertValue(obj))
      const cssvar = convertToVar(path)
      if (value) {
        keyMap[cssvar] = value
        set(objMap, path, `var(${cssvar})`)
      }
    } else if (typeof obj === 'object' && obj !== null) {
      Object.keys(obj).forEach((key) => leaves(obj[key], [...path, key]))
    }
  }

  leaves(obj)

  return { keys, keyMap, objMap }
}

export const keyConverter = <T>(
  obj: DeepObject<T>,
  addRGB = false
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

  const { keyMap, objMap } = getKeyMap(obj as any, convertToVar, (v) => v)

  if (addRGB) {
    const { keyMap: rgbKeyMap, objMap: rgbObjMap } = getKeyMap(
      obj as any,
      (path) => {
        const cssvar = convertToVar(path)
        return `${cssvar}-rgb` as CssVariable
      },
      (v: string) => {
        if (v.startsWith('#')) {
          return hex2rgb(v)
        } else return undefined
      }
    )
    return {
      obj: rgbObjMap,
      keys: rgbKeyMap
    }
  }

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
