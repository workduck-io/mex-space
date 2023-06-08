
  import { customAlphabet } from 'nanoid'

  const nolookalikes = '346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz'
  export const TEMP_ID_PREFIX = 'TEMP'
  export const ID_SEPARATOR = '_'
  const shortId = customAlphabet(nolookalikes, 5)
  
  export const generateTempId = () => `${TEMP_ID_PREFIX}${ID_SEPARATOR}${shortId()}`

  

  export const directPropertyKeys = [
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'highlight',
    'code',
    'email',
    'url',
    'caption',
    'value',
    'blockValue',
    'checked',
    'blockId',
    'body',
    'align',
    'questionId',
    'question',
    'answer',
    'actionContext',
    'blockMeta',
    'status',
    'priority',
    'lang'
  ]


  // From content to api

  export const removeNulls = (obj) => {
    return Object.fromEntries(
      Object.entries(obj)
        .filter(([_, v]) => v != null)
        .map(([k, v]) => [k, v === Object(v) ? removeNulls(v) : v])
    )
  }

  export const extractMetadata = (data: any, defaults?: { icon: any }): any => {
    if (data) {
      const metadata: any = {
        lastEditedBy: data.lastEditedBy,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy,
        createdAt: data.createdAt,
        elementMetadata: data?.elementMetadata,
        publicAccess: data?.publicAccess,
        iconUrl: data?.metadata?.iconUrl,
        templateID: data?.metadata?.templateID,
        icon: data?.metadata?.icon ?? defaults?.icon,
        title: data?.title
      }
  
      return removeNulls(metadata)
    }
  }
  
  
  export const deserializeSpecial: { [elementType: string]: (element: any) => any } = {
    nodeILink: (el: any) => {
      return {
        type: 'ilink',
        value: el.nodeID,
        id: el.id,
        children: [{ text: '', id: generateTempId() }]
      }
    },
    blockILink: (el: any) => {
      return {
        type: 'ilink',
        value: el.nodeID,
        blockId: el.blockID,
        blockValue: el.blockAlias,
        id: el.id,
  
        children: [{ text: '', id: generateTempId() }]
      }
    },
    webLink: (el: any) => {
      return {
        type: 'a',
        url: el.url,
        id: el.id,
  
        children: deserializeContent(el.children) ?? [{ text: '', id: generateTempId() }]
      }
    }
  }
  
  // From API to content
  export const deserializeContent = (sanatizedContent: any[]) => {
    return sanatizedContent?.map((el) => {
      if (Object.keys(deserializeSpecial).includes(el.elementType)) {
        const dEl = deserializeSpecial[el.elementType](el)
        return dEl
      }
      const nl: any = {}
  
      if (el.elementType !== 'paragraph' && el.elementType !== undefined) {
        nl.type = el.elementType
      }
  
      if (el.id !== undefined) {
        nl.id = el.id
      }
  
      nl.metadata = extractMetadata(el)
  
      // Properties
      if (el.properties) {
        const elProps = { ...el.properties }
        Object.keys(el.properties).forEach((k) => {
          if (directPropertyKeys.includes(k)) {
            nl[k] = el.properties[k]
            delete elProps[k]
          }
        })
  
        if (Object.keys(elProps).length > 0) {
          nl.properties = elProps
        }
      }
  
      if (el.children && el.children.length > 0) {
        nl.children = deserializeContent(el.children ?? [])
      } else {
        nl.text = el.content
      }
  
      return nl
    })
  }