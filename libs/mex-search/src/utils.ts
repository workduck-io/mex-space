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
  ILINK = 'ILINK'
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
