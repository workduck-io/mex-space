import { Lorizzle } from '../../../StorybookHelpers/StorybookHelpers'
import { ItemMap } from '../Kanban.types'

interface ItemData {
  id: string
  title: string
  description: string
}

export const sampleItemMap: ItemMap = {
  'column-1': [{ id: 'item-1' }],
  'column-2': [
    { id: 'item-2' },
    { id: 'item-4' },
    // hundred more items
    ...Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i + 5}`
    }))
  ],
  'column-3': [{ id: 'item-3' }]
}

const allItemKeys = Object.values(sampleItemMap)
  .flat()
  .map((item) => item.id)

const itemData = allItemKeys.reduce((acc, key) => {
  const randomLength = Math.floor(Math.random() * 400) + 20
  const text = Lorizzle.slice(0, randomLength)
  acc[key] = {
    id: key,
    title: `Item ${key}`,
    description: text
  }
  return acc
}, {} as Record<string, ItemData>)

export const ItemStore = {
  getItemData: (id: string) => {
    return itemData[id]
  }
}
