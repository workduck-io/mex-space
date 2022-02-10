import {
  Options,
  PlaceholderProps,
  PlatePlugin,
  SelectEditorOptions,
} from '@udecode/plate';
import { EditableProps } from 'slate-react/dist/components/editable';
import { ComboboxConfig } from '.';

export type MexEditorValue = Array<any>;

export enum CustomElements {
  ILINK = 'ilink',
  TAG = 'tag',
}

export type PluginOptions = Record<CustomElements, PlatePlugin>;

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
  comboboxConfig: ComboboxConfig;
  editorId: string; // * Unique ID for the Mex Editor
  className?: string; // * Pass className to styled Mex Editor
  value: MexEditorValue; // * Initial value of editor, to set onChange content, use `editor.children = content`
  placeholders?: Options<Array<PlaceholderProps>>; // * Array of objects with `placeholder` text and element `key
  onChange?: (value: MexEditorValue) => void; // * Callback on change
  options?: MexEditorOptions; // * Power the editor with options
  meta?: MetaData; // * MetaData of current editor
  plugins?: Array<PlatePlugin>; // * Core of editor
  pluginOptions?: PluginOptions;
  exlude?: Array<string>; // * Array of elements from MEX_EDITOR_ELEMENTS
}
