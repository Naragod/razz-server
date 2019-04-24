
const authenticate = require('./authentication');
const dbEvents = require('./dbEvents');
const listenToCustomEvents = require('./customEvents');
const authResponseModel = require('../models/authResponseModel');
const auth = require('../auth/auth');

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
            io.use((socket, next) => {
                let handshake = socket.handshake.query;
                if(!handshake || !handshake.token){
                    next(new Error("Authentication Failed."));
                }
                auth.verify(handshake.token, {}, (err, decoded) => {
                    if(err){
                        socket.emit("disconnect", authResponseModel());
                        next(new Error("Authentication Failed: Incorrect Token."));
                    }
                    socket.decoded = decoded;
                });
                next();
            });

            io.on('connection', (socket) => {
                establishConnection(socket, callback);
            });
        },
    };
};