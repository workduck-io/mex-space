import React from 'react';
import { Combobox } from '../components/ComboBox/components/Combobox';
import {
  ComboboxItemProps,
  RenderFunction,
} from '../components/ComboBox/components/Combobox.types';
import { useComboboxControls } from '../components/ComboBox/hooks/useComboboxControls';
import { getCreateableOnSelect } from '../components/ComboBox/hooks/useComboboxOnKeyDown';
import { useComboboxStore } from '../components/ComboBox/useComboboxStore';
import { SlashCommandConfig } from '../SlashCommands/Types';
import { useOnSelectItem } from './useMultiComboboxOnKeyDown';

export interface ComboConfigData {
  keys: ConfigDataKeys;
  slashCommands: ConfigDataSlashCommands;
}

export interface ConfigDataKeys {
  [type: string]: SingleComboboxConfig;
}

export interface ConfigDataSlashCommands {
  [type: string]: SlashCommandConfig;
}

export interface SingleComboboxConfig {
  slateElementType: string;
  newItemHandler: (newItem: string, parentId?: any) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
  renderElement: RenderFunction<ComboboxItemProps>;
}

export const ElementComboboxComponent = ({
  keys,
  slashCommands,
}: ComboConfigData) => {
  const comboboxKey: string = useComboboxStore.getState().key;
  const comboRenderType = keys[comboboxKey];
  const { elementChangeHandler: onSelectItem, isSlash } = useOnSelectItem(
    comboboxKey,
    slashCommands,
    comboRenderType
  );
  // console.log({ slashCommands })
  const onNewItem = (newItem, parentId?) => {
    comboRenderType.newItemHandler(newItem, parentId);
  };

  const creatableOnSelectItem = getCreateableOnSelect(onSelectItem, onNewItem);

  return (
    <Combobox
      isSlash={isSlash}
      onSelectItem={isSlash ? (onSelectItem as any) : creatableOnSelectItem}
      onRenderItem={comboRenderType.renderElement}
    />
  );
};

// Handle multiple combobox
export const MultiComboboxContainer = (props: ComboConfigData) => {
  useComboboxControls(true);

  return <ElementComboboxComponent {...props} />;
};
