import { ILink } from './core'

export interface ParsedNamespaceHierarchy {
  name: string
  hierarchy: ILink[]
}

export type AllNamespaceHierarchyResponse = { namespaceInfo: Record<string, { name: string; hierarchy: string[] }> }
export type ParsedAllNamespacesHierarchy = Record<string, ParsedNamespaceHierarchy>
