const { wsServer } = require('./ws/index');
const { shareDBServer } = require('./share/index');

var http = require('http');
var express = require('express');
var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');


// Create a web server to serve files and listen to WebSocket connections
var app = express();
const port = process.env.PORT || 9001;

app.use(express.static('static'));
// var server = http.createServer(app);
var server2 = http.createServer(app);

// server.listen(9000);
server2.listen(port);
console.log(`Listening on http://localhost:${port}`);

// module.exports.server = server;

// wsServer.startServer(server);
shareDBServer.startServer(server2);
