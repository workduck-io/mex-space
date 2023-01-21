import createGraph, { type Graph } from 'ngraph.graph'
import toDot from 'ngraph.todot'

import { ILink } from '@workduck-io/mex-utils/src'

import { GNode, GNodeMetadata } from '../types/graph'
import { Entities } from '../utils'

class GraphX {
  _graph: Graph<GNodeMetadata, any>

  constructor() {
    this._graph = createGraph<GNodeMetadata, any>()
  }

  addNode = (node: GNode) => {
    this._graph.addNode(node.id, node.metadata)
    if (node.metadata.parentID) {
      this._graph.addLink(node.id, node.metadata.parentID)
    }
  }

  addLink = (from: string, to: string, data?: any) => {
    this._graph.addLink(from, to, data)
  }

  exportToDot = () => {
    return toDot(this._graph)
  }

  addEntities = (graphNodes: GNode[]) => {
    graphNodes.forEach((gNode) => this.addNode(gNode))
  }

  initializeHierarchy = (ilinks: ILink[]) => {
    ilinks.forEach((ilink) =>
      this.addNode({ id: ilink.nodeid, metadata: { type: Entities.NOTE, parentID: ilink.parentNodeId } })
    )
  }
}

export default GraphX
