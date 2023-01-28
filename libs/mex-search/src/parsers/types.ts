import { NodeEditorContent, NodeMetadata, SearchRepExtra } from '@workduck-io/mex-utils/src/types'

import { DEFAULT_SYSTEM_TAGS } from '../constants'
import { GNode } from '../types/graph'
import { PartialBy } from '../types/utils'
import { Entities } from '../utils'

export type SearchTags = Array<string>

export interface GenericEntitySearchData {
  entity?: Entities
  id: string
  text?: string
  title?: string
  data?: any
  tags?: SearchTags
}

export type ParserFuncResult = {
  entities: Array<PartialBy<GenericEntitySearchData, 'id'>>
  graphNodes: GNode[]
}

export type EntityParserFn = (block: any, parentBlockID?: string) => ParserFuncResult

export type NoteParserFn = (
  id: string,
  contents: NodeEditorContent,
  title: string,
  options?: {
    extra?: SearchRepExtra
    metadata?: NodeMetadata
    systemTags?: DEFAULT_SYSTEM_TAGS[]
  }
) => { entities: Array<PartialBy<GenericEntitySearchData, 'id'>>; graphNodes: GNode[] }
