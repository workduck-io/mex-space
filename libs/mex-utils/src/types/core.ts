import { ElementHighlightMetadata } from './highlight'
import { AccessLevel } from './mentions'

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface ILink {
  /** Unique Identifier */
  nodeid: string

  /** The title of the node.
   * Uses separator for heirarchy */
  path: string

  /** Iconify Icon string */
  icon?: string

  createdAt?: number

  parentNodeId?: string
}

export interface Tag {
  id: string
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

export type NodeEditorContent = any[]

export interface InitData extends InitDataStoreType {
  contents: Record<string, NodeContent>
}

export interface InitDataStoreType {
  tags: Tag[]
  ilinks: ILink[]
  linkCache: LinkCache
  tagsCache: TagsCache
  bookmarks: string[]
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
  value?: string
  url?: string
  blockMeta?: BlockMetaDataType
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
