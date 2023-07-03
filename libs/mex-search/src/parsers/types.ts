import type { NodeEditorContent, NodeMetadata, SearchRepExtra } from '@workduck-io/mex-utils/src'

import { DEFAULT_SYSTEM_TAGS } from '../constants'
import { GLink, GNode } from '../graphX/types'
import { PartialBy } from '../types/utils'
import { Entities } from '../utils'

export type SearchTags = Array<string>

export type SuperBlocksType<Str extends string> = `super-block-${Lowercase<Str>}`

export interface GenericEntitySearchData {
  entity?: SuperBlocksType<any> | Entities
  id: string
  parent?: string
  text?: string
  title?: string
  data?: any
  tags?: SearchTags
}

export type ParserFuncResult = {
  entities: Array<PartialBy<GenericEntitySearchData, 'id'>>
  graphNodes: GNode[]
  graphLinks: GLink[]
}

export type EntityParserFn = (block: any, parentBlockID: string) => ParserFuncResult

export type NoteParserFn = (
  id: string,
  contents: NodeEditorContent,
  title: string,
  options?: {
    extra?: SearchRepExtra
    metadata?: NodeMetadata
    systemTags?: DEFAULT_SYSTEM_TAGS[]
  }
) => { entities: Array<PartialBy<GenericEntitySearchData, 'id'>>; graphNodes: GNode[]; graphLinks: GLink[] }
