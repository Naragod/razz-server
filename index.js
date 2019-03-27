
// variables
// ****************************************************************************
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const randomizer = require('./randomizer/randomizer');
const environment = require('./config');
const port = environment.local.port || 8000;
const cors = require('cors');

// middleware
// ****************************************************************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(router);

// start
// ****************************************************************************
app.listen(port, () => {
    console.log("Listening on port:", port);
});