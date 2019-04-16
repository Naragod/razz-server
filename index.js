
// variables
// ****************************************************************************
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const environment = require('./config');
const port = environment.remote.port || 8000;
const router = require('./route_modules/router');
const cors = require('cors');
const socket_connection = require("./sockets/socket_connection")(io);

// middleware
// ****************************************************************************
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use(router);

// establish socket connection
// ****************************************************************************
socket_connection.establishConnection();

// start
// ****************************************************************************
http.listen(port, () => {
    console.log("Listening on port:", port);
});