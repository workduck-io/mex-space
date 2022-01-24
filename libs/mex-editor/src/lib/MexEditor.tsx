import styled from 'styled-components';
import {
  Plate,
  PlatePlugin,
  SelectEditorOptions,
  PlaceholderProps,
  Options,
  selectEditor,
  usePlateEditorRef,
} from '@udecode/plate';
import { EditableProps } from 'slate-react/dist/components/editable';
import useMemoizedPlugins from './plugins/plugins';
import useEditorPluginConfig from './plugins/useEditorPluginConfig';
import { useEffect } from 'react';

export type MexEditorValue = Array<any>;

export interface MexEditorOptions {
  editableProps?: EditableProps;
  focusOptions?: SelectEditorOptions;
  withDraggable?: boolean;
  withBallonToolbar?: boolean;
}

/* eslint-disable-next-line */
export interface MexEditorProps {
  editorId: string;
  className?: string;
  value: MexEditorValue;
  placeholders?: Options<Array<PlaceholderProps>>; // * Array of objects with `placeholder` text and element `key
  onChange?: (value: MexEditorValue) => void;
  options?: MexEditorOptions;
  plugins?: Array<PlatePlugin>;
  exlude?: Array<string>; // * Array of elements name extracted from MEX_EDITOR_ELEMENTS
}

const StyledMexEditor = styled.div``;

export function MexEditor(props: MexEditorProps) {
  const editorRef = usePlateEditorRef();

  useEffect(() => {
    if (editorRef && props?.options?.focusOptions) {
      selectEditor(editorRef, props.options.focusOptions);
    }
  }, [editorRef, props.editorId]); // eslint-disable-line react-hooks/exhaustive-deps

  const { pluginConfigs, comboConfigData } = useEditorPluginConfig(
    props.editorId
  );

  // We get memoized plugins
  const prePlugins = useMemoizedPlugins();
  const plugins = [
    ...prePlugins,
    {
      key: 'MULTI_COMBOBOX',
      handlers: {
        onChange: pluginConfigs.combobox.onChange,
        onKeyDown: pluginConfigs.combobox.onKeyDown,
      },
    },
  ];

  return (
    <StyledMexEditor>
      <Plate
        id={props.editorId}
        value={props.value}
        onChange={props.onChange}
        editableProps={props?.options?.editableProps}
        plugins={props.plugins ?? plugins}
      />
    </StyledMexEditor>
  );
}

export default MexEditor;
