//@ts-nocheck
import { MentionNodeData } from '@udecode/plate'
import { TEditor } from '@udecode/plate-core'
import { useCallback } from 'react'
import shallow from 'zustand/shallow'

import { IComboboxItem } from '../components/ComboBox/types'
import { ComboboxKey, useComboboxStore } from '../store/combobox'
import { useComboboxOnChange } from './useComboOnChange'

export const useTagOnChange = (editor: TEditor, data: MentionNodeData[]) => {
  const comboboxOnChange = useComboboxOnChange({
    editor,
    key: ComboboxKey.TAG,
    trigger: '#'
  })
  const { maxSuggestions, setItems } = useComboboxStore(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    ({ maxSuggestions, setItems }) => ({
      maxSuggestions,
      setItems
    }),
    shallow
  )

  return useCallback(() => {
    const res = comboboxOnChange()
    if (!res) return false

    const { search } = res

    if (!search) return false

    const items: IComboboxItem[] = data
      .filter((c) => c.text.toLowerCase().includes(search.toLowerCase()))
      .slice(0, maxSuggestions)
      .map((item) => ({
        key: item.value,
        text: item.text
      }))

    setItems(items)

    return true
  }, [comboboxOnChange, data, maxSuggestions, setItems])
}
