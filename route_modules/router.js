
// variables
// ****************************************************************************
const express = require("express");
const router = express.Router();
const randomizer = require('../randomizer/randomizer');
const fetch = require('node-fetch');
const useful_middleware = require('./useful-middleware');
const env = require('../config');
const dbhandler = require('../route_modules/dbhandler');
const helper = require('../helper');
const observable = require('./observable');
 
 
// configuration
// ****************************************************************************
let user = "postgres";
let password = "pass";
let host = "localhost";
let port = "5432";
let db = "raffle";

let configDb = {
    connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}`
}
let connection = dbhandler.setClientConnection(configDb);
 
 
// get requests
// ****************************************************************************
router.get('/', (req, res) => {
    res.send("<h1>This is a test.</h1>");
});
 
router.get('/date', (req, res) => {
    let baseURL = env.time.base;
    let delimiter = "/";
    let region = req.query.region || "";
    let country = req.query.country || "";
    let city = req.query.city || "";
    if(region.length > 0){
        baseURL += `${region}${delimiter}`;
    }
    if(country.length > 0){
        baseURL += `${country}${delimiter}`;
    }
    baseURL = `${baseURL}${city}`;
 
    fetch(baseURL, {method: 'GET'}).then(useful_middleware.checkStatus)
    .then(response => response.json())
    .then(response => {
        res.send(response);
    })
    .catch(err => {
        console.log(err);
    });
});
 
router.get('/trueRandomNumber', (req, res) => {
    let min = req.body.min || 2;
    let max = req.body.max || 12;
    let size = req.body.size || 1;
    let result = {randomNumbers: randomizer.getRandomNumbers(min, max, size)};
    console.log("Api call:", result);
    res.send(result);
});
 
router.get('/testdb', (req, res) => {
    res.send(connection);
});

router.get('/getTable', (req, res) => {
    let table = req.query.table;
    let response = dbhandler.query(connection, "select * from " + table);
    response.then(r => {
        console.log(r.rows);
        res.send(r.rows);
    });
});
 
// post requests
// ****************************************************************************
 
router.post('/saveToTable', (req, res) => {
    let table = req.body.table;
    let columns = req.body.columns;
    let data = req.body.data;
    // let query = `insert into ${table} (${columns.join(',')}) ` +
    //             `values ${data.map(v => {
    //                 return '(' + v.values.map(v => `'${v}'`).join(',') + ')';
    //             })}`;

    let insertInto = `insert into ${table} (${columns.join(',')}) ` +
                    `VALUES (${columns.map((e, i) => "$" + (i + 1)).join(',')}) RETURNING *`;

    // console.log("query:", query);clear
    console.log("insertInto:", insertInto);
    dbhandler.insert(connection, insertInto, data[0].values);
    let response = dbhandler.query(connection, "select * from participant");
    response.then(r => {
        console.log("Row inserted:",  r.rows);
    });
    res.send("saved to table:", table, "query:", query);
});

router.post('/randomizeList', (req, res) => {
    let raffleList = req.body.raffleList;
    let rollNumber = req.body.rollNumber;
    let rollResults = [];

    while(rollNumber > 0){
        raffleList = randomizer.shuffle(raffleList);
        rollResults.push({
            // deep copy
            result: JSON.parse(JSON.stringify(raffleList)),
            rollNumber: rollNumber
        });
        
        rollNumber --;
    }

    res.send({rollResults: rollResults});
});

module.exports = router;