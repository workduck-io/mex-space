import { NodeEditorContent, NodeMetadata, SearchRepExtra } from '@workduck-io/mex-utils/src'

import { DEFAULT_SYSTEM_TAGS } from '../constants'
import { Entities } from '../utils'

export type UpdateDocFn = (
  id: string,
  contents: NodeEditorContent,
  title: string,
  options?: {
    extra?: SearchRepExtra
    metadata?: NodeMetadata
    systemTags?: DEFAULT_SYSTEM_TAGS[]
  }
) => void

export type QueryType = 'tag' | 'mention' | 'heirarchy' | 'query' | 'text'
export interface QueryUnit {
  nextOperator?: 'and' | 'or'
  type: QueryType
  value?: string
  entities?: Entities[]
  query?: ISearchQuery
}

export type ISearchQuery = QueryUnit[]

export const a: ISearchQuery = [
  {
    type: 'tag',
    value: 'something',
    entities: [Entities.TASK, Entities.CONTENT_BLOCK],
    nextOperator: 'and'
  },
  {
    type: 'query',
    query: [
      {
        type: 'mention',
        value: 'me',
        nextOperator: 'or'
      },
      {
        type: 'mention',
        value: 'you',
        nextOperator: 'and'
      },
      {
        type: 'mention',
        value: 'else'
      }
    ],
    nextOperator: 'and'
  },
  {
    type: 'heirarchy',
    value: 'NS_123',
    nextOperator: 'or'
  },
  {
    type: 'text',
    value: 'something',
    entities: [Entities.CONTENT_BLOCK]
  },
  {
    type: 'heirarchy',
    value: 'NS_123',
    nextOperator: 'or'
  }
]

export interface HighlightMetaBlock {
  parentTagName: string
  parentIndex: number
  textOffset: number
}

export interface SaveableRange {
  startMeta: HighlightMetaBlock
  endMeta: HighlightMetaBlock
  text: string
  id: string
}

export interface Highlight {
  /**
   * ID of the highlight
   */
  entityId: string

  /**
   * Properties of the highlight
   */
  properties: {
    /**
     * Range of the highlighted content in page
     */
    saveableRange: SaveableRange
    /**
     * Source URL of the webpage on which the highlight was made
     */
    sourceUrl: string
  }

  /**
   * ID of the note where the content was added
   */
  nodeId?: string
}

export interface Link {
  url: string

  // Useful for having preview image and other metatags for the shortened link
  title: string
  description?: string
  imgSrc?: string

  /**
   * If the link is shortend it has an alias
   */
  alias?: string
  tags?: string[]

  createdAt?: number
  updatedAt?: number
}
