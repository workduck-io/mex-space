export interface Emoji {
  id: string
  name: string
  emoticons: Array<string>
  keywords: Array<string>
  version: number
}

export interface EmojiPickerProps {
  data: any
  onSelect: (emoji: Emoji) => void
}
