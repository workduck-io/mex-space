import { Entities } from '../utils'

export interface GNodeMetadata {
  type: Entities
  parentID?: string
  title?: string
  value?: string
  alias?: string
  origin?: string
}

export interface GNode {
  id: string
  metadata: GNodeMetadata
}

export interface GLink {
  to: string
  from: string
  metadata: GLinkMetadata
}

export type GLinkMetadata = any
