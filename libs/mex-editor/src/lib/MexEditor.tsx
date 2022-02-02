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
import { ComboboxConfig } from './components/ComboBox/types';
import { EditableProps } from 'slate-react/dist/components/editable';
import { useComboboxConfig } from './components/ComboBox/config';
import { MultiComboboxContainer } from './components/MultiCombobox/multiComboboxContainer';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { useMexEditorStore } from './store/editor';

export type MexEditorValue = Array<any>;

export interface MexEditorOptions {
  editableProps?: EditableProps;
  focusOptions?: SelectEditorOptions;
  withDraggable?: boolean;
  withBallonToolbar?: boolean;
}

export interface MetaData {
  path: string;
  parentPath: string;
  delimiter?: string;
}

/* eslint-disable-next-line */
export interface MexEditorProps {
  theme: DefaultTheme;
  comboboxConfig: ComboboxConfig;
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
  const setMetaData = useMexEditorStore((s) => s.setMetaData);

  useEffect(() => {
    if (editorRef && props?.options?.focusOptions) {
      selectEditor(editorRef, props.options.focusOptions);
    }
    setMetaData(props.meta);
  }, [editorRef, props.editorId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { plugins, comboOnKeydownConfig } = useComboboxConfig(
    props.editorId,
    props.meta,
    props.comboboxConfig
  );

  const onChange = (value: MexEditorValue) => {
    setContent(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <ThemeProvider theme={props.theme}>
      <Plate
        id={props.editorId}
        value={props.value}
        onChange={onChange}
        editableProps={props?.options?.editableProps}
        plugins={plugins}
      >
        <MultiComboboxContainer
          keys={comboOnKeydownConfig.keys}
          slashCommands={comboOnKeydownConfig.slashCommands}
        />
      </Plate>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </ThemeProvider>
  );
}

export default MexEditor;
