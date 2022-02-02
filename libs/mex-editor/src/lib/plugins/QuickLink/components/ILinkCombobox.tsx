import * as React from 'react';
import { Combobox } from '../../../components/ComboBox';
import { useOnSelectItem } from '../../../hooks/useOnSelectItem';
import { useComboboxStore, ComboboxKey } from '../../../store/combobox';
import { ILinkComboboxItem } from './ILinkComboboxItem';

export const ILinkComboboxComponent = () => {
  const onSelectItem = useOnSelectItem();

  return (
    <Combobox
      onSelectItem={onSelectItem as any}
      onRenderItem={ILinkComboboxItem}
    />
  );
};

export const ILinkCombobox = () => {
  const key = useComboboxStore((state) => state.key);

  return (
    <div style={key !== ComboboxKey.ILINK ? { display: 'none' } : {}}>
      <ILinkComboboxComponent />
    </div>
  );
};
