
const env = require('../config');
const fetch = require('node-fetch');
const randomizer = require('../randomizer/randomizer');
const checkConnectionStatus = require('../db/useful-middleware').checkStatus;
const tableManager = require('../db/tableManager');
const TableModel = require('../models/tableModel');

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
 
    return fetch(baseURL, {method: 'GET'}).then(checkConnectionStatus)
    .then(response => response.json())
    .catch(err => {
        console.log(err);
    });
};

module.exports = function(socket){
    // Get Date
    socket.on("getDate", (params) => {
        let date = getDate(params);
        date.then(response => {
            socket.emit("dateReturned", response);
        });
    });

    // Randomize List
    socket.on('randomizeList', data => {
        let rollNumber = data.rollNumber;
        let raffleList = data.raffleList;
        let rollResults = [];
        
        while(rollNumber > 0){
            // deep copy
            raffleList = JSON.parse(JSON.stringify(randomizer.shuffle(raffleList)));
            rollResults.push({
                result: raffleList,
                rollNumber: rollNumber
            });

            // database operation
            tableManager.saveToTable({
                table: "roll-result",
                raffleid: "22",
                data: raffleList.join(';')
            });
            rollNumber --;
        }
        
        socket.emit("listReturned", {rollResults: rollResults});
    });

    socket.on("getTrueRandomNumber", (min, max, size) => {
        min = min || 2;
        max = max || 12;
        size = size || 1;
        let result = {randomNumbers: randomizer.getRandomNumbers(min, max, size)};
        socket.emit("trueRandomNumberReturned", result);
    });
};
