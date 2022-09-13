import defaultData from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { PickerContainer } from './EmojiPicker.style'
import { EmojiPickerProps } from './EmojiPicker.types'

export const EmojiPicker = ({ data, onSelect }: EmojiPickerProps) => {
  return (
    <PickerContainer>
      <Picker data={data ?? defaultData} onEmojiSelect={onSelect} />
    </PickerContainer>
  )
}
