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
import {
  BlockType,
  NodeEditorContent,
  NodeMetadata,
  Reminder,
  SearchRepExtra,
  SuperBlockContent
} from '@workduck-io/mex-utils/src/types'

import { DEFAULT_SYSTEM_TAGS } from '../constants'
import { GLink, GNode } from '../graphX/types'
import { PartialBy } from '../types/utils'
import { Entities } from '../utils'

import { EntityParserFn, GenericEntitySearchData, NoteParserFn, SuperBlocksType } from './types'

type entityParserMapFn = (entityType: string) => { fn: EntityParserFn; entityType: Entities }

export class EntityParser {
  private _ID: string
  private _extra: SearchRepExtra | undefined
  private _noteMetadata: NodeMetadata | undefined
  private _systemTags: DEFAULT_SYSTEM_TAGS[] | undefined

  superblockParser = (content: SuperBlockContent) => {
    const { type, id, metadata, properties = {}, children } = content
    const { entity, title, tags } = properties
    let blockText = ''
    const graphNodes: GNode[] = [
      {
        id,
        metadata: {
          type,
          title: title,
          properties: { properties, metadata }
        }
      },
      ...(entity?.values
        ? [
            {
              id: entity.values[entity.active].parent!,
              metadata: {
                type: entity.active,
                properties: entity.values[entity.active]
              }
            }
          ]
        : [])
    ]
    const graphLinks: GLink[] = entity?.active
      ? [
          ...(entity?.values
            ? [
                {
                  from: id,
                  to: entity.values[entity.active].parent!,
                  metadata: {
                    type: entity.active,
                    properties: entity.values[entity.active]
                  }
                }
              ]
            : []),
          {
            from: id,
            to: entity.active,
            metadata: {
              type: entity.active
            }
          }
        ]
      : []

    tags?.forEach((tag) => {
      graphNodes.push({
        id: `TAG_${tag.value}`,
        metadata: {
          value: tag.value,
          type: Entities.TAG
        }
      })
      graphLinks.push({
        to: `TAG_${tag.value}`,
        from: id,
        metadata: {
          type: Entities.TAG
        }
      })
    })

    const entities: Array<PartialBy<GenericEntitySearchData, 'id'>> = []
    const flexTags = [type, ...(tags?.map((t) => `TAG_${t.value}`) ?? [])]
    children.forEach((topLevelBlock: BlockType) => {
      const {
        entities: childEntities,
        graphNodes: childGNodes,
        graphLinks: childGLinks
      } = this._parseBlock(topLevelBlock, id)
      childEntities?.forEach((e) => {
        blockText = `${blockText} ${e.text}`
        flexTags.push(...(e.tags ?? []))
      })

      if (graphNodes.length > 0) graphNodes.push(...childGNodes)
      if (graphLinks.length > 0) graphLinks.push(...childGLinks)

      // if (childEntities.length > 0) entities.push(...childEntities)
      if (childGNodes.length > 0) graphNodes.push(...childGNodes)
      if (childGLinks.length > 0) graphLinks.push(...childGLinks)
    })
    entities.push({
      id,
      title: title ?? type,
      text: blockText,
      entity: type as SuperBlocksType<any>,
      parent: this._ID,
      data: { metadata, properties },
      tags: [...new Set(flexTags)]
    })
    return {
      entities,
      graphNodes,
      graphLinks
    }
  }

  noteParser: NoteParserFn = (id: string, contents: NodeEditorContent, title = '', options) => {
    this._ID = id
    if (options) {
      ;({ extra: this._extra, metadata: this._noteMetadata, systemTags: this._systemTags } = options)
    }

    const graphNodes: GNode[] = [
      {
        id,
        metadata: {
          type: Entities.NOTE,
          title: title,
          properties: this._noteMetadata
        }
      }
    ]

    const graphLinks: GLink[] = []

    const entities: Array<PartialBy<GenericEntitySearchData, 'id'>> = [
      {
        id,
        title: title,
        entity: Entities.NOTE,
        data: options?.metadata,
        tags: options?.systemTags ?? []
      }
    ]

    contents.forEach((topLevelBlock: SuperBlockContent) => {
      const {
        entities: childEntities,
        graphNodes: childGNodes,
        graphLinks: childGLinks
      } = this.superblockParser(topLevelBlock)

      graphLinks.push({
        from: this._ID,
        to: topLevelBlock.id,
        metadata: { type: 'CHILD' }
      })

      if (childEntities.length > 0) entities.push(...childEntities)
      if (childGNodes.length > 0) graphNodes.push(...childGNodes)
      if (childGLinks.length > 0) graphLinks.push(...childGLinks)
    })

    return { entities, graphNodes, graphLinks }
  }

  paragraphLikeParser: EntityParserFn = (block: Required<BlockType>, topLevelBlockID: string) => {
    const { type: blockType } = block
    const { entityType } = this._entityParserMap(blockType)

    const gNodes: GNode[] = []
    const gLinks: GLink[] = []
    let blockText = block?.text?.trim() ?? ''

    if (entityType !== Entities.CONTENT_BLOCK) {
      return this._parseBlock(block, topLevelBlockID)
    }

    const parsedEntities: PartialBy<GenericEntitySearchData, 'id'>[] = []
    const flexTags: string[] = [Entities.CONTENT_BLOCK]
    if (block.children && block.children.length > 0) {
      block.children.forEach((childBlock) => {
        const { graphNodes, graphLinks, entities } = this._parseBlock(childBlock, topLevelBlockID)

        entities?.forEach((e) => {
          blockText = `${blockText} ${e.text}`
          flexTags.push(...(e.tags ?? []))
        })

        if (graphNodes.length > 0) gNodes.push(...graphNodes)
        if (graphLinks.length > 0) gLinks.push(...graphLinks)
      })
    }

    if (blockText !== '') {
      parsedEntities.push({
        entity: Entities.CONTENT_BLOCK,
        id: block.id,
        parent: topLevelBlockID,
        data: block.metadata,
        text: blockText.trim(),
        tags: [...new Set(this._getFlexsearchTags(flexTags))]
      })
    }

    return { entities: parsedEntities, graphNodes: gNodes, graphLinks: gLinks }
  }

  // Mentions can't have children, we only care about associated entity, which is UserID
  mentionParser: EntityParserFn = (block: BlockType, parentBlockID: string) => {
    let alias: any = undefined
    if (this._extra && this._extra[ELEMENT_MENTION]) {
      const blockKey = this._extra[ELEMENT_MENTION].keyToIndex
      alias = this._extra[ELEMENT_MENTION].replacements[block[blockKey]]
    }

    const gNode: GNode = {
      id: `USER_${block.value}`,
      metadata: { ...block, type: Entities.MENTION }
    }
    return {
      graphNodes: [gNode],
      graphLinks: [
        {
          from: parentBlockID,
          to: gNode.id,
          metadata: {
            type: Entities.MENTION
          }
        }
      ],
      entities: []
    }
  }

  // Similar to mentions, tags don't have children and we care only about tag value (ID, value for now)
  tagParser: EntityParserFn = (block: BlockType, parentBlockID: string) => {
    const gNode: GNode = {
      id: `TAG_${block.value}`,
      metadata: {value: block.value, type: Entities.TAG }
    }

    return {
      graphNodes: [gNode],
      graphLinks: [
        {
          from: parentBlockID,
          to: gNode.id,
          metadata: {
            type: Entities.TAG
          }
        }
      ],
      entities: []
    }
  }

  // ILink Values are passed via the extra parameter and nodeIDs are replaced in blockText with paths
  ilinkParser: EntityParserFn = (block: BlockType, parentBlockID: string) => {
    if (this._extra && this._extra[ELEMENT_ILINK]) {
      const blockKey = this._extra[ELEMENT_ILINK].keyToIndex
      const blockText = this._extra[ELEMENT_ILINK].replacements[block[blockKey]]

      return {
        entities: [
          {
            entity: Entities.CONTENT_BLOCK,
            text: blockText,
            parent: parentBlockID,
            data: block.metadata,
            tags: this._getFlexsearchTags()
          }
        ],
        graphNodes: [
          {
            id: block.value as string,
            metadata: { ...block, type: Entities.ILINK }
          }
        ],
        graphLinks: [
          {
            from: this._ID,
            to: block.value as string,
            metadata: { type: Entities.ILINK }
          }
        ]
      }
    }

    return { entities: [], graphNodes: [], graphLinks: [] }
  }

  // Links and Media Embeds - Replace in block text with URL
  urlParser: EntityParserFn = (block: BlockType, parentBlockID: string) => {
    const url = block.url as string
    const blockText =
      block.children && block.children.length > 0 && block.children[0].text?.trim() !== ''
        ? block.children[0].text
        : url
    const origin = new URL(url).origin
    const gNode: GNode = {
      id: url,
      metadata: { ...block, type: Entities.LINK, origin }
    }

    const gLink: GLink = {
      from: parentBlockID,
      to: url,
      metadata: {
        type: 'CHILD'
      }
    }

    return {
      entities: [
        {
          entity: Entities.CONTENT_BLOCK,
          text: blockText,
          parent: parentBlockID,
          data: block.metadata,
          tags: this._getFlexsearchTags([Entities.LINK])
        }
      ],
      graphNodes: [gNode],
      graphLinks: [
        gLink,
        {
          from: parentBlockID,
          to: `ORIGIN_${origin}`,
          metadata: {
            type: 'ORIGIN'
          }
        }
      ]
    }
  }

  // Excalidraw Canvas - Parse the value to get text inside the canvas
  excalidrawParser: EntityParserFn = (block: BlockType, parentBlockID: string) => {
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
            entity: Entities.EXCALIDRAW,
            data: block.metadata,
            parent: parentBlockID,
            tags: this._getFlexsearchTags([Entities.EXCALIDRAW])
          }
        ],
        graphNodes: [],
        graphLinks: [
          {
            to: Entities.EXCALIDRAW,
            from: parentBlockID,
            metadata: {
              type: Entities.EXCALIDRAW
            }
          }
        ]
      }
    }
    return { entities: [], graphNodes: [], graphLinks: [] }
  }

  taskParser: EntityParserFn = (block: BlockType, topLevelBlockID: string) => {
    const { id: blockID, type: blockType } = block
    const { entityType } = this._entityParserMap(blockType)

    const associatedEntities: GNode[] = []
    const associatedLinks: GLink[] = []
    let blockText = block?.text?.trim() ?? ''

    // console.log(`Action Item Block: ${JSON.stringify(block)} | EntityType: ${entityType}`)

    if (entityType !== Entities.TASK) {
      return this._parseBlock(block, topLevelBlockID)
    }

    const parsedEntities: PartialBy<GenericEntitySearchData, 'id'>[] = []
    const flexTags: string[] = [Entities.TASK]
    if (block.children && block.children.length > 0) {
      block.children.forEach((childBlock) => {
        const { graphNodes, graphLinks, entities } = this._parseBlock(childBlock, topLevelBlockID)

        entities?.forEach((e) => {
          blockText = `${blockText} ${e.text}`
          flexTags.push(...(e.tags ?? []))
        })

        if (graphNodes.length > 0) associatedEntities.push(...graphNodes)
        if (graphLinks.length > 0) associatedLinks.push(...graphLinks)
      })
    }
    if (blockText !== '') {
      parsedEntities.push({
        entity: Entities.TASK,
        id: blockID,
        parent: topLevelBlockID,
        text: blockText.trim(),
        data: {
          ...(block.metadata ?? {}),
          status: block.status,
          priority: block.priority
        },
        tags: [...new Set(this._getFlexsearchTags(flexTags))]
      })

      const taskGLink: GLink = {
        from: topLevelBlockID,
        to: Entities.TASK,
        metadata: { type: 'TASK' }
      }
      associatedLinks.push(taskGLink)
    }

    return { entities: parsedEntities, graphNodes: associatedEntities, graphLinks: associatedLinks }
  }

  // Reminders are not directly attached to note but are stored separately in the `reminders` object in `mex.json`
  reminderParser: EntityParserFn = (reminder: Reminder, parentBlockID: string) => {
    return {
      entities: [
        {
          id: reminder.id,
          text: reminder.description,
          title: reminder.title,
          data: reminder,
          parent: parentBlockID,
          entity: Entities.REMINDER,
          tags: this._getFlexsearchTags([Entities.REMINDER])
        }
      ],
      graphNodes: [],
      graphLinks: [
        {
          from: parentBlockID,
          to: Entities.REMINDER,
          metadata: {
            type: Entities.REMINDER
          }
        }
      ]
    }
  }

  actionParser: EntityParserFn = (block: any, parentBlockID: string) => {
    const blockText = camelCase(block.actionContext?.actionGroupId)
    return {
      entities: [
        {
          entity: Entities.ACTION,
          text: blockText.trim(),
          parent: parentBlockID,
          data: block.metadata,
          tags: this._getFlexsearchTags([Entities.ACTION])
        }
      ],
      graphNodes: [],
      graphLinks: [
        {
          from: parentBlockID,
          to: Entities.ACTION,
          metadata: {
            type: Entities.ACTION
          }
        }
      ]
    }
  }

  imageParser: EntityParserFn = (block: BlockType, parentBlockID) => {
    const blockText = block.caption && block.caption.length > 0 ? block.caption[0].text : ''

    return {
      entities: [
        {
          entity: Entities.IMAGE,
          id: block.id,
          parent: parentBlockID,
          data: {
            ...(block.metadata ?? {}),
            caption: block.caption,
            url: block.url
          },
          text: blockText.trim(),
          tags: this._getFlexsearchTags([Entities.IMAGE])
        }
      ],
      graphNodes: [],
      graphLinks: [
        {
          from: parentBlockID,
          to: Entities.IMAGE,
          metadata: {
            type: Entities.IMAGE
          }
        }
      ]
    }
  }

  private _parseBlock = (block: BlockType, parentBlockId: string) => {
    const blockType = block.type
    const { fn: parserFunction } = this._entityParserMap(blockType)

    return parserFunction(block, parentBlockId)
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
