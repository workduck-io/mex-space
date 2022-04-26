import React, { useState, useEffect } from 'react';
import { Plate, selectEditor, usePlateEditorRef } from '@udecode/plate';
import { useComboboxConfig } from './components/ComboBox/config';
import { MultiComboboxContainer } from './components/MultiCombobox/multiComboboxContainer';
import { useMexEditorStore } from './store/editor';
import Toolbar from './components/Toolbar/Toolbar';
import { MexEditorProps, MexEditorValue } from './types/editor';
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./stores";
import { clear } from 'console';

export function MexEditor(props: MexEditorProps) {
  const editorRef = usePlateEditorRef();
  const [content, setContent] = useState<MexEditorValue>([]);
  const setMetaData = useMexEditorStore((s) => s.setMetaData);
  let test = false;


  const state = useSyncedStore(store);

  // for(let key in state.content) {
  //   delete state.content[key]
  // }

  // let doc = JSON.parse(JSON.stringify(state.content));

  // // if (doc.length > 1) {
  // //   console.log('doc length ' + JSON.stringify(doc[doc.length -1].text));
  // // }
  // if (doc.length === 0) {
  //   doc = [{text: [{ type: 'p', children: [{ text: '' }] }] }];
  // }

  // let doc = JSON.parse(JSON.stringify(state.content));
  // if (doc == null) {
  //   console.log('doc is null');
  //   doc = [{ type: 'p', children: [{ text: '' }] }];
  // }

  // console.log('state' + JSON.stringify(doc[doc.length -1]) + ' ' + doc.length);



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
    // if (JSON.stringify(value) != "[{\"type\":\"p\",\"children\":[{\"text\":\"\"}]}]") {
    //   console.log("Pushing value " + JSON.stringify(value));
      // state.content.push({ text: value });
    // }

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
