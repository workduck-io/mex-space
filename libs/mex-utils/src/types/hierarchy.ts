import { ILink } from './core'

export interface ParsedNamespaceHierarchy {
  name: string
  nodeHierarchy: ILink[]
}

export type AllNamespaceHierarchyResponse = { namespaceInfo: Record<string, { name: string; nodeHierarchy: string[] }> }
export type ParsedAllNamespacesHierarchy = Record<string, ParsedNamespaceHierarchy>
