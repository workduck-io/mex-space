import { Document } from '@workduck-io/flexsearch'

import {
  BlockType,
  ILink,
  LinkCache,
  NodeContent,
  NodeEditorContent,
  NodeMetadata,
  PartialBy,
  SharedNode,
  Tag,
  TagsCache
} from './core'
import { Entities } from './entities'
import { Reminder } from './reminder'
import { Snippet } from './snippet'
import { TodosType } from './tasks'

export interface PersistentData {
  baseNodeId: string
  ilinks: ILink[]
  tags: Tag[]
  contents: {
    [key: string]: NodeContent
  }

  linkCache: LinkCache
  tagsCache: TagsCache

  archive: ILink[]
  bookmarks: string[]

  todos: TodosType
  reminders: Reminder[]
  snippets: Snippet[]
  sharedNodes: SharedNode[]
}

export interface GenericSearchData {
  id: string
  blockId?: string
  title?: string
  text: string
  data?: any
  tag?: string[]
}

export interface SearchIndex {
  node: Document<GenericSearchData> | null
  snippet: Document<GenericSearchData> | null
  archive: Document<GenericSearchData> | null
  template: Document<GenericSearchData> | null
  shared: Document<GenericSearchData> | null
}

export interface GenericSearchResult {
  id: string
  blockId?: string
  title?: string
  text?: string
  data?: any
  matchField?: string[]
  tag?: string[]
  index?: idxKey
}

/** Search Replacements Extra
 * For blocks with types that match the keys, they are replaced with text given by the replacement value
 */
export interface SearchRepExtra {
  /** Type of the block
   And a key value pair of what to replace at that id
   */
  [type: string]: {
    /** The key of the block used to index replacements */
    keyToIndex: string
    /** replacements for the block text that is keyed by keyToIndex */
    replacements: Record<string, string>
  }
}

export type idxKey = keyof SearchIndex

export type SearchOptions = {
  tags?: Array<string>
  searchFields?: Record<idxKey, Array<string>>
}

// export interface GenericSearchData {
//   id: string
//   blockId?: string
//   title?: string
//   text: string
//   data?: any
//   tag?: string[]
// }

export type AssociatedEntities = string[]

export interface GenericEntitySearchData {
  entity: Entities
  id: string
  text?: string
  title?: string
  data?: any // eslint-disable-line @typescript-eslint/no-explicit-any
  associatedEntities?: AssociatedEntities
}

export type ParserFuncResult = {
  associatedEntities?: AssociatedEntities
  entities?: Array<PartialBy<GenericEntitySearchData, 'id'>>
}

export type EntityParserFn = (block: any, extra?: SearchRepExtra) => ParserFuncResult

export type NodeParserFn = (
  nodeId: string,
  contents: NodeEditorContent,
  title: string,
  extra?: SearchRepExtra,
  nodeMetadata?: NodeMetadata
) => GenericEntitySearchData[]
