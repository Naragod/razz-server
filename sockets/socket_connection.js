
const authenticate = require('./authentication');
const dbEvents = require('./dbEvents');
const listenToCustomEvents = require('./customEvents');
let connectedClients = [];

establishConnection = (socket, callback) => {
    connectedClients.unshift(socket.id);
    console.log("Connected Clients:", connectedClients)
    socket.on("disconnect", () => {
        connectedClients.pop();
    });

    authenticate(socket);
    // dbEvents(socket);
    listenToCustomEvents(socket);
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