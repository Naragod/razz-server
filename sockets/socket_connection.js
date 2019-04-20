
const authenticate = require('./authentication');
const listenToCustomEvents = require('./customEvents');
const listenToDbEvents = require('./dbEvents');

let connectedClients = [];

establishConnection = (socket, callback) => {
    connectedClients.unshift(socket.id);
    console.log("Connected Clients:", connectedClients)
    socket.on("disconnect", () => {
        connectedClients.pop();
    });

    authenticate(socket);
    listenToCustomEvents(socket);
    listenToDbEvents(socket);
    if(callback){
        callback();
    }
};

module.exports = function(io){
    return {
        establishConnection: (callback) => {
            io.on('connection', (socket) => {
                establishConnection(socket, callback);
            });
        },
    };
};