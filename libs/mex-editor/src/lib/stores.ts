import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { MexEditorProps, MexEditorValue } from './types/editor';

// (optional, define types for TypeScript)
type Todo = { text: MexEditorValue };

// Create your SyncedStore store
export const store = syncedStore({ content: [] as Todo[], fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("syncedstore-todos", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
