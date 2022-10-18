import { ItemMap, Item } from './Kanban.types'

export const sampleItemMap: ItemMap = {
  'column-1': [{ id: 'item-1', content: 'First task' }],
  'column-2': [
    { id: 'item-2', content: 'Second task' },
    { id: 'item-4', content: 'Fourth task' },
    // hundred more items
    ...Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i + 5}`,
      content: `Task ${i + 5}`
    }))
  ],
  'column-3': [{ id: 'item-3', content: 'Third task' }]
}
