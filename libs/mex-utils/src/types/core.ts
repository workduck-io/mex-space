import { ElementHighlightMetadata } from './highlight'
import { AccessLevel } from './mentions'
import { PriorityType, TodoStatus } from './tasks'

export const iconTypes = ['URL', 'ICON', 'EMOJI', 'MEX'] as const
// M stands for Multi/Mex/Many (yet to decide)
export interface MIcon {
  type: (typeof iconTypes)[number]
  value: string
}

export interface ILink {
  /** Unique Identifier */
  nodeid: string

  /** The title of the node.
   * Uses separator for heirarchy */
  path: string

  namespace: string

  /** Iconify Icon string */
  icon?: MIcon

  createdAt?: number
  updatedAt?: number

  parentNodeId?: string
}

export interface Tag {
  value: string
}

export interface NodeContent {
  type: string
  content: NodeEditorContent
  version?: number
  metadata?: NodeMetadata
}

export interface NodeMetadata {
  createdBy: string
  createdAt: number
  lastEditedBy: string
  updatedAt: number

  elementMetadata?: ElementHighlightMetadata
}

export interface Tag {
  value: string
}

export interface SuperBlockContent {
  type: string
  id: string
  properties: {
    entity?: {
      active: string
      values: Record<
        string,
        {
          id?: string
          parent?: string
        }
      >
    }
    title?: string
    tags?: Tag[]
    template?: Record<string, any[]>
    [key: string]: any
  }
  metadata: {
    updatedBy: string
    updatedAt: number
    createdBy: string
    createdAt: number
    title: string
  }
  children: any[]
}

export type NodeEditorContent = any[]

export interface InitData extends InitDataStoreType {
  contents: Record<string, NodeContent>
}

export interface InitDataStoreType {
  tags: Tag[]
  ilinks: ILink[]
  linkCache: LinkCache
  tagsCache: TagsCache
  archive: ILink[]
  baseNodeId: string
}

export type LinkCache = Record<string, CachedILink[]>
export type TagsCache = Record<string, CacheTag>

export interface CachedILink {
  // ILink from/to path
  type: 'from' | 'to'
  nodeid: string
}

export interface CacheTag {
  nodes: string[]
}

type UserID = string
export interface SharedNode extends ILink {
  currentUserAccess: AccessLevel
  sharedBy: UserID
  owner: UserID
}

export type BlockMetaDataType = {
  source?: string // * NodeId or Website URL
  origin?: string
}

export type BlockType = {
  id: string
  children: BlockType[]
  type: string
  text?: string
  blockMeta?: BlockMetaDataType
  metadata?: any
  value?: string
  status?: TodoStatus
  priority?: PriorityType
  url?: string
  caption?: Array<{ text: string }>
}

export interface NamespaceInfo {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  itemType: string // Always going to be 'Namespace'
  nodeHierarchy: string[]
  publicAccess: boolean
}
