import {
  getBlockAbove,
  getPluginType,
  insertNodes,
  PEditor,
  PlateEditor,
  TElement,
} from '@udecode/plate';
import { Editor, Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { useComboboxStore, ComboboxKey } from '../../store/combobox';
import { useMexEditorStore } from '../../store/editor';
import { IComboboxItem } from '../ComboBox/types';
import {
  ComboConfigData,
  ConfigDataSlashCommands,
  SingleComboboxConfig,
} from './multiComboboxContainer';

export interface ComboTypeHandlers {
  slateElementType: string;
  newItemHandler: (newItem: string, parentId?) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const useElementOnChange = (
  elementComboType: SingleComboboxConfig,
  keys?: Array<any>
) => {
  const closeMenu = useComboboxStore((state) => state.closeMenu);

  return (editor: PlateEditor, item: IComboboxItem) => {
    try {
      let comboType = elementComboType;
      if (keys) {
        const comboboxKey: string = useComboboxStore.getState().key;
        comboType = keys[comboboxKey];
      }

      const targetRange = useComboboxStore.getState().targetRange;
      const parentPath = useMexEditorStore.getState().metaData.parentPath;
      const type = getPluginType(editor, comboType.slateElementType);

      if (targetRange) {
        // console.log('useElementOnChange 1', { comboType, type });

        const pathAbove = getBlockAbove(editor)?.[1];
        const isBlockEnd =
          editor.selection &&
          pathAbove &&
          Editor.isEnd(editor, editor.selection.anchor, pathAbove);

        // console.log('useElementOnChange 2', { type, pathAbove, isBlockEnd });
        // insert a space to fix the bug
        if (isBlockEnd) {
          Transforms.insertText(editor, ' ');
        }

        const { key, isChild } = withoutContinuousDelimiter(item.text);

        let itemValue;
        if (key) itemValue = isChild ? `${parentPath}${key}` : key;
        else itemValue = parentPath;

        //* Select the ilink text and insert the ilink element
        Transforms.select(editor, targetRange);

        insertNodes<TElement>(editor, {
          type: type as any, // eslint-disable-line @typescript-eslint/no-explicit-any
          children: [{ text: '' }],
          value: itemValue,
        });

        //* Move the selection after the ilink element
        Transforms.move(editor);

        //* Delete the inserted space
        if (isBlockEnd) {
          Transforms.delete(editor);
        }

        //* return true
        return closeMenu();
      }
    } catch (e) {
      console.error(e);
    }
    return undefined;
  };
};

export const useOnSelectItem = (
  comboboxKey: string,
  slashCommands: ConfigDataSlashCommands,
  singleComboConfig: SingleComboboxConfig
) => {
  const slashCommandOnChange = useSlashCommandOnChange(slashCommands);
  const elementOnChange = useElementOnChange(singleComboConfig);

  const isSlash = comboboxKey === ComboboxKey.SLASH_COMMAND;

  let elementChangeHandler: (
    editor: PEditor & ReactEditor,
    item: IComboboxItem
  ) => any;

  if (isSlash) {
    elementChangeHandler = slashCommandOnChange;
  } else {
    elementChangeHandler = elementOnChange;
  }
  return { elementChangeHandler, isSlash };
};

const useMultiComboboxOnKeyDown = (config: ComboConfigData) => {
  return useComboboxOnKeyDown(config);
};

export default useMultiComboboxOnKeyDown;
