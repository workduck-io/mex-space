import { ILink } from '../types/core'
import { NamespaceHierarchy, NamespaceHierarchyInfo, ParsedNamespaceHierarchy } from '../types/hierarchy'

export const hierarchyParser = (
  linkData: string[],
  options?: { withParentNodeId: boolean; allowDuplicates?: boolean }
): ILink[] => {
  const ilinks: ILink[] = []
  const idPathMapping: { [key: string]: string } = {}
  const pathIdMapping: { [key: string]: { nodeid: string; index: number } } = {}

  for (const subTree of linkData) {
    const nodes = subTree.split('#')

    let prefix: string | undefined
    let parentNodeId: string | undefined

    if (nodes.length % 2 !== 0) throw new Error('Invalid Linkdata Input')

    for (let index = 0; index < nodes.length; index += 2) {
      const nodeTitle = nodes[index]
      const nodeID = nodes[index + 1]

      const nodePath = prefix ? `${prefix}.${nodeTitle}` : nodeTitle

      /*
            Drafts.A and Drafts.B exist, we need to check if the Drafts parent node is the same by checking
            the parent nodeUID. This handles the case in which a nodeID might have two different node paths. 
   
            We still do not handle the case where there are 2 nodes with the same path but different Node IDs,
            we handle that on the frontend for now
          */

      if (idPathMapping[nodeID]) {
        if (idPathMapping[nodeID] !== nodePath) {
          const ilinkAt = ilinks?.findIndex((ilink) => ilink.nodeid === nodeID)

          if (ilinkAt) {
            ilinks.splice(ilinkAt, 1, { ...ilinks[ilinkAt], path: nodePath })
          }
        }
      } else if (pathIdMapping[nodePath] && !options?.allowDuplicates) {
        // mog(`Found existing notePath: ${nodePath} with ${nodeID} at index: ${pathIdMapping[nodePath].index}`)
        ilinks[pathIdMapping[nodePath].index] = { nodeid: nodeID, path: nodePath }
      } else {
        // mog(`Inserting: ${nodePath} with ${nodeID} at index: ${ilinks.length}`)
        idPathMapping[nodeID] = nodePath
        pathIdMapping[nodePath] = { nodeid: nodeID, index: ilinks.length }
        const ilink: ILink = { nodeid: nodeID, path: nodePath }
        ilinks.push(options?.withParentNodeId ? { ...ilink, parentNodeId } : ilink)
      }

      prefix = nodePath
      parentNodeId = nodeID
    }
  }

  return ilinks
}

type NamespaceHierarchyParserFn = (
  namespaceInfo: NamespaceHierarchyInfo,
  options?: { withParentNodeId: boolean; allowDuplicates?: boolean }
) => Record<string, ParsedNamespaceHierarchy>

export const namespaceHierarchyParser: NamespaceHierarchyParserFn = (namespaceInfo, options) => {
  const parsedNSHierarchy: Record<string, ParsedNamespaceHierarchy> = {}
  Object.entries(namespaceInfo).forEach(([namespaceID, namespaceValue]) => {
    const nHierarchy = hierarchyParser(namespaceValue.hierarchy, options)
    parsedNSHierarchy[namespaceID] = { name: namespaceValue.name, hierarchy: nHierarchy }
  })

  return parsedNSHierarchy
}
