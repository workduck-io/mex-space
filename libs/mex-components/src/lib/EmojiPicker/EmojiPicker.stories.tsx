import data from '@emoji-mart/data'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { EmojiPicker } from './EmojiPicker'
import { Emoji } from './EmojiPicker.types'

export default {
  component: EmojiPicker,
  argTypes: {}
} as ComponentMeta<typeof EmojiPicker>

const onSelectItem = (emoji: Emoji) => console.log('Selected the emoji', { emoji })

export const Base: ComponentStory<typeof EmojiPicker> = () => <EmojiPicker data={data} onSelect={onSelectItem} />

Base.args = {}
