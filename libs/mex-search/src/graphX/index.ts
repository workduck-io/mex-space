import type { Graph } from 'ngraph.graph'
import createGraph from 'ngraph.graph'
import toDot from 'ngraph.todot'

import { GLink, GNode, GNodeMetadata } from './types'

export class GraphX {
  _graph: Graph<GNodeMetadata, any>

  constructor() {
    this._graph = createGraph<GNodeMetadata, any>()
  }

  addNode = (node: GNode) => {
    this._graph.addNode(node.id, node.metadata)
  }

  getNode = (nodeId: string) => {
    return this._graph.getNode(nodeId)
  }

  removeNode = (nodeId: string) => {
    this._graph.removeNode(nodeId)
  }

  addLink = (from: string, to: string, data?: any) => {
    this._graph.addLink(from, to, data)
  }

  getLink = (fromId: string, toId: string) => {
    return this._graph.getLink(fromId, toId)
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

  deleteRelatedNodes = (nodeId: string, condition = (link: any) => true) => {
    const deletedNodes: string[] = []
    this._graph.getLinks(nodeId)?.forEach((link) => {
      if (condition(link)) {
        this._graph.removeNode(link.toId.toString())
        deletedNodes.push(link.toId.toString())
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

  findChildGraph(item: string, condition = (node) => true, level = 1, maxLevel = 10000) {
    if (!item || level > maxLevel) return []
    const children: any[] = []

    this._graph.forEachLinkedNode(
      item,
      (node, link) => {
        if (link.data.type === 'CHILD_LINK' && link.toId !== item) children.push(link.toId)
        else if (link.data.type === 'CHILD' && link.toId !== item) {
          if (condition(node.data)) {
            children.push(link.toId)
          }
        }
      },
      false
    )

    if (children.length > 0) {
      level++
      return [
        ...children,
        ...children
          .map((child) => {
            return this.findChildGraph(child, condition, level, maxLevel)
          })
          .flat()
      ]
    }
    return []
  }
}
