import FlexSearch from 'flexsearch/dist/flexsearch.es5.js'

import { NodeEditorContent, NodeMetadata, SearchRepExtra } from '@workduck-io/mex-utils/src'

import { GenericEntitySearchData, ParserFuncResult } from './parsers/types'
import { FilterQuery, SearchQuery } from './types/query'
import { DEFAULT_SYSTEM_TAGS } from './constants'
import GraphX from './graphX'
import EntityParser from './parsers'
import { intersectMultiple, unionMultiple } from './utils'

type UpdateDocFn = (
  id: string,
  contents: NodeEditorContent,
  title: string,
  options?: {
    extra?: SearchRepExtra
    metadata?: NodeMetadata
    systemTags?: DEFAULT_SYSTEM_TAGS[]
  }
) => void

class SearchX {
  _graphX: GraphX
  _index: FlexSearch.FlexSearch.Document<GenericEntitySearchData, string[]>

  constructor(
    flexSearchOptions: FlexSearch.FlexSearch.IndexOptionsForDocumentSearch<GenericEntitySearchData, string[]> = {
      document: {
        id: 'id',
        index: ['title', 'text'],
        store: ['text', 'data', 'tags'],
        tag: 'tags'
      },
      tokenize: 'full'
    }
  ) {
    this._index = new FlexSearch.FlexSearch.Document<GenericEntitySearchData, string[]>(flexSearchOptions)
    this._graphX = new GraphX()
  }

  initializeSearch = (parserResult: ParserFuncResult) => {
    parserResult.entities.forEach((item) => this._index.add(item))
    this._graphX.addEntities(parserResult.graphNodes)
    this._graphX.addLinks(parserResult.graphLinks)
  }

  filter = (options?: FilterQuery, results: any[] = []) => {
    if (!options) return []
    const { query, operator, tag, heirarchy, mention } = options
    if (query) {
      results.push(this.filter(query, []).flat())
    }
    if (tag) {
      tag.forEach((t) => results.push(this._graphX.getRelatedNodes(t).map((n) => n.id)))
    }
    if (mention) {
      mention.forEach((m) => results.push(this._graphX.getRelatedNodes(m).map((m) => m.id)))
    }
    if (heirarchy) {
      heirarchy.forEach((h) => results.push(this._graphX.findChildGraph(h).map((h) => h.id)))
    }
    if (operator === 'or') return unionMultiple(...results)

    return intersectMultiple(...results)
  }

  search = (searchOptions: SearchQuery, filterOptions?: FilterQuery) => {
    let filtered
    if (filterOptions) {
      filtered = this.filter(filterOptions)
    }
    return this._index
      .search(searchOptions.text, {
        enrich: true,
        index: 'text',
        tag: [...(searchOptions.entityTypes ?? []), ...(filtered ?? [])],
        bool: 'or'
      })[0]
      .result.filter((item) => {
        if (filtered) return filtered.includes(item.id)
        return true
      })
  }

  addOrUpdateDocument: UpdateDocFn = (id: string, contents: NodeEditorContent, title = '', options) => {
    const parser = new EntityParser()
    const parsedBlocks = parser.noteParser(id, contents, title, options)
    const deletedBlocks = this._graphX.deleteRelatedNodes(id)
    deletedBlocks.forEach((id) => this._index.remove(id))
    this._index.add(parsedBlocks.entities)
    this._graphX.addEntities(parsedBlocks.graphNodes)
    this._graphX.addLinks(parsedBlocks.graphLinks)
  }
}

export default SearchX
