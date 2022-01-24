import { ELEMENT_MEDIA_EMBED, ELEMENT_TABLE } from '@udecode/plate';
import { ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import { useMemo } from 'react';
import useAnalytics from '../../services/analytics';
import { useSnippets } from '../../hooks/useSnippets';
import { ComboboxKey } from '../components/combobox/useComboboxStore';
import { ILinkComboboxItem } from '../components/ilink/components/ILinkComboboxItem';
import { ELEMENT_ILINK } from '../components/ilink/defaults';
import { ELEMENT_INLINE_BLOCK } from '../components/InlineBlock/types';
import { ComboConfigData } from '../components/multi-combobox/multiComboboxContainer';
import useMultiComboboxOnChange from '../components/multi-combobox/useMultiComboboxChange';
import useMultiComboboxOnKeyDown from '../components/multi-combobox/useMultiComboboxOnKeyDown';
import { SlashComboboxItem } from '../components/SlashCommands/SlashComboboxItem';
import { useSyncConfig } from '../components/SlashCommands/useSyncConfig';
import { TagComboboxItem } from '../components/tag/components/TagComboboxItem';
import { ELEMENT_TAG } from '../components/tag/defaults';
import useDataStore from '../../store/useDataStore';
import { useEditorStore } from '../../store/useEditorStore';

const useEditorPluginConfig = (editorId: string) => {
  const tags = useDataStore((state) => state.tags);
  const ilinks = useDataStore((state) => state.ilinks);
  const slashCommands = useDataStore((state) => state.slashCommands);
  const node = useEditorStore((state) => state.node);

  const addTag = useDataStore((state) => state.addTag);
  const addILink = useDataStore((state) => state.addILink);
  const { getSnippetsConfigs } = useSnippets();
  const { getSyncBlockConfigs } = useSyncConfig();
  const { trackEvent } = useAnalytics();

  // Combobox
  const snippetConfigs = getSnippetsConfigs();
  const syncBlockConfigs = getSyncBlockConfigs();

  const ilinksForCurrentNode = useMemo(() => {
    return ilinks.filter((item) => item.key !== node.id);
  }, [node, ilinks]);

  const comboConfigData: ComboConfigData = {
    keys: {
      ilink: {
        slateElementType: ELEMENT_ILINK,
        newItemHandler: (newItem, parentId?) => {
          addILink(newItem, null, parentId);
        },
        renderElement: ILinkComboboxItem,
      },
      inline_block: {
        slateElementType: ELEMENT_INLINE_BLOCK,
        newItemHandler: (newItem, parentId?) => {
          addILink(newItem, null, parentId);
        },
        renderElement: ILinkComboboxItem,
      },
      tag: {
        slateElementType: ELEMENT_TAG,
        newItemHandler: (newItem) => {
          addTag(newItem);
        },
        renderElement: TagComboboxItem,
      },
      slash_command: {
        slateElementType: 'slash_command',
        newItemHandler: () => undefined,
        renderElement: SlashComboboxItem,
      },
    },
    slashCommands: {
      webem: {
        slateElementType: ELEMENT_MEDIA_EMBED,
        command: 'webem',
        options: {
          url: 'http://example.com/',
        },
      },
      excalidraw: {
        slateElementType: ELEMENT_EXCALIDRAW,
        command: 'canvas',
      },
      table: {
        slateElementType: ELEMENT_TABLE,
        command: 'table',
      },
      ...snippetConfigs,
      ...syncBlockConfigs,
    },
  };

  const OnChangeConf = {
    ilink: {
      cbKey: ComboboxKey.ILINK,
      trigger: '[[',
      data: ilinks,
      icon: 'ri:file-list-2-line',
    },
    inline_block: {
      cbKey: ComboboxKey.INLINE_BLOCK,
      trigger: '![[',
      data: ilinksForCurrentNode,
      icon: 'ri:picture-in-picture-line',
    },
    tag: {
      cbKey: ComboboxKey.TAG,
      trigger: '#',
      data: tags,
      icon: 'ri:hashtag',
    },
    slash_command: {
      cbKey: ComboboxKey.SLASH_COMMAND,
      trigger: '/',
      icon: 'ri:flask-line',
      data: slashCommands,
    },
  };

  const pluginConfigs = {
    combobox: {
      onChange: useMultiComboboxOnChange(editorId, OnChangeConf),

      onKeyDown: useMultiComboboxOnKeyDown(comboConfigData),
    },
  };

  return { pluginConfigs, comboConfigData };
};

export default useEditorPluginConfig;
