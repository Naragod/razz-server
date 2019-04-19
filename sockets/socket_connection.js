
const listenToEvents = require('./socketEvents');

establishConnection = (socket, callback) => {
    console.log("User Connected with id:", socket.id);
    if(callback){
        callback();
    }
    listenToEvents(socket);
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