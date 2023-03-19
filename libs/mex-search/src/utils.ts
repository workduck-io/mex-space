import { ILink } from '@workduck-io/mex-utils'

import { KEY_DELIMITER } from './constants'

export enum Entities {
  TAG = 'TAG',
  MENTION = 'MENTION',
  TASK = 'TASK',
  REMINDER = 'REMINDER',
  ACTION = 'ACTION',
  CONTENT_BLOCK = 'CONTENT_BLOCK',
  NOTE = 'NOTE',
  SNIPPET = 'SNIPPET',
  TEMPLATE = 'TEMPLATE',
  LINK = 'LINK',
  IMAGE = 'IMAGE',
  EXCALIDRAW = 'EXCALIDRAW',
  ILINK = 'ILINK',
  NAMESPACE = 'NAMESPACE',
  URLLINK = 'URLLINK',
  HIGHLIGHT = 'HIGHLIGHT'
}

export enum Indexes {
  SNIPPET = 'SNIPPET',
  MAIN = 'MAIN'
}

export const createIndexCompositeKey = (nodeID: string, blockID: string) => {
  return `${nodeID}${KEY_DELIMITER}${blockID}`
}

//function for intersection of multiple arrays
export const intersectMultiple = (...arrays) => {
  return arrays.reduce((a, b) => intersect(a, b))
}

//function for union of multiple arrays
export const unionMultiple = (...arrays) => {
  return arrays.reduce((a, b) => union(a, b))
}

//function for intersecting arrays
const intersect = (a, b) => {
  const s = new Set(b)
  return a.filter((x) => s.has(x))
}

//function for union of arrays
const union = (a, b) => {
  const s = new Set(b)
  a.forEach((x) => s.add(x))
  return [...s]
}

export const parentList = (path) => {
  return path.split('.').slice(0, -1).join('.')
}

export const getNodeParent = (iLink: ILink, iLinks: ILink[]) => {
  const parentPath = parentList(iLink.path)
  if (!parentPath) return iLink.namespace

  const parent = iLinks.find((n) => n.path === parentPath && iLink.namespace === n.namespace)
  return parent?.nodeid
}
