

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const randomizer = require('./randomizer/randomizer');
const environment = require('./config');
const port = process.env.PORT || 8000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send("<h1>This is a test. I am listening on port:", port, "</h1>");
});

app.post('/trueRandomNumber', (req, res) => {
    let min = req.body.min || 0;
    let max = req.body.max || 1;
    let size = req.body.size || 1;
    let result = {randomNumbers: randomizer.getRandomNumbers(min, max, size)};
    console.log("Api call:", result);
    res.send(result);
});

app.listen(port, () => {
    console.log("Listening on port:", port);
});