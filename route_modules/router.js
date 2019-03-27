

// variables
// ****************************************************************************
const express = require("express");
const router = express.Router();
const randomizer = require('../randomizer/randomizer');
const fetch = require('node-fetch');
const helper = require('./useful-middleware');
const env = require('../config');



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

    fetch(baseURL, {method: 'GET'}).then(helper.checkStatus)
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

// post requests
// ****************************************************************************


module.exports = router;