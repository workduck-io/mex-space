import { MetaData } from '../MexEditor';
import { createStore, setStoreValue } from '../utils/store.utils';

export type EditorStateType = {
  // * Meta Data of editor
  metaData: MetaData;
  setMetaData: (metaData: MetaData) => void;
};

export const useMexEditorStore = createStore()<EditorStateType>((set) => ({
  key: {},
  setKey: setStoreValue(set, 'metaData', 'setMetaData'),
}));
