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

  getRelatedNodes = (nodeId: string, condition = (linkData: any) => true) => {
    const results: GNode[] = []
    this._graph.getLinks(nodeId)?.forEach((link) => {
      if (condition(link.data)) {
        const connectedNode = this._graph.getNode(link.toId)
        if (connectedNode) results.push({ id: connectedNode.id as string, metadata: connectedNode.data })
      }
    })
    return results
  }

  deleteRelatedNodes = (nodeId: string, condition = (linkData: any) => true) => {
    this._graph.getLinks(nodeId)?.forEach((link) => {
      if (condition(link.data)) {
        this._graph.removeNode(link.toId)
      }
    })
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
}

export default GraphX
