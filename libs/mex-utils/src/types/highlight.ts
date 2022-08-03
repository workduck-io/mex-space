export interface HighlightMetaBlock {
  parentTagName: string
  parentIndex: number
  textOffset: number
}

export interface ElementHighlightMetadata {
  type: string
  saveableRange: {
    startMeta: HighlightMetaBlock
    endMeta: HighlightMetaBlock
    text: string
    id: string
  }
  sourceUrl: string
}
