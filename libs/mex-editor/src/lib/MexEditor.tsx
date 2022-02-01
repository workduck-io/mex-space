import { useState, useEffect } from 'react';
import {
  Options,
  PlaceholderProps,
  Plate,
  PlatePlugin,
  selectEditor,
  SelectEditorOptions,
  usePlateEditorRef,
} from '@udecode/plate';
import useMemoizedPlugins from './plugins';
import { ComboboxConfig } from './components/ComboBox/types';
import { EditableProps } from 'slate-react/dist/components/editable';
import { useComboboxConfig } from './components/ComboBox/config';

export type MexEditorValue = Array<any>;

export interface MexEditorOptions {
  editableProps?: EditableProps;
  focusOptions?: SelectEditorOptions;
  withDraggable?: boolean;
  withBallonToolbar?: boolean;
}

export interface MetaData {
  parentId?: string;
  delimiter?: string;
}

/* eslint-disable-next-line */
export interface MexEditorProps {
  comboboxConfig?: ComboboxConfig;
  editorId: string; // * Unique ID for the Mex Editor
  className?: string; // * Pass className to styled Mex Editor
  value: MexEditorValue; // * Initial value of editor, to set onChange content, use `editor.children = content`
  placeholders?: Options<Array<PlaceholderProps>>; // * Array of objects with `placeholder` text and element `key
  onChange?: (value: MexEditorValue) => void; // * Callback on change
  options?: MexEditorOptions; // * Power the editor with options
  meta?: MetaData; // * MetaData of current editor
  plugins?: Array<PlatePlugin>; // * Core of editor
  exlude?: Array<string>; // * Array of elements from MEX_EDITOR_ELEMENTS
}

export function MexEditor(props: MexEditorProps) {
  const editorRef = usePlateEditorRef();
  const [content, setContent] = useState<MexEditorValue>([]);

  useEffect(() => {
    if (editorRef && props?.options?.focusOptions) {
      selectEditor(editorRef, props.options.focusOptions);
    }
  }, [editorRef, props.editorId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { comboOnChangeConfig, comboOnKeydownConfig } = useComboboxConfig(
    props.editorId,
    props.meta
  );

  const prePlugins = useMemoizedPlugins();

  // const plugins = [
  //   ...prePlugins,
  //   {
  //     key: 'MULTI_COMBOBOX',
  //     handlers: {
  //       onChange: pluginConfigs.combobox.onChange,
  //       onKeyDown: pluginConfigs.combobox.onKeyDown,
  //     },
  //   },
  // ];

  const onChange = (value: MexEditorValue) => {
    setContent(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <>
      <Plate
        id={props.editorId}
        value={props.value}
        onChange={onChange}
        editableProps={props?.options?.editableProps}
        plugins={prePlugins}
      />
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </>
  );
}

export default MexEditor;
