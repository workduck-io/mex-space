import { Document, IndexOptionsForDocumentSearch } from '@workduck-io/flexsearch'
import { ILink, InitData } from '@workduck-io/mex-utils'

import { GraphX } from '../graphX'
import { EntityParser } from '../parsers'
import { GenericEntitySearchData } from '../parsers/types'
import { Entities, getNodeParent, Indexes, intersectMultiple, unionMultiple } from '../utils'

import { Highlight, IndexMap, ISearchQuery, Link, QueryUnit, Reminder, SearchResult, UpdateDocFn } from './types'

export class SearchX {
  _graphX: GraphX
  _indexMap: IndexMap

  constructor(
    flexSearchOptions: IndexOptionsForDocumentSearch<GenericEntitySearchData, string[]> = {
      document: {
        id: 'id',
        index: ['title', 'text'],
        store: ['text', 'data', 'entity', 'parent', 'tags', 'id'],
        tag: 'tags'
      },
      tokenize: 'full'
    }
  ) {
    this._indexMap = Object.values(Indexes).reduce((acc, index) => {
      acc[index] = new Document<GenericEntitySearchData, string[]>(flexSearchOptions)
      return acc
    }, {} as IndexMap)

    this._graphX = new GraphX()
  }

  initializeSearch = (fileData: {
    ilinks: ILink[]
    highlights: Highlight[]
    links: Link[]
    contents: InitData
    snippets: InitData
    reminders: Reminder[]
  }) => {
    const { ilinks, highlights, links, contents, snippets, reminders } = fileData

    try {
      this.initializeHeirarchy(ilinks)
      this.initializeLinks(links)
      this.initializeHighlights(highlights)
      this.initializeContent(contents)
      this.initializeContent(snippets, Indexes.SNIPPET)
      this.initializeReminders(reminders)
    } catch (e) {
      console.log('Error: ', e)
    }
  }

  initializeLinks = (links: Link[]) => {
    links.forEach((link) => {
      this.updateLink(link)
    })
  }

  updateLink = (link: Link) => {
    this._graphX.addNode({ id: link.url, metadata: { type: Entities.URLLINK, ...link } })
    link.tags?.forEach((tag) => {
      this._graphX.addLink(tag, link.url)
    })
    this._indexMap[Indexes.MAIN].add({
      id: link.url,
      data: link,
      entity: Entities.URLLINK,
      title: link.title,
      text: link?.alias ?? '' + ' ' + link?.description,
      tags: [Entities.URLLINK]
    })
  }

  initializeHighlights = (highlights: Highlight[]) => {
    highlights?.forEach((highlight) => {
      this.updateHighlight(highlight)
    })
  }

  updateHighlight = (highlight: Highlight) => {
    this._graphX.addNode({ id: highlight.entityId, metadata: { type: Entities.HIGHLIGHT, ...highlight } })
    this._graphX.addLink(highlight.properties.sourceUrl, highlight.entityId, { type: Entities.HIGHLIGHT })
    this._indexMap[Indexes.MAIN].add({
      id: highlight.entityId,
      data: highlight,
      entity: Entities.HIGHLIGHT,
      parent: highlight.properties.sourceUrl,
      text: highlight.properties.saveableRange.text,
      tags: [Entities.HIGHLIGHT]
    })
  }

  initializeReminders = (reminders: Reminder[]) => {
    try {
      reminders?.forEach((reminder) => {
        this.updateReminder(reminder)
      })
    } catch (err) {
      console.error('Unable to Initialize Reminders: ', { err })
    }
  }

  updateReminder = (reminder: Reminder) => {
    this._graphX.addNode({ id: reminder.id, metadata: { type: Entities.REMINDER, ...reminder } })
    if (reminder.nodeid) this._graphX.addLink(reminder.nodeid, reminder.id, { type: Entities.REMINDER })
    this._indexMap[Indexes.MAIN].add({
      id: reminder.id,
      data: reminder,
      entity: Entities.REMINDER,
      text: reminder.description,
      title: reminder.title,
      tags: [Entities.REMINDER]
    })
  }

  initializeHeirarchy = (ilinks: ILink[]) => {
    const namespaces = [...new Set(ilinks.map((il) => il.namespace))]
    namespaces.forEach((namespace) => {
      this._graphX.addNode({ id: namespace, metadata: { type: Entities.NAMESPACE } })

      this._indexMap[Indexes.MAIN].add({
        id: namespace,
        data: { namespace },
        entity: Entities.NAMESPACE,
        text: namespace,
        tags: [Entities.NAMESPACE]
      })
    })

    ilinks?.forEach((ilink) => {
      const parentNodeId = getNodeParent(ilink, ilinks)
      this.updateIlink({ ...ilink, parentNodeId })
    })
  }

  updateIlink = (ilink: ILink) => {
    this._graphX.addNode({
      id: ilink.nodeid,
      metadata: {
        title: ilink.path.split('.').splice(-1)[0],
        type: Entities.NOTE
      }
    })

    this._indexMap[Indexes.MAIN].add({
      id: ilink.nodeid,
      text: ilink.path.split('.').splice(-1)[0],
      parent: ilink.parentNodeId,
      entity: Entities.NOTE,
      tags: [ilink.namespace, ilink.parentNodeId!]
    })

    if (ilink.parentNodeId) this._graphX.addLink(ilink.parentNodeId, ilink.nodeid, { type: 'CHILD_LINK' })
  }

  initializeContent = (initData: InitData, indexKey = Indexes.MAIN) => {
    Object.entries(initData.contents).forEach(([id, v]) => {
      this.addOrUpdateDocument({
        id,
        contents: v.content,
        options: { metadata: v.metadata },
        indexKey
      })
    })
  }

  eval(evalConfig: { opt: QueryUnit; entities?: string[]; indexKey?: Indexes }) {
    const { opt, entities, indexKey = Indexes.MAIN } = evalConfig
    const condition = (node) => {
      if (opt.entities) return opt.entities.includes(node.type)
      else if (entities) return entities.includes(node.type)
      return true
    }

    switch (opt.type) {
      case 'tag':
        return this._graphX.getRelatedNodes(`TAG_${opt.value}`, condition).map((item) => item.id)
      case 'mention':
        return this._graphX.getRelatedNodes(`MENTION_${opt.value}`, condition).map((item) => item.id)
      case 'heirarchy':
        return this._graphX.findChildGraph(opt.value, condition)
      case 'origin':
        return this._graphX.getRelatedNodes(`ORIGIN_${opt.value}`, condition).map((item) => item.id)
      case 'text':
        return this._indexMap[indexKey]
          .search({
            query: opt.value?.split(' ') ?? '',
            index: 'text',
            tag: entities ?? opt.entities ?? Object.values(Entities),
            bool: 'or'
          })
          .reduce((acc, curr) => {
            return unionMultiple(acc, curr?.result ?? [])
          }, [])
      case 'query':
        return this.search({ options: opt.query, expand: false, entities: opt.entities, indexKey })
      default:
        return []
    }
  }

  search = (searchConfig: {
    options: ISearchQuery
    expand?: boolean
    entities?: string[]
    indexKey?: Indexes
  }): Array<SearchResult> => {
    const { options, expand = true, entities, indexKey = Indexes.MAIN } = searchConfig
    let result = []
    let firstPass = true
    let prevOperator = 'and'
    options.forEach((qu) => {
      if (firstPass) {
        result = this.eval({ opt: qu, entities, indexKey })
        firstPass = false
      } else {
        const join = prevOperator === 'and' ? intersectMultiple : unionMultiple
        result = join(result, this.eval({ opt: qu, entities, indexKey }))
      }
      prevOperator = qu.nextOperator ?? 'and'
    })

    if (expand) return result.map((item) => this._indexMap[indexKey].get(item)).filter((item) => item?.text)
    return result.filter((item) => item)
  }

  addOrUpdateDocument: UpdateDocFn = (doc) => {
    const { id, contents, title = '', options, indexKey = Indexes.MAIN } = doc

    const parser = new EntityParser()
    const parsedBlocks = parser.noteParser(id, contents, title, options)
    const deletedBlocks = this._graphX.deleteRelatedNodes(id, (link) => link.data.type == 'CHILD')
    const index = this._indexMap[indexKey]
    deletedBlocks?.forEach((id) => index.remove(id))
    parsedBlocks.entities.forEach((item) => {
      index.add(item)
    })

    this._graphX.addEntities(parsedBlocks.graphNodes)
    this._graphX.addLinks(parsedBlocks.graphLinks)
  }

  appendToDoc: UpdateDocFn = (doc) => {
    const { id, contents, title = '', options, indexKey = Indexes.MAIN } = doc

    const parser = new EntityParser()
    if (!this._graphX.getNode(id)) return
    const parsedBlocks = parser.noteParser(id, contents, title, options)
    const index = this._indexMap[indexKey]
    parsedBlocks.entities.forEach((item) => index.add(item))

    this._graphX.addEntities(parsedBlocks.graphNodes)
    this._graphX.addLinks(parsedBlocks.graphLinks)
  }

  moveBlocks = (fromId: string, toId: string, blockIds: string[]) => {
    blockIds.forEach((blockId) => this._graphX.removeLink(fromId, blockId))
    blockIds.forEach((blockId) => this._graphX.addLink(toId, blockId, { type: 'CHILD' }))
    blockIds.forEach((blockId) => {
      const { tags, ...rest } = this._indexMap[Indexes.MAIN].get(blockId)
      this._indexMap[Indexes.MAIN].update(blockId, {
        ...rest,
        parent: toId,
        tags: tags.filter((t: string) => t !== fromId).concat(toId)
      })
    })
  }

  deleteEntity = (id: string, indexKey = Indexes.MAIN) => {
    const deletedBlocks = this._graphX.deleteRelatedNodes(id, (link) => {
      return link.data?.type === 'CHILD'
    })

    const index = this._indexMap[indexKey]
    deletedBlocks.forEach((id) => index.remove(id))
  }
}
