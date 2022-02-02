import { MetaData } from '../../MexEditor';
import { COMET_QUICK_LINK } from '../../plugins/QuickLink';
import { ILinkComboboxItem } from '../../plugins/QuickLink/components/ILinkComboboxItem';
import QuickLinkElement from '../../plugins/QuickLink/QuickLinkElement';
import { TagComboboxItem } from '../../plugins/Tags/components/TagComboboxItem';
import { COMET_TAG } from '../../plugins/Tags/createTagPlugin';
import { ComboboxKey } from '../../store/combobox';
import useMultiComboboxOnChange from '../MultiCombobox/useMultiComboboxChange';
import useMultiComboboxOnKeyDown from '../MultiCombobox/useMultiComboboxOnKeyDown';
import {
  ComboboxConfig,
  ComboboxKeyDownConfig,
  ComboboxOnChangeConfig,
} from './types';

export const useComboboxConfig = (
  editorId: string,
  meta: MetaData | undefined,
  config: ComboboxConfig
) => {
  const comboOnKeydownConfig: ComboboxKeyDownConfig = {
    keys: {
      ilink: {
        slateElementType: COMET_QUICK_LINK,
        newItemHandler: (item) => console.log(item),
        itemRenderer: ILinkComboboxItem,
      },
      tag: {
        slateElementType: COMET_TAG,
        newItemHandler: (item) => console.log(item),
        itemRenderer: TagComboboxItem,
      },
    },
    slashCommands: {},
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
  };

  const pluginsConfig = {
    combobox: {
      onChange: useMultiComboboxOnChange(editorId, comboOnChangeConfig),
      onKeyDown: useMultiComboboxOnKeyDown(comboOnKeydownConfig),
    },
  };

  return {
    pluginsConfig,
    comboOnKeydownConfig,
  };
};
