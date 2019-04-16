
const env = require('../config');
const fetch = require('node-fetch');
const useful_middleware = require('../route_modules/useful-middleware');

let getDate = function(params){
    let baseURL = env.time.base;
    let delimiter = "/";
    let region = params.region || "";
    let country = params.country || "";
    let city = params.city || "";

    if(region.length > 0){
        baseURL += `${region}${delimiter}`;
    }
    if(country.length > 0){
        baseURL += `${country}${delimiter}`;
    }
    baseURL = `${baseURL}${city}`;
 
    return fetch(baseURL, {method: 'GET'}).then(useful_middleware.checkStatus)
    .then(response => response.json())
    .catch(err => {
        console.log(err);
    });
};

establishConnection = (socket, callback) => {
    console.log("User Connected with id:", socket.id);
    if(callback){
        callback();
    }

    socket.on("getDate", (params) => {
        let date = getDate(params);
        date.then(response => {
            socket.emit("dateReturned", response);
        });
        
    });
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