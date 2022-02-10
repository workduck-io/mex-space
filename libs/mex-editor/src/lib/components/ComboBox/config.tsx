import { PlatePlugin } from '@udecode/plate';
import useMemoizedPlugins from '../../plugins';
import { QuickLinkComboboxItem } from '../../plugins/QuickLink/components/QuickLinkComboboxItem';
import { TagComboboxItem } from '../../plugins/Tags/components/TagComboboxItem';
import { ELEMENT_ILINK, ELEMENT_TAG } from '../../types';
import { PluginOptions } from '../../types/editor';
import useMultiComboboxOnChange from '../MultiCombobox/useMultiComboboxChange';
import useMultiComboboxOnKeyDown from '../MultiCombobox/useMultiComboboxOnKeyDown';
import {
  ComboboxConfig,
  ComboboxKey,
  ComboboxKeyDownConfig,
  ComboboxOnChangeConfig,
} from './types';

export const useComboboxConfig = (
  editorId: string,
  config: ComboboxConfig,
  customPlugins: Array<PlatePlugin> = [],
  pluginOptions: PluginOptions = {
    ilink: { key: ELEMENT_ILINK },
    tag: { key: ELEMENT_TAG },
  }
) => {
  const comboOnKeydownConfig: ComboboxKeyDownConfig = {
    keys: {
      ilink: {
        slateElementType: ELEMENT_ILINK,
        newItemHandler: (item) => console.log(item),
        itemRenderer: QuickLinkComboboxItem,
      },
      tag: {
        slateElementType: ELEMENT_TAG,
        newItemHandler: (item) => console.log(item),
        itemRenderer: TagComboboxItem,
      },
      ...config.onKeyDownConfig.keys,
    },
    slashCommands: {
      ...config.onKeyDownConfig.slashCommands,
    },
  };

  const comboOnChangeConfig: ComboboxOnChangeConfig = {
    ilink: {
      cbKey: ComboboxKey.ILINK,
      trigger: '[[',
      data: [
        { path: 'documentation.one', nodeid: 'ilink1', icon: 'something' },
        {
          path: 'documentation.libraries',
          nodeid: 'ilink1',
          icon: 'something',
        },
      ].map((l) => ({ ...l, value: l.path, text: l.path })),
    },
    tag: {
      cbKey: ComboboxKey.TAG,
      trigger: '#',
      data: [{ value: 'dinesh' }, { value: 'first' }, { value: 'second' }].map(
        (t) => ({ ...t, text: t.value })
      ),
      icon: 'ri:hashtag',
    },
    ...config.onChangeConfig,
  };

  const prePlugins = useMemoizedPlugins(pluginOptions);

  const plugins = [
    ...prePlugins,
    ...customPlugins,
    {
      key: 'MULTI_COMBOBOX',
      handlers: {
        onChange: useMultiComboboxOnChange(editorId, comboOnChangeConfig),
        onKeyDown: useMultiComboboxOnKeyDown(comboOnKeydownConfig),
      },
    },
  ];

  return {
    plugins,
    comboOnKeydownConfig,
  };
};
