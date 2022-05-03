import React, { useState, useEffect, useMemo} from 'react';

// QuillJS Modules
import { ImageDrop } from "quill-image-drop-module";
import MagicUrl from "quill-magic-url";
import BlotFormatter from "quill-blot-formatter";

import "react-quill/dist/quill.snow.css";
import { Plate, selectEditor, usePlateEditorRef } from '@udecode/plate';
import {
  serializeHtml,
  TDescendant,
  withPlate,
} from '@udecode/plate-core'
import { BaseSelection, createEditor, Transforms } from 'slate'
import {  Operation } from 'slate'
import { useComboboxConfig } from './components/ComboBox/config';
import { MultiComboboxContainer } from './components/MultiCombobox/multiComboboxContainer';
import { useMexEditorStore } from './store/editor';
import Toolbar from './components/Toolbar/Toolbar';
import { MexEditorProps, MexEditorValue } from './types/editor';

import  { Quill } from "react-quill";

const ReactQuill = require('react-quill');
import Connection from "./Connection";

type TCustomOperation = Operation

export function MexEditor(props: MexEditorProps) {
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/magicUrl", MagicUrl);
  Quill.register("modules/blotFormatter", BlotFormatter);

  const editorRef = usePlateEditorRef();
  const [data, setDelta] = React.useState({});
  const [content, setContent] = useState<MexEditorValue>([]);
  const setMetaData = useMexEditorStore((s) => s.setMetaData);

  const connection = Connection.get("examples", "richtext");

  const modules = {
    imageDrop: true,
    magicUrl: true,
    blotFormatter: {},
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "clean"]
    ]
  };

  // const editor = useMemo(
  //   () => withHistory(withReact(createEditor() as any)),
  //   []
  // )

  useEffect(() => {
    if (editorRef && props?.options?.focusOptions) {
      selectEditor(editorRef, props.options.focusOptions);
    }
    setMetaData(props.meta);

    connection.subscribe(function(error) {
      if (error) {
        console.log("Error:", error);
      }

      // set initial data of the document
      setDelta(connection.data);
      connection.on("op", function(op, source) {
        if (source === true) {
          return;
        }

        setDelta(op);
      });
    });
  }, [editorRef, props.editorId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { plugins, comboOnKeydownConfig } = useComboboxConfig(
    props.editorId,
    props?.comboboxConfig,
    props?.components,
    props?.plugins
  );

  const editor = useMemo(
    () =>
      withPlate(createEditor(), { id: props.editorId, plugins: plugins }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const onChange = (value: MexEditorValue) => {
    // const op: TCustomOperation = editorRef.operations[0]
          console.log(JSON.stringify(editor.operations));
    setContent(value);
    if (props.onChange) {
      props.onChange(value);
    }
  };


  const handleChange = (delta, oldDelta, source) => {
    if (source !== "user") {
      return;
    }
    connection.submitOp(delta);
  };

  return (
    <div>
      {/* <ReactQuill value={data} onChange={handleChange} modules={modules} /> */}
      <Plate
      editor={editor}
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
    </div>
  );
}

export default MexEditor;
