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

export interface FilterQuery {
  query?: FilterQuery
  operator?: 'and' | 'or'
  tag?: string[]
  mention?: string[]
  heirarchy?: string[]
}

export interface SearchQuery {
  text: string
  entityTypes?: Entities[]
}
