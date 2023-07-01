export interface GNodeMetadata {
  type: string
  parentID?: string
  title?: string
  value?: string
  alias?: string
  origin?: string
  properties?: any
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
