// import server from '../index.js';
// const server = require('../index.js');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');


const wsServer = {
  startServer(server) {
    // Create a web server to serve files and listen to WebSocket connections
    // console.log(server);

    // Connect any incoming WebSocket connection to ShareDB
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws, req) {
      console.log('connected');
      ws.on('message', function incoming(message) {
        console.log(message);
        const msg = JSON.parse(message);
        if (msg.type == 'chat') {
        //   console.log('sending back to client');
        //   console.log(msg.content);
        //   // console.log(wss.clients)
          wss.clients.forEach(client => {
            // console.log(client);
            if (client != ws) {
              client.send(message);
            }
          });
        }
      });
      // console.log(doc.type);
    });
  }
}
// function

// export default start
module.exports = { wsServer };
