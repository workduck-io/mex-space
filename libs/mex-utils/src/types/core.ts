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
