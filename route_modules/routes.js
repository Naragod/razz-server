

// variables
// ****************************************************************************
const express = require("express");
const router = express.Router();
const env = require('../config');

// get requests
// ****************************************************************************
router.get('/', (req, res) => {
    res.send("<h1>This is a test. I am listening on port:", port, "</h1>");
});

router.get('/date', (req, res) => {
    let region = req.query.region;
    let country = req.query.country;
    let city = req.query.city;

    // fetch(`${env.time.base}${region}/${country}${city}`)
    // .then(res => {

    // })
})

// post requests
// ****************************************************************************
router.post('/trueRandomNumber', (req, res) => {
    let min = req.body.min || 0;
    let max = req.body.max || 1;
    let size = req.body.size || 1;
    let result = {randomNumbers: randomizer.getRandomNumbers(min, max, size)};
    console.log("Api call:", result);
    res.send(result);
});


module.exports = router;