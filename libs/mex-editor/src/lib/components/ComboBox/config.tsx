import { MetaData } from '../../MexEditor';
import useMultiComboboxOnChange from '../MultiCombobox/useMultiComboboxChange';
import useMultiComboboxOnKeyDown from '../MultiCombobox/useMultiComboboxOnKeyDown';
import {
  ComboboxConfig,
  ComboboxKeyDownConfig,
  ComboboxOnChangeConfig,
} from './types';

export const useComboboxConfig = (
  editorId: string,
  meta: MetaData,
  config: ComboboxConfig
) => {
  const comboOnKeydownConfig: ComboboxKeyDownConfig = config.onKeyDownConfig;
  const comboOnChangeConfig: ComboboxOnChangeConfig = config.onChangeConfig;

  const pluginsConfig = {
    combobox: {
      onChange: useMultiComboboxOnChange(),
      onKeydown: useMultiComboboxOnKeyDown(comboOnKeydownConfig),
    },
  };
};
