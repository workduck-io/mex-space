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
  ELEMENT_TAG
} from '../constants'
import { Reminder } from '../types'
import { NodeMetadata, BlockType } from '../types/core'
import { Entities } from '../types/entities'
import {
  AssociatedEntities,
  EntityParserFn,
  GenericEntitySearchData,
  NodeParserFn,
  SearchRepExtra
} from '../types/search'

export const blockTextParser: EntityParserFn = (block: Required<BlockType>) => {
  return [
    {
      entity: Entities.CONTENT_BLOCK,
      data: block,
      text: block.text
    }
  ]
}

// Mentions can't have children, we only care about associated entity, which is UserID
const mentionParser: EntityParserFn = (block: BlockType) => {
  const userID = `USER_${block.value}`
  return [
    {
      entity: Entities.MENTION,
      // id: userID,
      associatedEntities: [userID]
    }
  ]
}

// Similar to mentions, tags don't have children and we care only about tag value (ID, value for now)
const tagParser: EntityParserFn = (block: BlockType) => {
  const tagID = `TAG_${block.value}`
  return [
    {
      entity: Entities.TAG,
      id: block.value,
      associatedEntities: [tagID]
    }
  ]
}

// ILink Values are passed via the extra parameter and nodeIDs are replaced in blockText with paths
export const ilinkParser: EntityParserFn = (block: BlockType, extra) => {
  if (extra && extra[ELEMENT_ILINK]) {
    const blockKey = extra[ELEMENT_ILINK].keyToIndex
    const blockText = extra[ELEMENT_ILINK].replacements[block[blockKey]]

    return [
      {
        entity: Entities.CONTENT_BLOCK,
        text: blockText
      }
    ]
  }

  return undefined
}

// Links and Media Embeds - Replace in block text with URL
export const urlParser: EntityParserFn = (block: BlockType) => {
  const url = block.url as string
  console.log('Block URL: ', url)
  console.log('Block: ', block)
  const text = block.children[0]?.text
  const blockText = text && text !== '' ? text : url

  return [
    {
      entity: Entities.CONTENT_BLOCK,
      text: blockText,
      associatedEntities: [new URL(url).origin]
    }
  ]
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

    return [
      {
        entity: Entities.CONTENT_BLOCK,
        text: text.join(' ')
      }
    ]
  }
  return undefined
}

// Reminders are not directly attached to note but are stored separately in the `reminders` object in `mex.json`
export const reminderParser: EntityParserFn = (reminder: Reminder) => {
  return [
    {
      entity: Entities.REMINDER,
      id: reminder.id,
      text: reminder.description,
      title: reminder.title,
      data: reminder
    }
  ]
}

export const actionParser: EntityParserFn = (block: any) => {
  const blockText = camelCase(block.actionContext?.actionGroupId)
  return [
    {
      entity: Entities.ACTION,
      text: blockText,
      data: block
    }
  ]
}

// export const tableParser: EntityParserFn = (block: any, extra?: SearchRepExtra) => {

// }

// export const imageParser: EntityParserFn = (block, extra) => {

// }

export const actionItemParser: EntityParserFn = (block: BlockType) => {
  return [
    {
      entity: Entities.TASK,
      id: block.id,
      data: block
    }
  ]
}

type entityParserMapFn = (entityType: string) => EntityParserFn

const entityParserMap: entityParserMapFn = (entityType = ELEMENT_PARAGRAPH) => {
  switch (entityType) {
    case ELEMENT_EXCALIDRAW:
      return excalidrawParser

    case ELEMENT_MENTION:
      return mentionParser

    case ELEMENT_TAG:
      return tagParser

    case ELEMENT_ILINK:
      return ilinkParser

    case ELEMENT_MEDIA_EMBED:
    case ELEMENT_LINK:
      return urlParser

    case ELEMENT_ACTION_BLOCK:
      return actionParser

    // case ELEMENT_IMAGE:
    //   return imageParser

    default:
      return blockTextParser
  }
}

export const parseTopLevelBlock = (block: BlockType, extra?: SearchRepExtra) => {
  const blockID = block.id
  const blockType = block.type
  const parserFunction = entityParserMap(blockType)

  const parsedEntities = parserFunction(block, extra)
  const associatedEntities: AssociatedEntities = []

  if (block.children && block.children.length > 0) {
    let blockText = ''
    block.children.forEach((childBlock) => {
      const blockParserFn = entityParserMap(childBlock.type)
      const blockParsedEntities = blockParserFn(childBlock)

      blockParsedEntities?.forEach((e) => {
        if (!e.id) e.id = blockID

        if (e.associatedEntities) associatedEntities.push(...e.associatedEntities)

        if (e.entity === Entities.CONTENT_BLOCK) blockText += e.text
        else parsedEntities?.push(e)
      })

      parsedEntities?.push({
        entity: Entities.CONTENT_BLOCK,
        id: blockID,
        text: blockText
      })
    })
  }

  return parsedEntities
}

export const noteParser: NodeParserFn = (nodeId, contents, title = '', extra, nodeMetadata) => {
  const results: GenericEntitySearchData[] = []
  contents.forEach((topLevelBlock) => {
    const parsedEntities = parseTopLevelBlock(topLevelBlock)
    // eslint-disable-next-line
    // @ts-ignore
    if (parsedEntities) results.push(...parsedEntities)
  })

  return results
}
