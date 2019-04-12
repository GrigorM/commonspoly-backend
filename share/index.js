var ShareDB = require('sharedb');
var WebSocket = require('ws');
var WebSocketJSONStream = require('websocket-json-stream');
// const db = require('sharedb-mongo')('mongodb://mongo:27017/commonspoly');
const db = require('sharedb-mongo')('mongodb://heroku_lmn3f2ph@ds239206.mlab.com:39206/heroku_lmn3f2ph');


// db user / password -> grgml / commonspoly

var backend = new ShareDB({ db });

var doc = [];

const shareDBServer = {
  // createDoc(server) {
  //   var connection = backend.connect();
  //   for (let i=0; i<5; i++) {
  //     doc[i] = connection.get('whiteboardActions', `session1panel${i}`); //
  //
  //     doc[i].fetch(function(err) {
  //       if (err) throw err;
  //       if (doc[i].type === null) {
  //         doc[i].create({objects: [], background: [{}]});
  //         return;
  //       }
  //     });
  //   }
  //   this.startServer(server);
  // },

  startServer(server) {
    var connection = backend.connect();
    // for (let i=0; i<5; i++) {
    //   doc[i] = connection.get('whiteboardActions', `session1panel${i}`); //
    //
    //   doc[i].fetch(function(err) {
    //     if (err) throw err;
    //     if (doc[i].type === null) {
    //       doc[i].create({objects: [], background: [{}]});
    //       return;
    //     }
    //   });
    // }

    // Connect any incoming WebSocket connection to ShareDB
    var wss = new WebSocket.Server({server: server});
    wss.on('connection', function(ws, req) {
      console.log('connected to sharedb');
      // console.log(doc.type);
      var stream = new WebSocketJSONStream(ws);
      backend.listen(stream);

      ws.on('close', () => {
        console.log('connection closed');
      });

      ws.on('error', e => {
        console.log('handle error');
        console.log(e);
      });
    });
  }
}

module.exports = { shareDBServer };
