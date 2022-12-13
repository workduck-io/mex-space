import React from 'react'

import data from '@emoji-mart/data'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EmojiPicker } from './EmojiPicker'
import { Emoji } from './EmojiPicker.types'

export default {
  component: EmojiPicker,
  argTypes: {}
} as ComponentMeta<typeof EmojiPicker>

const onSelectItem = (emoji: Emoji) => console.log('Selected the emoji', { emoji })

export const Base: ComponentStory<typeof EmojiPicker> = () => <EmojiPicker data={data} onSelect={onSelectItem} />

Base.args = {}
