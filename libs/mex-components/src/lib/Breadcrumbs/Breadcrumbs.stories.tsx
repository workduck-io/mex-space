import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'

import { Breadcrumbs } from './Breadcrumbs'

export default {
  component: Breadcrumbs,
  argTypes: {}
} as ComponentMeta<typeof Breadcrumbs>

const sampleItems = [
  {
    id: 'item-1',
    label: 'Item 1',
    icon: 'ri:file-list-2-line'
  },

  {
    id: 'item-2',
    label: 'Item 2',
    icon: 'ri:file-list-2-line'
  },
  {
    id: 'item-long',
    label: 'Item That is pretty damn long in width',
    icon: 'ri:file-list-2-line'
  },
  {
    id: 'item-3',
    label: 'Item 3',
    icon: 'ri:file-list-2-line'
  }
]

const items = [
  {
    id: 'item-3',
    label: 'Item 3'
  }
]

const onOpenItem = (id: string) => console.log('Fake Opening the item', { id })

export const Base: ComponentStory<typeof Breadcrumbs> = () => (
  <Breadcrumbs items={sampleItems} onOpenItem={onOpenItem} />
)

export const SingleElemet: ComponentStory<typeof Breadcrumbs> = () => (
  <Breadcrumbs items={items} onOpenItem={onOpenItem} />
)

Base.args = {}
