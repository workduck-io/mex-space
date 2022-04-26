import React, { useState, useEffect } from 'react';
import { Plate, selectEditor, usePlateEditorRef } from '@udecode/plate';
import { useComboboxConfig } from './components/ComboBox/config';
import { MultiComboboxContainer } from './components/MultiCombobox/multiComboboxContainer';
import { useMexEditorStore } from './store/editor';
import Toolbar from './components/Toolbar/Toolbar';
import { MexEditorProps, MexEditorValue } from './types/editor';
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./stores";

export function MexEditor(props: MexEditorProps) {
  const editorRef = usePlateEditorRef();
  const [content, setContent] = useState<MexEditorValue>([]);
  const setMetaData = useMexEditorStore((s) => s.setMetaData);
  let test = false;


  const state = useSyncedStore(store);



  useEffect(() => {
    if (editorRef && props?.options?.focusOptions) {
      selectEditor(editorRef, props.options.focusOptions);
    }
    setMetaData(props.meta);
  }, [editorRef, props.editorId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { plugins, comboOnKeydownConfig } = useComboboxConfig(
    props.editorId,
    props?.comboboxConfig,
    props?.components,
    props?.plugins
  );

  const onChange = (value: MexEditorValue) => {

    state.test.push({ text: value });

    setContent(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };
  // console.log('editorn ', props.value);
  return (
    <>
      <div>
        <p>Todo items:</p>
        <p>{JSON.stringify(state)}</p>
      </div>
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
        {props.options?.withBalloonToolbar && props.BalloonMarkToolbarButtons}
      </Plate>
      {props.debug && <pre>{JSON.stringify(content, null, 2)}</pre>}
    </>
  );
}

export default MexEditor;
