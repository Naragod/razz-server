

const listenToCustomEvents = require('./customEvents');
const listenToDbEvents = require('./dbEvents');

establishConnection = (socket, callback) => {
    console.log("User Connected with id:", socket.id);
    if(callback){
        callback();
    }
    listenToCustomEvents(socket);
    listenToDbEvents(socket);
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