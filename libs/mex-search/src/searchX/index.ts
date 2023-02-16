import FlexSearch from 'flexsearch/dist/flexsearch.es5.js'

import { NodeEditorContent } from '@workduck-io/mex-utils/src'

import GraphX from '../graphX'
import EntityParser from '../parsers'
import { GenericEntitySearchData } from '../parsers/types'
import { Entities, intersectMultiple, parentList, unionMultiple } from '../utils'

import { FilterQuery, SearchQuery, UpdateDocFn } from './types'

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

  initializeSearch = (ilinks, highlights, links) => {
    this.initializeHeirarchy(ilinks)
    this.initializeHighlights(highlights)
    this.initializeLinks(links)
  }

  initializeLinks = (links: any[]) => {
    links.forEach((link) => {
      this._graphX.addNode({ id: link.id, metadata: { type: Entities.URLLINK, ...link } })

      this._index.add({
        id: link.id,
        data: link,
        entity: Entities.URLLINK,
        content: link.url,
        tag: [Entities.URLLINK]
      })
    })
  }

  initializeHighlights = (highlights: any[]) => {
    highlights.forEach((highlight) => {
      this._graphX.addNode({ id: highlight.id, metadata: { type: Entities.HIGHLIGHT, ...highlight } })
      this._graphX.addLink(highlight.url, highlight.id, { type: Entities.HIGHLIGHT })
      this._index.add({
        id: highlight.id,
        data: highlight,
        entity: Entities.HIGHLIGHT,
        content: highlight.text,
        tag: [Entities.HIGHLIGHT]
      })
    })
  }

  initializeHeirarchy = (ilinks: any[]) => {
    ;[...new Set(ilinks.map((il) => il.namespace))].forEach((namespace) => {
      this._graphX.addNode({ id: namespace, metadata: { type: Entities.NAMESPACE } })
      this._index.add({
        id: namespace,
        data: { namespace },
        entity: Entities.NAMESPACE,
        content: namespace,
        tag: [Entities.NAMESPACE]
      })
    })

    ilinks.forEach((ilink, i) => {
      const parentId =
        ilinks.find((il) => il.path === parentList(ilink.path) && ilink.namespace === il.namespace)?.nodeid ??
        ilink.namespace
      this._graphX.addNode({
        id: ilink.nodeid,
        metadata: {
          title: ilink.path.split('.').splice(-1)[0],
          type: Entities.NOTE
        }
      })
      this._index.add({
        id: ilink.nodeid,
        content: ilink.path.split('.').splice(-1)[0],
        parent: parentId,
        entity: Entities.NOTE,
        tag: parentId ? [ilink.namespace, parentId] : [ilink.namespace]
      })

      this._graphX.addLink(parentId, ilink.nodeid, { type: 'CHILD' })
    })
  }

  filter = (options?: FilterQuery, results: any[] = []) => {
    if (!options) return []
    const { query, operator, tag, heirarchy, mention } = options
    if (query) {
      results.push(this.filter(query, []).flat())
    }

    if (tag) {
      tag.forEach((t) => results.push(this._graphX.getRelatedNodes(t).map((n) => `TAG_${n.id}`)))
    }

    if (mention) {
      mention.forEach((m) => results.push(this._graphX.getRelatedNodes(m).map((m) => `USER_${m.id}`)))
    }

    if (heirarchy) {
      heirarchy.forEach((h) => {
        results.push(this._graphX.findChildGraph(h))
      })
    }

    if (operator === 'or') return unionMultiple(...results)

    return intersectMultiple(...results)
  }

  search = (searchOptions?: SearchQuery, filterOptions?: FilterQuery) => {
    let filtered
    if (filterOptions) {
      filtered = this.filter(filterOptions)
    }
    const tag = [...(searchOptions?.entityTypes ?? Object.values(Entities)), ...(filtered ?? [])]

    const preFilteredResults = this._index
      .search(searchOptions?.text ?? '', {
        enrich: true,
        index: 'text',
        tag,
        bool: 'or'
      })
      .reduce((acc, curr) => {
        return [...acc, ...(curr?.result ?? [])]
      }, [])

    return preFilteredResults?.filter((item) => {
      if (filtered) return filtered.includes(item.id)
      return true
    })
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

export default SearchX
