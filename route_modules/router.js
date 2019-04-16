
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
 
// configuration
// ****************************************************************************
let user = "postgres";
let password = "pass";
let host = "localhost";
let port = "5432";
let db = "raffle";
let configDb = {
    connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}`
};
let connection = dbhandler.setClientConnection(configDb);
 
// get requests
// ****************************************************************************
router.get('/', (req, res) => {
    res.send("<h1>This is a test.</h1>");
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
    let insertInto = `insert into ${table} (${columns.join(',')}) ` +
                    `VALUES (${columns.map((e, i) => "$" + (i + 1)).join(',')}) RETURNING *`;

    dbhandler.insert(connection, insertInto, data[0].values);
    res.send("saved to table:", table, "query:", query);
});

router.post('/randomizeList', (req, res) => {
    let raffleList = req.body.raffleList;
    let rollNumber = req.body.rollNumber;
    let rollResults = [];

    while(rollNumber > 0){
        // deep copy
        raffleList = JSON.parse(JSON.stringify(randomizer.shuffle(raffleList)));
        rollResults.push({
            result: raffleList,
            rollNumber: rollNumber
        });
        
        rollNumber --;
    }

    res.send({rollResults: rollResults});
});

module.exports = router;