const authenticate = require('./authentication');
const dbEvents = require('./dbEvents');
const listenToCustomEvents = require('./customEvents');
const authResponseModel = require('../models/authResponseModel');
const auth = require('../auth/auth');

const connectedClients = [];

const establishConnection = (socket, callback) => {
  connectedClients.unshift(socket.id);
  console.log('Connected Clients:', connectedClients);
  socket.on('disconnect', () => {
    const disconnectedClient = connectedClients.pop();
    console.log(`Client: ${disconnectedClient}: disconnected.`);
  });

  authenticate(socket);
  // dbEvents(socket);
  listenToCustomEvents(socket);
  if (callback) {
    callback();
  }
};

module.exports = (io) => ({
  connect: (callback) => {
    io.use((socket, next) => {
      const handshake = socket.handshake.query;
      if (!handshake || !handshake.token) {
        next(new Error('Authentication Failed.'));
      }
      auth.verify(handshake.token, {}, (err, decoded) => {
        if (err) {
          socket.emit('disconnect', authResponseModel(false, "Could not verify token.", null));
          next(new Error('Authentication Failed: Incorrect Token.'));
        }
        console.log('Socket connection established.');
        next(decoded);
      });
    });

    io.on('connection', (socket) => {
      establishConnection(socket, callback);
    });
  },
});
