import { SEPARATOR } from '../constants/prefixes'

export const sampleFlatTree = [
  '@',
  'docs',
  'dev',
  'dev.big',
  'dev.big.small',
  'dev.git',
  'dev.js',
  'pro',
  'pro.mex',
  'pro.mex.issues',
  'com',
  'com.workduck'
]

export const getParentNodePath = (path: string, separator = SEPARATOR) => {
  const lastIndex = path.lastIndexOf(separator)
  if (lastIndex === -1) return null
  return path.slice(0, lastIndex)
}

/** Also includes the ID of the final node */
/**
    id = a.b.c
    link = [a b c]
    a, a.b, a.b.c
  */
export const getAllParentIds = (
  id: string, // const allParents: string[] = []
  separator = SEPARATOR
) => {
  if (!id) return []

  return id
    ?.split(separator) // split by default separator `.`
    ?.reduce(
      // Use prefix of last element when the array has elements
      (p: any[], c) => [...p, p.length > 0 ? `${p[p.length - 1]}${separator}${c}` : c],
      []
    )
}

export const isElder = (id: string, xparent: string) => {
  return id?.startsWith(xparent + SEPARATOR)
}

export const isParent = (id: string, parent: string) => {
  return getParentNodePath(id) === parent
}

export const isTopNode = (id: string) => {
  return getParentNodePath(id) === null
}

export const getParentFromPath = (id: string) => {
  if (!id) return []

  const split = id.split(SEPARATOR)
  if (split.length > 1) {
    split.pop()
    return split.join(SEPARATOR)
  }
  return undefined
}

export const getNameFromPath = (id: string) => {
  const split = id.split(SEPARATOR)
  if (split.length > 1) return split[split.length - 1]
  return id
}
// export default generateTree(sampleFlatTree)
