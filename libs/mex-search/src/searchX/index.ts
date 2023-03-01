import FlexSearch from 'flexsearch/dist/flexsearch.es5.js'

import { ILink, NodeEditorContent } from '@workduck-io/mex-utils'

import { GraphX } from '../graphX'
import { EntityParser } from '../parsers'
import { GenericEntitySearchData } from '../parsers/types'
import { Entities, intersectMultiple, unionMultiple } from '../utils'

import { Highlight, ISearchQuery, Link, QueryUnit, UpdateDocFn } from './types'

export class SearchX {
  _graphX: GraphX
  _index: FlexSearch.FlexSearch.Document<GenericEntitySearchData, string[]>

  constructor(
    flexSearchOptions: FlexSearch.FlexSearch.IndexOptionsForDocumentSearch<GenericEntitySearchData, string[]> = {
      document: {
        id: 'id',
        index: ['title', 'text'],
        store: ['text', 'data', 'entity', 'parent', 'tags'],
        tag: 'tags'
      },
      tokenize: 'full'
    }
  ) {
    this._index = new FlexSearch.FlexSearch.Document<GenericEntitySearchData, string[]>(flexSearchOptions)
    this._graphX = new GraphX()
  }

  initializeSearch = (
    ilinks: ILink[],
    highlights: Highlight[],
    links: Link[],
    contents: { [nodeid: string]: NodeEditorContent }
  ) => {
    this.initializeHeirarchy(ilinks)
    this.initializeLinks(links)
    this.initializeHighlights(highlights)
    this.initializeContent(contents)
  }

  initializeLinks = (links: Link[]) => {
    links.forEach((link) => {
      this._graphX.addNode({ id: link.url, metadata: { type: Entities.URLLINK, ...link } })

      this._index.add({
        id: link.url,
        data: link,
        entity: Entities.URLLINK,
        title: link.title,
        text: link?.alias ?? '' + ' ' + link?.description,
        tag: [Entities.URLLINK]
      })
    })
  }

  initializeHighlights = (highlights: Highlight[]) => {
    highlights.forEach((highlight) => {
      this._graphX.addNode({ id: highlight.entityId, metadata: { type: Entities.HIGHLIGHT, ...highlight } })
      this._graphX.addLink(highlight.properties.sourceUrl, highlight.entityId, { type: Entities.HIGHLIGHT })
      this._index.add({
        id: highlight.entityId,
        data: highlight,
        entity: Entities.HIGHLIGHT,
        text: highlight.properties.saveableRange.text,
        tag: [Entities.HIGHLIGHT]
      })
    })
  }

  initializeHeirarchy = (ilinks: ILink[]) => {
    ;[...new Set(ilinks.map((il) => il.namespace))].forEach((namespace) => {
      this._graphX.addNode({ id: namespace, metadata: { type: Entities.NAMESPACE } })
      this._index.add({
        id: namespace,
        data: { namespace },
        entity: Entities.NAMESPACE,
        text: namespace,
        tag: [Entities.NAMESPACE]
      })
    })

    ilinks.forEach((ilink, i) => {
      const parentId = ilink.parentNodeId ?? ilink.namespace
      this._graphX.addNode({
        id: ilink.nodeid,
        metadata: {
          title: ilink.path.split('.').splice(-1)[0],
          type: Entities.NOTE
        }
      })
      this._index.add({
        id: ilink.nodeid,
        text: ilink.path.split('.').splice(-1)[0],
        parent: parentId,
        entity: Entities.NOTE,
        tag: parentId ? [ilink.namespace, parentId] : [ilink.namespace]
      })

      this._graphX.addLink(parentId, ilink.nodeid, { type: 'CHILD' })
    })
  }

  initializeContent = (contents: { [nodeid: string]: NodeEditorContent }) => {
    Object.entries(contents).forEach(([k, v]) => {
      this.addOrUpdateDocument(k, v, '')
    })
  }

  eval(opt: QueryUnit) {
    const condition = (node) => {
      if (opt.entities) return opt.entities.includes(node.type)
      return true
    }
    switch (opt.type) {
      case 'tag':
        return this._graphX.getRelatedNodes(opt.value!, condition).map((n) => n.id)
      case 'mention':
        return this._graphX.getRelatedNodes(opt.value!, condition).map((n) => n.id)
      case 'heirarchy':
        return this._graphX.findChildGraph(opt.value!, condition)
      case 'text':
        return this._index
          .search(opt.value ?? '', {
            index: 'text',
            tag: opt.entities ?? Object.values(Entities),
            bool: 'or'
          })
          .reduce((acc, curr) => {
            return [...acc, ...(curr?.result ?? [])]
          }, [])
      case 'query':
        return this.search(opt.query!, false)
      default:
        return []
    }
  }

  search = (options: ISearchQuery, expand = true) => {
    let result: any[]
    let prevOperator = 'and'
    options.forEach((qu) => {
      if (!result) {
        result = this.eval(qu)
      } else {
        const join = prevOperator === 'and' ? intersectMultiple : unionMultiple
        result = join(result, this.eval(qu))
      }
      prevOperator = qu.nextOperator ?? 'and'
    })

    if (expand) return result.map((item) => this._index.get(item))
    return result
    //
  }

  addOrUpdateDocument: UpdateDocFn = (id: string, contents: NodeEditorContent, title = '', options) => {
    const parser = new EntityParser()
    const parsedBlocks = parser.noteParser(id, contents, title, options)
    const deletedBlocks = this._graphX.deleteRelatedNodes(id, (link) => link.data.type == 'CHILD')
    deletedBlocks.forEach((id) => this._index.remove(id))
    parsedBlocks.entities.forEach((item) => this._index.add(item))

    this._graphX.addEntities(parsedBlocks.graphNodes)
    this._graphX.addLinks(parsedBlocks.graphLinks)
  }

  appendToDoc: UpdateDocFn = (id: string, contents: NodeEditorContent, title = '', options) => {
    const parser = new EntityParser()
    if (!this._graphX.getNode(id)) return
    const parsedBlocks = parser.noteParser(id, contents, title, options)
    parsedBlocks.entities.forEach((item) => this._index.add(item))

    this._graphX.addEntities(parsedBlocks.graphNodes)
    this._graphX.addLinks(parsedBlocks.graphLinks)
  }

  moveBlocks = (fromId: string, toId: string, blockIds: string[]) => {
    blockIds.forEach((blockId) => this._graphX.removeLink(fromId, blockId))
    blockIds.forEach((blockId) => this._graphX.addLink(toId, blockId, { type: 'CHILD' }))
    blockIds.forEach((blockId) => {
      const { tags, ...rest } = this._index.get(blockId)
      this._index.update(blockId, { ...rest, tags: tags.filter((t: string) => t !== fromId).concat(toId) })
    })
  }

  deleteDocument = (id: string) => {
    const deletedBlocks = this._graphX.deleteRelatedNodes(id, (link) => {
      return link.data?.type === 'CHILD'
    })

    deletedBlocks.forEach((id) => this._index.remove(id))
  }
}
