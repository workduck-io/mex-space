import type { Graph } from 'ngraph.graph'
import createGraph from 'ngraph.graph'
import toDot from 'ngraph.todot'

import { ILink } from '@workduck-io/mex-utils/src'

import { GLink, GNode, GNodeMetadata } from '../types/graph'
import { Entities } from '../utils'

class GraphX {
  _graph: Graph<GNodeMetadata, any>

  constructor() {
    this._graph = createGraph<GNodeMetadata, any>()
  }

  addNode = (node: GNode) => {
    this._graph.addNode(node.id, node.metadata)
  }

  removeNode = (nodeId: string) => {
    this._graph.removeNode(nodeId)
  }

  addLink = (from: string, to: string, data?: any) => {
    this._graph.addLink(from, to, data)
  }

  removeLink = (from: string, to: string) => {
    //@ts-ignore
    this._graph.removeLink(from, to)
  }

  getRelatedNodes = (nodeId: string, condition = (node: any) => true) => {
    const results: GNode[] = []
    this._graph.forEachLinkedNode(
      nodeId,
      (node) => {
        if (condition(node.data)) {
          results.push({ id: node.id as string, metadata: node.data })
        }
      },
      false
    )
    return results
  }

  deleteRelatedNodes = (nodeId: string, condition = (linkData: any) => true) => {
    const deletedNodes: string[] = []
    this._graph.getLinks(nodeId)?.forEach((link) => {
      if (condition(link.data)) {
        deletedNodes.push(link.toId.toString())
        this._graph.removeNode(link.toId)
      }
    })
    return deletedNodes
  }

  exportToDot = () => {
    return toDot(this._graph)
  }

  addEntities = (graphNodes: GNode[]) => {
    graphNodes.forEach((gNode) => this.addNode(gNode))
  }

  addLinks = (graphLinks: GLink[]) => {
    graphLinks.forEach((gLink) => this.addLink(gLink.from, gLink.to, gLink.metadata))
  }

  initializeHierarchy = (ilinks: ILink[]) => {
    ilinks.forEach((ilink) =>
      this.addNode({ id: ilink.nodeid, metadata: { type: Entities.NOTE, parentID: ilink.parentNodeId } })
    )
  }

  findChildGraph(item, maxLevel = 100000) {
    function findChildrenRec(graph, item, level, maxLevel) {
      if (!item || level > maxLevel) return []
      const children: any[] = []
      graph.forEachLinkedNode(
        item,
        function (linkedNode) {
          if (linkedNode.data.type === 'CHILD') children.push(linkedNode.id)
        },
        true // enumerate only outbound links
      )
      if (children.length > 0) {
        level++

        return [...children, ...children.map((child) => findChildrenRec(graph, child, level, maxLevel)).flat()]
      }
      return []
    }
    return findChildrenRec(this._graph, item, 1, maxLevel)
  }
}

export default GraphX
