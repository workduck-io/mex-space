import { customAlphabet } from 'nanoid'

import {
  SnippetCommandPrefix,
  SEPARATOR,
  NODE_ID_PREFIX,
  ID_SEPARATOR,
  WORKSPACE_ID_PREFIX,
  IG_ID_PREFIX,
  SYNC_BLOCK_ID_PREFIX,
  TEMP_ID_PREFIX,
  SNIPPET_PREFIX,
  SYNCTEMP_PREFIX,
  TODO_PREFIX,
  QUESTION_ID_PREFIX,
  REMINDER_ID_PREFIX,
  DRAFT_PREFIX
} from '../constants/prefixes'

const nolookalikes = '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz'
const nanoid = customAlphabet(nolookalikes, 21)
const shortId = customAlphabet(nolookalikes, 5)

export const getSnippetCommand = (title: string) => `${SnippetCommandPrefix}${SEPARATOR}${title}`
export const generateNodeUID = () => `${NODE_ID_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateNodeId = () => `${NODE_ID_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateWorkspaceId = () => `${WORKSPACE_ID_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateIgId = () => `${IG_ID_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateSyncBlockId = () => `${SYNC_BLOCK_ID_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateTempId = () => `${TEMP_ID_PREFIX}${ID_SEPARATOR}${shortId()}`
export const generateSnippetId = () => `${SNIPPET_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateSyncTempId = () => `${SYNCTEMP_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateTodoId = () => `${TODO_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateQuestionId = () => `${QUESTION_ID_PREFIX}${ID_SEPARATOR}${nanoid()}`
export const generateReminderId = () => `${REMINDER_ID_PREFIX}${ID_SEPARATOR}${shortId()}`

export const cleanString = (str: string) =>
  str.startsWith(`${DRAFT_PREFIX}${SEPARATOR}`) ? str.replace(`${DRAFT_PREFIX}${SEPARATOR}`, '') : str
