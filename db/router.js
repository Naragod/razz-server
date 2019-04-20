
// variables
// ****************************************************************************
const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');
const useful_middleware = require('./useful-middleware');
const env = require('../config');
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
 

 
router.get('/trueRandomNumber', (req, res) => {
    let min = req.body.min || 2;
    let max = req.body.max || 12;
    let size = req.body.size || 1;
    let result = {randomNumbers: randomizer.getRandomNumbers(min, max, size)};
    res.send(result);
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

module.exports = router;