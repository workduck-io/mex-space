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
} from '../constants'
import { Reminder } from '../types'
import { NodeMetadata, BlockType, PartialBy, NodeEditorContent } from '../types/core'
import { Entities } from '../types/entities'
import {
  AssociatedEntities,
  EntityParserFn,
  GenericEntitySearchData,
  NodeParserFn,
  ParserFuncResult,
  SearchRepExtra
} from '../types/search'

export const paragraphLikeParser = (block: Required<BlockType>) => {
  const blockID = block.id
  const blockType = block.type
  const { fn: parserFunction, entityType } = entityParserMap(blockType)

  const associatedEntities: AssociatedEntities = []
  let blockText = block?.text ? `${block.text} ` : ''

  // console.log(`Block: ${JSON.stringify(block)} | EntityType: ${entityType}`)

  if (entityType !== Entities.CONTENT_BLOCK) {
    const { fn: parserFunction } = entityParserMap(blockType)
    const { entities: e, associatedEntities: AE } = parserFunction(block)
    return { entities: e, associatedEntities: AE }
  }

  const parsedEntities: PartialBy<GenericEntitySearchData, 'id'>[] = []

  if (block.children && block.children.length > 0) {
    block.children.forEach((childBlock) => {
      const childBlockType = block.type

      const { fn: parserFunction, entityType: childEntityType } = entityParserMap(childBlockType)
      const { associatedEntities: childAssociatedEntities, entities: childEntities } = parserFunction(childBlock)

      childEntities?.forEach((e) => {
        if (e.entity === Entities.CONTENT_BLOCK) {
          blockText += e.text
        } else {
          parsedEntities.push(e)
        }
      })

      if (childAssociatedEntities) associatedEntities.push(...childAssociatedEntities)
    })
  }

  if (blockText !== '') {
    parsedEntities.push({
      entity: Entities.CONTENT_BLOCK,
      id: blockID,
      text: blockText,
      associatedEntities: associatedEntities
    })
  }

  return { entities: parsedEntities, associatedEntities: associatedEntities }
}

// Mentions can't have children, we only care about associated entity, which is UserID
const mentionParser: EntityParserFn = (block: BlockType) => {
  const userID = `USER_${block.value}`
  return { associatedEntities: [userID] }
}

// Similar to mentions, tags don't have children and we care only about tag value (ID, value for now)
const tagParser: EntityParserFn = (block: BlockType) => {
  const tagID = `TAG_${block.value}`
  return { associatedEntities: [tagID] }
}

// ILink Values are passed via the extra parameter and nodeIDs are replaced in blockText with paths
export const ilinkParser: EntityParserFn = (block: BlockType, extra) => {
  if (extra && extra[ELEMENT_ILINK]) {
    const blockKey = extra[ELEMENT_ILINK].keyToIndex
    const blockText = extra[ELEMENT_ILINK].replacements[block[blockKey]]

    return {
      entities: [
        {
          entity: Entities.CONTENT_BLOCK,
          text: blockText
        }
      ]
    }
  }

  return {}
}

// Links and Media Embeds - Replace in block text with URL
export const urlParser: EntityParserFn = (block: BlockType) => {
  const url = block.url as string
  const blockText =
    block.children && block.children.length > 0 && block.children[0].text !== '' ? block.children[0].text : url

  return {
    entities: [
      {
        entity: Entities.CONTENT_BLOCK,
        text: blockText
      }
    ],
    associatedEntities: [new URL(url).origin]
  }
}

// Excalidraw Canvas - Parse the value to get text inside the canvas
export const excalidrawParser: EntityParserFn = (block: BlockType) => {
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
          entity: Entities.CONTENT_BLOCK,
          text: text.join(' ')
        }
      ]
    }
  }
  return {}
}

export const actionItemParser: EntityParserFn = (block: BlockType) => {
  const blockID = block.id
  const blockType = block.type
  const { fn: parserFunction, entityType } = entityParserMap(blockType)

  const associatedEntities: AssociatedEntities = []
  let blockText = block?.text ? `${block.text} ` : ''

  // console.log(`Action Item Block: ${JSON.stringify(block)} | EntityType: ${entityType}`)

  if (entityType !== Entities.TASK) {
    const { fn: parserFunction } = entityParserMap(blockType)
    const { entities: e, associatedEntities: AE } = parserFunction(block)
    return { entities: e, associatedEntities: AE }
  }

  const parsedEntities: PartialBy<GenericEntitySearchData, 'id'>[] = []

  if (block.children && block.children.length > 0) {
    block.children.forEach((childBlock) => {
      const childBlockType = block.type

      const { fn: parserFunction, entityType: childEntityType } = entityParserMap(childBlockType)
      const { associatedEntities: childAssociatedEntities, entities: childEntities } = parserFunction(childBlock)

      childEntities?.forEach((e) => {
        if (e.entity === Entities.CONTENT_BLOCK) {
          blockText += e.text
        } else {
          parsedEntities.push(e)
        }
      })

      if (childAssociatedEntities) associatedEntities.push(...childAssociatedEntities)
    })
  }

  if (blockText !== '') {
    parsedEntities.push({
      entity: Entities.TASK,
      id: blockID,
      text: blockText,
      associatedEntities: associatedEntities
    })
  }

  return { entities: parsedEntities, associatedEntities: associatedEntities }
}

// Reminders are not directly attached to note but are stored separately in the `reminders` object in `mex.json`
export const reminderParser: EntityParserFn = (reminder: Reminder) => {
  return {
    entities: [
      {
        entity: Entities.REMINDER,
        id: reminder.id,
        text: reminder.description,
        title: reminder.title,
        data: reminder
      }
    ]
  }
}

export const actionParser: EntityParserFn = (block: any) => {
  const blockText = camelCase(block.actionContext?.actionGroupId)
  return {
    entities: [
      {
        entity: Entities.ACTION,
        text: blockText,
        data: block
      }
    ]
  }
}

export const imageParser: EntityParserFn = (block: BlockType) => {
  const blockText = block.caption && block.caption.length > 0 ? block.caption[0].text : ''
  return {
    entities: [
      {
        entity: Entities.CONTENT_BLOCK,
        id: block.id,
        text: blockText
      }
    ]
  }
}

type entityParserMapFn = (entityType: string) => { fn: EntityParserFn; entityType: Entities }

const entityParserMap: entityParserMapFn = (entityType = ELEMENT_PARAGRAPH) => {
  switch (entityType) {
    case ELEMENT_EXCALIDRAW:
      return { fn: excalidrawParser, entityType: Entities.EXCALIDRAW }

    case ELEMENT_MENTION:
      return { fn: mentionParser, entityType: Entities.MENTION }

    case ELEMENT_TAG:
      return { fn: tagParser, entityType: Entities.TAG }

    case ELEMENT_ILINK:
      return { fn: ilinkParser, entityType: Entities.LINK }

    case ELEMENT_MEDIA_EMBED:
    case ELEMENT_LINK:
      return { fn: urlParser, entityType: Entities.LINK }

    case ELEMENT_TODO_LI:
      return { fn: actionItemParser, entityType: Entities.TASK }

    case ELEMENT_ACTION_BLOCK:
      return { fn: actionParser, entityType: Entities.ACTION }

    case ELEMENT_IMAGE:
      return { fn: imageParser, entityType: Entities.IMAGE }

    default:
      return { fn: paragraphLikeParser, entityType: Entities.CONTENT_BLOCK }
  }
}

export const noteParser = (nodeId: string, contents: NodeEditorContent, title = '', extra, nodeMetadata) => {
  const noteEntity: GenericEntitySearchData = {
    entity: Entities.NOTE,
    id: nodeId,
    title: title,
    data: nodeMetadata
  }

  const results: PartialBy<GenericEntitySearchData, 'id'>[] = [noteEntity]
  contents.forEach((topLevelBlock: BlockType) => {
    const blockType = topLevelBlock.type
    const { fn: parserFunction, entityType } = entityParserMap(blockType)
    const { entities, associatedEntities } = parserFunction(topLevelBlock)

    if (entities) results.push(...entities)
  })

  return results
}
