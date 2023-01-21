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
