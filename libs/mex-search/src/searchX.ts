import { Document, IndexOptionsForDocumentSearch } from 'flexsearch'

import { NodeEditorContent, NodeMetadata, SearchRepExtra } from '@workduck-io/mex-utils/src'

import { GenericEntitySearchData } from './parsers/types'
import { DEFAULT_SYSTEM_TAGS } from './constants'
import GraphX from './graphX'

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
  _index: Document<GenericEntitySearchData, string[]>

  constructor(
    flexSearchOptions: IndexOptionsForDocumentSearch<GenericEntitySearchData, string[]> = {
      document: {
        id: 'id',
        index: ['title', 'text'],
        store: ['text', 'data'],
        tag: 'tags'
      },
      tokenize: 'full'
    }
  ) {
    this._index = new Document<GenericEntitySearchData, string[]>(flexSearchOptions)
    this._graphX = new GraphX()
  }

  initializeSearch = (initList) => {
    
  }
  addOrUpdateDocument: UpdateDocFn = (id: string, contents: NodeEditorContent, title = '', options) => {
    // const parsedBlocks = parseNode(nodeId, contents, title, extra)
    // const existingNodeBlocks = nodeBlockMapping[nodeId] ?? []
    // const newBlockIds = parsedBlocks.map((block) => block.blockId)
    // const blockIdsToBeDeleted = existingNodeBlocks.filter((id) => !newBlockIds.includes(id))
    // nodeBlockMapping[nodeId] = newBlockIds
    // blockIdsToBeDeleted.forEach((blockId) => {
    //   const compositeKey = createIndexCompositeKey(nodeId, blockId)
    //   globalSearchIndex[key].remove(compositeKey)
    // })
    // parsedBlocks.forEach((block) => {
    //   block.blockId = createIndexCompositeKey(nodeId, block.blockId)
    //   // mog(`${block.title} updating block`, { block })
    //   globalSearchIndex[key].update({ ...block, tag: [...tags, nodeId] })
    // })
  }
}

export default SearchX
