import { ILink } from './core'

export interface NamespaceHierarchy {
  name: string
  hierarchy: string[]
}

export interface ParsedNamespaceHierarchy {
  name: string
  hierarchy: ILink[]
}

export type NamespaceHierarchyInfo = Record<string, NamespaceHierarchy>
