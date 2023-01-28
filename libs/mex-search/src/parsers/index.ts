import { camelCase } from 'lodash'

import {
  ELEMENT_ACTION_BLOCK,
  ELEMENT_EXCALIDRAW,
  ELEMENT_ILINK,
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  ELEMENT_MEDIA_EMBED,
  ELEMENT_MENTION,
  ELEMENT_PARAGRAPH,
  ELEMENT_TAG,
  ELEMENT_TODO_LI
} from '@workduck-io/mex-utils/src/constants'
import type {
  BlockType,
  NodeEditorContent,
  NodeMetadata,
  Reminder,
  SearchRepExtra
} from '@workduck-io/mex-utils/src/types'

import { DEFAULT_SYSTEM_TAGS } from '../constants'
import { GNode } from '../types/graph'
import { PartialBy } from '../types/utils'
import { Entities } from '../utils'

import { EntityParserFn, GenericEntitySearchData, NoteParserFn } from './types'

type entityParserMapFn = (entityType: string) => { fn: EntityParserFn; entityType: Entities }

class EntityParser {
  private _ID: string
  private _extra: SearchRepExtra | undefined
  private _noteMetadata: NodeMetadata | undefined
  private _systemTags: DEFAULT_SYSTEM_TAGS[] | undefined

  noteParser: NoteParserFn = (id: string, contents: NodeEditorContent, title = '', options) => {
    this._ID = id
    if (options) {
      ;({ extra: this._extra, metadata: this._noteMetadata, systemTags: this._systemTags } = options)
    }

    const graphNodes: GNode[] = [
      {
        id: id,
        metadata: {
          type: Entities.NOTE,
          title: title
        }
      }
    ]

    const entities: Array<PartialBy<GenericEntitySearchData, 'id'>> = [
      {
        id: id,
        title: title,
        data: options?.metadata,
        tags: options?.systemTags ?? []
      }
    ]

    contents.forEach((topLevelBlock: BlockType) => {
      const { entities: childEntities, graphNodes: childGNodes } = this._parseBlock(topLevelBlock)
      graphNodes.push({
        id: topLevelBlock.id,
        metadata: { type: Entities.CONTENT_BLOCK, parentID: this._ID }
      })

      if (childEntities.length > 0) entities.push(...childEntities)
      if (childGNodes.length > 0) graphNodes.push(...childGNodes)
    })

    return { entities, graphNodes }
  }

  paragraphLikeParser: EntityParserFn = (block: Required<BlockType>, topLevelBlockID?: string) => {
    const { type: blockType } = block
    const { entityType } = this._entityParserMap(blockType)

    const gNodes: GNode[] = []
    let blockText = block?.text ?? ''

    if (entityType !== Entities.CONTENT_BLOCK) {
      return this._parseBlock(block, topLevelBlockID)
    }

    const parsedEntities: PartialBy<GenericEntitySearchData, 'id'>[] = []

    if (block.children && block.children.length > 0) {
      block.children.forEach((childBlock) => {
        const { graphNodes, entities } = this._parseBlock(childBlock, topLevelBlockID)

        entities?.forEach((e) => {
          if (e.entity === Entities.CONTENT_BLOCK) {
            blockText = `${blockText} ${e.text}`
          } else {
            parsedEntities.push(e)
          }
        })

        if (graphNodes.length > 0) gNodes.push(...graphNodes)
      })
    }

    if (blockText !== '') {
      parsedEntities.push({
        entity: Entities.CONTENT_BLOCK,
        id: block.id,
        text: blockText.trim(),
        tags: this._getFlexsearchTags([Entities.CONTENT_BLOCK])
      })
    }

    return { entities: parsedEntities, graphNodes: gNodes }
  }

  // Mentions can't have children, we only care about associated entity, which is UserID
  mentionParser: EntityParserFn = (block: BlockType, parentBlockID?: string) => {
    let alias: any = undefined
    if (this._extra && this._extra[ELEMENT_MENTION]) {
      const blockKey = this._extra[ELEMENT_MENTION].keyToIndex
      alias = this._extra[ELEMENT_MENTION].replacements[block[blockKey]]
    }

    const gNode: GNode = {
      id: `USER_${block.value}`,
      metadata: { type: Entities.MENTION, parentID: parentBlockID, ...(alias && { alias: alias }) }
    }
    return { graphNodes: [gNode], entities: [] }
  }

  // Similar to mentions, tags don't have children and we care only about tag value (ID, value for now)
  tagParser: EntityParserFn = (block: BlockType, parentBlockID?: string) => {
    const gNode: GNode = {
      id: `TAG_${block.value}`,
      metadata: { type: Entities.TAG, parentID: parentBlockID, value: block.value }
    }
    return { graphNodes: [gNode], entities: [] }
  }

  // ILink Values are passed via the extra parameter and nodeIDs are replaced in blockText with paths
  ilinkParser: EntityParserFn = (block: BlockType) => {
    if (this._extra && this._extra[ELEMENT_ILINK]) {
      const blockKey = this._extra[ELEMENT_ILINK].keyToIndex
      const blockText = this._extra[ELEMENT_ILINK].replacements[block[blockKey]]

      return {
        entities: [
          {
            entity: Entities.CONTENT_BLOCK,
            text: blockText,
            tags: this._getFlexsearchTags([Entities.LINK])
          }
        ],
        graphNodes: [
          {
            id: block.value as string,
            metadata: { type: Entities.ILINK, parentID: this._ID }
          }
        ]
      }
    }

    return { entities: [], graphNodes: [] }
  }

  // Links and Media Embeds - Replace in block text with URL
  urlParser: EntityParserFn = (block: BlockType, parentBlockID?: string) => {
    const url = block.url as string
    const blockText =
      block.children && block.children.length > 0 && block.children[0].text !== '' ? block.children[0].text : url

    const gNode: GNode = {
      id: url,
      metadata: { type: Entities.LINK, parentID: parentBlockID, origin: new URL(url).origin }
    }

    return {
      entities: [
        {
          entity: Entities.CONTENT_BLOCK,
          text: blockText,
          tags: this._getFlexsearchTags([Entities.LINK])
        }
      ],
      graphNodes: [gNode]
    }
  }

  // Excalidraw Canvas - Parse the value to get text inside the canvas
  excalidrawParser: EntityParserFn = (block: BlockType) => {
    const rawValue = block.value
    if (rawValue) {
      const parsedExcalidrawElements = JSON.parse(rawValue).elements

      const text: string[] = []
      parsedExcalidrawElements.forEach((elem) => {
        if (elem.text && elem.text !== '') {
          text.push(elem.text)
        }
      })

      return {
        entities: [
          {
            text: text.join(' '),
            tags: this._getFlexsearchTags([Entities.EXCALIDRAW])
          }
        ],
        graphNodes: []
      }
    }
    return { entities: [], graphNodes: [] }
  }

  taskParser: EntityParserFn = (block: BlockType, topLevelBlockID?: string) => {
    const { id: blockID, type: blockType } = block
    const { entityType } = this._entityParserMap(blockType)

    const associatedEntities: GNode[] = []
    let blockText = block?.text ?? ''

    // console.log(`Action Item Block: ${JSON.stringify(block)} | EntityType: ${entityType}`)

    if (entityType !== Entities.TASK) {
      return this._parseBlock(block, topLevelBlockID)
    }

    const parsedEntities: PartialBy<GenericEntitySearchData, 'id'>[] = []

    if (block.children && block.children.length > 0) {
      block.children.forEach((childBlock) => {
        const { graphNodes, entities } = this._parseBlock(childBlock, topLevelBlockID)

        entities?.forEach((e) => {
          if (e.entity === Entities.CONTENT_BLOCK) {
            blockText = `${blockText} ${e.text}`
          } else {
            parsedEntities.push(e)
          }
        })

        if (graphNodes.length > 0) associatedEntities.push(...graphNodes)
      })
    }

    if (blockText !== '') {
      parsedEntities.push({
        entity: Entities.TASK,
        id: blockID,
        text: blockText.trim(),
        tags: this._getFlexsearchTags([Entities.TASK])
      })

      const taskGNode: GNode = {
        id: blockID,
        metadata: { type: Entities.TASK, parentID: this._ID }
      }
      associatedEntities.push(taskGNode)
    }

    return { entities: parsedEntities, graphNodes: associatedEntities }
  }

  // Reminders are not directly attached to note but are stored separately in the `reminders` object in `mex.json`
  reminderParser: EntityParserFn = (reminder: Reminder) => {
    return {
      entities: [
        {
          id: reminder.id,
          text: reminder.description,
          title: reminder.title,
          data: reminder,
          tags: this._getFlexsearchTags([Entities.REMINDER])
        }
      ],
      graphNodes: []
    }
  }

  actionParser: EntityParserFn = (block: any) => {
    const blockText = camelCase(block.actionContext?.actionGroupId)
    return {
      entities: [
        {
          entity: Entities.ACTION,
          text: blockText.trim(),
          data: block,
          tags: this._getFlexsearchTags([Entities.ACTION])
        }
      ],
      graphNodes: []
    }
  }

  imageParser: EntityParserFn = (block: BlockType) => {
    const blockText = block.caption && block.caption.length > 0 ? block.caption[0].text : ''
    return {
      entities: [
        {
          entity: Entities.CONTENT_BLOCK,
          id: block.id,
          text: blockText.trim(),
          tags: this._getFlexsearchTags([Entities.IMAGE])
        }
      ],
      graphNodes: []
    }
  }

  private _parseBlock = (block: BlockType, parentBlockId?: string) => {
    const blockType = block.type
    const { fn: parserFunction } = this._entityParserMap(blockType)

    const { entities, graphNodes } = parserFunction(block, parentBlockId ?? block.id)
    return { entities, graphNodes }
  }

  private _entityParserMap: entityParserMapFn = (entityType = ELEMENT_PARAGRAPH) => {
    switch (entityType) {
      case ELEMENT_EXCALIDRAW:
        return { fn: this.excalidrawParser, entityType: Entities.EXCALIDRAW }

      case ELEMENT_MENTION:
        return { fn: this.mentionParser, entityType: Entities.MENTION }

      case ELEMENT_TAG:
        return { fn: this.tagParser, entityType: Entities.TAG }

      case ELEMENT_ILINK:
        return { fn: this.ilinkParser, entityType: Entities.ILINK }

      case ELEMENT_MEDIA_EMBED:
      case ELEMENT_LINK:
        return { fn: this.urlParser, entityType: Entities.LINK }

      case ELEMENT_TODO_LI:
        return { fn: this.taskParser, entityType: Entities.TASK }

      case ELEMENT_ACTION_BLOCK:
        return { fn: this.actionParser, entityType: Entities.ACTION }

      case ELEMENT_IMAGE:
        return { fn: this.imageParser, entityType: Entities.IMAGE }

      default:
        return { fn: this.paragraphLikeParser, entityType: Entities.CONTENT_BLOCK }
    }
  }

  _getFlexsearchTags = (extraTags?: string[]) => {
    return [...(this._systemTags ?? []), ...(extraTags ?? []), this._ID]
  }
}

export default EntityParser
