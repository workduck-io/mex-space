import React, { useState, useEffect } from 'react';
import { Plate, selectEditor, usePlateEditorRef } from '@udecode/plate';
import { useComboboxConfig } from './components/ComboBox/config';
import { MultiComboboxContainer } from './components/MultiCombobox/multiComboboxContainer';
import { useMexEditorStore } from './store/editor';
import Toolbar from './components/Toolbar/Toolbar';
import { MexEditorProps, MexEditorValue } from './types/editor';
import { usePlugins } from './hooks/usePlugins';

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

  const { comboboxPlugin, comboOnKeydownConfig } = useComboboxConfig(
    props?.comboboxConfig
  );

  const { plugins } = usePlugins(
    props.components,
    props.options?.withMexPlugins ?? true,
    props.plugins,
    comboboxPlugin
  );

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
        plugins={plugins}
      >
        {!props.options?.withoutCombobox && (
          <MultiComboboxContainer {...comboOnKeydownConfig} />
        )}
        {props.options?.withBallonToolbar && <Toolbar />}
      </Plate>
      {props.debug && <pre>{JSON.stringify(content, null, 2)}</pre>}
    </>
  );
}

export default MexEditor;
