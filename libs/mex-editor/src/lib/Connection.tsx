// const { slateType } = require('slate-ot');
// const sharedb = require('sharedb/lib/client');
// sharedb.types.register(slateType.type);

// // Open WebSocket connection to ShareDB server
// var socket = new WebSocket('ws://' + 'localhost:8080');
// var connection = new sharedb.Connection(socket);

// export default connection;
import ReconnectingWebSocket from 'reconnecting-websocket';

var sharedb = require('sharedb/lib/client');
var richText = require('rich-text');

sharedb.types.register(richText.type);

var socket = new ReconnectingWebSocket("ws://localhost:8080");
var connection = new sharedb.Connection(socket);

export default connection;