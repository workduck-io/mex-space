import { trim } from 'lodash-es'

import { DRAFT_NODE, SEPARATOR } from '../constants/prefixes'

export const capitalize = (str: string) => {
  if (!str) return ''
  return str[0].toUpperCase() + str.slice(1)
}

export const camelCase = (str: string) => {
  return str[0].toUpperCase() + str.slice(1).toLowerCase()
}

export const titleCaseUnderScore = (str: string) => {
  return str.split('_').map(camelCase).join(' ')
}

export const checkIfUntitledDraftNode = (path: string) => {
  if (!path) return

  const pathParts = path.split(SEPARATOR)
  const length = pathParts.length

  if (length > 1) {
    // const parent = pathParts.at(0)
    const child = pathParts.at(-1)

    const isUntitled = child?.startsWith(DRAFT_NODE)
    return isUntitled
  }

  return false
}

export const NODE_PATH_SPACER = ' '
export const NODE_PATH_WORD_LENGTH = 5
export const NODE_PATH_CHAR_LENGTH = 40

export const getSlug = (text: string, charLength = NODE_PATH_CHAR_LENGTH, wordLength = NODE_PATH_WORD_LENGTH) =>
  // trims leading and trailing spacers
  trim(
    text
      // Replace all non-alphanumeric characters with spacer
      .replace(/[\W_]+/g, NODE_PATH_SPACER)
      // Split on spacer
      .split(NODE_PATH_SPACER)
      // Remove empty texts and repeated uses of spacer
      .filter((t) => t !== '')
      // Slice till the allowed limit
      .slice(0, wordLength)
      // Join
      .join(NODE_PATH_SPACER),
    NODE_PATH_SPACER
    // Slice till the allowed limit
  ).slice(0, charLength)
