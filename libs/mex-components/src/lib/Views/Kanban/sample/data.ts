import { Lorizzle } from '../../../StorybookHelpers/StorybookHelpers'
import { ItemMap } from '../Kanban.types'
import create from 'zustand'

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
  openStates: {
    'item-1': false,
    'item-2': true
  },
  toggleOpen: (id: string) => {
    const prev = ItemStore.openStates[id]
    if (prev === undefined) {
      ItemStore.openStates[id] = true
    } else {
      ItemStore.openStates[id] = !prev
    }
  },
  getItemData: (id: string) => {
    return itemData[id]
  }
}

interface ItemDataStore {
  openStates: Record<string, boolean>
  toggleOpen: (id: string) => void
  getItemData: (id: string) => ItemData
}

export const useItemStore = create<ItemDataStore>((set, get) => ({
  openStates: {
    'item-1': false,
    'item-2': true
  },
  toggleOpen: (id: string) => {
    const prev = get().openStates[id]
    if (prev === undefined) {
      set((state) => ({
        openStates: {
          ...state.openStates,
          [id]: true
        }
      }))
    } else {
      set((state) => ({
        openStates: {
          ...state.openStates,
          [id]: !prev
        }
      }))
    }
  },
  getItemData: (id: string) => {
    return itemData[id]
  }
}))
